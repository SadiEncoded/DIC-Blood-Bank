'use client';
import { MISSION_VISION } from '@/app/lib/data/about';
import { motion } from 'framer-motion';

export default function MissionVisionSection() {
  const { header, mission, vision } = MISSION_VISION;

  return (
    <section className="relative py-32 bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <span className="text-[10px] font-bold tracking-[0.4em] text-rose-600 uppercase mb-4 block">
              {header.badge}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-poppins tracking-tighter">
              {header.title}
            </h2>
          </motion.div>
          
          <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="text-slate-400 font-hind text-sm max-w-xs md:text-right"
          >
            {header.description}
          </motion.p>
        </div>

        {/* Main Purpose Card */}
        <div className="relative p-1 md:p-1.5 rounded-[3rem] bg-gradient-to-b from-slate-100 to-transparent">
          <div className="bg-slate-50 rounded-[2.8rem] p-8 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative overflow-hidden">
            
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 blur-[100px] rounded-full" />

            {/* --- MISSION SECTION --- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white shadow-sm text-rose-500 group-hover:scale-110 transition-transform duration-500">
                  <mission.icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-bold tracking-[0.2em] text-slate-400 uppercase">
                  {mission.badge}
                </h3>
              </div>

              <h4 className="text-2xl font-bold text-slate-900 mb-6 font-poppins tracking-tight">
                {mission.title}
              </h4>
              
              <div className="relative">
                <div className="absolute left-0 top-0 w-1 h-full bg-rose-500/10 rounded-full group-hover:bg-rose-500 transition-colors duration-500" />
                <p className="text-slate-600 font-hind text-lg leading-[1.8] pl-8">
                  {mission.content}
                </p>
              </div>
            </motion.div>

            {/* --- VISION SECTION --- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white shadow-sm text-blue-500 group-hover:scale-110 transition-transform duration-500">
                  <vision.icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-bold tracking-[0.2em] text-slate-400 uppercase">
                  {vision.badge}
                </h3>
              </div>

              <h4 className="text-2xl font-bold text-slate-900 mb-6 font-poppins tracking-tight">
                {vision.title}
              </h4>

              <div className="relative">
                <div className="absolute left-0 top-0 w-1 h-full bg-blue-500/10 rounded-full group-hover:bg-blue-500 transition-colors duration-500" />
                <p className="text-slate-600 font-hind text-lg leading-[1.8] pl-8">
                  {vision.content}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
