import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  BadgeCheck,
  Beaker,
  Clock,
  FileSearch,
  Loader2,
  Lock,
  ShieldCheck
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

/**
 * Institutional Verification Component
 * Optimized with robust polling logic and a split-pane motion design.
 */

interface PendingApprovalProps {
  trackingId?: string;
  onReset: () => void;
  onComplete?: () => void;
}

const VERIFICATION_STEPS = [
  { id: 'auth', label: 'Patient Identity', description: 'Confirming clinical records and credentials', icon: FileSearch },
  { id: 'graph', label: 'Resource Locating', description: 'Searching regional donor centers for a match', icon: Beaker },
  { id: 'priority', label: 'Urgency Assessment', description: 'Prioritizing request based on medical necessity', icon: Activity },
  { id: 'bridge', label: 'Final Approval', description: 'Pending signature from the clinical supervisor', icon: BadgeCheck },
] as const;

export default function PendingApproval({ trackingId, onReset, onComplete }: PendingApprovalProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isWaitingForAdmin, setIsWaitingForAdmin] = useState(false);
  const isCompleted = useRef(false);

  // 1. Handle Step Progression
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= VERIFICATION_STEPS.length - 1) {
          clearInterval(stepInterval);
          setIsWaitingForAdmin(true);
          return prev;
        }
        return prev + 1;
      });
    }, 2200);

    return () => clearInterval(stepInterval);
  }, []);

  // 2. Poll for Admin Approval
  useEffect(() => {
    if (!isWaitingForAdmin || !trackingId || isCompleted.current) return;

    let pollInterval: NodeJS.Timeout;

    const performCheck = async () => {
      try {
        const { getBloodRequestByTrackingIdAction } = await import('@/features/blood-requests/actions');
        const res = await getBloodRequestByTrackingIdAction(trackingId);

        if (res.success && (res.data as any).status === 'APPROVED') {
          if (!isCompleted.current) {
            isCompleted.current = true;
            clearInterval(pollInterval);
            toast.success("Request Approved by Admin!");
            setTimeout(() => onComplete?.(), 1000);
          }
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    };

    pollInterval = setInterval(performCheck, 3000);
    return () => clearInterval(pollInterval);
  }, [isWaitingForAdmin, trackingId, onComplete]);

  const step = VERIFICATION_STEPS[currentStepIndex];
  if (!step) return null;

  const CurrentIcon = step.icon;

  return (
    <div className="min-h-[85vh] w-full flex items-center justify-center bg-[#F8F9FA] p-0 sm:p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white border border-slate-200 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.06)] md:rounded-2xl overflow-hidden"
      >
        <div className="flex flex-col md:grid md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-100 min-h-[500px]">
          
          {/* Left Pane: Visual Core Animation */}
          <div className="md:col-span-5 bg-[#FBFBFC] flex flex-col items-center justify-center p-8 md:p-12 relative overflow-hidden text-center">
            <BackgroundGlow />

            <div className="relative w-32 h-32 md:w-40 md:h-40 bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.03)] flex items-center justify-center z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStepIndex}
                  initial={{ scale: 0.8, opacity: 0, filter: 'blur(4px)' }}
                  animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ scale: 1.1, opacity: 0, filter: 'blur(4px)' }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                >
                  <CurrentIcon size={48} className="text-rose-500 md:size-14" strokeWidth={1.25} />
                </motion.div>
              </AnimatePresence>
              
              <ProgressRing index={currentStepIndex} total={VERIFICATION_STEPS.length} />
            </div>

            <div className="mt-8 md:mt-10 z-10 space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Current Protocol</div>
              <h2 className="text-lg md:text-xl font-medium text-slate-900 tracking-tight">{step.label}</h2>
              <StepDots current={currentStepIndex} total={VERIFICATION_STEPS.length} />
            </div>
          </div>

          {/* Right Pane: Process Ledger */}
          <div className="md:col-span-7 p-6 md:p-10 flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8 md:mb-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                  <Lock size={12} className="text-slate-300" />
                  Secure Clinical Pipeline
                </div>
                <h1 className="text-xl md:text-2xl font-semibold text-slate-900 tracking-tight">Reviewing Submission</h1>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Reference</div>
                <div className="font-mono text-[10px] md:text-xs text-slate-600 bg-slate-50 px-3 py-1 mt-1 rounded border border-slate-100 inline-block sm:block">
                  {trackingId || 'REQ-000-000'}
                </div>
              </div>
            </div>

            <div className="flex-grow space-y-4 md:space-y-6">
              {VERIFICATION_STEPS.map((s, idx) => (
                <div 
                  key={s.id} 
                  className={`flex gap-4 transition-all duration-700 ${idx > currentStepIndex ? 'opacity-30' : 'opacity-100'}`}
                >
                  <div className={`mt-1 h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0
                    ${idx < currentStepIndex ? 'bg-slate-900 border-slate-900' : idx === currentStepIndex ? 'border-rose-500' : 'border-slate-200'}`}>
                    {idx < currentStepIndex && <ShieldCheck size={12} className="text-white" />}
                    {idx === currentStepIndex && <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />}
                  </div>
                  <div>
                    <h3 className={`text-sm md:text-[15px] font-semibold tracking-tight ${idx === currentStepIndex ? 'text-rose-600' : 'text-slate-800'}`}>{s.label}</h3>
                    <p className="text-[12px] md:text-[13px] text-slate-400 font-medium leading-relaxed">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Waiting/Admin Message Section */}
            <AnimatePresence>
              {isWaitingForAdmin && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-slate-100"
                >
                  <AdminWaitMessage />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 md:mt-auto pt-6 md:pt-8 flex items-center justify-between text-[10px] font-bold text-slate-300 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Loader2 size={12} className="animate-spin" />
                Live Connection
              </div>
              <div className="hidden sm:block">State Persisted Globally</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// --- Specialized Sub-components ---

function BackgroundGlow() {
  return (
    <motion.div 
      animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-0 bg-rose-50 rounded-full blur-[80px] m-auto w-48 h-48 md:w-64 md:h-64"
    />
  );
}

function ProgressRing({ index, total }: { index: number; total: number }) {
  const dashArray = 477; // 2 * Math.PI * 76 (r=76)
  const offset = dashArray - (dashArray * (index + 1)) / total;
  const size = 160;
  const radius = 76;
  const center = size / 2;

  return (
    <svg className="absolute inset-0 w-full h-full -rotate-90 scale-[1.02]" viewBox="0 0 160 160">
      <circle cx={center} cy={center} r={radius} fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-100" />
      <motion.circle
        cx={center} cy={center} r={radius} fill="none" stroke="currentColor" strokeWidth="2"
        strokeDasharray={dashArray}
        animate={{ strokeDashoffset: offset }}
        className="text-rose-500"
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
    </svg>
  );
}

function AdminWaitMessage() {
  return (
    <div className="bg-rose-50/50 rounded-xl p-4 md:p-5 border border-rose-100/50 flex gap-4">
      <Clock size={18} className="text-rose-600 shrink-0 mt-0.5" />
      <div>
        <p className="text-xs md:text-sm font-semibold text-slate-900">Awaiting Clinical Authorization</p>
        <p className="text-[11px] md:text-[12px] text-slate-500 leading-relaxed mt-1 font-medium">
          Your request has been processed. A clinical supervisor is currently reviewing the submission for final authorization. You may safely leave this page.
        </p>
      </div>
    </div>
  );
}

function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-1.5 justify-center mt-4">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div 
          key={i}
          animate={{ 
            width: i === current ? 24 : 6,
            backgroundColor: i <= current ? '#F43F5E' : '#E2E8F0' 
          }}
          className="h-1 rounded-full transition-all duration-500"
        />
      ))}
    </div>
  );
}
