'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, MessageSquareHeart, Star, ThumbsUp, Heart } from 'lucide-react';
import { useState } from 'react';

interface ActionSectionProps {
    isConfirmed: boolean;
    isConfirming: boolean;
    onConfirm: () => void;
    hasRated: boolean;
    isSubmittingRating: boolean;
    onRatingSubmit: (rating: number, comment: string) => void;
    donorName: string;
    onReset?: () => void;
}

export function ActionSection({
    isConfirmed,
    isConfirming,
    onConfirm,
    hasRated,
    isSubmittingRating,
    onRatingSubmit,
    donorName,
    onReset
}: ActionSectionProps) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            // Reduced padding from p-10/p-14 to p-6/p-8 and rounded from 3rem to 2rem
            className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-xl shadow-rose-500/5 relative overflow-hidden text-center"
        >
            <AnimatePresence mode="wait">
                {!isConfirmed ? (
                    <motion.div 
                        key="confirm-state"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        {/* Smaller Status Icon (w-12 instead of w-16) */}
                        <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-4">
                            <Heart size={24} fill="currentColor" className="opacity-20" />
                            <div className="absolute">
                                <CheckCircle2 size={18} />
                            </div>
                        </div>

                        <h3 className="text-slate-900 font-anek font-black text-xl md:text-2xl mb-2">
                            Finalize Donation
                        </h3>
                        {/* Reduced margin-bottom from mb-10 to mb-6 */}
                        <p className="text-slate-500 text-xs md:text-sm max-w-xs mx-auto mb-6 leading-relaxed">
                            Confirm only after the medical procedure is successfully completed.
                        </p>
                        
                        <button
                            onClick={onConfirm}
                            disabled={isConfirming}
                            // Reduced vertical padding from py-5 to py-4
                            className="group relative w-full max-w-sm py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-rose-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {isConfirming ? (
                                <span className="animate-pulse">Processing...</span>
                            ) : (
                                <>
                                    Mark as Successful
                                    <CheckCircle2 size={16} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="rating-state"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        {/* More compact Success Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest mb-4 border border-emerald-100">
                            <ThumbsUp size={10} />
                            Verified
                        </div>

                        {!hasRated ? (
                            <div className="w-full max-w-md mx-auto">
                                <h4 className="font-anek font-black text-lg text-slate-900 mb-1">How was the experience?</h4>
                                <p className="text-slate-500 text-xs mb-4">Rate interaction with <span className="font-bold text-slate-700">{donorName}</span></p>
                                
                                <div className="flex justify-center gap-1.5 mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            className="transition-transform active:scale-90 hover:scale-110"
                                        >
                                            <Star
                                                size={28} // Smaller stars (28 instead of 36)
                                                className={`${star <= (hoverRating || rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-100'} transition-colors`}
                                            />
                                        </button>
                                    ))}
                                </div>

                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Note of gratitude..."
                                    className="w-full text-center text-xs p-3 rounded-xl border border-slate-100 bg-slate-50/50 text-slate-900 mb-4 h-20 resize-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all"
                                />

                                <button
                                    onClick={() => onRatingSubmit(rating, comment)}
                                    disabled={!rating || isSubmittingRating}
                                    className="w-full py-3 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-black disabled:opacity-20 transition-all"
                                >
                                    {isSubmittingRating ? 'Sending...' : 'Submit Feedback'}
                                </button>
                            </div>
                        ) : (
                            <div className="py-2">
                                <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MessageSquareHeart size={24} />
                                </div>
                                <h4 className="text-slate-900 font-black text-base mb-1 text-anek">Thank You!</h4>
                                <p className="text-slate-500 text-xs mb-6">Feedback helps the community.</p>
                                {onReset && (
                                    <button 
                                        onClick={onReset} 
                                        className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-rose-600 transition-colors"
                                    >
                                        ← New Search
                                    </button>
                                )}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
