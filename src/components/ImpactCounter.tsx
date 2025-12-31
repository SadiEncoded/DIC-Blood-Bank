'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface ImpactCounterProps {
    count: number;
    label?: string;
}

export const ImpactCounter = ({ count, label = "Lives Saved" }: ImpactCounterProps) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group inline-block"
        >
            <div className="absolute -inset-1 bg-gradient-to-r from-rose-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative px-8 py-6 bg-white dark:bg-zinc-900 ring-1 ring-zinc-200 dark:ring-zinc-800 rounded-2xl leading-none flex items-center gap-6 shadow-xl">
                <div className="w-14 h-14 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center text-rose-600 shadow-inner">
                    <Heart size={28} className="fill-rose-600 animate-pulse" />
                </div>
                <div className="space-y-1">
                    <p className="text-sm font-black text-rose-600 uppercase tracking-[0.2em]">{label}</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter">
                            {count.toLocaleString()}
                        </span>
                        <span className="text-zinc-400 font-bold">+</span>
                    </div>
                </div>
            </div>
            
            {/* Contextual Badge */}
            <div className="absolute -top-3 -right-3 px-3 py-1 bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg border-2 border-white dark:border-zinc-900">
                Impact Core
            </div>
        </motion.div>
    );
};
