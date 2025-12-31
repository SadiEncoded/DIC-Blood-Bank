'use client';

import { Container, Section } from '@/components/ui';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { ElementType, ReactNode } from 'react';

interface HeroChip {
  icon: LucideIcon | ElementType;
  label: string;
}

interface HeroProps {
  badge: string;
  title: string;
  splitTitle: string;
  description: string;
  chips?: HeroChip[];
  variant?: 'rose' | 'blue' | 'emerald' | 'indigo'; // Allows page-specific branding
  children?: ReactNode; // For adding CTAs/Buttons below the description
  className?: string; // Allow custom styles (e.g., extra padding for overlap layouts)
}

const themeMap = {
  rose: { text: 'text-rose-500', bg: 'bg-rose-500', glow: 'bg-rose-600/10', gradient: 'from-rose-400 to-rose-600', ping: 'bg-rose-400' },
  blue: { text: 'text-blue-500', bg: 'bg-blue-500', glow: 'bg-blue-600/10', gradient: 'from-blue-400 to-blue-600', ping: 'bg-blue-400' },
  emerald: { text: 'text-emerald-500', bg: 'bg-emerald-500', glow: 'bg-emerald-600/10', gradient: 'from-emerald-400 to-emerald-600', ping: 'bg-emerald-400' },
  indigo: { text: 'text-indigo-500', bg: 'bg-indigo-500', glow: 'bg-indigo-600/10', gradient: 'from-indigo-400 to-indigo-600', ping: 'bg-indigo-400' },
};

export function Hero({ 
  badge, 
  title, 
  splitTitle, 
  description, 
  chips = [], 
  variant = 'rose',
  children,
  className = ''
}: HeroProps) {
  const theme = themeMap[variant];

  return (
    <Section variant="dark" className={`!pt-10 md:!pt-24 !pb-8 sm:!pb-12 md:!pb-16 relative overflow-hidden ${className}`}>
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-[#0f172a] to-[#1e293b]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay" />
        {/* Dynamic Glow based on variant */}
        <div className={`absolute top-[-20%] right-[-10%] w-[800px] h-[800px] ${theme.glow} rounded-full blur-[120px] pointer-events-none`} />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/5 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${theme.ping} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${theme.bg}`}></span>
            </span>
            <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-slate-300">
              {badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight tracking-tight font-anek"
          >
            {title} <br className="md:hidden" />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradient} font-hind font-black ml-1 md:ml-2`}>
              {splitTitle}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-sm sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 md:mb-10 font-hind px-4 sm:px-0"
          >
            {description}
          </motion.p>

          {/* Optional Children Slot (Buttons/CTAs) */}
          {children && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mb-10"
            >
              {children}
            </motion.div>
          )}

          {/* Chips */}
          <div className="flex flex-wrap justify-center gap-3">
            {chips.map((chip, i) => {
              const Icon = chip.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-sm transition-all hover:bg-white/[0.08]"
                >
                  <Icon size={16} className={theme.text} />
                  <span className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-widest font-anek">
                    {chip.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
