'use client';

import { motion } from 'framer-motion';
import { Activity, CheckCircle2, HandHeart } from 'lucide-react';

export function FinalizedHeader() {
    return (
        <header className="flex flex-col items-center text-center mb-16 md:mb-24">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative mb-10">
                <div className="absolute inset-0 bg-rose-500/10 blur-[60px] rounded-full" />
                <div className="relative w-32 h-32 rounded-[3rem] bg-white border border-slate-100 shadow-xl flex items-center justify-center text-rose-500">
                    <HandHeart size={56} strokeWidth={1.25} />
                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-2xl border-4 border-white">
                        <CheckCircle2 size={20} />
                    </div>
                </div>
            </motion.div>
            
            <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-rose-600">
                    <Activity size={12} className="animate-pulse" />
                    Connection Secured
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-anek leading-tight">
                    Life-Link <span className="text-rose-600">Established</span>
                </h1>
            </div>
        </header>
    );
}
