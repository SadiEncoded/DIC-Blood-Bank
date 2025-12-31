'use client';

import { SafetyWarning } from '@/components/SafetyWarning';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/features/auth/components/AuthModal';
import { ReportModal } from '@/features/reports/components/ReportModal';
import { motion } from 'framer-motion';
import {
    BadgeCheck,
    Calendar,
    Flag,
    MapPin,
    MessageSquare,
    Phone,
    Star,
    History
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface MatchedDonorCardProps {
    name: string;
    bloodType: string;
    location: string;
    donationCount: number;
    lastDonation?: string;
    isVerified?: boolean;
    facebookUrl?: string;
    onCall?: () => void;
    id?: string;
    averageRating?: number;
    ratingCount?: number;
}

export function MatchedDonorCard({
    name = "Donor Name",
    bloodType = "O+",
    location = "Not Specified",
    donationCount = 0,
    lastDonation = "Never",
    isVerified = true,
    facebookUrl,
    onCall,
    id,
    averageRating = 0,
    ratingCount = 0,
}: MatchedDonorCardProps) {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isSafetyWarningOpen, setIsSafetyWarningOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [hasVisitedSocial, setHasVisitedSocial] = useState(false);
    const { user } = useAuth();
    
    const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : '??';

    const getMessengerLink = (url?: string) => {
        if (!url) return "#";
        const parts = url.split('/').filter(Boolean);
        const username = parts[parts.length - 1]?.replace(/\?.*$/, '');
        return `https://m.me/${username}`;
    };

    return (
        <>
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative bg-white border border-slate-100 p-4 rounded-[22px] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
        >
            {/* Header: Visual Profile */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100 flex items-center justify-center text-rose-600 font-bold text-base border border-rose-200/50">
                            {initials}
                        </div>
                        {isVerified && (
                            <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                                <BadgeCheck size={14} className="text-blue-500 fill-blue-500/10" />
                            </div>
                        )}
                    </div>
                    <div>
                        <h4 className="text-[15px] font-black text-slate-800 leading-tight">
                            {name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-100">
                                <Star size={10} className="text-amber-500 fill-amber-500" />
                                <span className="text-[10px] font-black text-amber-700">{averageRating.toFixed(1)}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-medium tracking-tight">
                                {ratingCount} feedback
                            </span>
                        </div>
                    </div>
                </div>
                <div className="bg-rose-600 text-white px-3 py-1.5 rounded-xl shadow-lg shadow-rose-200 flex flex-col items-center min-w-[48px]">
                    <span className="text-[14px] font-black leading-none">{bloodType}</span>
                    <span className="text-[7px] font-bold uppercase tracking-tighter opacity-80 mt-0.5">Type</span>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-slate-50/80 rounded-xl p-2 border border-slate-100">
                    <div className="flex items-center gap-1.5 mb-0.5">
                        <History size={11} className="text-slate-400" />
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Donations</span>
                    </div>
                    <p className="text-[13px] font-black text-slate-700">{donationCount.toString().padStart(2, '0')} Times</p>
                </div>
                <div className="bg-slate-50/80 rounded-xl p-2 border border-slate-100">
                    <div className="flex items-center gap-1.5 mb-0.5">
                        <Calendar size={11} className="text-slate-400" />
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Last Sync</span>
                    </div>
                    <p className="text-[13px] font-black text-slate-700 truncate">{lastDonation}</p>
                </div>
            </div>

            {/* Location Bar */}
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl mb-4 border border-dashed border-slate-200">
                <MapPin size={12} className="text-rose-500" />
                <span className="text-[11px] font-bold text-slate-600 truncate">{location}</span>
            </div>

            {/* Optimized Action Row */}
            <div className="flex gap-2">
                <button
                    onClick={() => {
                        if (!user) { setIsAuthModalOpen(true); return; }
                        if (facebookUrl && !hasVisitedSocial) {
                            toast.warning("Profile Check Required", { description: "Tap the blue message icon to verify identity first." });
                            return;
                        }
                        setIsSafetyWarningOpen(true);
                    }}
                    className={`flex-[3] h-10 flex items-center justify-center gap-2 rounded-xl transition-all font-black text-[11px] uppercase tracking-widest shadow-sm
                        ${hasVisitedSocial || !facebookUrl 
                            ? "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200 active:scale-95" 
                            : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-60"} 
                    `}
                >
                    <Phone size={14} fill="currentColor" />
                    Call Now
                </button>

                {facebookUrl ? (
                    <a
                        href={user ? getMessengerLink(facebookUrl) : "#"}
                        onClick={(e) => {
                            if (!user) { e.preventDefault(); setIsAuthModalOpen(true); return; }
                            setHasVisitedSocial(true);
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 h-10 rounded-xl flex items-center justify-center transition-all border
                            ${!hasVisitedSocial 
                                ? "bg-white text-blue-600 border-blue-200 shadow-blue-100 animate-pulse ring-2 ring-blue-500/10" 
                                : "bg-slate-50 text-slate-400 border-slate-200 hover:bg-blue-50 hover:text-blue-600"}
                        `}
                    >
                        <MessageSquare size={18} fill={!hasVisitedSocial ? "none" : "currentColor"} />
                    </a>
                ) : (
                    <div className="flex-1 h-10 bg-slate-50/50 text-slate-200 rounded-xl flex items-center justify-center border border-slate-100/50 cursor-not-allowed">
                        <MessageSquare size={18} />
                    </div>
                )}
                
                <button
                    onClick={() => setIsReportModalOpen(true)}
                    className="flex-none w-10 h-10 rounded-xl bg-slate-50 hover:bg-red-50 text-slate-300 hover:text-red-500 border border-slate-200 hover:border-red-100 transition-all flex items-center justify-center"
                >
                    <Flag size={14} />
                </button>
            </div>
        </motion.div>

        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        <SafetyWarning 
            isOpen={isSafetyWarningOpen} 
            onClose={() => setIsSafetyWarningOpen(false)}
            onConfirm={() => { setIsSafetyWarningOpen(false); onCall?.(); }}
        />
        <ReportModal 
            isOpen={isReportModalOpen} 
            onClose={() => setIsReportModalOpen(false)} 
            targetId={id || 'unknown'} 
            targetName={name}
        />
        </>
    );
}
