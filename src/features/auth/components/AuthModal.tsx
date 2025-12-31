'use client';

import Portal from '@/components/common/Portal';
import { useAuth } from '@/contexts/AuthContext';
import { login } from '@/features/auth/services/auth-actions';
import { AnimatePresence, motion } from 'framer-motion';
import { BadgeCheck, Lock, Mail, User, X } from 'lucide-react';
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
      className="w-full text-white bg-rose-600 hover:bg-rose-700 font-bold rounded-lg text-sm px-5 py-2.5 md:py-3 text-center transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:ring-4 focus:outline-none focus:ring-rose-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
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
  const { refreshUser } = useAuth();
  const [view, setView] = useState<'login' | 'signup' | 'check-email'>(defaultView);

  useEffect(() => {
    if (isOpen && defaultView === 'signup') {
      onClose();
      router.push('/signup');
    }
  }, [isOpen, defaultView, onClose, router]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <div 
            className="fixed inset-0 z-[100] overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            />

            {/* Modal Container - Ensures centering without clipping top on long content */}
            <div className="flex min-h-screen items-center justify-center p-2 sm:p-4 relative pointer-events-none">
              {/* Modal Content - Split Layout */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98, y: 10 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.98, y: 10 }}
                className="relative w-[95vw] max-w-lg md:max-w-4xl bg-white rounded-2xl md:rounded-[2rem] shadow-2xl z-50 overflow-hidden flex flex-col md:flex-row h-auto max-h-[95vh] md:h-[580px] pointer-events-auto"
              >
        {/* Close Button (Absolute) */}
        <button 
             onClick={onClose}
             className="absolute top-3 right-3 md:top-4 md:right-4 z-20 text-slate-400 bg-white/80 hover:bg-slate-100 hover:text-slate-900 rounded-full p-2 transition-colors backdrop-blur-sm shadow-sm"
        >
             <X size={18} className="md:w-5 md:h-5" />
             <span className="sr-only">Close modal</span>
        </button>

        {/* Left Side: Branding & Info (Hero Dark Theme Match) */}
        <div className="hidden md:flex w-full md:w-5/12 bg-slate-900 text-white p-6 md:p-10 flex-col justify-center relative overflow-hidden">
            
            {/* Background Atmosphere */}
            <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-rose-600/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[60px] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="relative z-10">
                <div className="relative h-10 w-40 mb-8">
                    <Image 
                        src="/blood-bank-logo.png" 
                        alt="DIC Blood Bank Logo" 
                        fill 
                        className="object-contain object-left" 
                    />
                </div>
                {/* Dual-Tone Title */}
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight font-poppins leading-[1.2] mb-6">
                    <span className="text-slate-100">Donate Blood,</span>{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-500 to-rose-400">
                        Save a Life.
                    </span>
                </h2>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xs font-light">
                    Join our community of heroes. Your donation can save up to three lives. Secure, fast, and impactful.
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-300">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <BadgeCheck size={14} className="text-rose-400" />
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
        <div className="w-full md:w-7/12 p-5 sm:p-8 md:p-10 bg-white flex flex-col overflow-y-auto custom-scrollbar md:justify-center">
            {/* Mobile Logo Only */}
            <div className="md:hidden flex flex-col items-center mb-6 pt-2">
                <div className="relative h-8 w-32 mb-3">
                     <Image src="/blood-bank-logo.png" alt="Logo" fill className="object-contain" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                    Welcome Back
                </h3>
            </div>

           <div className="max-w-sm mx-auto w-full">
               <div className="mb-6 md:mb-8 text-center md:text-left hidden md:block">
                     <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-1.5 font-poppins">
                        {view === 'login' && 'Welcome Back'}
                        {view === 'signup' && 'Create Account'}
                        {view === 'check-email' && 'Verify Email'}
                    </h3>
                    <p className="text-slate-500 text-[13px] md:text-sm">
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
                          if (res?.error) {
                            toast.error(res.error);
                          } else if (res?.success) {
                            toast.success('Logged in successfully!');
                            await refreshUser();
                            onClose();
                            router.refresh();
                          }
                       }} className="space-y-4 md:space-y-5">
                          
                          <div>
                              <label className="block mb-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                              <div className="relative group">
                                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors">
                                    <Mail size={18} />
                                  </div>
                                  <input 
                                    type="email" 
                                    name="email" 
                                    required 
                                    className="bg-slate-50/50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-400 block w-full pl-12 py-3 outline-none transition-all placeholder:text-slate-300"
                                    placeholder="name@example.com" 
                                  />
                              </div>
                          </div>

                          <div>
                              <label className="block mb-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Password</label>
                              <div className="relative group">
                                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors">
                                    <Lock size={18} />
                                  </div>
                                  <input 
                                    type="password" 
                                    name="password" 
                                    required 
                                    className="bg-slate-50/50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-400 block w-full pl-12 py-3 outline-none transition-all placeholder:text-slate-300"
                                    placeholder="••••••••" 
                                  />
                              </div>
                          </div>

                          <div className="flex items-center justify-end">
                            <a href="#" className="text-xs font-bold text-rose-600 hover:text-rose-700">Forgot Password?</a>
                          </div>

                          <div className="pt-2">
                            <SubmitButton label="Sign In" pendingLabel="Signing in..." />
                          </div>
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
                        <p className="text-slate-500 mb-8 max-w-xs mx-auto text-sm">
                            Click the link we sent to your email to verify your account and sign in.
                        </p>
                        <button 
                            onClick={() => setView('login')}
                            className="text-rose-600 font-bold hover:text-rose-700 underline text-sm"
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
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
