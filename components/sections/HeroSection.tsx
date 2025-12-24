'use client';
import { Container, Section } from '@/components/ui';
import { useEffect, useState } from 'react';

import { theme } from '@/lib/config';
import { DONOR_STATS, HERO_CONTENT } from '@/lib/data/Home-Content';
import { Stat } from '@/lib/types';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';


function TypewriterEffect() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(timeout);
  }, [blink]);

  useEffect(() => {
    const currentPhrase = HERO_CONTENT.typingPhrases[index];
    if (!currentPhrase) return;

    if (subIndex === currentPhrase.length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % HERO_CONTENT.typingPhrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -75 : 150));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <span className="inline-block min-w-[200px] text-left">
      {HERO_CONTENT.typingPhrases[index]?.substring(0, subIndex) || ''}
      <span className={`${blink ? 'opacity-100' : 'opacity-0'} ml-1 inline-block w-1 h-6 md:h-12 bg-rose-500 align-middle shadow-[0_0_10px_rgba(244,63,94,0.8)]`} />
    </span>
  );
}

export default function Hero({ stats }: { stats?: Stat[] }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);

  const activeStats = stats || DONOR_STATS;
  const donorsStat = activeStats.find((s: Stat) => s.tone === 'rose') || activeStats[0];

  return (
    <Section variant="dark" className="!min-h-screen flex items-center !pt-14 !pb-12 md:!pt-16 md:!pb-16 selection:bg-rose-500/30 selection:text-rose-100">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

        {/* --- Left Content --- */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start text-left"
        >
          {/* Badge */}
          <motion.div 
            {...theme.animations.variants.fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8 hover:bg-white/10 transition-colors group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span className="text-[11px] md:text-sm font-bold text-slate-300 tracking-widest uppercase">
              {HERO_CONTENT.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-6 font-poppins">
            <span className="block text-slate-100">{HERO_CONTENT.title}</span>
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-500 to-rose-400 pb-2">
              <TypewriterEffect />
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm md:text-md lg:text-lg text-slate-400 mb-10 max-w-lg leading-relaxed font-light font-hind">
            {HERO_CONTENT.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/signup" className="group relative px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold shadow-xl shadow-rose-900/20 transition-all hover:scale-[1.02] active:scale-[0.98] text-center">
              {HERO_CONTENT.cta.donor}
            </Link>
            
            <Link href="/donors" className="group px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-slate-200 rounded-2xl font-bold hover:bg-white/10 transition-all text-center">
               {HERO_CONTENT.cta.find}
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex items-center gap-5 pt-8 border-t border-white/5 w-full">
             <div className="flex -space-x-3">
               {[1,2,3,4].map((i) => (
                 <div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center">
                    <Users size={18} className="text-slate-400" />
                 </div>
               ))}
             </div>
             <div>
               <p className="text-white font-bold text-lg leading-none">{donorsStat?.value}+</p>
               <p className="text-slate-400 text-xs md:text-sm">{donorsStat?.label}</p>
             </div>
          </div>
        </motion.div>

        {/* --- Right Visual --- */}
        <motion.div style={{ y: y1 }} className="relative hidden lg:block h-[600px] w-full">
             <div className="absolute inset-0 flex items-center justify-center">
               <div className="relative w-full h-full">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-rose-500/20 rounded-full blur-[80px]" />
                 <Image 
                   src="/herorightsideimg.svg" 
                   alt="Life Saving" 
                   fill 
                   className="object-contain drop-shadow-2xl"
                   priority
                 />
               </div>
             </div>
        </motion.div>
        
        {/* Auth Modal Removed from here - controlled via Header for Login only */}
        </div>

        {/* 1. Atmosphere & Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay" />
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-rose-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
      </Container>
    </Section>
  );
}
