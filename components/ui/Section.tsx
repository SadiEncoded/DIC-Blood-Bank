'use client';

import React, { forwardRef } from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: 'light' | 'dark' | 'slate' | 'white';
}

export const Section = forwardRef<HTMLElement, SectionProps>(({ 
  children, 
  className = '', 
  id,
  variant = 'white' 
}, ref) => {

  const variantStyles = {
    white: 'bg-white',
    light: 'bg-slate-50',
    slate: 'bg-slate-50',
    dark: 'bg-[#0a0f1a] text-white',
  };

  return (
    <section 
      id={id} 
      ref={ref}
      className={`py-16 md:py-24 relative overflow-hidden ${variantStyles[variant]} ${className}`}
    >
      {children}
    </section>
  );
});

Section.displayName = 'Section';
