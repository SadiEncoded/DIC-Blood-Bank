'use client';
import { team } from '@/app/lib/data/founders';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Container, Section } from '../../../components/ui';


export default function FounderTeamSection() {
  return (
    <Section>
      <Container>

      {/* Section Header with Refined Typography */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
        <div className="max-w-xl">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] font-bold tracking-[0.4em] text-rose-600 uppercase mb-4 block"
          >
            Our Founders
          </motion.span>
          <motion.h3 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 font-poppins tracking-tighter"
          >
            The Minds Behind <br /> 
            <span className="text-slate-400 font-light italic">DIC Blood Bank</span>
          </motion.h3>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">
            Class of Phoenix &apos;24
          </p>
        </div>
      </div>

      {/* Profile Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {team.map((member, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative aspect-square mb-4 overflow-hidden rounded-2xl bg-slate-50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-rose-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                />
              </div>

              <div className="relative pl-2 border-l-2 border-transparent group-hover:border-rose-500 transition-all duration-500">
                <p className="text-[9px] font-bold text-rose-500 uppercase tracking-[0.2em] mb-1">
                  {member.role}
                </p>
                <h4 className="text-lg font-bold text-slate-900 font-poppins mb-1 tracking-tight">
                  {member.name}
                </h4>
                <p className="text-[11px] font-medium text-slate-500 leading-tight">
                  {member.study}
                </p>
                <p className="text-[10px] text-slate-400 leading-tight">
                  {member.institution}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
