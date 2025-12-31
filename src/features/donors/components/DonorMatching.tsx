'use client';

import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/features/auth/components/AuthModal';
import { AnimatePresence, motion } from 'framer-motion';
import { BadgeCheck, ChevronRight, Clock, Dna, Facebook, HeartPulse, LocateFixed, MapPin, Navigation2, Phone, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useDonorMatching } from '../hooks/useDonorMatching';
import type { Donor } from '../types';

interface DonorMatchingProps {
    trackingId?: string;
    bloodType?: string;
    location?: string;
    onSelectDonor: (donor: Donor) => void;
    onRetry?: () => void;
}

export function DonorMatching({ trackingId, bloodType, location, onSelectDonor, onRetry }: DonorMatchingProps) {
    const { user } = useAuth();
    const { donors, isLoading, refetch } = useDonorMatching(trackingId, bloodType, location);
    
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [visitedFbDonors, setVisitedFbDonors] = useState<Set<string>>(new Set());

    const checkContactEligibility = (donor: Donor) => {
        if (!user) return { canContact: false, reason: 'AUTH_REQUIRED' };
        if (!(user as any).is_verified) return { canContact: false, reason: 'USER_NOT_VERIFIED' };
        if (!donor.isVerified) return { canContact: false, reason: 'DONOR_NOT_VERIFIED' };
        if (donor.facebookUrl && !visitedFbDonors.has(donor.id)) return { canContact: false, reason: 'SOCIAL_CHECK_REQUIRED' };
        return { canContact: true };
    };

    const handleAction = (donor: Donor) => {
        const { canContact, reason } = checkContactEligibility(donor);
        if (canContact) {
            onSelectDonor(donor);
            return;
        }
        switch (reason) {
            case 'AUTH_REQUIRED': setIsAuthModalOpen(true); break;
            case 'USER_NOT_VERIFIED': toast.error("Verification Required", { description: "Your account is under review." }); break;
            case 'DONOR_NOT_VERIFIED': toast.error("Donor Unverified", { description: "Safety protocol: Donor pending review." }); break;
            case 'SOCIAL_CHECK_REQUIRED': toast.error("Safety Check", { description: "Please view social profile first." }); break;
        }
    };

    return (
        <section className="w-full max-w-5xl mx-auto px-4 py-8" aria-labelledby="donor-matching-title">
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <LoadingState bloodType={bloodType} location={location} />
                ) : (
                    <motion.div 
                        key="results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-8"
                    >
                        {/* Dossier Header */}
                        <header className="flex flex-col md:flex-row items-center justify-between border-b border-slate-100 pb-6 md:pb-8 gap-4 md:gap-6">
                            <div className="text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start gap-2 text-rose-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-2 md:mb-3">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                        <span className="relative h-2 w-2 rounded-full bg-rose-600"></span>
                                    </span>
                                    Registry Intelligence Live
                                </div>
                                <h1 id="donor-matching-title" className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
                                    Verified <span className="text-rose-600">{bloodType}</span> Matches
                                </h1>
                            </div>
                            
                            <div className="flex w-full md:w-auto bg-slate-50 border border-slate-200/60 p-1.5 rounded-2xl shadow-sm justify-center">
                                <StatItem label="Radius" value="15 KM" />
                                <div className="w-px bg-slate-200 my-2" />
                                <StatItem label="Matches" value={donors.length.toString()} />
                            </div>
                        </header>

                        {/* Donor Grid */}
                        <div className="grid gap-4 md:gap-6">
                            {donors.length > 0 ? (
                                donors.map((donor) => (
                                    <DonorCard 
                                        key={donor.id}
                                        donor={donor}
                                        isSocialVisited={visitedFbDonors.has(donor.id)}
                                        onSocialClick={() => setVisitedFbDonors(prev => new Set(prev).add(donor.id))}
                                        onContact={() => handleAction(donor)}
                                        eligibility={checkContactEligibility(donor)}
                                    />
                                ))
                            ) : (
                                <EmptyState onRetry={onRetry || refetch} onRefresh={refetch} />
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </section>
    );
}

// --- Sub-components (Atomic Design) ---

function StatItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="px-4 md:px-6 py-1.5 md:py-2 text-center">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
            <p className="text-xs md:text-sm font-black text-slate-900">{value}</p>
        </div>
    );
}

