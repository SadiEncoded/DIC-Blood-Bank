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
    <div className={`flex flex-col ${centered ? 'items-center' : 'md:flex-row justify-between items-start md:items-end'} gap-8 mb-12 md:mb-16 ${centered ? 'lg:px-20' : ''} ${className}`}>
      <div className={`${centered ? 'max-w-3xl text-center w-full' : 'max-w-3xl'}`}>
        {eyebrow && (
          <motion.span 
            initial={{ opacity: 0, y: -5 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black tracking-[0.4em] text-rose-600 uppercase mb-4 block"
          >
            {eyebrow}
          </motion.span>
        )}
        
        <motion.h3 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 font-poppins tracking-tighter leading-[0.95]"
        >
          {title}
          {italicTitle && (
            <span className="ml-3 text-slate-300 font-light italic">{italicTitle}</span>
          )}
        </motion.h3>

        {subtitle && (
          <p className={`mt-6 text-slate-500 text-sm md:text-base lg:text-lg leading-relaxed font-hind font-medium max-w-2xl ${centered ? 'mx-auto' : 'mx-0'}`}>
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
