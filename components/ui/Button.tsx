// components/ui/Button.tsx
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
    primary: 'bg-rose-600 text-white hover:bg-rose-700 shadow-md hover:shadow-xl',
    secondary: 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100',
    outline: 'border-2 border-rose-600 text-rose-600 hover:bg-rose-50',
    ghost: 'text-rose-600 hover:bg-rose-50',
    gradient: 'bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-md hover:shadow-xl',
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
