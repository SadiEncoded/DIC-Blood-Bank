// components/forms/Textarea.tsx
import { TextareaHTMLAttributes, forwardRef } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, fullWidth = true, className = '', ...props }, ref) => {
    const baseStyles = 'px-4 py-3 border rounded-xl text-base font-hind focus:outline-none focus:ring-2 transition-all resize-none';
    const stateStyles = error 
      ? 'border-rose-500 focus:ring-rose-500/20 focus:border-rose-500' 
      : 'border-slate-200 focus:ring-rose-500/20 focus:border-rose-500 bg-slate-50';
    const widthStyles = fullWidth ? 'w-full' : '';
    
    const combinedClassName = `${baseStyles} ${stateStyles} ${widthStyles} ${className}`;
    
    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2 font-poppins">
            {label}
          </label>
        )}
        
        <textarea
          ref={ref}
          className={combinedClassName}
          {...props}
        />
        
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

Textarea.displayName = 'Textarea';
