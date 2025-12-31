'use client';
import { useDonationConfirmation } from '@/features/donors/hooks/useDonationConfirmation';
import { submitRating } from '@/features/ratings/services/actions';
import confetti from 'canvas-confetti';
import { useState } from 'react';
import { toast } from 'sonner';
import type { Donor } from '../types';
import { MatchedDonorCard } from './MatchedDonorCard';
import { ActionSection } from './finalized/ActionSection';
import { ExpiredSession } from './finalized/ExpiredSession';
import { FinalizedHeader } from './finalized/FinalizedHeader';
import { ProtocolSection } from './finalized/ProtocolSection';

interface FinalizedViewProps {
    donor: Donor | null;
    onReset?: () => void;
}

export function FinalizedView({ donor, onReset }: FinalizedViewProps) {
    const { isConfirmed, isConfirming, donationCount, confirm } = useDonationConfirmation(donor?.donationCount || 0);
    const [isSubmittingRating, setIsSubmittingRating] = useState(false);
    const [hasRated, setHasRated] = useState(false);

    const handleConfirm = async () => {
        if (!donor) return;
        
        const defaults = { origin: { y: 0.7 }, zIndex: 1000 };
        const fire = (particleRatio: number, opts: confetti.Options) => {
            confetti({
                ...defaults, ...opts,
                particleCount: Math.floor(200 * particleRatio),
                colors: ['#f43f5e', '#fb7185', '#ffffff']
            });
        };
        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });

        await confirm(donor.id, donor.name);
    };

    const handleRatingSubmit = async (rating: number, comment: string) => {
        if (!rating || !donor) return;
        setIsSubmittingRating(true);
        try {
            const result = await submitRating(donor.id.toString(), rating, comment);
            if (result.success) {
                setHasRated(true);
                toast.success('Thank you for your feedback!');
            } else {
                toast.error(result.error || 'Failed to submit rating');
            }
        } catch (error) {
            toast.error('An error occurred');
        } finally {
            setIsSubmittingRating(false);
        }
    };

    if (!donor) return <ExpiredSession />;

    return (
        // Reduced vertical padding and space-y to pull components together
        <div className="max-w-4xl mx-auto px-4 py-6 md:py-10 space-y-8">
            
            {/* 1. Scaled down Header */}
            <div className="scale-90 origin-top">
                <FinalizedHeader />
            </div>

            <div className="flex flex-col gap-6">
                
                {/* 2. Compact Information Layer */}
                <div className="grid md:grid-cols-2 gap-4 items-stretch">
                    <div className="flex flex-col">
                        <MatchedDonorCard 
                            {...donor} 
                            id={donor.id.toString()} 
                            donationCount={donationCount}
                            onCall={() => window.open(`tel:${donor.phone}`, '_self')}
                        />
                    </div>
                    
                    {/* Compact Protocol wrapper */}
                    <div className="flex flex-col bg-slate-50/50 rounded-[1.5rem] p-2 border border-slate-100/50">
                        <ProtocolSection />
                    </div>
                </div>

                {/* 3. Integrated Action Layer */}
                <div className="pt-2">
                    <div className="max-w-xl mx-auto">
                        <ActionSection 
                            isConfirmed={isConfirmed}
                            isConfirming={isConfirming}
                            onConfirm={handleConfirm}
                            hasRated={hasRated}
                            isSubmittingRating={isSubmittingRating}
                            onRatingSubmit={handleRatingSubmit}
                            donorName={donor.name}
                            onReset={onReset}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
