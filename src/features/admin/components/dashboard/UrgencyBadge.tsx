'use client';

import { AlertTriangle } from 'lucide-react';

interface UrgencyBadgeProps {
    level: string;
}

export const UrgencyBadge = ({ level }: UrgencyBadgeProps) => {
    const normalizedLevel = level?.toUpperCase();
    if (normalizedLevel === 'CRITICAL') {
        return (
            <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-rose-500 text-white text-[9px] font-black uppercase tracking-wider animate-pulse shadow-sm">
                <AlertTriangle size={10} /> Critical
            </span>
        );
    }
    if (normalizedLevel === 'URGENT') {
        return (
            <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-[9px] font-black uppercase tracking-wider border border-amber-200">
                Urgent
            </span>
        );
    }
    return (
        <span className="px-2 py-1 rounded-full bg-zinc-100 text-zinc-500 text-[9px] font-black uppercase tracking-wider">
            Normal
        </span>
    );
};
