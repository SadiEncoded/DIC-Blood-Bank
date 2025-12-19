// components/ui/Input.tsx
import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon, fullWidth = true, className = '', ...props }, ref) => {
    const baseStyles = 'px-4 py-3 border rounded-xl text-base font-hind focus:outline-none focus:ring-2 transition-all';
    const stateStyles = error 
      ? 'border-rose-500 focus:ring-rose-500/20 focus:border-rose-500' 
      : 'border-slate-200 focus:ring-rose-500/20 focus:border-rose-500 bg-slate-50';
    const widthStyles = fullWidth ? 'w-full' : '';
    const iconPadding = icon ? 'pl-11' : '';
    
    const combinedClassName = `${baseStyles} ${stateStyles} ${widthStyles} ${iconPadding} ${className}`;
    
    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2 font-poppins">
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            className={combinedClassName}
            {...props}
          />
        </div>
        
        {error && (
          <p className="mt-1 text-xs font-bold text-rose-600">{error}</p>
        )}
        
        {helperText && !error && (
          <p className="mt-1 text-xs text-slate-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
