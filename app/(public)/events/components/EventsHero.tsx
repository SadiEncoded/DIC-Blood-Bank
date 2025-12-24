'use client'

import { Container, Section } from '@/components/ui';
import { EVENTS_PAGE_CONTENT } from '@/lib/data/events';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

export default function EventsHero() {
  const { hero } = EVENTS_PAGE_CONTENT;

  return (
    <Section variant="dark" className="!pt-14 md:!pt-16 !pb-12 md:!pb-16">
      <Container>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-[#0f172a] to-[#1e293b]" />
      </div>

      <div className="relative z-10 text-center">

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/5 mb-6"
        >
          <Calendar className="w-4 h-4 text-rose-500" />
          <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-slate-300">
            {hero.eyebrow}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight font-poppins"
        >
          {hero.title} <br className="md:hidden" />
          <span className="text-rose-500 font-hind">
             {hero.splitTitle}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-sm md:text-md lg:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10 font-hind opacity-90"
        >
          {hero.subtitle}
        </motion.p>
      </div>
      </Container>
    </Section>
  );
}
