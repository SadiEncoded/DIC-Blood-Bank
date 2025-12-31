import { HOSPITALS } from '@/assets/data/hospitals';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Building2, MapPin } from 'lucide-react';
import React from 'react';

// Adjusted interface to be compatible with shadcn and react-hook-form
interface HospitalSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  label?: string;
  error?: string;
  touched?: boolean;
  className?: string;
  name?: string;
  disabled?: boolean;
  placeholder?: string;
}

export const HospitalSelect = React.forwardRef<HTMLButtonElement, HospitalSelectProps>(
  ({ label, error, touched, className, value, onChange, onBlur, disabled, placeholder = "Select Hospital", ...props }, ref) => {
    return (
      <div className={`space-y-2 group ${className}`}>
        {label && (
          <label className="text-[11px] md:text-[13px] font-bold text-slate-600 ml-1 mb-2.5 block tracking-wide">
            {label}
          </label>
        )}
        <div className="relative">
          <Select 
            value={value} 
            onValueChange={onChange} 
            disabled={disabled}
          >
            <SelectTrigger 
                ref={ref} 
                className={`pl-11 md:pl-12 bg-white transition-all duration-300 ${
                    error ? 'border-rose-500 ring-1 ring-rose-500/20' : 
                    touched && !error ? 'border-emerald-500 ring-1 ring-emerald-500/20' : ''
                }`}
            >
                <Building2 className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 pointer-events-none ${value ? 'text-rose-500' : 'text-slate-400'}`} size={18} />
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            
            <SelectContent className="max-h-[300px]">
                {Object.entries(HOSPITALS).map(([area, hospitals]) => (
                    <SelectGroup key={area}>
                        <SelectLabel className="sticky top-0 bg-popover z-10 text-[10px] uppercase font-black text-slate-400 tracking-widest pl-2 py-2 mt-2 border-b border-slate-50">
                            <span className="flex items-center gap-1"><MapPin size={10} /> {area}</span>
                        </SelectLabel>
                        {hospitals.map((hospital) => (
                            <SelectItem key={hospital} value={hospital} className="py-3 pl-8 font-medium text-slate-700 cursor-pointer transition-colors hover:bg-rose-50 hover:text-rose-700">
                                {hospital}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                ))}
            </SelectContent>
          </Select>
        </div>
        {error && (
          <p className="text-[10px] font-bold text-rose-500 uppercase tracking-tight mt-1.5 ml-1 animate-in fade-in slide-in-from-top-1 duration-200">
             {error}
          </p>
        )}
      </div>
    );
  }
);

HospitalSelect.displayName = 'HospitalSelect';
