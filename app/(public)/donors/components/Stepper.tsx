import clsx from 'clsx';
import { motion } from 'framer-motion';
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
    <div className="relative px-8 md:px-12 py-6 border-b border-slate-200 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            const Icon = step.icon;

            return (
              <div key={step.id} className="flex-1 flex items-center">
                {/* Step */}
                <div className="flex flex-col items-center text-center relative z-10 w-full">
                  <motion.div
                    initial={false}
                    animate={{
                      scale: isActive ? 1.1 : 1,
                      backgroundColor: isCompleted
                        ? '#16a34a'
                        : isActive
                        ? '#e11d48'
                        : '#ffffff',
                      borderColor: isActive
                        ? '#e11d48'
                        : isCompleted
                        ? '#16a34a'
                        : '#cbd5f5',
                    }}
                    transition={{ duration: 0.25 }}
                    className={clsx(
                      'w-12 h-12 rounded-full border-2 flex items-center justify-center shadow-sm',
                      {
                        'bg-white': !isActive && !isCompleted,
                      }
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : (
                      <Icon
                        className={clsx('w-5 h-5', {
                          'text-white': isActive,
                          'text-slate-400': !isActive,
                        })}
                      />
                    )}
                  </motion.div>

                  <div className="mt-3 hidden md:block">
                    <p
                      className={clsx(
                        'text-xs font-bold uppercase tracking-widest',
                        {
                          'text-rose-600': isActive,
                          'text-emerald-600': isCompleted,
                          'text-slate-400': !isActive && !isCompleted,
                        }
                      )}
                    >
                      {step.label}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {step.subLabel}
                    </p>
                  </div>
                </div>

                {/* Connector */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-[2px] relative mx-2 w-full">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isCompleted ? 1 : 0 }} // Only fill if completed
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute inset-0 bg-emerald-500 origin-left z-10"
                    />
                    <div className="absolute inset-0 bg-slate-200" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
