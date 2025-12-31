'use client'

import { cn } from '@/utils';
import { LucideIcon } from 'lucide-react';

interface InfoRowProps {
  icon?: LucideIcon;
  label: string;
  value: string;
  className?: string;
  variant?: 'default' | 'danger';
}

export default function InfoRow({ 
  icon: Icon, 
  label, 
  value, 
  className,
  variant = 'default' 
}: InfoRowProps) {
  return (
    <div className={cn("flex items-start gap-3 group/row", className)}>
      {Icon && (
        <div className="mt-1 shrink-0">
          <Icon 
            className={cn(
              "h-4 w-4 transition-colors duration-200", 
              variant === 'danger' 
                ? "text-red-500 group-hover/row:text-red-600" 
                : "text-rose-500 group-hover/row:text-rose-600"
            )} 
          />
        </div>
      )}
      
      <div className="min-w-0 flex-1 flex flex-col gap-0.5">
        <dt className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-poppins leading-none">
          {label}
        </dt>
        <dd className="text-sm text-slate-700 font-hind font-medium break-words leading-relaxed">
          {value}
        </dd>
      </div>
    </div>
  )
}
