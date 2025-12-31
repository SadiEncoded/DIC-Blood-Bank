'use client';

import React, { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';

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
  // Check if children is a valid React element to safely inject classes
  const child = React.Children.only(children) as React.ReactElement;

  return (
    <div className={`flex flex-col ${className}`}>
      {/* 1. Label - Increased contrast and consistent spacing */}
      <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-slate-500 mb-2 ml-1 font-anek">
        {label}
      </label>

      {/* 2. Input Container */}
      <div className="relative flex items-center group">
        {icon && (
          <div className="absolute left-4 z-20 pointer-events-none text-slate-400 group-focus-within:text-rose-600 transition-colors duration-200">
            {icon}
          </div>
        )}
        
        {/* Injects padding-left (pl-12) if icon exists, 
          otherwise uses standard padding (pl-4).
        */}
        {React.cloneElement(child, {
          className: `${child.props.className || ''} ${icon ? 'pl-12' : 'pl-4'} w-full`
        })}
      </div>

      {/* 3. Error Message - Layout Stable Container */}
      <div className="min-h-[20px] mt-1.5 px-1">
        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 5 }}
              className="text-[10px] font-bold text-rose-600 uppercase tracking-tight font-hind"
            >
              {error.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
