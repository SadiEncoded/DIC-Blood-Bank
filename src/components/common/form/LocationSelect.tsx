import { LOCATIONS } from '@/assets/data/locations';
import { MapPin } from 'lucide-react';
import React from 'react';

interface LocationSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  touched?: boolean;
  className?: string;
}

export const LocationSelect = React.forwardRef<HTMLSelectElement, LocationSelectProps>(
  ({ label, error, touched, className, ...props }, ref) => {
    return (
      <div className={`space-y-2 group ${className}`}>
        {label && (
          <label className="text-[10px] uppercase tracking-widest font-black text-slate-500 ml-1 group-focus-within:text-rose-600 transition-colors font-anek">
            {label}
          </label>
        )}
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-rose-500 transition-colors pointer-events-none" />
          <select
            ref={ref}
            {...props}
            suppressHydrationWarning
            className={`w-full pl-11 pr-4 py-3 bg-white border ${
              error
                ? 'border-rose-500'
                : touched
                ? 'border-emerald-500'
                : 'border-slate-200'
            } rounded-xl focus:border-rose-500 focus:ring-4 focus:ring-rose-50/50 outline-none text-sm appearance-none cursor-pointer shadow-sm transition-all text-slate-700 font-hind`}
          >
            <option value="">Select Location</option>
            {Object.entries(LOCATIONS).map(([district, areas]) => (
              <optgroup key={district} label={district}>
                {areas.map((area) => (
                  <option key={`${area}-${district}`} value={`${area}, ${district}`}>
                    {area}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          {/* Custom Arrow */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {error && (
          <p className="text-[10px] text-rose-500 font-bold ml-1">{error}</p>
        )}
      </div>
    );
  }
);

LocationSelect.displayName = 'LocationSelect';
