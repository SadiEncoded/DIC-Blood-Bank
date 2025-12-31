'use client'

import { HOSPITALS } from '@/assets/data/hospitals';
import { HospitalSelect } from '@/components/common/form/HospitalSelect';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar'; // Shadcn Calendar
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/features/auth/components/AuthModal';
import { submitBloodRequest } from '@/features/forms/services';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import {
  Activity,
  AlertTriangle, ArrowRight,
  Calendar as CalendarIcon,
  CheckCircle,
  Droplet, FileImage,
  Loader2,
  MapPin, Phone,
  User, X
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { BLOOD_TYPES } from '@/config/constants';

// --- Validation Schema ---
const bloodRequestSchema = z.object({
    patientName: z.string().min(2, 'Patient name required / রুগীর নাম প্রয়োজন'),
    bloodType: z.enum(BLOOD_TYPES as unknown as [string, ...string[]], {
        message: 'Select Blood Group / রক্তের গ্রুপ নির্বাচন করুন'
    }),
    hospital: z.string().min(2, 'Hospital name required / হাসপাতালের নাম প্রয়োজন'),
    location: z.string().min(2, 'Location detection failed. Select a standard hospital or type manually. / এলাকা খুঁজে পাওয়া যায়নি'),
    requiredBy: z.string().min(1, 'Please pick a date / তারিখ নির্বাচন করুন'),
    urgency: z.enum(['normal', 'urgent', 'critical']),
    unitsNeeded: z.number().min(1, 'Minimum 1 bag / অন্তত ১ ব্যাগ প্রয়োজন').max(10, 'Max 10 bags / সর্বোচ্চ ১০ ব্যাগ'),
    contactName: z.string().min(2, 'Contact name required / যোগাযোগকারীর নাম প্রয়োজন'),
    contactPhone: z.string().regex(/^(?:\+88)?01[3-9]\d{8}$/, 'Valid 11-digit BD number required / সঠিক ফোন নম্বর দিন'),
    reason: z.string().optional(),
});

type BloodRequestFormType = z.infer<typeof bloodRequestSchema>;
type OnSuccessCallback = (trackingId: string, requestDetails: { bloodType: string; location: string }) => void;

export function BloodRequestForm({ onSuccess, initialValues }: { 
    onSuccess: OnSuccessCallback; 
    initialValues?: Partial<BloodRequestFormType>;
}) {
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { user, loading } = useAuth();

    useEffect(() => { setMounted(true); }, []);

    const form = useForm<BloodRequestFormType>({
        resolver: zodResolver(bloodRequestSchema),
        mode: 'onTouched',
        defaultValues: { 
            patientName: '',
            bloodType: '',
            hospital: '',
            location: '',
            requiredBy: '',
            urgency: 'normal',
            unitsNeeded: 1,
            contactName: '',
            contactPhone: '',
            reason: '',
            ...initialValues 
        }
    });

    const { watch, setValue, formState: { errors } } = form; // watch needed for dependent fields

    const selectedUrgency = watch('urgency');
    const phoneValue = watch('contactPhone');
    const selectedHospital = watch('hospital');

    useEffect(() => {
        if (selectedHospital) {
            const area = Object.keys(HOSPITALS).find(key => HOSPITALS[key]?.includes(selectedHospital));
            if (area) {
                setValue('location', `${area}, Chandpur`, { shouldValidate: true });
            }
        }
    }, [selectedHospital, setValue]);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { toast.error('File size must be less than 5MB'); return; }
            const reader = new FileReader();
            reader.onloadend = () => setPhotoPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const onSubmit: SubmitHandler<BloodRequestFormType> = async (data) => {
        try {
            // Process the blood request submission via server actions
            const result = await submitBloodRequest({ ...data, units: data.unitsNeeded, neededBy: data.requiredBy });
            if (result.success) {
                toast.success(result.message);
                form.reset(); 
                setPhotoPreview(null);
                if (result.trackingId) onSuccess(result.trackingId, { ...data, location: data.location });
            } else { 
                toast.error(result.message); 
            }
        } catch (error) {
            toast.error('An unexpected error occurred during submission. Please check your connection and try again.');
        }
    };

    const onFormError = (errors: any) => {
        // Log errors to a dedicated error reporting service in production if needed
        
        const fieldLabels: Record<string, string> = {
            patientName: "Patient Name (রুগীর নাম)",
            bloodType: "Blood Group (রক্তের গ্রুপ)",
            hospital: "Hospital (হাসপাতাল)",
            location: "Location (এলাকা)",
            requiredBy: "Required Date (তারিখ)",
            urgency: "Urgency Level (জরুরিতা)",
            unitsNeeded: "Units Needed (ব্যাগ)",
            contactName: "Requester Name (আপনার নাম)",
            contactPhone: "Phone (ফোন নম্বর)"
        };

        const missingFields = Object.keys(errors)
            .map(key => fieldLabels[key] || key)
            .join(', ');

        toast.error(`Please complete: ${missingFields}`, {
            description: "Some required fields are missing or invalid.",
            duration: 4000,
        });
    };

    // --- Modern Design Tokens ---
    // Refined visuals for a cleaner, FAANG-like aesthetic
    const sectionTitleClass = "text-[9px] md:text-xs font-black text-rose-500 uppercase tracking-[0.2em] mb-1.5 md:mb-3 pl-1 flex items-center gap-2";
    const sectionContainerClass = "space-y-3 md:space-y-6"; 
    const fieldLabel = "text-[11px] md:text-sm font-bold text-slate-600 ml-1 mb-1 md:mb-2 block tracking-tight";
    const iconClass = "absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors duration-300 pointer-events-none";
    const inputWrapperClass = "relative group";
    
    // Grid layout with better spacing
    const gridLayout = "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-10 md:gap-y-8";

    // Error Shake Animation
    const shakeAnimation = {
        x: [0, -4, 4, -4, 4, 0],
        transition: { duration: 0.4 }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
            className="w-full bg-white md:bg-transparent" // Transparent on larger screens if desired, but white here for consistency
        >
            {/* HEADER - Compacted for mobile */}
            <div className="px-6 py-4 md:px-14 md:pt-10 md:pb-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                             <div className="h-2 w-2 rounded-full bg-rose-600 animate-pulse md:hidden" />
                            <h2 className="text-xl md:text-4xl font-black text-slate-900 font-anek leading-none tracking-tight">
                                রক্তের অনুরোধ
                            </h2>
                        </div>
                        <p className="text-[12px] md:text-sm text-slate-500 font-medium">Submit Request Details</p>
                    </div>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit, onFormError)} className="px-6 md:px-14 pb-8 md:pb-20 space-y-6 md:space-y-14">
                    
                    {/* Section 01: Medical Details */}
                    <div>
                        <div className={sectionTitleClass}><Activity size={14} /> Patient & Hospital</div>
                        <div className={sectionContainerClass}>
                            <div className={gridLayout}>
                                <FormField
                                    control={form.control}
                                    name="patientName"
                                    render={({ field }) => (
                                        <FormItem className="space-y-0">
                                            <FormLabel className={fieldLabel}>Patient Name / রুগীর নাম</FormLabel>
                                            <FormControl>
                                                <motion.div 
                                                    animate={errors.patientName ? shakeAnimation : {}}
                                                    className={inputWrapperClass}
                                                >
                                                    <User className={iconClass} size={16} />
                                                    <Input placeholder="Full Name" {...field} className={cn("h-10 md:h-12 pl-10 md:pl-12 bg-white text-[13px] md:text-sm transition-all duration-300", errors.patientName && "border-rose-500 ring-rose-500/20 shadow-[0_0_0_4px_rgba(244,63,94,0.1)]")} />
                                                </motion.div>
                                            </FormControl>
                                            <FormMessage className="text-[10px] font-bold uppercase tracking-wider text-rose-500 mt-2" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="bloodType"
                                    render={({ field }) => (
                                        <FormItem className="space-y-0">
                                            <FormLabel className={fieldLabel}>Blood Group / রক্তের গ্রুপ</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value || ""}>
                                                <FormControl>
                                                    <motion.div 
                                                        animate={errors.bloodType ? shakeAnimation : {}}
                                                        className={inputWrapperClass}
                                                    >
                                                        <Droplet className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-300 z-10 pointer-events-none ${field.value ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} size={16} />
                                                        <SelectTrigger className={cn("h-10 md:h-12 pl-10 md:pl-12 bg-white text-[13px] md:text-sm transition-all duration-300", errors.bloodType && "border-rose-500 ring-rose-500/20 shadow-[0_0_0_4px_rgba(244,63,94,0.1)]")}>
                                                            <SelectValue placeholder="Select Group" />
                                                        </SelectTrigger>
                                                    </motion.div>
                                                </FormControl>
                                                <SelectContent>
                                                    {BLOOD_TYPES.map((type) => (
                                                        <SelectItem key={type} value={type} className="font-bold cursor-pointer transition-colors duration-150 py-3">
                                                            <span className="flex items-center gap-2">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                                                {type}
                                                            </span>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="md:col-span-2">
                                    <FormField
                                        control={form.control}
                                        name="hospital"
                                        render={({ field }) => (
                                            <FormItem className="space-y-0">
                                                <motion.div animate={errors.hospital ? shakeAnimation : {}}>
                                                    <HospitalSelect
                                                        label="Hospital / হাসপাতাল"
                                                        {...field}
                                                        error={errors.hospital?.message}
                                                        touched={!!errors.hospital}
                                                        className={cn(errors.hospital && "border-rose-500 ring-rose-500/20 shadow-[0_0_0_4px_rgba(244,63,94,0.1)]")}
                                                    />
                                                </motion.div>
                                                {/* FormMessage is redundant here as HospitalSelect has its own, but we keep it for consistency in schema tracking */}
                                                <FormMessage className="hidden" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem className="space-y-0 md:col-span-2">
                                            {field.value && (
                                                <motion.div 
                                                    initial={{ opacity: 0, height: 0 }} 
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                >
                                                    <label className={fieldLabel}>Area / এরিয়া</label>
                                                    <div className="w-full h-10 md:h-12 px-3 bg-white border border-slate-200 rounded-lg md:rounded-xl flex items-center justify-between text-slate-700 font-bold text-[12px] md:text-sm shadow-sm transition-all duration-300">
                                                        <div className="flex items-center gap-2">
                                                            <MapPin size={16} className="text-rose-500" />
                                                            {field.value}
                                                        </div>
                                                        <div className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md text-[10px] uppercase font-black tracking-wider flex items-center gap-1">
                                                            <CheckCircle size={10} /> Auto-detected
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                            <FormMessage className="text-[10px] font-bold uppercase tracking-wider text-rose-500 mt-2" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 02: Requirements */}
                    <div>
                        <div className={sectionTitleClass}><AlertTriangle size={14} /> Urgency & Timing</div>
                        <div className={sectionContainerClass}>
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className={fieldLabel}>Urgency Level / জরুরিতা</label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        {(['normal', 'urgent', 'critical'] as const).map((level) => (
                                            <button
                                                key={level} type="button" onClick={() => setValue('urgency', level)}
                                                className={`relative h-11 md:h-16 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 w-full overflow-hidden ${
                                                    selectedUrgency === level
                                                        ? level === 'critical' ? 'bg-rose-600 shadow-xl shadow-rose-200 ring-2 ring-rose-600 ring-offset-2' : 
                                                          level === 'urgent' ? 'bg-amber-500 shadow-xl shadow-amber-200 ring-2 ring-amber-500 ring-offset-2' : 
                                                          'bg-slate-900 shadow-xl shadow-slate-200 ring-2 ring-slate-900 ring-offset-2'
                                                        : 'bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                                }`}
                                            >
                                                <span className={`text-xs font-black uppercase tracking-widest ${selectedUrgency === level ? 'text-white' : 'text-slate-400'}`}>
                                                    {level}
                                                </span>
                                                {level === 'critical' && <AlertTriangle size={16} className={selectedUrgency === level ? 'text-white animate-pulse' : 'text-slate-300'} />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className={gridLayout}>
                                    <div className="space-y-0">
                                        <label className={fieldLabel}>Units Needed (Bags)</label>
                                        <div className="flex h-10 md:h-14 items-center bg-white border border-slate-200 rounded-lg md:rounded-2xl overflow-hidden shadow-sm group hover:border-slate-300 transition-colors">
                                            <button type="button" onClick={() => setValue('unitsNeeded', Math.max(1, watch('unitsNeeded') - 1))} className="w-12 h-full hover:bg-slate-50 active:bg-slate-100 text-slate-400 hover:text-rose-600 font-black transition-colors">-</button>
                                            <div className="flex-1 border-x border-slate-100 h-full flex items-center justify-center font-black text-slate-900 text-sm md:text-xl gap-2">
                                                {watch('unitsNeeded')}
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Bags</span>
                                            </div>
                                            <button type="button" onClick={() => setValue('unitsNeeded', Math.min(10, watch('unitsNeeded') + 1))} className="w-14 h-full hover:bg-slate-50 active:bg-slate-100 text-slate-400 hover:text-emerald-600 font-black transition-colors">+</button>
                                        </div>
                                    </div>

                                        <FormField
                                            control={form.control}
                                            name="requiredBy"
                                            render={({ field }) => (
                                                <FormItem className="space-y-0 flex flex-col">
                                                    <FormLabel className={fieldLabel}>Required Date</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "h-10 md:h-14 w-full pl-3.5 text-left font-medium text-[13px] md:text-base rounded-lg md:rounded-2xl border-slate-200 bg-white hover:bg-slate-50 hover:text-slate-900 shadow-sm transition-all duration-300",
                                                                        !field.value && "text-slate-400",
                                                                        errors.requiredBy && "border-rose-500 ring-rose-500/20 shadow-[0_0_0_4px_rgba(244,63,94,0.1)]"
                                                                    )}
                                                                >
                                                                    <CalendarIcon size={16} className={`mr-2 h-4 w-4 ${field.value ? "text-rose-500" : "text-slate-400"}`} />
                                                                    {field.value ? (
                                                                        format(new Date(field.value), "PPP")
                                                                    ) : (
                                                                        <span>Pick a date</span>
                                                                    )}
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value ? new Date(field.value) : undefined}
                                                                onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                                                                disabled={(date) =>
                                                                    date < new Date(new Date().setHours(0, 0, 0, 0))
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage className="text-[10px] font-bold uppercase tracking-wider text-rose-500 mt-2" />
                                                </FormItem>
                                            )}
                                        />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 03: Contact */}
                    <div>
                        <div className={sectionTitleClass}><Phone size={14} /> Contact Information</div>
                        <div className={sectionContainerClass}>
                            <div className={gridLayout}>
                                <FormField
                                    control={form.control}
                                    name="contactName"
                                    render={({ field }) => (
                                        <FormItem className="space-y-0">
                                            <FormLabel className={fieldLabel}>Requester Name / আপনার নাম</FormLabel>
                                            <FormControl>
                                                <motion.div 
                                                    animate={errors.contactName ? shakeAnimation : {}}
                                                    className={inputWrapperClass}
                                                >
                                                    <User className={iconClass} size={16} />
                                                    <Input placeholder="Your Name" {...field} className={cn("h-10 md:h-12 pl-10 md:pl-12 bg-white text-[13px] md:text-sm transition-all duration-300", errors.contactName && "border-rose-500 ring-rose-500/20 shadow-[0_0_0_4px_rgba(244,63,94,0.1)]")} />
                                                </motion.div>
                                            </FormControl>
                                            <FormMessage className="text-[10px] font-bold uppercase tracking-wider text-rose-500 mt-2" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="contactPhone"
                                    render={({ field }) => (
                                        <FormItem className="space-y-0">
                                            <FormLabel className={fieldLabel}>Phone / ফোন নম্বর</FormLabel>
                                            <FormControl>
                                                <motion.div 
                                                    animate={errors.contactPhone ? shakeAnimation : {}}
                                                    className={inputWrapperClass}
                                                >
                                                    <Phone className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-300 pointer-events-none ${phoneValue?.length === 11 ? 'text-emerald-500' : 'text-slate-400 group-focus-within:text-rose-500'}`} size={16} />
                                                    <Input 
                                                        placeholder="01XXXXXXXXX" 
                                                        type="tel"
                                                        {...field}
                                                        className={cn(
                                                            "h-10 md:h-12 pl-10 md:pl-12 bg-white text-[13px] md:text-sm transition-all duration-300",
                                                            phoneValue?.length === 11 ? 'border-emerald-500 ring-1 ring-emerald-500' : '',
                                                            errors.contactPhone && "border-rose-500 ring-rose-500/20 shadow-[0_0_0_4px_rgba(244,63,94,0.1)]"
                                                        )} 
                                                    />
                                                    {phoneValue?.length === 11 && (
                                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                            <CheckCircle size={18} className="text-emerald-500" />
                                                        </motion.div>
                                                    )}
                                                </motion.div>
                                            </FormControl>
                                            <FormMessage className="text-[10px] font-bold uppercase tracking-wider text-rose-500 mt-2" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 04: Document */}
                    <div>
                         <div className={sectionTitleClass}><FileImage size={14} /> Verification</div>
                        <div className="relative mt-1">
                            {!photoPreview ? (
                                <label className="flex flex-col items-center justify-center w-full p-6 md:p-12 bg-white border-2 border-slate-200 border-dashed rounded-[2rem] md:rounded-[2.5rem] hover:bg-slate-50 hover:border-rose-300 group transition-all cursor-pointer shadow-sm hover:shadow-md">
                                    <div className="w-12 h-12 md:w-20 md:h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 group-hover:bg-rose-50 group-hover:text-rose-500 transition-all border border-slate-100">
                                        <FileImage className="text-slate-400 group-hover:text-rose-500 transition-colors" size={24} />
                                    </div>
                                    <div className="text-center space-y-1">
                                        <h4 className="text-sm md:text-base font-black text-slate-800 uppercase tracking-tight">Upload Prescription</h4>
                                        <p className="text-xs text-slate-400 font-medium">Click to browse or drag file here</p>
                                    </div>
                                    <div className="mt-4 px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                        Optional / অপশনাল
                                    </div>
                                    <input type="file" accept="image/*" capture="environment" onChange={handlePhotoChange} className="hidden" />
                                </label>
                            ) : (
                                <div className="relative w-full max-w-[280px] md:max-w-sm mx-auto rounded-2xl md:rounded-3xl overflow-hidden border-2 md:border-4 border-white shadow-xl md:shadow-2xl group">
                                    <img src={photoPreview} alt="Preview" className="w-full h-44 md:h-72 object-cover" />
                                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <button type="button" onClick={() => setPhotoPreview(null)} className="bg-white text-rose-600 px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg hover:scale-105 transition-transform text-[11px] md:text-sm font-bold flex items-center gap-2">
                                            <X size={14} /> Remove Photo
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <div className="pt-2">
                        {!mounted ? (
                            <div className="w-full h-14 md:h-20 bg-slate-100 rounded-2xl md:rounded-3xl animate-pulse" />
                        ) : !user ? (
                            <Button 
                                type="button" 
                                size="lg"
                                onClick={() => setIsAuthModalOpen(true)}
                                className="w-full h-14 md:h-20 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-xl md:rounded-3xl uppercase tracking-widest text-[10px] md:text-sm shadow-xl shadow-rose-200/50 hover:shadow-rose-400/40 transition-all hover:scale-[1.01]"
                            >
                                <span className="flex items-center gap-2">Sign In to Request <User size={16} /></span>
                            </Button>
                        ) : (
                            <Button 
                                type="submit" 
                                disabled={form.formState.isSubmitting} 
                                className="w-full h-12 md:h-20 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-lg md:rounded-3xl uppercase tracking-widest text-[10px] md:text-sm shadow-xl shadow-slate-200 hover:shadow-slate-400/20 disabled:opacity-70 transition-all hover:scale-[1.01]"
                            >
                                {form.formState.isSubmitting ? (
                                    <div className="flex items-center gap-3">
                                        <Loader2 className="animate-spin" size={20} />
                                        <span>Submitting...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <span>Confirm Request</span>
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                )}
                            </Button>
                        )}
                        <p className="text-center text-[10px] text-slate-400 font-bold mt-4 uppercase tracking-widest opacity-60">
                            Protected by DIC Medical Standard
                        </p>
                    </div>
                </form>
            </Form>
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </motion.div>
    );
}
