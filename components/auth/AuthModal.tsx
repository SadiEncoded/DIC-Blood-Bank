'use client';

import { login } from '@/lib/actions/auth';
import { AnimatePresence, motion } from 'framer-motion';
import { Lock, Mail, ShieldCheck, User, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

/**
 * Shared Submit Button
 */
function SubmitButton({ label, pendingLabel }: { label: string, pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full text-white bg-rose-600 hover:bg-rose-700 font-bold rounded-lg text-sm px-5 py-3 text-center transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:ring-4 focus:outline-none focus:ring-rose-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
    >
      {pending ? pendingLabel : label}
    </button>
  );
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: 'login' | 'signup';
}

export function AuthModal({ isOpen, onClose, defaultView = 'login' }: AuthModalProps) {
  const router = useRouter();
  const [view, setView] = useState<'login' | 'check-email'>(defaultView === 'signup' ? 'login' : defaultView);

  useEffect(() => {
    if (isOpen && defaultView === 'signup') {
      onClose();
      router.push('/signup');
    }
  }, [isOpen, defaultView, onClose, router]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
    >
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Content - Split Layout */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 10 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col md:flex-row h-auto md:h-[600px]"
      >
        {/* Close Button (Absolute) */}
        <button 
             onClick={onClose}
             className="absolute top-4 right-4 z-10 text-slate-400 bg-white/80 hover:bg-slate-100 hover:text-slate-900 rounded-full p-2 transition-colors backdrop-blur-sm shadow-sm"
        >
             <X size={20} />
             <span className="sr-only">Close modal</span>
        </button>

        {/* Left Side: Branding & Info (Hero Dark Theme Match) */}
        <div className="w-full md:w-5/12 bg-slate-900 text-white p-8 md:p-10 flex flex-col justify-center relative overflow-hidden">
            
            {/* Background Atmosphere (Borrowed from Hero) */}
            <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-rose-600/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[60px] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="relative z-10">
                <div className="relative h-12 w-48 mb-8">
                    <Image 
                        src="/blood-bank-logo.png" 
                        alt="DIC Blood Bank Logo" 
                        fill 
                        className="object-contain object-left" 
                    />
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 font-poppins">
                    <span className="block text-slate-100">Donate Blood,</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-500 to-rose-400">
                        Save a Life.
                    </span>
                </h2>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xs font-light">
                    Join our community of heroes. Your donation can save up to three lives. Secure, fast, and impactful.
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <ShieldCheck size={14} className="text-rose-400" />
                        <span>Secure Data</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <User size={14} className="text-rose-400" />
                        <span>Verified Donors</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Side: Form (Main) */}
        <div className="w-full md:w-7/12 p-8 md:p-10 bg-white flex flex-col justify-center overflow-y-auto">
           <div className="max-w-sm mx-auto w-full">
               <div className="mb-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2 font-poppins">
                        {view === 'login' && 'Welcome Back'}
                        {view === 'signup' && 'Create Account'}
                        {view === 'check-email' && 'Verify Email'}
                    </h3>
                    <p className="text-slate-500 text-sm">
                        {view === 'login' && 'Please enter your email and password to sign in.'}
                        {view === 'signup' && 'Enter your details to register as a new donor.'}
                        {view === 'check-email' && 'We have sent a verification link to your email address.'}
                    </p>
               </div>

               <AnimatePresence mode="wait">
                 {view === 'login' && (
                    <motion.div 
                       key="login-form"
                       initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                       transition={{ duration: 0.2 }}
                    >
                       <form action={async (formData) => {
                          const res = await login(formData);
                          if (res?.error) toast.error(res.error);
                       }} className="space-y-5">
                          
                          <div>
                              <label className="block mb-1.5 text-xs font-bold text-slate-600 uppercase tracking-wider">Email Address</label>
                              <div className="relative">
                                  <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                  <input type="email" name="email" required className="bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full pl-10 p-3 outline-none" placeholder="name@company.com" />
                              </div>
                          </div>

                          <div>
                              <label className="block mb-1.5 text-xs font-bold text-slate-600 uppercase tracking-wider">Password</label>
                              <div className="relative">
                                  <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                  <input type="password" name="password" required className="bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full pl-10 p-3 outline-none" placeholder="••••••••" />
                              </div>
                          </div>

                          <div className="flex items-center justify-end">
                            <a href="#" className="text-sm font-bold text-rose-600 hover:text-rose-700">Forgot Password?</a>
                          </div>

                          <SubmitButton label="Sign In" pendingLabel="Signing in..." />
                       </form>
                    </motion.div>
                 )}


                 {view === 'check-email' && (
                    <motion.div 
                       key="check-email"
                       initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                       className="text-center py-8"
                    >
                        <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Mail className="w-10 h-10 text-rose-600" />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">Check your inbox</h4>
                        <p className="text-slate-500 mb-8 max-w-xs mx-auto">
                            Click the link we sent to your email to verify your account and sign in.
                        </p>
                        <button 
                            onClick={() => setView('login')}
                            className="text-rose-600 font-bold hover:text-rose-700 underline"
                        >
                            Back to Login
                        </button>
                    </motion.div>
                 )}
               </AnimatePresence>
               
                {/* Footer Section */}
                {view === 'login' && (
                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-sm text-slate-500">
                            Don&apos;t have an account?{' '}
                            <button 
                                type="button" 
                                onClick={() => {
                                    onClose();
                                    router.push('/signup');
                                }} 
                                className="text-rose-600 font-bold hover:text-rose-700 transition-colors"
                            >
                                Sign up free
                            </button>
                        </p>
                        <p className="mt-4 text-xs text-slate-400">
                            By continuing, you agree to our <a href="#" className="underline hover:text-slate-600">Terms of Service</a> and <a href="#" className="underline hover:text-slate-600">Privacy Policy</a>.
                        </p>
                    </div>
                )}
           </div>
        </div>
      </motion.div>
    </div>
  );
}
