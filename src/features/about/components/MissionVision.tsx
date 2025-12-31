'use client';
import { MISSION_VISION } from '@/assets/data/about';
import { motion } from 'framer-motion';
import { Eye, Target } from 'lucide-react';

export default function MissionVisionSection() {
  const { header, mission, vision } = MISSION_VISION;

  // Helper to split title into two parts for the dual-tone effect
  const words = header.title.split(' ');
  const firstHalf = words.slice(0, Math.ceil(words.length / 2)).join(' ');
  const secondHalf = words.slice(Math.ceil(words.length / 2)).join(' ');

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-16 py-8 md:py-16 font-hind">
        
        {/* --- REFINED HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            {/* Minimalist Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-slate-50 mb-4 sm:mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">
                {header.badge}
              </span>
            </div>

            {/* Dual-Tone Title */}
            <h2 className="text-xl sm:text-4xl md:text-5xl font-bold tracking-tighter font-poppins leading-[1.1]">
               <span className="text-slate-900">{firstHalf}</span>{' '}
               <span className="text-rose-600">{secondHalf}</span>
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-[13px] sm:text-base md:text-lg max-w-sm leading-relaxed border-l-2 border-rose-100 pl-4 sm:pl-6 mb-2"
          >
            {header.description}
          </motion.p>
        </div>

        {/* --- REFINED WHITE GRID --- */}
        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl relative border border-slate-200">
          
          {/* Subtle Ambient Accents */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-rose-50 blur-[100px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-blue-50 blur-[100px] rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 relative z-10">
            
            {/* MISSION SECTION */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-5 sm:p-8 md:p-10 lg:p-14 group hover:bg-slate-50/50 transition-colors duration-500"
            >
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-11 h-11 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 group-hover:border-rose-200 group-hover:bg-rose-100/50 transition-all duration-500">
                    <Target size={18} strokeWidth={1.5} />
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-rose-600/70 uppercase tracking-[0.3em] mb-3">
                    {mission.badge}
                  </h4>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 font-poppins tracking-wide">
                    {mission.title}
                  </h3>
                  <p className="text-slate-600 text-[15px] leading-relaxed">
                    {mission.content}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* VISION SECTION */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="p-5 sm:p-8 md:p-10 lg:p-14 group hover:bg-slate-50/50 transition-colors duration-500"
            >
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:border-blue-200 group-hover:bg-blue-100/50 transition-all duration-500">
                    <Eye size={18} strokeWidth={1.5} />
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-blue-600/70 uppercase tracking-[0.3em] mb-3">
                    {vision.badge}
                  </h4>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 font-poppins tracking-wide">
                    {vision.title}
                  </h3>
                  <p className="text-slate-600 text-[15px] leading-relaxed">
                    {vision.content}
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
    </section>
  );
}
