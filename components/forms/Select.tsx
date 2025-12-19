// components/forms/Select.tsx
import { ReactNode, SelectHTMLAttributes, forwardRef } from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
  options: Array<{ value: string; label: string }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, icon, fullWidth = true, options, className = '', ...props }, ref) => {
    const baseStyles = 'px-4 py-3 border rounded-xl text-base font-hind focus:outline-none focus:ring-2 transition-all appearance-none';
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
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10">
              {icon}
            </div>
          )}
          
          <select
            ref={ref}
            className={combinedClassName}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          {/* Dropdown arrow */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
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

Select.displayName = 'Select';
