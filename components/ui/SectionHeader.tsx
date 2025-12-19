// components/ui/SectionHeader.tsx
import { ReactNode } from 'react';

export interface SectionHeaderProps {
  icon?: ReactNode;
  badge?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  centered?: boolean;
}

export function SectionHeader({
  icon,
  badge,
  title,
  subtitle,
  action,
  centered = false,
}: SectionHeaderProps) {
  const alignmentStyles = centered ? 'text-center items-center' : 'text-left items-start';
  
  return (
    <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12 ${alignmentStyles}`}>
      <div className={centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}>
        {badge && (
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold uppercase tracking-widest mb-4 ${centered ? 'mx-auto' : ''}`}>
            {icon && <span className="w-4 h-4">{icon}</span>}
            <span>{badge}</span>
          </div>
        )}
        
        <h2 className="text-fluid-section font-heading-opt text-slate-900 mb-4 font-poppins">
          {title}
        </h2>
        
        {subtitle && (
          <p className="text-slate-600 text-sm md:text-lg leading-relaxed font-hind">
            {subtitle}
          </p>
        )}
      </div>
      
      {action && <div>{action}</div>}
    </div>
  );
}
