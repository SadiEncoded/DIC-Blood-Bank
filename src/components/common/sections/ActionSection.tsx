'use client';

import { fadeInUpAlt as fadeInUp } from '@/assets/animations';
import { ACTION_CONTENT } from '@/assets/data/home/Home-Content';
import { Container, Section } from '@/components/ui';
import { motion } from 'framer-motion';
import { ArrowRight, Droplet, Search, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function ActionSection() {
  return (
    <div className="flex flex-col font-hind hidden md:block lg:block">
      {/* Main Action Block */}
      <Section variant="white">
        <Container>
          <div className="bg-[#0B1221] rounded-[1.5rem] md:rounded-[3rem] overflow-hidden relative group border border-slate-800/50 shadow-2xl">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1615461065929-4f8ffed6ca40?w=1200&auto=format&fit=crop&q=80"
                alt="Process background"
                className="w-full h-full object-cover opacity-15 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B1221] via-[#0B1221]/90 to-transparent"></div>
            </div>

            <div className="relative z-10 p-5 md:p-12 lg:p-16 grid lg:grid-cols-5 gap-8 md:gap-10 items-center">
              
              {/* Left Content */}
              <motion.div
                className="lg:col-span-3 space-y-6 md:space-y-8"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
              >
                <motion.h2 
                  variants={fadeInUp}
                  className="text-3xl md:text-5xl font-extrabold text-white leading-tight font-poppins tracking-tight"
                >
                  {ACTION_CONTENT.title}
                </motion.h2>
                
                <motion.div variants={fadeInUp} className="text-slate-400 text-base md:text-lg max-w-lg leading-relaxed">
                  <p>{ACTION_CONTENT.description1}</p>
                  <p className="mt-3 text-slate-500 font-light text-sm md:text-base">
                    {ACTION_CONTENT.description2}
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 pt-4 w-full sm:w-auto">
                  <Link href="/signup" className="group bg-rose-600 hover:bg-rose-700 text-white font-bold p-4 md:px-8 md:py-3.5 rounded-xl flex justify-center items-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-rose-900/20">
                    <UserPlus className="w-5 h-5" />
                    <span>{ACTION_CONTENT.cta.becomeDonor}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link href="/donors" className="group bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border border-white/10 font-bold p-4 md:px-8 md:py-3.5 rounded-xl flex justify-center items-center gap-2 transition-all active:scale-[0.98]">
                    <Search className="w-5 h-5" />
                    <span>{ACTION_CONTENT.cta.findDonor}</span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right Side Info - Compact Grid on Mobile */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-3 lg:flex lg:flex-col lg:gap-4 lg:col-span-2 mt-2 lg:mt-0 border-t border-white/10 pt-4 lg:border-none lg:pt-0"
              >
                <div className="bg-white/[0.03] backdrop-blur-md p-3 md:p-5 rounded-xl md:rounded-2xl border border-white/5 group/card transition-colors hover:bg-white/[0.05]">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-rose-500/10 flex items-center justify-center flex-shrink-0">
                      <Droplet className="text-rose-500" size={16} fill="currentColor" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold font-poppins text-xs md:text-base">One Donation</h4>
                      <p className="text-slate-500 text-[10px] md:text-sm mt-0.5 leading-tight">Saves 3 lives.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-rose-600/90 to-rose-700/90 p-3 md:p-5 rounded-xl md:rounded-2xl shadow-xl relative overflow-hidden flex flex-col justify-center">
                  <h4 className="text-xl md:text-3xl font-bold text-white font-poppins">100%</h4>
                  <p className="text-rose-100 font-medium text-[10px] md:text-sm mt-0.5 leading-tight">Volunteer Platform</p>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Compact Integrated Banner */}
      <div className="bg-rose-600 py-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <Container>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative z-10 text-center text-base md:text-xl font-medium text-white font-poppins italic tracking-tight"
          >
            "{ACTION_CONTENT.banner}"
          </motion.p>
        </Container>
      </div>
    </div>
  );
}
