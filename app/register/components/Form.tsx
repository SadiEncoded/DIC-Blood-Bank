'use client';
import { registerDonor } from '@/app/lib/actions/forms';
import { BLOOD_TYPES as bloodTypes } from '@/app/lib/config';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Droplet,
  MapPin,
  Phone,
  ShieldCheck,
  User
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    bloodType: '',
    location: '',
    age: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = await registerDonor(formData);
    
    if (result.success) {
      toast.success(result.message);
      setFormData({ name: '', phone: '', email: '', bloodType: '', location: '', age: '' });
    } else {
      toast.error(result.message);
    }
    
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm"
    >
      {/* Form Header: Clean, Simple, Institutional */}
      <div className="bg-slate-50 border-b border-slate-200 px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900 font-poppins tracking-tight">
              নিবন্ধন ফরম <span className="text-slate-400 font-normal text-lg">/ Registration</span>
            </h2>
            <p className="text-xs text-slate-500 font-hind tracking-wide uppercase">
              Donor Information Management System
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-50 border border-rose-100 rounded-lg">
            <ShieldCheck className="h-4 w-4 text-rose-600" />
            <span className="text-[10px] font-bold text-rose-700 uppercase tracking-tighter">Verified Provider</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1">
              Full Name / পূর্ণ নাম
            </label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-rose-500 transition-colors" />
              <input 
                type="text" name="name" value={formData.name} onChange={handleChange} required 
                placeholder="Ex: Abdullah Al Mamun" 
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:border-rose-500 focus:ring-4 focus:ring-rose-50/50 transition-all outline-none text-sm font-hind" 
              />
            </div>
          </div>

          {/* Blood Group */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1">
              Blood Group / রক্তের গ্রুপ
            </label>
            <div className="relative group">
              <Droplet className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-rose-500 transition-colors" />
              <select 
                name="bloodType" value={formData.bloodType} onChange={handleChange} required 
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:border-rose-500 focus:ring-4 focus:ring-rose-50/50 transition-all outline-none text-sm font-bold appearance-none cursor-pointer"
              >
                <option value="">Select Group</option>
                {bloodTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1">
              Phone / ফোন নম্বর
            </label>
            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-rose-500 transition-colors" />
              <input 
                type="tel" name="phone" value={formData.phone} onChange={handleChange} required 
                placeholder="01XXX-XXXXXX" 
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:border-rose-500 focus:ring-4 focus:ring-rose-50/50 transition-all outline-none text-sm" 
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1">
              Location / বর্তমান ঠিকানা
            </label>
            <div className="relative group">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-rose-500 transition-colors" />
              <input 
                type="text" name="location" value={formData.location} onChange={handleChange} required
                placeholder="Ex: Mirpur, Dhaka" 
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:border-rose-500 focus:ring-4 focus:ring-rose-50/50 transition-all outline-none text-sm font-hind" 
              />
            </div>
          </div>
        </div>

        {/* Policy Section */}
        <div className="mt-10 p-5 bg-slate-50 border border-slate-100 rounded-2xl flex items-start gap-4">
          <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500" />
          <p className="text-[13px] text-slate-500 font-hind leading-relaxed">
            আমি স্বেচ্ছায় আমার তথ্য প্রদান করছি এবং ডিআইসি ব্লাড ব্যাংকের 
            <button type="button" className="text-rose-600 font-bold hover:underline mx-1">গোপনীয়তা নীতি</button> 
            সম্পর্কে অবগত আছি।
          </p>
        </div>

        {/* Submit Section */}
        <div className="mt-10 flex flex-col md:flex-row items-center gap-6">
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full md:w-auto px-10 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-rose-600 transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-sm tracking-widest uppercase"
          >
            {isSubmitting ? "Processing..." : "Submit Registration"}
            <ArrowRight size={16} />
          </button>
        </div>
      </form>

      {/* Institutional Footer */}
      <div className="px-8 py-4 bg-slate-50 border-t border-slate-200 flex justify-center gap-8">
        <div className="flex items-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all">
          <CheckCircle2 size={12} className="text-emerald-600" />
          <span className="text-[9px] font-bold text-slate-900 uppercase tracking-widest">SSL Encrypted</span>
        </div>
        <div className="flex items-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all">
          <CheckCircle2 size={12} className="text-emerald-600" />
          <span className="text-[9px] font-bold text-slate-900 uppercase tracking-widest">ISO 27001 Compliance</span>
        </div>
      </div>
    </motion.div>
  );
}
