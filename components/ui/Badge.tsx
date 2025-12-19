// components/ui/Badge.tsx
import { HTMLAttributes } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'rose';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'rounded' | 'pill' | 'square';
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  shape = 'pill',
  className = '',
  ...props
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center justify-center font-bold uppercase tracking-wider transition-colors';
  
  const variantStyles = {
    default: 'bg-slate-100 text-slate-700 border border-slate-200',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    error: 'bg-rose-50 text-rose-700 border border-rose-200',
    info: 'bg-blue-50 text-blue-700 border border-blue-200',
    rose: 'bg-rose-600 text-white',
  };
  
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[9px]',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
  };
  
  const shapeStyles = {
    rounded: 'rounded-md',
    pill: 'rounded-full',
    square: 'rounded-none',
  };
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${shapeStyles[shape]} ${className}`;
  
  return (
    <span className={combinedClassName} {...props}>
      {children}
    </span>
  );
}
