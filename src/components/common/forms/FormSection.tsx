// components/forms/FormSection.tsx
import { ReactNode } from 'react';

export interface FormSectionProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

export function FormSection({ icon, title, children }: FormSectionProps) {
  return (
    <div className="space-y-6 pt-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
        <span className="w-3 h-3 text-slate-500">{icon}</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
          {title}
        </span>
      </div>
      
      {children}
    </div>
  );
}
