'use client';

import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
    label: string;
    value: number | string;
    icon: LucideIcon;
    color: 'rose' | 'emerald' | 'orange' | 'blue' | 'purple';
}

export const MetricCard = ({ label, value, icon: Icon, color }: MetricCardProps) => {
    const colorStyles = {
        rose: 'bg-rose-100 text-rose-600',
        emerald: 'bg-emerald-100 text-emerald-600',
        orange: 'bg-orange-100 text-orange-600',
        blue: 'bg-blue-100 text-blue-600',
        purple: 'bg-purple-100 text-purple-600',
    };

    return (
        <div className="bg-white dark:bg-zinc-900 p-4 md:p-5 rounded-[20px] md:rounded-[24px] border border-zinc-100 dark:border-zinc-800 shadow-sm transition-all hover:shadow-md hover:border-rose-100 dark:hover:border-rose-900/30 group">
            <div className="flex flex-col gap-3">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0 ${colorStyles[color]} shadow-sm transition-transform group-hover:scale-110 duration-300`}>
                    <Icon size={20} className="md:w-6 md:h-6" />
                </div>
                <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white leading-none tracking-tight">{value}</h3>
                    <p className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-wider mt-1.5">{label}</p>
                </div>
            </div>
        </div>
    );
};
