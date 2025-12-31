'use client';

import { CTA_CONTENT } from '@/assets/data/home/Home-Content';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Clock, Heart, Shield } from 'lucide-react';

export default function AboutDICBloodBank() {
  const { mission, visual, cta } = CTA_CONTENT;

  return (
    <div className="font-hind">
      {/* MISSION SECTION */}
      <section className="relative bg-gradient-to-b from-slate-50 to-white py-16 md:py-24 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            
            {/* Left - Mission */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 border border-rose-100 px-3 py-1 w-fit">
                <Award className="h-3.5 w-3.5 text-rose-600" />
                <span className="text-[10px] font-bold text-rose-700 uppercase tracking-[0.2em]">
                  {mission.badge}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-poppins text-slate-900 leading-tight">
                <span className="text-rose-600">{mission.title.highlight}</span>{' '}
                <span>{mission.title.main}</span>
              </h2>

              <div className="space-y-5 text-slate-600 leading-relaxed font-hind">
                <p className="md:text-lg text-base font-medium text-slate-700">
                   {mission.content1}
                </p>

                <p className="md:text-base text-sm text-slate-500">
                  {mission.content2}
                </p>

                <div className="flex flex-wrap gap-5 pt-4 border-t border-slate-100">
                   <FeatureItem icon={<Shield size={16} />} label={mission.features.verified} />
                   <FeatureItem icon={<Clock size={16} />} label={mission.features.active24h} />
                   <FeatureItem icon={<Heart size={16} />} label={mission.features.volunteer} />
                </div>
              </div>
            </motion.div>

            {/* Right - Visual Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative hidden md:block lg:block"
            >
              <div className="relative bg-[#0B1221] rounded-[2rem] p-10 md:p-14 shadow-xl overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center">
                    <Heart className="h-8 w-8 text-rose-500 fill-current" />
                  </div>
                  
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-4 font-poppins">
                    {visual.title}
                  </h4>
                  
                  <p className="text-slate-400 text-base leading-relaxed font-light">
                    {visual.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA SECTION (Refined & Professional Banner) */}
      <section className="relative bg-gradient-to-r from-rose-900 via-rose-800 to-slate-900 py-12 md:py-20 lg:py-24 overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-8 lg:px-12">
          <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl w-full"
            >
              <h3 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white tracking-tight font-poppins leading-snug">
                {cta.titlePre} <span className="text-yellow-200 text-3xl md:text-4xl lg:text-[50px]">{cta.titleHighlight}</span> {cta.titleMid} <span className="text-yellow-200 text-3xl md:text-4xl lg:text-[50px]">{cta.titlePost}</span>
              </h3>

              <p className="mt-4 text-xs md:text-base lg:text-lg text-rose-100/80 font-light max-w-xl mx-auto leading-relaxed">
                 {cta.description}
              </p>
            </motion.div>

            <motion.a
              href="/signup"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 rounded-xl bg-white text-rose-800 px-6 py-3.5 md:px-8 md:py-4 text-sm md:text-base font-bold shadow-lg transition-all duration-300"
            >
              <Heart className="h-4 w-4 fill-current group-hover:scale-110 transition-transform" />
              {cta.button}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
      <div className="text-rose-500">{icon}</div>
      {label}
    </div>
  );
}
