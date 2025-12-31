'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
    CheckCircle,
    CheckCircle2,
    FileText,
    X,
    XCircle
} from 'lucide-react';
import { useState } from 'react';

interface VerificationTableProps {
    data: any[];
    onSuccess: () => void;
    processingIds: Set<string>;
    handleUpdateStatus: (id: string, status: string) => Promise<void>;
}

export const VerificationTable = ({ 
    data, 
    onSuccess,
    processingIds,
    handleUpdateStatus
}: VerificationTableProps) => {
    const [selectedProof, setSelectedProof] = useState<any>(null);

    if (data.length === 0) {
        return (
            <div className="p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mx-auto mb-4 text-zinc-300">
                    <CheckCircle2 size={32} />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">All Clear!</h3>
                <p className="text-zinc-500 max-w-[240px] mx-auto mt-1 text-sm">No pending donation verifications at the moment.</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-200 dark:border-zinc-800">
                            <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Donor</th>
                            <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Blood Type</th>
                            <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Donation Date</th>
                            <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Proof</th>
                            <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                    <AnimatePresence mode="popLayout">
                        {data.map((item: any) => (
                            <motion.tr 
                                key={item.id} 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors group"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-900/10 flex items-center justify-center text-rose-600 font-bold text-xs uppercase">
                                            {(item.profiles?.full_name || 'U')[0]}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-zinc-900 dark:text-zinc-100 text-sm leading-tight">{item.profiles?.full_name}</span>
                                            <span className="text-zinc-400 text-[11px]">{item.profiles?.location}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-zinc-500 text-sm font-bold">{item.profiles?.blood_type}</td>
                                <td className="px-6 py-4 text-zinc-500 text-sm whitespace-nowrap">
                                    {new Date(item.donation_date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <button 
                                        onClick={() => setSelectedProof(item)}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-lg text-xs font-bold hover:bg-zinc-200 transition-colors group/btn"
                                    >
                                        <FileText size={14} className="group-hover/btn:text-rose-500 transition-colors" />
                                        View Proof
                                    </button>
                                </td>
                                <td className="px-6 py-4 text-right whitespace-nowrap">
                                    <div className="flex items-center justify-end gap-2">
                                        <button 
                                            onClick={() => handleUpdateStatus(item.id, 'APPROVED')}
                                            disabled={processingIds.has(item.id)}
                                            className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 active:scale-95 transition-all disabled:opacity-50"
                                        >
                                            Approve
                                        </button>
                                        <button 
                                            onClick={() => handleUpdateStatus(item.id, 'REJECTED')}
                                            disabled={processingIds.has(item.id)}
                                            className="px-3 py-1.5 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30 rounded-lg text-xs font-bold hover:bg-rose-100 transition-all disabled:opacity-50"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                    </tbody>
                </table>
            </div>

            {/* Mobile Card Layout */}
            <div className="md:hidden divide-y divide-zinc-100 dark:divide-zinc-800/50">
                <AnimatePresence mode="popLayout">
                    {data.map((item: any) => (
                        <motion.div 
                            key={item.id} 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="p-4 space-y-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/20 transition-colors"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-900/10 flex items-center justify-center text-rose-600 font-bold text-xs uppercase shrink-0">
                                        {(item.profiles?.full_name || 'U')[0]}
                                    </div>
                                    <div className="space-y-0.5">
                                        <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-[13px]">{item.profiles?.full_name}</h4>
                                        <div className="flex gap-2">
                                            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-500/10 px-1.5 py-0.5 rounded">{item.profiles?.blood_type}</span>
                                            <span className="text-[10px] text-zinc-400 font-medium">{new Date(item.donation_date).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setSelectedProof(item)}
                                    className="p-2 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                >
                                    <FileText size={18} />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <button 
                                    onClick={() => handleUpdateStatus(item.id, 'APPROVED')}
                                    disabled={processingIds.has(item.id)}
                                    className="flex items-center justify-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded-lg text-[10px] font-black uppercase tracking-wider active:scale-95 transition-all disabled:opacity-50"
                                >
                                    Approve Proof
                                </button>
                                <button 
                                    onClick={() => handleUpdateStatus(item.id, 'REJECTED')}
                                    disabled={processingIds.has(item.id)}
                                    className="flex items-center justify-center gap-2 px-3 py-2 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30 rounded-lg text-[10px] font-black uppercase tracking-wider active:scale-95 transition-all disabled:opacity-50"
                                >
                                    Reject
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* selectedProof Modal Refinement for Mobile */}
            <AnimatePresence>
                {selectedProof && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 md:p-4 bg-zinc-950/60 backdrop-blur-sm">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white dark:bg-zinc-900 rounded-xl md:rounded-3xl shadow-2xl w-full max-w-5xl max-h-[95vh] md:max-h-[90vh] overflow-hidden flex flex-col"
                        >
                            <div className="px-4 py-3 md:px-8 md:py-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                                <div>
                                    <h3 className="text-base md:text-xl font-black text-zinc-900 dark:text-white leading-tight">Verification Intel</h3>
                                    <p className="text-[10px] md:text-xs text-zinc-400 font-bold uppercase tracking-widest mt-0.5">Donation Proof Evidence</p>
                                </div>
                                <button onClick={() => setSelectedProof(null)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors">
                                    <X size={20} className="text-zinc-400" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <div className="p-4 md:p-8 bg-zinc-50 dark:bg-zinc-950/40">
                                        <div className="aspect-[3/4] md:aspect-auto md:h-full relative group rounded-xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                                            {selectedProof.proof_url ? (
                                                <img 
                                                    src={selectedProof.proof_url} 
                                                    alt="Donation Proof" 
                                                    className="absolute inset-0 w-full h-full object-contain p-2"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-300">
                                                    <FileText size={48} className="mb-4 opacity-50" />
                                                    <p className="font-bold text-sm">No Document Scan Available</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] md:text-xs font-black uppercase text-zinc-400 tracking-widest">Donor Profile</h4>
                                            <div className="flex items-center gap-4 p-3 md:p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl md:rounded-2xl">
                                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-rose-600 flex items-center justify-center text-white text-base md:text-xl font-black">
                                                    {selectedProof.profiles?.full_name?.[0]}
                                                </div>
                                                <div>
                                                    <p className="text-sm md:text-base font-bold text-zinc-900 dark:text-white">{selectedProof.profiles?.full_name}</p>
                                                    <p className="text-[10px] md:text-xs text-zinc-500 font-medium">{selectedProof.profiles?.location}</p>
                                                </div>
                                                <div className="ml-auto flex flex-col items-end">
                                                    <span className="text-[10px] md:text-xs text-zinc-400 font-bold uppercase">Blood</span>
                                                    <span className="text-base md:text-lg font-black text-rose-600 leading-tight">{selectedProof.profiles?.blood_type}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="text-[10px] md:text-xs font-black uppercase text-zinc-400 tracking-widest">Donation Intel</h4>
                                            <div className="grid grid-cols-2 gap-3 md:gap-4">
                                                <div className="p-3 md:p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl md:rounded-2xl">
                                                    <p className="text-[9px] md:text-[10px] text-zinc-400 font-bold uppercase">Date</p>
                                                    <p className="text-sm md:text-base font-bold text-zinc-900 dark:text-white mt-1">{new Date(selectedProof.donation_date).toLocaleDateString()}</p>
                                                </div>
                                                <div className="p-3 md:p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl md:rounded-2xl">
                                                    <p className="text-[9px] md:text-[10px] text-zinc-400 font-bold uppercase">Hospital</p>
                                                    <p className="text-sm md:text-base font-bold text-zinc-900 dark:text-white mt-1 truncate">{selectedProof.hospital_name || 'N/A'}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-2 md:pt-4 flex flex-col gap-2 md:gap-3">
                                            <button 
                                                onClick={() => { handleUpdateStatus(selectedProof.id, 'APPROVED'); setSelectedProof(null); }}
                                                className="w-full flex items-center justify-center gap-2 px-6 py-3 md:py-4 bg-emerald-600 text-white rounded-xl md:rounded-2xl text-xs md:text-sm font-black uppercase tracking-wider hover:bg-emerald-700 active:scale-95 transition-all shadow-lg shadow-emerald-200 dark:shadow-none"
                                            >
                                                <CheckCircle size={18} /> Confirm & Verify Donor
                                            </button>
                                            <button 
                                                onClick={() => { handleUpdateStatus(selectedProof.id, 'REJECTED'); setSelectedProof(null); }}
                                                className="w-full flex items-center justify-center gap-2 px-6 py-3 md:py-4 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-2 border-rose-100 dark:border-rose-900/30 rounded-xl md:rounded-2xl text-xs md:text-sm font-black uppercase tracking-wider hover:bg-rose-100 active:scale-95 transition-all"
                                            >
                                                <XCircle size={18} /> Reject Evidence
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
