'use client';

import Portal from '@/components/common/Portal';
import { format, parseISO } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowRight,
    Check,
    Copy,
    FileText,
    Hash,
    Hospital,
    LucideIcon,
    Phone,
    User
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// --- Constants ---
const URGENCY_STYLES: Record<string, string> = {
  CRITICAL: 'bg-rose-500 text-white shadow-lg shadow-rose-200',
  URGENT: 'bg-amber-500 text-white shadow-lg shadow-amber-200',
  NORMAL: 'bg-blue-500 text-white shadow-lg shadow-blue-200',
};

// --- Sub-components ---
const StatItem = ({ label, value, color = 'text-slate-900' }: { label: string; value: string; color?: string }) => (
  <div className="flex-1 text-center py-2 relative">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-sm font-black uppercase tracking-tight ${color}`}>{value}</p>
  </div>
);

const InfoBlock = ({ icon: Icon, title, content, subContent, iconColor }: { icon: LucideIcon, title: string, content: string, subContent?: string, iconColor: string }) => (
  <div className="flex gap-4 items-start py-2">
    <div className={`mt-0.5 shrink-0 w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center ${iconColor}`}>
      <Icon size={16} className="text-current" />
    </div>
    <div className="min-w-0 flex-1">
      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{title}</h4>
      <p className="text-slate-900 text-sm font-bold leading-tight truncate">{content}</p>
      {subContent && (
        <p className="text-[11px] text-slate-500 font-bold truncate mt-0.5">{subContent}</p>
      )}
    </div>
  </div>
);

export default function RequestDetailsModal({ isOpen, onClose, request }: any) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!request) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(request.tracking_id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            {/* Modal Container */}
            <div className="flex min-h-screen items-end sm:items-center justify-center p-0 sm:p-4 relative pointer-events-none">
              <motion.div
                drag="y" // Enable vertical drag
                dragConstraints={{ top: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.y > 100) onClose(); // Close if pulled down significantly
                }}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-full max-w-[440px] bg-white rounded-t-[3rem] sm:rounded-[3rem] shadow-2xl z-10 overflow-hidden flex flex-col overscroll-none border border-white/50 pointer-events-auto"
              >
            {/* --- App-like Top Handle --- */}
            <div className="w-full flex justify-center pt-4 pb-2 shrink-0 cursor-grab active:cursor-grabbing">
              <div className="w-14 h-1.5 bg-slate-200 rounded-full" />
            </div>

            {/* 1. Header: Name and Blood Group */}
            <div className="px-8 pt-5 pb-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center border border-rose-100 shadow-sm shrink-0">
                     <span className="text-rose-600 font-black text-lg">{request.blood_type}</span>
                  </div>
                  <div className="min-w-0">
                      <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter truncate leading-none mb-1">
                        {request.patient_name}
                      </h2>
                      <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${URGENCY_STYLES[request.urgency] ?? URGENCY_STYLES.NORMAL}`}>
                            {request.urgency}
                          </span>
                      </div>
                  </div>
                </div>
              </div>

               {/* Tracking ID */}
               <div className="flex justify-center">
                    <button onClick={handleCopyId} className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-500 rounded-xl text-[10px] font-black uppercase active:scale-95 transition-transform w-full justify-center border border-slate-100">
                        <Hash size={12} strokeWidth={3} className="text-slate-300" /> 
                        Tracking ID: <span className="text-slate-900 tracking-widest">{request.tracking_id}</span>
                        {copied ? <Check size={14} className="text-emerald-500 ml-auto" /> : <Copy size={14} className="opacity-40 ml-auto" />}
                    </button>
               </div>
            </div>

            {/* 3. Stats Row: Units, Needed, Status */}
            <div className="px-6 pb-6">
              <div className="flex justify-between items-center bg-slate-50/80 rounded-[2rem] py-4 px-2 border border-slate-100">
                <StatItem label="Units Needed" value={`${request.units} Bags`} />
                <div className="w-[1px] h-8 bg-slate-200" />
                <StatItem label="Needed By" value={format(parseISO(request.needed_by), 'MMM dd')} />
                <div className="w-[1px] h-8 bg-slate-200" />
                <StatItem label="Verified" value="Live" color="text-emerald-600" />
              </div>
            </div>

            {/* 4. Info Sections */}
            <div className="px-8 py-2 space-y-5 pb-8">
              <InfoBlock icon={Hospital} title="Medical Facility" content={request.hospital} subContent={request.location} iconColor="text-rose-500" />
              <InfoBlock icon={User} title="Contact Person" content={request.contact_name} subContent="Requester" iconColor="text-blue-500" />

              {request.notes && (
                <div className="space-y-2 mt-4">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                    <FileText size={12} /> Medical Context
                  </h4>
                  <p className="text-slate-600 text-[13px] leading-relaxed italic font-medium bg-amber-50/50 p-4 rounded-2xl border border-amber-100/50">
                    "{request.notes}"
                  </p>
                </div>
              )}
            </div>

            {/* 5. Footer: Compact Action Buttons */}
            <div className="p-6 bg-white border-t border-slate-50 space-y-4 pb-10">
              <div className="flex gap-4">
                <motion.a 
                  whileTap={{ scale: 0.98 }}
                  href={`tel:${request.contact_phone}`}
                  className="flex-1 h-14 bg-slate-900 border-2 border-slate-900 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 text-white shadow-xl shadow-slate-200"
                >
                  <Phone size={16} fill="currentColor" className="text-white" />
                  Call Request
                </motion.a>
                
                <Link href={`/donate/${request.tracking_id}/confirm`} className="flex-1">
                  <motion.button 
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-14 bg-rose-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-rose-200 hover:shadow-rose-400/30 transition-shadow"
                  >
                    Confirm Help
                    <ArrowRight size={16} strokeWidth={3} />
                  </motion.button>
                </Link>
              </div>

              <button 
                onClick={onClose}
                className="w-full py-3 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] hover:text-slate-500 transition-colors"
              >
                Dismiss Modal
              </button>
            </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
