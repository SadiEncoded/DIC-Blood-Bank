'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { AlertCircle, Calendar, Droplet, MapPin, Phone, ShieldCheck, User } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const bloodRequestSchema = z.object({
  patientName: z.string().min(2, 'Patient name is required'),
  bloodType: z.enum(['', ...bloodTypes] as [string, ...string[]]).refine((val) => val !== '', {
      message: 'Please select a blood type',
    }),
  unitsNeeded: z.number().min(1).max(10),
  hospital: z.string().min(2, 'Hospital name is required'),
  location: z.string().min(2, 'Location is required'),
  contactName: z.string().min(2, 'Contact name is required'),
  contactPhone: z
    .string()
    .regex(/^(?:\+88)?01[3-9]\d{8}$/, 'Invalid Bangladeshi phone number'),
  urgency: z.enum(['normal', 'urgent', 'critical']),
  requiredBy: z.string().refine((val) => {
    const date = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  }, 'Date cannot be in the past'),
});

type BloodRequestForm = z.infer<typeof bloodRequestSchema>;

export default function RequestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<BloodRequestForm>({
    resolver: zodResolver(bloodRequestSchema),
    shouldFocusError: true,
    defaultValues: {
      unitsNeeded: 1,
      urgency: 'normal',
      requiredBy: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = async (data: BloodRequestForm) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success('Request submitted successfully!', {
      description: 'We will contact matching donors immediately.',
      duration: 5000,
    });
    setIsSubmitting(false);
    reset();
  };

  const onError = (errors: any) => {
      console.log("Form Errors:", errors);
  };

  const urgencyColor = () => {
    switch (watch('urgency')) {
      case 'urgent':
        return 'border-amber-400 focus:ring-amber-400 text-amber-700 bg-amber-50';
      case 'critical':
        return 'border-rose-500 focus:ring-rose-500 text-rose-700 bg-rose-50';
      default:
        return 'border-gray-300 focus:ring-rose-500 text-slate-700 bg-white';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-20 selection:bg-rose-500/30 selection:text-rose-900">
      
      {/* Header (Clean & Light) */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-rose-50 to-white pb-32 pt-24 md:pt-32 rounded-b-[3rem] shadow-xl z-10">
        {/* Decorative background elements for header */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-b-[3rem]">
           <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-rose-100/60 rounded-full blur-3xl opacity-50" />
           <div className="absolute top-20 -left-24 w-[400px] h-[400px] bg-blue-50/60 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-16">
          <div className="max-w-3xl text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-rose-100 shadow-sm mb-6"
            >
              <AlertCircle className="w-5 h-5 text-rose-600" />
              <span className="text-sm font-semibold tracking-wide text-rose-950">
                জরুরি রক্ত
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl leading-[1.15] tracking-tight font-anekBangla font-semibold text-slate-900"
            >
              রক্তের জন্য <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-rose-500">অনুরোধ করুন</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-6 text-lg md:text-xl leading-relaxed text-slate-600 font-hind max-w-2xl"
            >
              আপনার প্রয়োজনীয় রক্তের তথ্য প্রদান করুন। আমাদের টিম দ্রুত নিকটবর্তী
              রক্তদাতাদের সাথে যোগাযোগ করবে।
            </motion.p>
          </div>
        </div>
      </section>

      {/* Form Section (Light Card on Dark Background) */}
      <section className="relative max-w-4xl mx-auto px-6 -mt-20 z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl shadow-rose-900/10 border-4 border-rose-200 p-8 md:p-12 relative overflow-hidden"
        >
          <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-10 relative z-10">
            {/* Patient Info */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-6 font-anekBangla flex items-center gap-2 border-b border-gray-100 pb-2">
                <User className="w-5 h-5 text-slate-600" />
                Patient Information
              </h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Patient Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    {...register('patientName')}
                    placeholder="রোগীর নাম"
                    aria-invalid={!!errors.patientName}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-slate-900 placeholder:text-slate-400 transition font-hind"
                    disabled={isSubmitting}
                  />
                  {errors.patientName && (
                    <span className="text-sm font-medium text-rose-700 bg-rose-50 px-3 py-1 rounded-lg inline-block mt-2">
                        {errors.patientName.message}
                    </span>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Blood Type <span className="text-rose-600">*</span>
                    </label>
                    <select
                      {...register('bloodType')}
                      aria-invalid={!!errors.bloodType}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-slate-900 appearance-none font-hind font-bold"
                      disabled={isSubmitting}
                    >
                      <option value="" className="text-slate-400">Select Type</option>
                      {bloodTypes.map((type) => (
                        <option key={type} value={type} className="text-slate-900">{type}</option>
                      ))}
                    </select>
                    {errors.bloodType && (
                      <span className="text-sm font-medium text-rose-700 bg-rose-50 px-3 py-1 rounded-lg inline-block mt-2">
                          {errors.bloodType.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Units Needed <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="number"
                      {...register('unitsNeeded', { valueAsNumber: true })}
                      min={1}
                      max={10}
                      aria-invalid={!!errors.unitsNeeded}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-slate-900 font-hind"
                      disabled={isSubmitting}
                    />
                    {errors.unitsNeeded && (
                      <span className="text-sm font-medium text-rose-700 bg-rose-50 px-3 py-1 rounded-lg inline-block mt-2">
                          {errors.unitsNeeded.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-gray-100" />

            {/* Location */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-6 font-anekBangla flex items-center gap-2 border-b border-gray-100 pb-2">
                <MapPin className="w-5 h-5 text-slate-600" />
                Location Details
              </h3>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Hospital/Clinic <span className="text-rose-600">*</span>
                  </label>
                  <input
                    {...register('hospital')}
                    placeholder="হাসপাতালের নাম"
                    aria-invalid={!!errors.hospital}
                     className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-slate-900 placeholder:text-slate-400 transition font-hind"
                    disabled={isSubmitting}
                  />
                  {errors.hospital && (
                    <span className="text-sm font-medium text-rose-700 bg-rose-50 px-3 py-1 rounded-lg inline-block mt-2">
                        {errors.hospital.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Location <span className="text-rose-600">*</span>
                  </label>
                  <input
                    {...register('location')}
                    placeholder="শহর/এলাকা"
                    aria-invalid={!!errors.location}
                     className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-slate-900 placeholder:text-slate-400 transition font-hind"
                    disabled={isSubmitting}
                  />
                  {errors.location && (
                    <span className="text-sm font-medium text-rose-700 bg-rose-50 px-3 py-1 rounded-lg inline-block mt-2">
                        {errors.location.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-gray-100" />

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-6 font-anekBangla flex items-center gap-2 border-b border-gray-100 pb-2">
                <Phone className="w-5 h-5 text-slate-600" />
                Contact Information
              </h3>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Contact Person <span className="text-rose-600">*</span>
                  </label>
                  <input
                    {...register('contactName')}
                    placeholder="আপনার নাম"
                    aria-invalid={!!errors.contactName}
                     className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-slate-900 placeholder:text-slate-400 transition font-hind"
                    disabled={isSubmitting}
                  />
                  {errors.contactName && (
                    <span className="text-sm font-medium text-rose-700 bg-rose-50 px-3 py-1 rounded-lg inline-block mt-2">
                        {errors.contactName.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone Number <span className="text-rose-600">*</span>
                  </label>
                  <input
                    {...register('contactPhone')}
                    placeholder="+880 1XXX-XXXXXX"
                    aria-invalid={!!errors.contactPhone}
                     className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-slate-900 placeholder:text-slate-400 transition font-hind"
                    disabled={isSubmitting}
                  />
                  {errors.contactPhone && (
                    <span className="text-sm font-medium text-rose-700 bg-rose-50 px-3 py-1 rounded-lg inline-block mt-2">
                        {errors.contactPhone.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-gray-100" />

            {/* Request Details */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-6 font-anekBangla flex items-center gap-2 border-b border-gray-100 pb-2">
                <Droplet className="w-5 h-5 text-slate-600" />
                Request Details
              </h3>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Urgency Level <span className="text-rose-600">*</span>
                  </label>
                  <select
                    {...register('urgency')}
                    aria-invalid={!!errors.urgency}
                    className={`w-full px-5 py-4 rounded-xl outline-none border appearance-none font-hind transition-all ${urgencyColor()}`}
                    disabled={isSubmitting}
                  >
                    <option value="normal">Normal (72h)</option>
                    <option value="urgent">Urgent (24h)</option>
                    <option value="critical">Critical (Immediate)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Required By <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="date"
                      {...register('requiredBy')}
                      min={new Date().toISOString().split('T')[0]}
                      aria-invalid={!!errors.requiredBy}
                       className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-slate-900 placeholder:text-slate-400 transition font-hind"
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.requiredBy && (
                    <span className="text-sm font-medium text-rose-700 bg-rose-50 px-3 py-1 rounded-lg inline-block mt-2">
                        {errors.requiredBy.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="space-y-3">
                <p className="text-sm text-slate-500 text-center font-hind">
                  আপনার তথ্য নিরাপদ এবং শুধুমাত্র রক্তদানের জন্য ব্যবহৃত হবে
                </p>
                <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-rose-600 text-white font-semibold rounded-xl hover:bg-rose-700 disabled:bg-rose-300 disabled:cursor-not-allowed transition shadow-md"
                >
                <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? (
                        <>Processing...</>
                    ) : (
                        <>Submit Blood Request <ShieldCheck className="w-5 h-5" /></>
                    )}
                </span>
                </button>
            </div>
          </form>
        </motion.div>
      </section>

      {/* Emergency Section (Separated & Clean) */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
          <p className="text-slate-400 font-medium mb-2">
            <span className="font-bold text-rose-500">Emergency?</span> Call us directly:
          </p>
          <a href="tel:+8801234567890" className="text-3xl font-bold text-white hover:text-rose-500 transition-colors font-manrope tracking-tight">
            +880 1234-567890
          </a>
        </div>
      </section>
    </div>
  );
}