function DonorCard({ donor, isSocialVisited, onSocialClick, onContact, eligibility }: any) {
    const isDisabled = !eligibility.canContact && donor.facebookUrl && !isSocialVisited;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-white border border-slate-200 rounded-[2rem] p-5 md:p-7 flex flex-col md:flex-row items-center gap-4 md:gap-6 transition-all hover:shadow-2xl hover:shadow-slate-200/50 hover:border-rose-200"
        >
            <div className="relative shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 rounded-2xl md:rounded-3xl flex items-center justify-center border border-slate-100 group-hover:scale-105 transition-transform duration-500">
                    <HeartPulse className="text-rose-500 w-7 h-7 md:w-8 md:h-8" strokeWidth={1.5} />
                </div>
                {donor.isVerified && (
                    <div className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 bg-blue-600 text-white p-1 md:p-1.5 rounded-full border-2 md:border-4 border-white shadow-sm">
                        <BadgeCheck className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    </div>
                )}
            </div>

            <div className="flex-1 text-center md:text-left space-y-1.5 md:space-y-2 w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-center md:justify-start gap-2 md:gap-3">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">{donor.name}</h3>
                    <div className="flex justify-center md:justify-start">
                        <StatusBadge isAvailable={donor.isVerified} />
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 md:gap-5 gap-y-1 text-slate-500 text-[13px] md:text-sm">
                    <span className="flex items-center gap-1.5"><MapPin size={14} className="shrink-0" /> {donor.location}</span>
                    <span className="flex items-center gap-1.5 whitespace-nowrap"><Clock size={14} className="shrink-0" /> Last: {donor.lastDonation || 'Ready'}</span>
                    <span className="flex items-center gap-1.5 text-rose-500 font-semibold whitespace-nowrap"><Navigation2 size={14} className="shrink-0" /> 2.4 KM</span>
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto mt-2 md:mt-0">
                {donor.facebookUrl && (
                    <a 
                        href={donor.facebookUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={onSocialClick}
                        className={`p-3.5 md:p-4 rounded-xl md:rounded-2xl transition-all shrink-0 ${isSocialVisited ? 'bg-slate-100 text-slate-400' : 'bg-rose-50 text-rose-600 animate-pulse ring-2 ring-rose-100'}`}
                    >
                        <Facebook className="w-5 h-5" />
                    </a>
                )}
                <button 
                    onClick={onContact}
                    className={`flex-1 md:flex-none flex items-center justify-center gap-2.5 md:gap-3 px-6 md:px-8 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-black text-[11px] md:text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95 ${isDisabled ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' : 'bg-slate-900 text-white hover:bg-rose-600'}`}
                >
                    <Phone className="w-3.5 h-3.5 md:w-4 md:h-4" /> Contact <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </button>
            </div>
        </motion.div>
    );
}

function StatusBadge({ isAvailable }: { isAvailable: boolean }) {
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${isAvailable ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
            {isAvailable ? 'Immediate Donor' : 'In Screening'}
        </span>
    );
}

function LoadingState({ bloodType, location }: { bloodType?: string, location?: string }) {
    return (
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="bg-white border border-slate-100 rounded-[3rem] p-20 text-center space-y-8 shadow-xl"
        >
            <div className="relative w-32 h-32 mx-auto">
                <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-dashed border-rose-200 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Dna className="text-rose-500 animate-bounce" size={48} />
                </div>
            </div>
            <div className="space-y-2">
                <h2 className="text-3xl font-black text-slate-900">Scanning Network...</h2>
                <p className="text-slate-400">Locating <b>{bloodType}</b> donors in <b>{location}</b></p>
            </div>
        </motion.div>
    );
}

function EmptyState({ onRetry, onRefresh }: { onRetry: () => void, onRefresh: () => void }) {
    return (
        <div className="flex flex-col gap-6">
            <div className="py-16 md:py-24 text-center bg-slate-50 rounded-[2.5rem] md:rounded-[3rem] border-2 border-dashed border-slate-200">
                <LocateFixed className="mx-auto text-slate-300 mb-6" size={48} />
                <h3 className="text-xl md:text-2xl font-bold text-slate-900">No Matches Found</h3>
                <p className="text-slate-500 mb-8 max-w-xs mx-auto text-sm md:text-base px-6">We couldn't find any donors in your immediate area at this moment.</p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-6">
                    <button 
                        onClick={onRefresh} 
                        className="w-full sm:w-auto bg-slate-100 text-slate-900 px-8 py-4 rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors active:scale-95"
                    >
                        <RotateCcw className="w-4 h-4" /> Refresh Network
                    </button>
                    <button 
                        onClick={onRetry} 
                        className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-rose-600 transition-colors shadow-lg active:scale-95"
                    >
                        <MapPin className="w-4 h-4" /> Expand Area
                    </button>
                </div>
            </div>

            <div className="bg-rose-50/50 border border-rose-100 rounded-2xl md:rounded-3xl p-6 md:p-8 text-center shadow-sm">
                <p className="text-rose-900/80 font-bold text-sm md:text-base leading-relaxed max-w-xl mx-auto italic">
                    "Your request is on the request table. If any donor is available or free, they will contact you, 
                    or you can come again and search again."
                </p>
            </div>
        </div>
    );
}
