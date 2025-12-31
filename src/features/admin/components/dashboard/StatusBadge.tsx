'use client';

interface StatusBadgeProps {
    type: 'availability' | 'published' | 'role' | 'request';
    value: any;
}

export const StatusBadge = ({ type, value }: StatusBadgeProps) => {
    if (type === 'availability') {
        return (
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${value ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                {value ? 'Available' : 'Unavailable'}
            </span>
        );
    }
    if (type === 'published') {
        return (
            <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${value ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-100 text-zinc-500'}`}>
                {value ? 'Published' : 'Draft'}
            </span>
        );
    }
    if (type === 'role') {
        return (
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${value === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                {value?.toUpperCase() || 'USER'}
            </span>
        );
    }
    if (type === 'request') {
        const styles: Record<string, string> = {
            'PENDING': 'bg-blue-100 text-blue-700',
            'APPROVED': 'bg-amber-100 text-amber-700',
            'FULFILLED': 'bg-emerald-100 text-emerald-700',
            'CANCELLED': 'bg-zinc-100 text-zinc-500'
        };
        const normalizedValue = String(value).toUpperCase();
        return (
            <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${styles[normalizedValue] || 'bg-zinc-100 text-zinc-500'}`}>
                {normalizedValue}
            </span>
        );
    }
    return null;
};
