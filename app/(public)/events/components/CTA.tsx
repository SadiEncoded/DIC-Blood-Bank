'use client';

import { EVENTS_PAGE_CONTENT } from '@/lib/data/events';
import { ArrowRight } from 'lucide-react';

export function EventsCTA() {
  return (
    <section className="px-6 pb-24">
      <div className="max-w-5xl mx-auto relative overflow-hidden bg-slate-900 rounded-[3rem] p-8 md:p-20 text-center shadow-2xl">
        <div className="absolute inset-0 pointer-events-none opacity-[0.1] mix-blend-soft-light bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-blue-500/5" />
        
        <div className="relative z-10 space-y-8">
          <h2 className="text-fluid-section font-heading-opt text-white font-poppins leading-tight">
            {EVENTS_PAGE_CONTENT.cta.title}
          </h2>
          <p className="text-slate-400 text-sm md:text-xl max-w-2xl mx-auto font-hind leading-relaxed">
            {EVENTS_PAGE_CONTENT.cta.subtitle}
          </p>
          <div className="flex justify-center pt-4">
            <a 
              href="/contact" 
              className="group inline-flex items-center gap-3 px-8 py-4 bg-rose-600 text-white font-bold rounded-2xl hover:bg-rose-700 hover:shadow-2xl hover:shadow-rose-500/30 transition-all font-poppins text-base md:text-lg"
            >
              {EVENTS_PAGE_CONTENT.cta.button} <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
