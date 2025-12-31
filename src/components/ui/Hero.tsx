'use client';

import { Container, Section } from '@/components/ui';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { ElementType, ReactNode } from 'react';

interface HeroChip {
  icon: LucideIcon | ElementType;
  label: string;
}

interface HeroStat {
  label: string;
  value: string;
  tone?: 'rose' | 'blue' | 'emerald';
}

interface HeroProps {
  badge?: string;
  badgeIcon?: LucideIcon | ElementType;
  title: string | ReactNode;
  highlightedTitle?: string | ReactNode;
  description: string;
  chips?: HeroChip[];
  stats?: HeroStat[];
  children?: ReactNode; // For CTAs
  image?: ReactNode;
  layout?: 'centered' | 'split';
}

export function Hero({
  badge,
  badgeIcon: BadgeIcon,
  title,
  highlightedTitle,
  description,
  chips = [],
  stats = [],
  children,
  image,
  layout = 'centered'
}: HeroProps) {
  const isCentered = layout === 'centered';

  return (
    <Section variant="dark" className="relative overflow-hidden flex items-center min-h-[50vh] md:min-h-[70vh] lg:min-h-[85vh] py-16 md:py-24 lg:py-32">
      {/* Background Decor - FAANG Level Depth */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#1e293b] z-0" />
        
        {/* Earth Photo Overlay */}
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen">
          <img 
            src="https://plus.unsplash.com/premium_photo-1723489222201-7e86252e426a?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="World Overlay" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Modern Mesh Gradients */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-rose-600/10 rounded-full blur-[80px] md:blur-[120px] mix-blend-screen animate-pulse duration-[4000ms]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-indigo-600/5 rounded-full blur-[60px] md:blur-[100px] mix-blend-screen" />
        
        {/* Subtle Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] md:bg-[size:40px_40px] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
      </div>

      <Container className="relative z-10">
        <div className={`grid ${layout === 'split' ? 'lg:grid-cols-2 gap-12 lg:gap-20 items-center' : ''}`}>
          
          {/* Content Area */}
          <div className={`flex flex-col ${isCentered ? 'items-center text-center max-w-4xl mx-auto' : 'items-start text-left'}`}>
            
            {/* Badge */}
            {badge && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-6 md:mb-8 hover:bg-white/10 transition-colors group cursor-default"
              >
                {BadgeIcon ? <BadgeIcon size={14} className="text-rose-500 md:w-4 md:h-4" /> : (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                  </span>
                )}
                <span className="text-[10px] md:text-xs font-bold text-rose-100/90 tracking-[0.2em] uppercase font-inter">
                  {badge}
                </span>
              </motion.div>
            )}

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-8 leading-[1.1] tracking-tight font-inter"
            >
              <span className="block text-slate-100 drop-shadow-sm">{title}</span>
              {highlightedTitle && (
                <span className="block mt-1 md:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-500 to-amber-200 pb-2">
                  {highlightedTitle}
                </span>
              )}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-base sm:text-lg md:text-xl text-slate-400 mb-8 md:mb-12 leading-relaxed font-inter opacity-90 max-w-2xl font-light"
            >
              {description}
            </motion.p>

            {/* CTAs */}
            {children && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className={`flex flex-col sm:flex-row gap-4 w-full sm:w-auto ${isCentered ? 'justify-center' : ''}`}
              >
                {children}
              </motion.div>
            )}

            {/* Chips */}
            {chips.length > 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className={`flex flex-wrap ${isCentered ? 'justify-center' : 'justify-start'} gap-3 mt-10 md:mt-14`}
              >
                {chips.map((chip, i) => {
                  const ChipIcon = chip.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-white/[0.02] border border-white/[0.04] backdrop-blur-sm transition-all hover:bg-white/[0.05] hover:border-white/[0.08]"
                    >
                      <ChipIcon size={12} className="text-rose-500 md:w-3.5 md:h-3.5" />
                      <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest font-inter">
                        {chip.label}
                      </span>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* Stats */}
            {stats.length > 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className={`mt-10 md:mt-16 flex items-center gap-8 pt-8 border-t border-white/5 w-full ${isCentered ? 'justify-center' : 'justify-start'}`}
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="flex -space-x-3 md:-space-x-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-[#0f172a] bg-slate-800 flex items-center justify-center overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 animate-pulse" />
                      </div>
                    ))}
                  </div>
                  <div>
                    {stats[0] && (
                      <>
                        <p className="text-white font-bold text-base md:text-xl leading-none">{stats[0].value}</p>
                        <p className="text-slate-500 text-[10px] md:text-sm font-medium mt-0.5">{stats[0].label}</p>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Image/Visual Area */}
          {layout === 'split' && image && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="hidden md:block lg:block relative h-full min-h-[500px] w-full overflow-hidden"
            >
              {image}
            </motion.div>
          )}
        </div>
      </Container>
    </Section>
  );
}
