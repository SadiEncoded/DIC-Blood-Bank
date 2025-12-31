'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, ShieldAlert, X } from 'lucide-react';

interface SafetyWarningProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function SafetyWarning({ isOpen, onClose, onConfirm }: SafetyWarningProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden border border-slate-100"
          >
            {/* Header */}
            <div className="relative h-32 bg-rose-600 flex items-center justify-center">
               <div className="absolute top-4 right-4 text-white/50 hover:text-white cursor-pointer transition-colors" onClick={onClose}>
                 <X size={24} />
               </div>
               <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20">
                 <ShieldAlert size={32} className="text-white" />
               </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-black text-slate-800 mb-2">Safety Protocols</h3>
                <p className="text-slate-500 font-medium">Please read these rules carefully before contacting.</p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex-shrink-0 flex items-center justify-center text-orange-600">
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-orange-900 mb-1">No Payments Required</h4>
                    <p className="text-xs text-orange-700 leading-relaxed font-medium">
                      Never send money for <strong>transport, food, or medical fees</strong> via bKash, Nagad or Rocket before the donor arrives.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex-shrink-0 flex items-center justify-center text-blue-600">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-blue-900 mb-1">Verify Identity</h4>
                    <p className="text-xs text-blue-700 leading-relaxed font-medium">
                      Always check the donor's Facebook profile for mutual connections or history to ensure they are trustworthy.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={onConfirm}
                className="w-full h-14 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold uppercase tracking-wider text-sm mt-8 transition-all active:scale-[0.98] shadow-lg shadow-rose-100"
              >
                I Understand & Promise to Follow
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
