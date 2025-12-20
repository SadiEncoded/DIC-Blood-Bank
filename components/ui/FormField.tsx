// components/ui/FormField.tsx
'use client';

import { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

export interface FormFieldProps {
  label: string;
  icon?: ReactNode;
  children: ReactNode;
  error?: FieldError;
  className?: string;
}

export function FormField({
  label,
  icon,
  children,
  error,
  className = "",
}: FormFieldProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1">
        {label}
      </label>
      <div className="relative group">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors">
            {icon}
          </div>
        )}
        {children}
      </div>
      {error && (
        <p className="text-[9px] font-bold text-rose-600 mt-1 uppercase tracking-tight">
          {error.message as string}
        </p>
      )}
    </div>
  );
}
