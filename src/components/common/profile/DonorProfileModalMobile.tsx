'use client';

import Portal from '@/components/common/Portal';
import { getDonorStatsAction } from '@/features/donors/actions';
import confetti from 'canvas-confetti';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Award, Download, Droplet, Flame,
    HeartPulse,
    Loader2,
    Share2, ShieldCheck, X
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

// Added missing interfaces for type safety
interface DonorProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: any; // Ideally use your Supabase/Auth user type
    profile: any; // Ideally use your Profile type
}

interface Stats {
    totalDonations: number;
    lastDonationDate?: string;
}

export default function DonorProfileMobile({ isOpen, onClose, user, profile }: DonorProfileModalProps) {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            const fetchStats = async () => {
                try {
                    setLoading(true);
                    const result = await getDonorStatsAction();
                    if (result.success && result.data) {
                        const donorData = result.data as Stats;
                        setStats(donorData);
                        // Trigger celebration for milestones
                        if ([1, 5, 10, 20].includes(donorData.totalDonations)) triggerCelebration();
                    } else {
                        toast.error('Failed to load stats');
                    }
                } catch (err) {
                    toast.error('An unexpected error occurred');
                } finally {
                    setLoading(false);
                }
            };
            fetchStats();
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const triggerCelebration = () => {
        confetti({ 
            particleCount: 150, 
            spread: 70, 
            origin: { y: 0.7 }, 
            colors: ['#e11d48', '#fbbf24', '#ffffff'],
            zIndex: 999 
        });
    };

    const name = profile?.full_name || user?.user_metadata?.full_name || 'Donor';
    const totalDonations = stats?.totalDonations || 0;
    const bloodVolumeML = totalDonations * 450;
    
    // Dynamic calculation for the blood vessel fill (maxed at 5000ml for UI)
    const fillPercentage = Math.min((bloodVolumeML / 5000) * 100, 100);

    return (
        <Portal>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-end justify-center px-0 overflow-hidden">
                        {/* Backdrop with fade-in */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />

                    {/* Bottom Sheet with spring animation */}
                    <motion.section
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 220 }}
                        className="relative w-full bg-white rounded-t-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] pb-safe"
                    >
                        {/* Interactive Drag Handle */}
                        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-4 mb-2 shrink-0" />

                        {/* Header Area */}
                        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-50 shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-rose-600 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-rose-100">
                                    {name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-slate-900 leading-tight truncate max-w-[180px]">{name}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-rose-500 uppercase">{profile?.blood_type || 'O+'} Group</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tight flex items-center gap-1">
                                            <ShieldCheck size={10} /> Verified
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 bg-slate-100 rounded-full text-slate-500 active:bg-slate-200">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-36 custom-scrollbar">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-24 text-slate-400">
                                    <Loader2 className="animate-spin text-rose-500 mb-4" size={40} />
                                    <p className="text-xs font-black uppercase tracking-widest animate-pulse">Retrieving Stats</p>
                                </div>
                            ) : (
                                <>
                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-5 rounded-[2rem] bg-slate-900 text-white flex flex-col gap-1 shadow-xl shadow-slate-200">
                                            <Flame size={18} className="text-orange-400 mb-1" />
                                            <p className="text-2xl font-black">{totalDonations * 90}d</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Health Streak</p>
                                        </div>
                                        <div className="p-5 rounded-[2rem] bg-rose-50 border border-rose-100 flex flex-col gap-1">
                                            <HeartPulse size={18} className="text-rose-500 mb-1" />
                                            <p className="text-2xl font-black text-rose-600">{totalDonations * 3}</p>
                                            <p className="text-[10px] font-bold text-rose-400 uppercase">Lives Impacted</p>
                                        </div>
                                    </div>

                                    {/* Donation Visualization Card */}
                                    <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100">
                                        <div className="flex items-center gap-6">
                                            <div className="relative w-16 h-28 bg-white rounded-b-3xl rounded-t-lg border-[5px] border-white shadow-lg overflow-hidden shrink-0 ring-1 ring-slate-200">
                                                <motion.div 
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${fillPercentage}%` }}
                                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                                    className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-rose-700 via-rose-500 to-rose-400"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-full h-[1px] bg-slate-100/20 absolute top-1/4" />
                                                    <div className="w-full h-[1px] bg-slate-100/20 absolute top-1/2" />
                                                    <div className="w-full h-[1px] bg-slate-100/20 absolute top-3/4" />
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Lifetime Volume</h4>
                                                <p className="text-3xl font-black text-slate-900 my-1">{bloodVolumeML}<span className="text-sm font-bold text-slate-400 ml-1">ml</span></p>
                                                <div className="flex items-center gap-1.5 text-slate-500">
                                                    <Droplet size={12} className="text-blue-500" />
                                                    <p className="text-[11px] font-medium leading-tight">
                                                        Equivalent to ~{Math.floor(bloodVolumeML/500)} units of blood.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Milestones Section */}
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Achievements</h4>
                                            <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">
                                                {totalDonations} Total
                                            </span>
                                        </div>
                                        <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-2 px-2 pb-2">
                                            {[
                                                { label: 'Hero', min: 1, color: 'text-rose-600', bg: 'bg-rose-50' },
                                                { label: 'Elite', min: 5, color: 'text-amber-600', bg: 'bg-amber-50' },
                                                { label: 'Legend', min: 10, color: 'text-indigo-600', bg: 'bg-indigo-50' }
                                            ].map((milestone) => {
                                                const isUnlocked = totalDonations >= milestone.min;
                                                return (
                                                    <div 
                                                        key={milestone.label} 
                                                        className={`flex-shrink-0 w-28 p-5 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-2 ${
                                                            isUnlocked 
                                                            ? `${milestone.bg} border-transparent shadow-sm` 
                                                            : 'bg-white border-slate-100 opacity-40 grayscale'
                                                        }`}
                                                    >
                                                        <div className={`p-2 rounded-full ${isUnlocked ? 'bg-white' : 'bg-slate-50'}`}>
                                                            <Award size={24} className={isUnlocked ? milestone.color : 'text-slate-300'} />
                                                        </div>
                                                        <span className={`text-[10px] font-black uppercase ${isUnlocked ? milestone.color : 'text-slate-400'}`}>
                                                            {milestone.label}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Sticky Action Bar */}
                        <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-white via-white/95 to-transparent pt-12 shrink-0">
                            <div className="flex gap-3 max-w-md mx-auto">
                                <button 
                                    onClick={() => toast.info('Sharing feature coming soon!')}
                                    className="flex-[2] h-14 bg-slate-900 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg shadow-slate-200"
                                >
                                    <Share2 size={18} /> Share Profile
                                </button>
                                <button 
                                    onClick={() => toast.info('Generating PDF...')}
                                    className="flex-1 h-14 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center active:scale-95 transition-transform border border-slate-200"
                                >
                                    <Download size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.section>
                    </div>
                )}
            </AnimatePresence>
        </Portal>
    );
}
