'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, LucideIcon } from 'lucide-react';

export interface StepItem {
  id: number;
  label: string;
  subLabel: string;
  icon: LucideIcon;
}

interface StepperProps {
  currentStep: number;
  steps: readonly StepItem[];
}

export function Stepper({ currentStep, steps }: StepperProps) {
  return (
    <div className="relative px-6 md:px-16 py-10 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between relative">
          
          {/* Background Progress Track */}
          <div className="absolute top-7 left-0 w-full h-1 bg-slate-100 rounded-full overflow-hidden hidden md:block">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              className="h-full bg-rose-600 transition-all duration-700 ease-out"
            />
          </div>

          {steps.map((step, index) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            const Icon = step.icon;

            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center group">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.15 : 1,
                    backgroundColor: isCompleted ? '#e11d48' : isActive ? '#0f172a' : '#ffffff',
                    borderColor: isCompleted ? '#e11d48' : isActive ? '#0f172a' : '#f1f5f9',
                  }}
                  transition={{ duration: 0.4, ease: "backOut" }}
                  className={clsx(
                    "w-12 h-12 md:w-16 md:h-16 rounded-2xl border-2 flex items-center justify-center shadow-xl transition-all duration-300",
                    isCompleted ? "shadow-rose-200" : isActive ? "shadow-slate-200" : "shadow-none"
                  )}
                >
                  <AnimatePresence mode="wait">
                    {isCompleted ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                      >
                        <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="icon"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={clsx(
                          "transition-colors duration-300",
                          isActive ? "text-white" : "text-slate-300 group-hover:text-slate-500"
                        )}
                      >
                        <Icon size={20} className="md:w-7 md:h-7" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Pulse Effect for Active Only */}
                  {isActive && (
                    <motion.div 
                      layoutId="pulse"
                      className="absolute inset-0 rounded-2xl md:rounded-3xl border-4 border-slate-900/10"
                      animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                <div className="mt-6 text-center hidden sm:block">
                  <p
                    className={clsx(
                      "text-xs md:text-sm font-black uppercase tracking-[0.2em] transition-colors duration-300",
                      isActive ? "text-slate-900" : isCompleted ? "text-rose-600" : "text-slate-300"
                    )}
                  >
                    {step.label}
                  </p>
                  <p className={clsx("text-xs text-slate-400 font-medium font-hind mt-2 max-w-[140px] transition-opacity duration-300", { "opacity-100": isActive || isCompleted, "opacity-40": !isActive && !isCompleted })}>
                    {step.subLabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
