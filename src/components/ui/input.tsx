import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative w-full group">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors duration-200 z-10 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-12 md:h-14 w-full rounded-xl md:rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-base font-medium shadow-sm transition-all placeholder:text-slate-400 focus:bg-white focus:border-rose-400 focus:ring-4 focus:ring-rose-50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            icon && "pl-12",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input };
