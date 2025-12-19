'use client';

import { TEAM_SECTION } from "@/app/lib/data/community";
import { motion } from "framer-motion";
import Image from 'next/image';
import { Container, Section } from "../../../components/ui";

export default function TeamSection() {
  const { badge, titlePre, titleMain, classTag, teamLabel, description, image } = TEAM_SECTION;

  return (
    <Section>
      <Container>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
          <div className="max-w-xl">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[10px] font-bold tracking-[0.4em] text-rose-600 uppercase mb-4 block"
            >
              {badge}
            </motion.span>
            <motion.h3 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-slate-900 font-poppins tracking-tighter"
            >
              {titlePre} <br /> 
              <span className="text-slate-400 font-light italic text-3xl md:text-4xl">{titleMain}</span>
            </motion.h3>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">
              {classTag}
            </p>
          </div>
        </div>

        {/* Collective Admin Showcase */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative group w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-slate-100 shadow-2xl shadow-rose-200/50"
        >
          <Image
            src={image}
            alt={teamLabel}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 pointer-events-none translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-out">
             <div className="max-w-2xl">
               <motion.h4 
                 className="text-3xl md:text-5xl font-bold text-white font-poppins mb-4 tracking-tight"
               >
                 {teamLabel}
               </motion.h4>
               <p className="text-rose-100/90 text-sm md:text-xl font-medium font-hind leading-relaxed">
                 {description}
               </p>
             </div>
          </div>
        </motion.div>

        {/* Optional Caption for Mobile */}
        <div className="mt-8 md:hidden">
            <h4 className="text-xl font-bold text-slate-900 font-poppins mb-2">{teamLabel}</h4>
            <p className="text-slate-500 text-sm font-hind">
                {description}
            </p>
        </div>
      </Container>
    </Section>
  );
}
