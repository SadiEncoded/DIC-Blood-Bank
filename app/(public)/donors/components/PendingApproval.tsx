'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface PendingApprovalProps {
  onReset: () => void;
}

export function PendingApproval({ onReset }: PendingApprovalProps) {
  return (
    <motion.div 
      key="success-view"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-12 text-center space-y-8"
    >
      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
        <CheckCircle size={40} />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2 font-poppins">অনুরোধ সফলভাবে জমা হয়েছে!</h3>
        <p className="text-slate-500 font-hind">আপনার অনুরোধটি বর্তমানে আমাদের ভেরিফিকেশন প্যানেলে রয়েছে।</p>
      </div>

      <div className="pt-4 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-rose-500 bg-rose-50 px-4 py-2 rounded-full">
           <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wide">Verification in Progress...</span>
        </div>
      </div>
    </motion.div>
  );
}
