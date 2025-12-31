'use client';

import Portal from '@/components/common/Portal';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Info, Loader2, Send, X } from 'lucide-react';
import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'sonner';
import { submitStoryAction } from '../actions';

interface SubmitStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialState = {
  success: false,
  message: '',
  errors: {} as Record<string, string[]>,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button 
      disabled={pending}
      type="submit"
      className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-rose-600 transition-all shadow-xl shadow-slate-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>Submitting <Loader2 size={14} className="animate-spin" /></>
      ) : (
        <>Submit for Review <Send size={14} /></>
      )}
    </button>
  );
}

export function SubmitStoryModal({ isOpen, onClose }: SubmitStoryModalProps) {
  const [state, formAction] = useFormState(submitStoryAction, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success("Submission Received", { description: state.message });
        onClose();
      } else {
        toast.error("Submission Failed", { description: state.message });
      }
    }
  }, [state, onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 relative pointer-events-none">
              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg md:max-w-xl bg-white rounded-2xl md:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] pointer-events-auto"
              >
            {/* Header */}
            <div className="px-5 py-6 md:px-8 md:pt-8 md:pb-6 border-b border-slate-50 flex items-start justify-between shrink-0">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-rose-500 mb-2">
                  <Heart size={12} fill="currentColor" /> Share your journey
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-anek tracking-tight">
                  Submit Narrative <br />
                  <span className="text-slate-300 font-medium text-lg md:text-2xl">আপনার গল্পটি লিখুন</span>
                </h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-slate-900"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form - Scrollable Area */}
            <div className="overflow-y-auto custom-scrollbar">
              <form action={formAction} className="p-5 md:p-8 space-y-6">
                <div className="space-y-4">
                  {/* Title Input */}
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                      Story Title / শিরোনাম
                    </label>
                    <input 
                      name="title"
                      type="text" 
                      placeholder="E.g., A Gift of Life"
                      className="w-full px-4 py-3 rounded-xl border border-slate-100 focus:border-rose-200 focus:ring-4 focus:ring-rose-50 outline-none transition-all font-hind placeholder:text-slate-300 text-sm md:text-base"
                      required
                    />
                    {state.errors?.title && (
                      <p className="text-rose-500 text-xs mt-1">{state.errors.title[0]}</p>
                    )}
                  </div>

                  {/* Content Input */}
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                      Your Experience / আপনার অভিজ্ঞতা
                    </label>
                    <textarea 
                      name="content"
                      rows={5}
                      placeholder="Tell us your story..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-100 focus:border-rose-200 focus:ring-4 focus:ring-rose-50 outline-none transition-all font-hind placeholder:text-slate-300 resize-none text-sm md:text-base"
                      required
                    />
                    {state.errors?.content && (
                      <p className="text-rose-500 text-xs mt-1">{state.errors.content[0]}</p>
                    )}
                  </div>
                </div>

                {/* Info Note */}
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <Info size={18} className="text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-slate-500 leading-relaxed font-hind">
                    Submitted stories are reviewed by our editorial team before being archived in the Public Testimony.
                  </p>
                </div>

                {/* Action Button */}
                <SubmitButton />
              </form>
            </div>
                </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
