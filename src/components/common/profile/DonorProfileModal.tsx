'use client';

import Portal from '@/components/common/Portal';
import { getDonorStatsAction } from '@/features/donors/actions';
import confetti from 'canvas-confetti';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Award, Droplet, Flame, Heart, HeartPulse,
    Loader2,
    Share2, ShieldCheck, X
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

// --- Types ---
interface DonorProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: any;
    profile: any;
}

// --- Animation Variants ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function DonorProfileModal({ isOpen, onClose, user, profile }: DonorProfileModalProps) {
    const [stats, setStats] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    // Derived Data
    const name = profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
    const bloodGroup = profile?.blood_type || 'Unknown';
    const totalDonations = stats?.totalDonations || 0;
    
    const derivedStats = useMemo(() => {
        const ml = totalDonations * 450;
        return {
            ml,
            bottles: Math.floor(ml / 500),
            livesSaved: totalDonations * 3,
            streak: totalDonations * 90,
            tier: totalDonations >= 10 ? { name: 'Platinum', color: 'bg-slate-900 text-slate-100 border-slate-800' }
                : totalDonations >= 5 ? { name: 'Gold', color: 'bg-amber-100 text-amber-700 border-amber-200' }
                : totalDonations >= 1 ? { name: 'Silver', color: 'bg-slate-100 text-slate-600 border-slate-200' }
                : { name: 'Bronze', color: 'bg-orange-50 text-orange-700 border-orange-100' }
        };
    }, [totalDonations]);

    useEffect(() => {
        if (!isOpen) {
            document.body.style.overflow = 'unset';
            return;
        }

        document.body.style.overflow = 'hidden';
        const fetchStats = async () => {
            setLoading(true);
            const result = await getDonorStatsAction();
            if (result.success && result.data) {
                setStats(result.data);
                if ([1, 5, 10].includes((result.data as any).totalDonations)) triggerCelebration();
            } else {
                toast.error('Failed to load donor statistics');
            }
            setLoading(false);
        };
        fetchStats();

        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const triggerCelebration = () => {
        const end = Date.now() + 3000;
        const colors = ['#e11d48', '#fbbf24', '#ffffff'];
        (function frame() {
            confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors });
            confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
            if (Date.now() < end) requestAnimationFrame(frame);
        }());
    };

    const handleShare = async () => {
        const shareData = {
            title: 'Blood Donor Hero',
            text: `I've helped save up to ${derivedStats.livesSaved} lives by donating blood!`,
            url: window.location.origin
        };
        try {
            if (navigator.share) await navigator.share(shareData);
            else {
                await navigator.clipboard.writeText(window.location.href);
                toast.success('Profile link copied!');
            }
        } catch (e) { console.error(e); }
    };

    return (
        <Portal>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
                        />

                        <div className="flex min-h-screen items-end md:items-center justify-center pointer-events-none md:p-4">
                            <motion.section
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="relative w-full max-w-4xl bg-white rounded-t-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden pointer-events-auto max-h-[95vh] md:max-h-[85vh] flex flex-col"
                            >
                            {/* Mobile Header Snippet */}
                            <MobileHeader name={name} bloodGroup={bloodGroup} onClose={onClose} />

                            <div className="flex-1 overflow-y-auto md:overflow-hidden custom-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] h-full">
                                    <Sidebar name={name} bloodGroup={bloodGroup} stats={derivedStats} total={totalDonations} onShare={handleShare} />

                                    <main className="p-6 md:p-10 space-y-6 flex flex-col justify-center">
                                        {loading ? <LoadingState /> : (
                                            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <StatCard icon={<Flame size={12}/>} label="STREAK" value={`${derivedStats.streak} Days`} bg="bg-slate-900" textColor="text-white" />
                                                    <StatCard icon={<HeartPulse size={12}/>} label="IMPACT" value={`${derivedStats.livesSaved} Lives`} bg="bg-rose-50 border-rose-100" textColor="text-rose-600" isHeart />
                                                </div>

                                                <BloodVolumeCard volume={derivedStats.ml} bottles={derivedStats.bottles} />

                                                <Milestones total={totalDonations} />
                                            </motion.div>
                                        )}
                                    </main>
                                </div>
                            </div>
                            </motion.section>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </Portal>
    );
}

// --- Sub-components ---

function MobileHeader({ name, bloodGroup, onClose }: any) {
    return (
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 md:hidden sticky top-0 bg-white z-10">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white font-bold">{name.charAt(0)}</div>
                <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">{name}</h3>
                    <p className="text-[10px] font-black text-rose-500 uppercase">{bloodGroup} Group</p>
                </div>
            </div>
            <button onClick={onClose} className="p-2 bg-slate-100 rounded-full text-slate-500"><X size={18} /></button>
        </div>
    );
}

