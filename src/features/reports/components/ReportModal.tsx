'use client';

import Portal from '@/components/common/Portal';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Flag, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { submitReport } from '../services/actions';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetId: string;
  targetName: string;
}

const REASONS = [
  'Fake Profile / Information',
  'Harassment / Abusive Behavior',
  'Spam / Unsolicited Contact',
  'Other',
];

export const ReportModal = ({ isOpen, onClose, targetId, targetName }: ReportModalProps) => {
  const [reason, setReason] = useState<string>('');
  const [details, setDetails] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!reason) {
      toast.error('Please select a reason');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitReport(targetId, reason, details);
      if (result.success) {
        toast.success('Report submitted securely. Thank you for helping keep our community safe.');
        onClose();
        setReason('');
        setDetails('');
      } else {
        toast.error(result.error || 'Failed to submit report');
      }
    } catch (error) {
      toast.error('An unexpected error occurred while submitting your report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110] overflow-y-auto outline-none focus:outline-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            {/* Centering Wrapper */}
            <div className="flex min-h-screen items-center justify-center p-4 relative pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden z-10 pointer-events-auto"
              >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
                      <Flag size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Report User</h3>
                      <p className="text-xs text-slate-500 font-medium">Reporting {targetName}</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Reason</label>
                    <select
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none transition-all appearance-none"
                    >
                      <option value="" disabled>Select a reason...</option>
                      {REASONS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Details (Optional)</label>
                    <textarea
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Please provide specific details..."
                      className="w-full h-32 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none resize-none transition-all"
                    />
                  </div>

                  <div className="bg-amber-50 rounded-xl p-4 flex gap-3 text-amber-800 border border-amber-100">
                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                    <p className="text-xs font-medium leading-relaxed">
                        Reports are confidential. We will review this profile and take appropriate action if it violates our guidelines.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="flex-1 h-11 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex-1 h-11 rounded-xl bg-red-600 text-white text-sm font-bold shadow-lg shadow-red-500/20 hover:bg-red-700 hover:shadow-red-500/30 transition-all active:scale-95 disabled:opacity-70"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Report'}
                    </button>
                </div>
              </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
};
