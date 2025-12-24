'use client';

import { CTA_CONTENT } from '@/lib/data/Home-Content';
import { motion } from 'framer-motion';
import { Award, Clock, Heart, Shield } from 'lucide-react';

export default function AboutDICBloodBank() {
  const { mission, visual, cta } = CTA_CONTENT;

  return (
    <>
      {/* MISSION SECTION */}
      <section className="relative bg-gradient-to-b from-slate-50 to-white py-12 md:py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left - Mission */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 border border-rose-100 px-3 py-1.5 w-fit">
                <Award className="h-3.5 w-3.5 text-rose-600" />
                <span className="text-[10px] md:text-sm font-semibold text-rose-800 uppercase tracking-wide">
                  {mission.badge}
                </span>
              </div>

              <h3 className="text-fluid-section font-heading-opt text-slate-900 leading-tight font-poppins">
                <span className="text-rose-600 font-bengali-opt">{mission.title.highlight}</span>{' '}
                <span className="text-slate-700">{mission.title.main}</span>
              </h3>

              <div className="space-y-4 md:space-y-6 text-sm md:text-lg text-slate-600 leading-relaxed font-hind">
                <p>
                   {mission.content1}
                </p>

                <p className="text-rose-800 font-medium">
                  {mission.content2}
                </p>

                <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] md:text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Shield className="h-3.5 h-3.5 md:h-4 md:w-4 text-rose-500" />
                    {mission.features.verified}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 md:h-4 md:w-4 text-rose-500" />
                    {mission.features.active24h}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-3.5 w-3.5 md:h-4 md:w-4 text-rose-500" />
                    {mission.features.volunteer}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right - Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white rounded-2xl p-6 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/50">
                <div className="absolute inset-0 bg-slate-50/50 opacity-50 rounded-2xl" />
                
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 md:w-32 md:h-32 mx-auto mb-5 md:mb-6 rounded-full bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-200">
                    <Heart className="h-8 w-8 md:h-12 md:w-12 text-white" />
                  </div>
                  
                  <h4 className="text-fluid-card font-heading-opt text-slate-900 mb-3 md:mb-4 font-poppins leading-tight">
                    {visual.title}
                  </h4>
                  
                  <p className="text-xs md:text-lg text-slate-500 leading-relaxed font-hind">
                    {visual.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative bg-gradient-to-r from-rose-800 to-slate-900 py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/400?text=Pattern')] opacity-5 mix-blend-overlay" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h3 className="text-fluid-section font-heading-opt text-white mb-5 md:mb-6 leading-tight font-poppins">
              {cta.titlePre} <span className="text-rose-400 font-bengali-opt">{cta.titleHighlight}</span> <br className="hidden sm:block" />
              <span className="text-white">{cta.titleMid}</span> <br className="hidden sm:block" />
              <span className="text-rose-200 font-bengali-opt">{cta.titlePost}</span>
            </h3>

            <p className="text-sm md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto font-hind">
               {cta.description}
            </p>
          </motion.div>

          <motion.a
            href="/signup"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="group inline-flex items-center gap-2 rounded-full bg-white text-rose-700 px-6 py-3 md:px-12 md:py-5 text-sm md:text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 backdrop-blur-md border border-white/20"
          >
            <Heart className="h-4 w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform fill-current" />
            {cta.button}
            <svg className="w-4 h-4 md:w-5 md:h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </div>
      </section>
    </>
  );
}

function ImpactCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/10 text-center transition-all hover:bg-white/10 hover:border-white/20"
    >
      <div className="mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
        {icon}
      </div>
      <div className="text-xl md:text-3xl font-bold text-white mb-2">{value}</div>
      <div className="text-[9px] md:text-sm uppercase tracking-wider text-rose-200/80 group-hover:text-rose-200">
        {label}
      </div>
    </motion.div>
  );
}