function Sidebar({ name, bloodGroup, stats, total, onShare }: any) {
    return (
        <aside className="hidden md:flex flex-col bg-slate-50/50 p-6 border-r border-slate-100 h-full">
            <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 rounded-[1.5rem] bg-rose-600 mb-4 flex items-center justify-center text-white text-2xl font-black shadow-lg rotate-3 ring-4 ring-white">
                    <span className="-rotate-3">{name.charAt(0)}</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">{name}</h3>
                <p className="text-xs font-bold text-rose-500 mb-3">{bloodGroup} Donor</p>
                <div className={`px-4 py-1 rounded-full text-[9px] font-black uppercase border ${stats.tier.color}`}>
                    {stats.tier.name} Tier
                </div>
            </div>
            <div className="space-y-2">
                <SidebarItem icon={<Droplet size={16} className="text-rose-500" />} title={`${total} Donations`} sub="Lifetime" />
                <SidebarItem icon={<ShieldCheck size={16} className="text-emerald-500" />} title="Verified" sub="Authorized" />
            </div>
            <button onClick={onShare} className="mt-auto w-full h-11 flex items-center justify-center gap-2 bg-slate-900 text-white rounded-xl font-bold text-[10px] uppercase hover:bg-rose-600 transition-all">
                <Share2 size={14} /> Share Profile
            </button>
        </aside>
    );
}

function SidebarItem({ icon, title, sub }: any) {
    return (
        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
            {icon}
            <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900">{title}</span>
                <span className="text-[9px] text-slate-400 font-medium uppercase">{sub}</span>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, bg, textColor, isHeart }: any) {
    return (
        <motion.div variants={itemVariants} className={`p-5 rounded-[1.5rem] relative overflow-hidden group border ${bg} ${textColor}`}>
            {isHeart ? <Heart className="absolute -right-2 -top-2 text-rose-100 group-hover:scale-110 transition-transform" size={60} fill="currentColor" />
                     : <Flame className="absolute -right-2 -top-2 text-white/10 group-hover:scale-110 transition-transform" size={60} />}
            <div className="relative z-10">
                <div className="flex items-center gap-2 opacity-60 mb-1">
                    {icon} <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
                </div>
                <p className="text-2xl font-black">{value}</p>
            </div>
        </motion.div>
    );
}

function BloodVolumeCard({ volume, bottles }: any) {
    return (
        <motion.div variants={itemVariants} className="bg-slate-50/80 rounded-[1.5rem] p-5 md:p-8 border border-slate-100">
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-32 bg-white border-[4px] border-white rounded-b-[2.5rem] rounded-t-lg relative overflow-hidden shadow-md ring-1 ring-slate-100 shrink-0">
                    <motion.div 
                        initial={{ height: 0 }} 
                        animate={{ height: `${Math.min(100, (volume / 5000) * 100)}%` }}
                        transition={{ duration: 2, ease: "circOut" }}
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-rose-700 to-rose-500"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
                        <span className="text-xl font-black text-slate-900">{volume}</span>
                        <span className="text-[9px] font-black text-slate-500 uppercase">ML</span>
                    </div>
                </div>
                <div className="text-center md:text-left space-y-2">
                    <h4 className="text-base font-black text-slate-900 uppercase">Total Blood Donated</h4>
                    <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm">
                        <Droplet fill="currentColor" size={12} className="text-blue-500" />
                        <p className="text-xs font-black text-slate-900">{bottles} <span className="text-[9px] text-slate-400">Bottles (500ml)</span></p>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed max-w-xs">
                        You've contributed enough to fill {bottles} bottles. A hero for community health!
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

function Milestones({ total }: { total: number }) {
    const steps = [
        { count: 1, label: 'Hero', color: "bg-rose-50 border-rose-100 text-rose-600" },
        { count: 5, label: 'Elite', color: "bg-amber-50 border-amber-100 text-amber-600" },
        { count: 10, label: 'Legend', color: "bg-slate-50 border-slate-200 text-slate-600" },
    ];

    return (
        <motion.div variants={itemVariants}>
            <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Milestones</h4>
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {steps.map((s) => (
                    <div key={s.label} className={`flex-shrink-0 flex flex-col items-center gap-2 p-4 rounded-[1.25rem] border-2 w-24 transition-all ${
                        total >= s.count ? `${s.color} opacity-100` : 'bg-white border-slate-50 border-dashed opacity-40'
                    }`}>
                        <Award size={20} className={total >= s.count ? "" : "text-slate-200"} />
                        <span className="text-[9px] font-black uppercase">{s.label}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

function LoadingState() {
    return (
        <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <Loader2 className="animate-spin mb-3 text-rose-500" size={32} />
            <p className="text-[10px] font-black uppercase tracking-widest">Loading Records</p>
        </div>
    );
}
