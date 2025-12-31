'use client';

import { Button } from '@/components/ui/button';
import { submitDonationVerificationAction } from '@/features/blood-requests/actions';
import { createClient } from '@/lib/supabase/client';
import imageCompression from 'browser-image-compression';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle2,
  FileText,
  Info,
  ShieldCheck,
  X
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface DonationVerificationWizardProps {
    request: {
        id: string;
        tracking_id: string;
        patient_name: string;
        blood_type: string;
        hospital: string;
        location: string;
        units: number;
        needed_by: string;
    };
}

type Step = 'REVIEW' | 'UPLOAD' | 'SUCCESS';

export default function DonationVerificationWizard({ request }: DonationVerificationWizardProps) {
    const router = useRouter();
    const [step, setStep] = useState<Step>('REVIEW');
    const [uploading, setUploading] = useState(false);
    
    // File State
    const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
    const [bagFile, setBagFile] = useState<File | null>(null);
    
    // Preview URLs
    const [previews, setPreviews] = useState<{prescription?: string, bag?: string}>({});
    
    // Compression state
    const [compressing, setCompressing] = useState(false);
    
    // Input Refs
    const prescriptionRef = useRef<HTMLInputElement>(null);
    const bagRef = useRef<HTMLInputElement>(null);

    // Cleanup previews to prevent memory leaks
    useEffect(() => {
        return () => {
            if (previews.prescription) URL.revokeObjectURL(previews.prescription);
            if (previews.bag) URL.revokeObjectURL(previews.bag);
        };
    }, [previews]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'prescription' | 'bag') => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Basic Validation
        if (file.size > 10 * 1024 * 1024) {
            alert("File is too large. Please select an image under 10MB.");
            return;
        }

        // Only compress images
        if (!file.type.startsWith('image/')) {
            alert("Please select a valid image file.");
            return;
        }

        try {
            setCompressing(true);

            // Compression options
            const options = {
                maxSizeMB: 1, // Max file size in MB
                maxWidthOrHeight: 1920, // Max dimension
                useWebWorker: true,
                fileType: 'image/jpeg' as const,
                initialQuality: 0.8
            };

            // Compress the image
            const compressedFile = await imageCompression(file, options);
            
            // Create preview URL
            const previewUrl = URL.createObjectURL(compressedFile);
            
            if (type === 'prescription') {
                setPrescriptionFile(compressedFile);
                setPreviews(prev => ({ ...prev, prescription: previewUrl }));
            } else {
                setBagFile(compressedFile);
                setPreviews(prev => ({ ...prev, bag: previewUrl }));
            }
        } catch (error) {
            console.error('Compression error:', error);
            alert('Failed to process image. Please try again.');
        } finally {
            setCompressing(false);
        }
    };

    const handleNext = async () => {
        if (step === 'REVIEW') setStep('UPLOAD');
        else if (step === 'UPLOAD') {
            if (!prescriptionFile || !bagFile) return;

            setUploading(true);
            const supabase = createClient();
            const uploadedPaths: string[] = [];

            try {
                // Helper for individual uploads
                const uploadFile = async (file: File, folder: string) => {
                    const ext = file.name.split('.').pop();
                    const path = `${folder}/${request.id}_${Date.now()}.${ext}`;
                    const { error } = await supabase.storage
                        .from('donation-proofs')
                        .upload(path, file, { upsert: true });
                    
                    if (error) throw error;
                    uploadedPaths.push(path);
                    return path;
                };

                // 1. Concurrent Uploads
                const [pPath, bPath] = await Promise.all([
                    uploadFile(prescriptionFile, 'prescriptions'),
                    uploadFile(bagFile, 'bags')
                ]);

                // 2. Get Public URLs
                const pUrl = supabase.storage.from('donation-proofs').getPublicUrl(pPath).data.publicUrl;
                const bUrl = supabase.storage.from('donation-proofs').getPublicUrl(bPath).data.publicUrl;

                // 3. Database Action
                const result = await submitDonationVerificationAction({
                    request_id: request.id,
                    prescription_url: pUrl,
                    blood_bag_url: bUrl
                });

                if (result.success) {
                    setStep('SUCCESS');
                } else {
                    throw new Error(result.error?.message || 'Database submission failed');
                }
            } catch (err) {
                console.error('Process error:', err);
                // Rollback: Delete uploaded files if DB fails
                if (uploadedPaths.length > 0) {
                    await supabase.storage.from('donation-proofs').remove(uploadedPaths);
                }
                alert('Verification failed. Please try again or check your connection.');
            } finally {
                setUploading(false);
            }
        }
    };

    return (
        <div className="bg-white rounded-2xl md:rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden max-w-2xl mx-auto">
            {/* Progress Header */}
            <div className="px-4 md:px-8 pt-6 md:pt-8 pb-3 md:pb-4">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-9 h-9 md:w-10 md:h-10 bg-rose-600 rounded-lg md:rounded-xl flex items-center justify-center text-white shadow-lg shadow-rose-200">
                             <ShieldCheck size={18} className="md:w-5 md:h-5" />
                        </div>
                        <div>
                            <h2 className="text-base md:text-lg font-black text-slate-900 uppercase tracking-tight font-anek">Verification</h2>
                            <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                {step === 'REVIEW' ? 'Review Details' : step === 'UPLOAD' ? 'Upload Proof' : 'Completed'}
                            </p>
                        </div>
                    </div>
                    {step !== 'SUCCESS' && (
                        <div className="text-right hidden sm:block">
                             <p className="text-[9px] md:text-[10px] text-slate-400 font-black uppercase tracking-widest">Step</p>
                             <p className="text-xs md:text-sm font-black text-slate-900">{step === 'REVIEW' ? '1' : '2'}/2</p>
                        </div>
                    )}
                </div>

                <div className="h-1.5 flex rounded-full bg-slate-100 overflow-hidden">
                    <motion.div 
                        animate={{ width: step === 'REVIEW' ? '50%' : '100%' }}
                        className="bg-rose-500 rounded-full"
                    />
                </div>
            </div>

            <div className="px-4 md:px-8 pb-6 md:pb-8">
                <AnimatePresence mode="wait">
                    {step === 'REVIEW' && (
                        <motion.div
                            key="review"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-4 md:space-y-6"
                        >
                            <div className="bg-slate-50 border border-slate-100 p-4 md:p-6 rounded-2xl md:rounded-3xl">
                                <h3 className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 md:mb-4">Confirming Donation For</h3>
                                <div className="flex items-center gap-3 md:gap-4">
                                    <div className="bg-rose-600 text-white w-11 h-11 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-base md:text-lg shadow-md shadow-rose-100">
                                        {request.blood_type}
                                    </div>
                                    <div>
                                        <p className="text-sm md:text-base font-black text-slate-900 uppercase font-anek tracking-tight">{request.patient_name}</p>
                                        <p className="text-[10px] md:text-xs text-slate-500 font-bold flex items-center gap-1">
                                            <Info size={11} className="md:w-3 md:h-3" /> ID: {request.tracking_id}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-6 pt-4 md:pt-6 border-t border-slate-200/60">
                                    <div>
                                        <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Hospital</p>
                                        <p className="text-[11px] md:text-xs font-bold text-slate-800 line-clamp-1">{request.hospital}</p>
                                    </div>
                                    <div>
                                        <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Requirement</p>
                                        <p className="text-[11px] md:text-xs font-bold text-slate-800">{request.units} Blood Units</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 md:gap-4 p-4 md:p-5 bg-amber-50/50 border border-amber-100 rounded-xl md:rounded-2xl">
                                <Info size={18} className="shrink-0 text-amber-600 md:w-5 md:h-5" />
                                <p className="text-[10px] md:text-[11px] font-medium text-amber-900 leading-relaxed">
                                    To verify your donation, you must provide a photo of the <span className="font-black underline">signed prescription</span> and the <span className="font-black underline">blood bag tag</span>. 
                                </p>
                            </div>

                            <Button 
                                onClick={handleNext} 
                                className="w-full h-12 md:h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-xl md:rounded-2xl text-[8px] md:text-xs font-black uppercase tracking-widest group shadow-xl shadow-slate-200 transition-all"
                            >
                                Let's Verify
                                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform md:w-[18px] md:h-[18px]" />
                            </Button>
                        </motion.div>
                    )}

                    {step === 'UPLOAD' && (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-4 md:space-y-5"
                        >
                            {/* Prescription Upload Slot */}
                            <div className="relative group">
                                <input type="file" ref={prescriptionRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'prescription')} />
                                <div 
                                    onClick={() => !uploading && !compressing && prescriptionRef.current?.click()}
                                    className={`relative h-28 md:h-32 border-2 border-dashed rounded-2xl md:rounded-3xl overflow-hidden transition-all cursor-pointer flex items-center px-4 md:px-6 gap-4 md:gap-6 ${
                                        prescriptionFile ? 'bg-emerald-50/30 border-emerald-500' : 'bg-slate-50 border-slate-200 hover:border-rose-400'
                                    } ${compressing ? 'opacity-60 pointer-events-none' : ''}`}
                                >
                                    {previews.prescription ? (
                                        <img src={previews.prescription} alt="Preview" className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg md:rounded-xl" />
                                    ) : (
                                        <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-lg md:rounded-xl flex items-center justify-center text-slate-400 group-hover:text-rose-500 transition-colors">
                                            <FileText size={28} className="md:w-8 md:h-8" />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <h4 className="text-[10px] md:text-xs font-black text-slate-900 uppercase tracking-widest mb-0.5 md:mb-1">Signed Prescription</h4>
                                        <p className="text-[9px] md:text-[10px] text-slate-500 font-medium leading-tight">
                                            {compressing ? 'Compressing...' : prescriptionFile ? prescriptionFile.name : 'Tap to upload hospital authorization'}
                                        </p>
                                    </div>
                                    {compressing && (
                                        <div className="w-5 h-5 border-2 border-rose-500/30 border-t-rose-500 rounded-full animate-spin" />
                                    )}
                                    {prescriptionFile && !uploading && !compressing && (
                                        <button onClick={(e) => { e.stopPropagation(); setPrescriptionFile(null); setPreviews(p => ({...p, prescription: undefined})) }} className="p-1.5 md:p-2 bg-white rounded-full shadow-sm text-rose-500"><X size={14} className="md:w-4 md:h-4" /></button>
                                    )}
                                </div>
                            </div>

                            {/* Bag Upload Slot */}
                            <div className="relative group">
                                <input type="file" ref={bagRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'bag')} />
                                <div 
                                    onClick={() => !uploading && !compressing && bagRef.current?.click()}
                                    className={`relative h-28 md:h-32 border-2 border-dashed rounded-2xl md:rounded-3xl overflow-hidden transition-all cursor-pointer flex items-center px-4 md:px-6 gap-4 md:gap-6 ${
                                        bagFile ? 'bg-emerald-50/30 border-emerald-500' : 'bg-slate-50 border-slate-200 hover:border-blue-400'
                                    } ${compressing ? 'opacity-60 pointer-events-none' : ''}`}
                                >
                                    {previews.bag ? (
                                        <img src={previews.bag} alt="Preview" className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg md:rounded-xl" />
                                    ) : (
                                        <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-lg md:rounded-xl flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors">
                                            <Camera size={28} className="md:w-8 md:h-8" />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <h4 className="text-[10px] md:text-xs font-black text-slate-900 uppercase tracking-widest mb-0.5 md:mb-1">Blood Bag Photo</h4>
                                        <p className="text-[9px] md:text-[10px] text-slate-500 font-medium leading-tight">
                                            {compressing ? 'Compressing...' : bagFile ? bagFile.name : 'Must show clear serial number on bag'}
                                        </p>
                                    </div>
                                    {compressing && (
                                        <div className="w-5 h-5 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                                    )}
                                    {bagFile && !uploading && !compressing && (
                                        <button onClick={(e) => { e.stopPropagation(); setBagFile(null); setPreviews(p => ({...p, bag: undefined})) }} className="p-1.5 md:p-2 bg-white rounded-full shadow-sm text-rose-500"><X size={14} className="md:w-4 md:h-4" /></button>
                                    )}
                                </div>
                            </div>

                            

                            <div className="flex gap-2 md:gap-3 pt-2">
                                <Button 
                                    variant="outline" 
                                    onClick={() => setStep('REVIEW')}
                                    className="flex-1 h-12 md:h-14 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest border-black/50"
                                    disabled={uploading}
                                >
                                    <ArrowLeft size={20} className="mr-2 md:w-[18px] md:h-[18px]" />
                                </Button>
                                <Button 
                                    onClick={handleNext} 
                                    className="flex-[3] h-12 md:h-14 bg-rose-600 hover:bg-rose-700 text-white rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest shadow-lg shadow-rose-100 disabled:opacity-50 disabled:grayscale transition-all"
                                    disabled={uploading || !prescriptionFile || !bagFile}
                                >
                                    {uploading ? (
                                        <span className="flex items-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Processing...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">Submit<CheckCircle2 size={16} className="md:w-[18px] md:h-[18px]" /></span>
                                    )}
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {step === 'SUCCESS' && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="py-8 md:py-10 flex flex-col items-center text-center"
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-100 rounded-2xl md:rounded-[2rem] flex items-center justify-center text-emerald-600 mb-4 md:mb-6 shadow-inner shadow-emerald-200/50">
                                <CheckCircle2 size={32} strokeWidth={2.5} className="md:w-10 md:h-10" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight mb-2 md:mb-3 font-anek">Submission Received</h2>
                            <p className="text-slate-500 text-xs md:text-[13px] font-medium max-w-xs mb-8 md:mb-10 leading-relaxed px-4">
                                Our medical coordinators will verify your documents within 2-4 hours. You'll receive a notification once your badge is updated.
                            </p>
                            <Button 
                                onClick={() => router.push('/donate')}
                                className="h-12 md:h-14 px-8 md:px-10 bg-slate-900 hover:bg-slate-800 text-white rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all active:scale-95"
                            >
                                Return to Feed
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
