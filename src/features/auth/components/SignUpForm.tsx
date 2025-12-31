'use client';
import { LocationSelect } from '@/components/common/form/LocationSelect';
import { BLOOD_TYPES as bloodTypes } from '@/config';
import { signup } from '@/features/auth/services/auth-actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    BadgeCheck,
    Calendar,
    CheckCircle2,
    Droplet,
    HeartPulse,
    History,
    Loader2,
    Lock,
    Mail,
    Phone,
    User
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

// Validation Schema
const signupSchema = z.object({
  name: z.string().min(3, "নাম অন্তত ৩ অক্ষরের হতে হবে (Name must be at least 3 characters)"),
  phone: z.string().regex(/^(?:\+8801|01)[3-9]\d{8}$/, "সঠিক বাংলাদেশি নম্বর দিন (Invalid BD phone number)"),
  email: z.string().email("সঠিক ইমেইল দিন (Invalid email address)"),
  location: z.string().min(2, "ঠিকানা দিন (Location required)"),
  bloodType: z.string().min(1, "রক্তের গ্রুপ নির্বাচন করুন (Select blood group)"),
  facebookUrl: z.string().regex(/^(https?:\/\/)?(www\.)?(facebook|fb)\.com\/(profile\.php\?id=\d+|[a-zA-Z0-9\.]+\/?)$/, "সঠিক ফেসবুক প্রোফাইল লিংক দিন (Valid Facebook URL required)").optional().or(z.literal("")),
  age: z.string().refine((val) => {
    const num = parseInt(val);
    return !isNaN(num) && num >= 18 && num <= 65;
  }, { message: "বয়স ১৮ থেকে ৬৫ এর মধ্যে হতে হবে (Age must be 18-65)" }),
  lastDonated: z.string().optional(),
  password: z.string().min(6, "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে (Password min 6 characters)"),
  confirmPassword: z.string(),
  agreeToPolicy: z.boolean().refine(val => val === true, {
    message: "গোপনীয়তা নীতি মেনে নিতে হবে (Must agree to privacy policy)"
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "পাসওয়ার্ড মেলেনি (Passwords don't match)",
  path: ["confirmPassword"],
});

type SignupValues = z.infer<typeof signupSchema>;

export default function SignUpForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
    defaultValues: {
        name: '', 
        phone: '', 
        email: '', 
        location: '',
        facebookUrl: '',
        bloodType: '', 
        age: '', 
        lastDonated: '',
        password: '', 
        confirmPassword: '',
        agreeToPolicy: false
    }
  });

  const onSubmit = handleSubmit(async (data: SignupValues) => {
    setIsSubmitting(true);
    
    const submitData = new FormData();
    Object.entries(data).forEach(([key, val]) => {
      if (key !== 'agreeToPolicy' && val !== undefined) {
        submitData.append(key, String(val));
      }
    });

    try {
        const result = await signup(submitData);
        if (result.success) {
          toast.success(result.message, {
            description: 'Please check your email to verify your account',
            duration: 5000
          });
          reset();
          setTimeout(() => router.push('/'), 2000);
        } else {
          toast.error(result.error || 'Registration failed', {
            description: 'Please check your information and try again'
          });
        }
    } catch (err) {
        console.error('Signup error:', err);
        toast.error("An unexpected error occurred", {
          description: 'Please try again later'
        });
    } finally {
        setIsSubmitting(false);
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto bg-slate-50 rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-2xl mb-12 pb-6"
    >
      {/* Header */}
      <div className="bg-rose-900 px-8 py-12 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-2 py-1 md:px-3 md:py-1 bg-rose-500/20 backdrop-blur-md border border-white/10 rounded-full">
            <HeartPulse className="h-3.5 w-3.5 text-rose-300 animate-pulse" />
            <span className="text-[10px] font-bold text-rose-100 uppercase tracking-widest">Life Saver Portal</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl md:text-4xl font-bold text-white tracking-tight font-anek uppercase tracking-[0.1em]">
              নিবন্ধন করুন / Sign Up
            </h2>
            <p className="text-rose-100/80 md:text-sm text-[11.9px] max-w-xl mx-auto">
              Join our community and help save lives
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={onSubmit} noValidate className="p-6 md:p-10 lg:p-12 space-y-10 md:space-y-12">
        
        {/* Personal Profile */}
        <section className="space-y-6">
          <SectionHeader title="Personal Profile" subtitle="ব্যক্তিগত তথ্য" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField 
              label="Full Name / পূর্ণ নাম" 
              icon={<User size={18} />} 
              {...register('name')} 
              error={errors.name?.message} 
              touched={touchedFields.name}
              placeholder="Abdullah Al Mamun" 
              autoComplete="name"
            />
            <FormField 
              label="Phone / ফোন নম্বর" 
              icon={<Phone size={18} />} 
              type="tel"
              {...register('phone')} 
              error={errors.phone?.message} 
              touched={touchedFields.phone}
              placeholder="01712345678" 
              autoComplete="tel"
            />
            <FormField 
              label="Email / ইমেইল" 
              icon={<Mail size={18} />} 
              type="email"
              {...register('email')} 
              error={errors.email?.message} 
              touched={touchedFields.email}
              placeholder="example@mail.com" 
              autoComplete="email"
            />
            <LocationSelect
              label="Present Address / বর্তমান ঠিকানা"
              {...register('location')}
              error={errors.location?.message}
              touched={touchedFields.location}
            />
            
            <div className="md:col-span-2">
            <FormField 
              label="Facebook Profile / ফেসবুক লিংক" 
              icon={
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-[#1877F2]">
                   <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              }
              {...register('facebookUrl')} 
              error={errors.facebookUrl?.message} 
              touched={touchedFields.facebookUrl}
              placeholder="facebook.com/yourprofile"
            />
            <p className="ml-1 mt-2 text-[10px] text-slate-400 font-medium">Used for identity verification only. This builds trust with donors.</p>
            </div>
          </div>
        </section>

        {/* Medical Details */}
        <section className="space-y-6">
          <SectionHeader title="Medical Details" subtitle="চিকিৎসা সংক্রান্ত তথ্য" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 group">
                <label className="text-[10px] uppercase tracking-widest font-black text-slate-500 ml-1 group-focus-within:text-rose-600 transition-colors font-anek">
                  Blood Group / রক্তের গ্রুপ
                </label>
                <div className="relative">
                    <Droplet className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-rose-500 transition-colors pointer-events-none" />
                    <select 
                      {...register('bloodType')} 
                      suppressHydrationWarning
                      className={`w-full pl-11 pr-4 py-3 bg-white border ${errors.bloodType ? 'border-rose-500' : 'border-slate-200'} rounded-xl focus:border-rose-500 focus:ring-4 focus:ring-rose-50/50 outline-none text-sm appearance-none cursor-pointer shadow-sm transition-all`}
                    >
                        <option value="">Select Group</option>
                        {bloodTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                </div>
                {errors.bloodType && <p className="text-[10px] text-rose-500 font-bold ml-1">{errors.bloodType.message}</p>}
            </div>
            <FormField 
              label="Age / বয়স (18-65)" 
              icon={<Calendar size={18} />} 
              type="number" 
              min="18"
              max="65"
              {...register('age')} 
              error={errors.age?.message} 
              touched={touchedFields.age}
              placeholder="25" 
            />
            <FormField 
              label="Last Donated / শেষ রক্তদান" 
              icon={<History size={18} />} 
              type="date" 
              {...register('lastDonated')} 
              max={new Date().toISOString().split("T")[0]} 
            />
          </div>
        </section>

        {/* Security */}
        <section className="space-y-6">
          <SectionHeader title="Security" subtitle="নিরাপত্তা" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField 
              label="Password / পাসওয়ার্ড" 
              icon={<Lock size={18} />} 
              type="password" 
              {...register('password')} 
              error={errors.password?.message} 
              touched={touchedFields.password}
              placeholder="••••••••" 
              autoComplete="new-password"
            />
            <FormField 
              label="Confirm Password / নিশ্চিত করুন" 
              icon={<Lock size={18} />} 
              type="password" 
              {...register('confirmPassword')} 
              error={errors.confirmPassword?.message} 
              touched={touchedFields.confirmPassword}
              placeholder="••••••••" 
              autoComplete="new-password"
            />
          </div>
        </section>

        {/* Policy & Submit */}
        <div className="flex flex-col items-center space-y-6 pt-8 border-t border-slate-200/60">
          <div className="w-full max-w-md">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                {...register('agreeToPolicy')}
                suppressHydrationWarning
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500 focus:ring-offset-2 transition-all cursor-pointer" 
              />
              <span className="text-xs text-slate-600 font-hind leading-relaxed">
                আমি স্বেচ্ছায় আমার তথ্য প্রদান করছি এবং <button type="button" suppressHydrationWarning className="text-rose-600 font-bold hover:underline">গোপনীয়তা নীতি</button> মেনে নিচ্ছি।
              </span>
            </label>
            {errors.agreeToPolicy && (
              <p className="text-[10px] text-rose-500 font-bold ml-7 mt-1">{errors.agreeToPolicy.message}</p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting} 
            suppressHydrationWarning
            className="w-full md:w-80 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-rose-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 md:text-xs text-[10px] tracking-[0.2em] uppercase shadow-xl hover:shadow-rose-100 active:scale-95"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                Complete Sign Up
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

// Section Header Component
function SectionHeader({ title, subtitle }: { title: string, subtitle: string }) {
    return (
        <div className="pb-3 border-b border-slate-200/60 relative">
            <div className="absolute bottom-[-1px] left-0 w-12 h-[2px] bg-rose-500" />
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-800 font-anek">{title}</h3>
            <p className="text-[10px] font-medium text-slate-400 font-hind">{subtitle}</p>
        </div>
    )
}

// Form Field Component with proper TypeScript types
interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ReactNode;
  error?: string;
  touched?: boolean;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, icon, error, touched, ...props }, ref) => (
    <div className="space-y-2 group">
        <label className="text-[10px] uppercase tracking-widest font-black text-slate-500 ml-1 group-focus-within:text-rose-600 transition-colors font-anek">
            {label}
        </label>
        <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors pointer-events-none">
                {icon}
            </div>
            <input 
                ref={ref}
                {...props}
                suppressHydrationWarning
                className={`w-full pl-11 pr-4 py-3 bg-white border ${error ? 'border-rose-500' : touched ? 'border-emerald-500' : 'border-slate-200'} rounded-xl focus:border-rose-500 focus:ring-4 focus:ring-rose-50/50 transition-all outline-none text-sm font-hind placeholder:text-slate-300 text-slate-700 shadow-sm`}
            />
        </div>
        {error && <p className="text-[10px] text-rose-500 font-bold ml-1">{error}</p>}
    </div>
  )
);
FormField.displayName = "FormField";
