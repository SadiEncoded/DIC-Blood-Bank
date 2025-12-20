'use client';

import { submitBloodRequest } from '@/app/lib/actions/forms';
import { BLOOD_TYPES } from '@/app/lib/config';
import { FormField } from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, ClipboardList, Droplet, MapPin, Phone, User } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

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

export function BloodRequestForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<BloodRequestFormType>({
    resolver: zodResolver(bloodRequestSchema),
    defaultValues: { unitsNeeded: 1, urgency: 'normal' }
  });

  const onSubmit: SubmitHandler<BloodRequestFormType> = async (data) => {
    const result = await submitBloodRequest({
      ...data,
      units: data.unitsNeeded,
      neededBy: data.requiredBy,
      location: data.hospital, // We'll use hospital as location for simplicity or add a location field
    })
    
    if (result.success) {
      toast.success(result.message)
      reset()
    } else {
      toast.error(result.message)
    }
  };

  return (
    <motion.div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="bg-slate-50 border-b border-slate-200 px-8 py-8">
        <h2 className="text-2xl font-bold text-slate-900 font-poppins">
          অনুরোধ ফরম <span className="text-slate-400 font-normal text-lg">/ Request Form</span>
        </h2>
        <p className="text-xs text-slate-500 font-hind mt-1 uppercase tracking-wider">Official Medical Requisition</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-12 space-y-10">
        
        {/* Section 1: Patient & Medical Info */}
        <div className="space-y-6">
          <div className="text-[10px] font-bold text-rose-600 uppercase tracking-[0.2em] border-l-2 border-rose-600 pl-3">Medical Details</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
            <FormField label="Patient Name / রুগীর নাম" icon={<User size={16}/>} error={errors.patientName}>
              <input {...register('patientName')} placeholder="Full Name" className="form-input" />
            </FormField>

            <FormField label="Blood Group / রক্তের গ্রুপ" icon={<Droplet size={16}/>} error={errors.bloodType}>
              <select {...register('bloodType')} className="form-input font-bold appearance-none">
                <option value="">Select</option>
                {BLOOD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </FormField>

            <FormField label="Hospital / হাসপাতাল" icon={<MapPin size={16}/>} error={errors.hospital}>
              <input {...register('hospital')} placeholder="Name and Branch" className="form-input" />
            </FormField>

            <FormField label="Reason / কারণ (ঐচ্ছিক)" icon={<ClipboardList size={16}/>} error={errors.reason}>
              <input {...register('reason')} placeholder="e.g. Surgery, Delivery" className="form-input" />
            </FormField>
          </div>
        </div>

        {/* Section 2: Contact Info */}
        <div className="space-y-6">
          <div className="text-[10px] font-bold text-rose-600 uppercase tracking-[0.2em] border-l-2 border-rose-600 pl-3">Contact Person</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
            <FormField label="Requester Name / আপনার নাম" icon={<User size={16}/>} error={errors.contactName}>
              <input {...register('contactName')} placeholder="Contact Person" className="form-input" />
            </FormField>

            <FormField label="Phone / ফোন নম্বর" icon={<Phone size={16}/>} error={errors.contactPhone}>
              <input {...register('contactPhone')} placeholder="01XXXXXXXXX" className="form-input" />
            </FormField>
          </div>
        </div>

        {/* Section 3: Urgency & Timing */}
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6">
           <FormField label="Urgency / জরুরিতা" error={errors.urgency}>
              <select {...register('urgency')} className="form-input bg-white">
                <option value="normal">Normal</option>
                <option value="urgent">Urgent</option>
                <option value="critical">Critical</option>
              </select>
           </FormField>
           <FormField label="Required Date" icon={<Calendar size={16}/>} error={errors.requiredBy}>
              <input type="date" {...register('requiredBy')} className="form-input bg-white" />
           </FormField>
           <FormField label="Units (Bags)" error={errors.unitsNeeded}>
              <input type="number" {...register('unitsNeeded', { valueAsNumber: true })} className="form-input bg-white" />
           </FormField>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full py-5 bg-slate-900 text-white font-bold rounded-xl hover:bg-rose-600 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-sm shadow-lg shadow-slate-200"
        >
          {isSubmitting ? "Verifying..." : "Submit Requisition"}
          <ArrowRight size={18} />
        </button>
      </form>
    </motion.div>
  );
}
