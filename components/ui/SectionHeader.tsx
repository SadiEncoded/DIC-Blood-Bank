// components/ui/SectionHeader.tsx
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  italicTitle?: string;
  subtitle?: string;
  rightElement?: ReactNode;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  italicTitle,
  subtitle,
  rightElement,
  centered = false,
  className = "",
}: SectionHeaderProps) {
  const alignmentStyles = centered ? 'text-center items-center' : 'text-left items-start';
  
  return (
    <div className={`flex flex-col md:flex-row justify-between gap-8 mb-16 md:mb-24 ${centered ? 'items-center' : 'items-start md:items-end'} ${className}`}>
      <div className={`max-w-2xl ${centered ? 'text-center' : ''}`}>
        {eyebrow && (
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] font-bold tracking-[0.4em] text-rose-600 uppercase mb-4 block"
          >
            {eyebrow}
          </motion.span>
        )}
        
        <motion.h3 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-slate-900 font-poppins tracking-tighter"
        >
          {title}
          {italicTitle && (
            <>
              <br />
              <span className="text-slate-400 font-light italic">{italicTitle}</span>
            </>
          )}
        </motion.h3>

        {subtitle && (
          <p className="mt-6 text-slate-600 text-sm md:text-lg leading-relaxed font-hind">
            {subtitle}
          </p>
        )}
      </div>
      
      {rightElement && (
        <div className={centered ? 'w-full flex justify-center' : 'text-right hidden md:block'}>
          {rightElement}
        </div>
      )}
    </div>
  );
}
