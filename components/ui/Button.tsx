// components/ui/Button.tsx
'use client';
import { motion } from 'framer-motion';
import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  icon,
  iconPosition = 'right',
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-bold rounded-2xl transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed font-poppins';
  
  const variantStyles = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-xl',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border',
    outline: 'border-2 border-primary text-primary hover:bg-primary/5',
    ghost: 'text-primary hover:bg-primary/5',
    gradient: 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-md hover:shadow-xl',
  };
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`;
  
  return (
    <button
      className={combinedClassName}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {!loading && icon && iconPosition === 'left' && icon}
      {children}
      {!loading && icon && iconPosition === 'right' && icon}
    </button>
  );
}

// Motion variant for animated buttons
export const MotionButton = motion(Button);
