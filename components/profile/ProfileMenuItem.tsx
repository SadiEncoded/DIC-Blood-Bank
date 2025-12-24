'use client';

import { ReactNode } from 'react';

interface ProfileMenuItemProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  danger?: boolean;
}

export default function ProfileMenuItem({ icon, label, onClick, danger }: ProfileMenuItemProps) {
  return (
    <button
      onClick={onClick}
      role="menuitem"
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
        danger
          ? 'text-rose-600 hover:bg-rose-50'
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <span className={danger ? 'text-rose-500' : 'text-slate-400'}>
        {icon}
      </span>
      {label}
    </button>
  );
}
