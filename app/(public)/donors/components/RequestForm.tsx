import { submitBloodRequest } from '@/lib/services/forms.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Calendar, CheckCircle, ClipboardList, Droplet, FileImage, MapPin, Phone, User } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { FormField } from '@/components/ui/FormField';
import { BLOOD_TYPES } from '@/lib/config/constants';

const bloodRequestSchema = z.object({
  patientName: z.string().min(2, 'Patient name is required'),
  bloodType: z.enum(BLOOD_TYPES as unknown as [string, ...string[]]),
  hospital: z.string().min(2, 'Hospital name is required'),
  requiredBy: z.string().min(1, 'Date is required'),
  urgency: z.enum(['normal', 'urgent', 'critical']),
  unitsNeeded: z.number().min(1).max(10),
  contactName: z.string().min(2, 'Contact person name is required'),
  contactPhone: z.string().regex(/^(?:\+88)?01[3-9]\d{8}$/, 'Valid BD phone number required'),
  reason: z.string().optional(),
});

type BloodRequestFormType = z.infer<typeof bloodRequestSchema>;

type OnSuccessCallback = (trackingId: string, requestDetails: { bloodType: string; location: string }) => void;

export function BloodRequestForm({ onSuccess }: { onSuccess: OnSuccessCallback }) {
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [prescriptionPhoto, setPrescriptionPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<BloodRequestFormType>({
    resolver: zodResolver(bloodRequestSchema),
    defaultValues: { unitsNeeded: 1, urgency: 'normal' }
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('File size must be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      setPrescriptionPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPrescriptionPhoto(null);
    setPhotoPreview(null);
  };

  const onSubmit: SubmitHandler<BloodRequestFormType> = async (data) => {
    const result = await submitBloodRequest({
      ...data,
      units: data.unitsNeeded,
      neededBy: data.requiredBy,
      location: data.hospital, // We'll use hospital as location for simplicity or add a location field
    })
    
    if (result.success) {
      toast.success(result.message);
      reset();
      removePhoto(); // Clear prescription photo
      if (result.trackingId) {
        onSuccess(result.trackingId, {
          bloodType: data.bloodType,
          location: data.hospital
        });
      }
    } else {
      toast.error(result.message);
    }
  };

  return (
    <motion.div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="bg-slate-50 border-b border-slate-200 px-8 py-8">
        <h2 className="text-2xl font-bold text-slate-900 font-anek">
          অনুরোধ ফরম <span className="text-slate-400 font-normal text-lg">/ Request Form</span>
        </h2>
        <p className="text-xs text-slate-500 font-hind mt-1 uppercase tracking-wider">Official Medical Requisition</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.form 
          key="request-form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit(onSubmit)} 
          className="p-8 md:p-12 space-y-10"
        >
          
          {/* Section 1: Patient & Medical Info */}
          <div className="space-y-6">
              <div className="text-[10px] font-bold text-rose-600 uppercase tracking-[0.2em] border-l-2 border-rose-600 pl-3">Medical Details</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                <FormField label="Patient Name / রুগীর নাম" icon={<User size={16}/>} error={errors.patientName}>
                  <input {...register('patientName')} placeholder="Full Name" className="form-input" suppressHydrationWarning />
                </FormField>

                <FormField label="Blood Group / রক্তের গ্রুপ" icon={<Droplet size={16}/>} error={errors.bloodType}>
                  <select {...register('bloodType')} className="form-input font-bold appearance-none" suppressHydrationWarning>
                    <option value="">Select</option>
                    {BLOOD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </FormField>

                <FormField label="Hospital / হাসপাতাল" icon={<MapPin size={16}/>} error={errors.hospital}>
                  <input {...register('hospital')} placeholder="Name and Branch" className="form-input" suppressHydrationWarning />
                </FormField>

                <FormField label="Reason / কারণ (ঐচ্ছিক)" icon={<ClipboardList size={16}/>} error={errors.reason}>
                  <input {...register('reason')} placeholder="e.g. Surgery, Delivery" className="form-input" suppressHydrationWarning />
                </FormField>
              </div>
            </div>

            {/* Section 2: Contact Info */}
            <div className="space-y-6">
              <div className="text-[10px] font-bold text-rose-600 uppercase tracking-[0.2em] border-l-2 border-rose-600 pl-3">Contact Person</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                <FormField label="Requester Name / আপনার নাম" icon={<User size={16}/>} error={errors.contactName}>
                  <input {...register('contactName')} placeholder="Contact Person" className="form-input" suppressHydrationWarning />
                </FormField>

                <FormField label="Phone / ফোন নম্বর" icon={<Phone size={16}/>} error={errors.contactPhone}>
                  <input {...register('contactPhone')} placeholder="01XXXXXXXXX" className="form-input" suppressHydrationWarning />
                </FormField>
              </div>
            </div>

            {/* Section 3: Urgency & Timing */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6">
               <FormField label="Urgency / জরুরিতা" error={errors.urgency}>
                  <select {...register('urgency')} className="form-input bg-white" suppressHydrationWarning>
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                    <option value="critical">Critical</option>
                  </select>
               </FormField>
               <FormField label="Required Date" icon={<Calendar size={16}/>} error={errors.requiredBy}>
                  <input type="date" {...register('requiredBy')} className="form-input bg-white" suppressHydrationWarning />
               </FormField>
               <FormField label="Units (Bags)" error={errors.unitsNeeded}>
                  <input type="number" {...register('unitsNeeded', { valueAsNumber: true })} className="form-input bg-white" suppressHydrationWarning />
               </FormField>
             </div>

            {/* Section 4: Prescription Photo (Optional) */}
            <div className="space-y-4">
              <div className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] border-l-2 border-slate-300 pl-3">
                Prescription Photo (Optional / ঐচ্ছিক)
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                {!photoPreview ? (
                  <label className="flex flex-col items-center justify-center cursor-pointer group">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 group-hover:bg-rose-50 transition-colors shadow-sm">
                      <FileImage className="w-8 h-8 text-slate-400 group-hover:text-rose-500 transition-colors" />
                    </div>
                    <p className="text-sm font-bold text-slate-700 mb-1">Upload Prescription or Medical Document</p>
                    <p className="text-xs text-slate-500 mb-4">PNG, JPG up to 5MB</p>
                    <div className="px-6 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-600 group-hover:border-rose-500 group-hover:text-rose-600 transition-colors">
                      Choose File
                    </div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="space-y-4">
                    <div className="relative rounded-xl overflow-hidden border-2 border-slate-200 bg-white">
                      <img 
                        src={photoPreview} 
                        alt="Prescription preview" 
                        className="w-full h-64 object-contain"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span className="font-bold text-slate-700">{prescriptionPhoto?.name}</span>
                        <span className="text-slate-400">({(prescriptionPhoto!.size / 1024).toFixed(1)} KB)</span>
                      </div>
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-xs text-slate-500 italic px-2">
                📋 Uploading a prescription helps verify your request faster and increases trust with donors.
              </p>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              suppressHydrationWarning
              className="w-full py-5 bg-slate-900 text-white font-bold rounded-xl hover:bg-rose-600 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-sm shadow-lg shadow-slate-200"
            >
              {isSubmitting ? "Processing..." : "Submit Requisition"}
              <ArrowRight size={18} />
            </button>
          </motion.form>
      </AnimatePresence>
    </motion.div>
  );
}
