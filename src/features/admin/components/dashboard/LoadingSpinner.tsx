'use client';

export const LoadingSpinner = ({ size = 16 }: { size?: number }) => (
    <div className="animate-spin rounded-full border-2 border-zinc-400 border-t-transparent" style={{ width: size, height: size }} />
);
