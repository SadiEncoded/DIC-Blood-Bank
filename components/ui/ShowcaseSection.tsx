// components/ui/ShowcaseSection.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Container, Section } from './index';
import { SectionHeader } from './SectionHeader';

export interface ShowcaseMember {
  name: string;
  role: string;
  image: string;
  study?: string;
  institution?: string;
  quote?: string;
}

export interface ShowcaseHero {
  image: string;
  label: string;
  description: string;
}

export interface ShowcaseSectionProps {
  eyebrow?: string;
  title: string;
  italicTitle?: string;
  rightLabel?: string;
  layout: 'grid' | 'hero';
  gridData?: ShowcaseMember[];
  heroData?: ShowcaseHero;
  className?: string;
}

export function ShowcaseSection({
  eyebrow,
  title,
  italicTitle,
  rightLabel,
  layout,
  gridData,
  heroData,
  className = "",
}: ShowcaseSectionProps) {
  return (
    <Section className={className}>
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          italicTitle={italicTitle}
          rightElement={
            rightLabel ? (
              <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">
                {rightLabel}
              </p>
            ) : undefined
          }
        />

        {layout === 'grid' && gridData && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {gridData.map((member, idx) => (
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
                  {member.study && (
                    <p className="text-[11px] font-medium text-slate-500 leading-tight">
                      {member.study}
                    </p>
                  )}
                  {member.institution && (
                    <p className="text-[10px] text-slate-400 leading-tight">
                      {member.institution}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {layout === 'hero' && heroData && (
          <>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-slate-100 shadow-2xl shadow-rose-200/50"
            >
              <Image
                src={heroData.image}
                alt={heroData.label}
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
                     {heroData.label}
                   </motion.h4>
                   <p className="text-rose-100/90 text-sm md:text-xl font-medium font-hind leading-relaxed">
                     {heroData.description}
                   </p>
                 </div>
              </div>
            </motion.div>

            {/* Optional Caption for Mobile */}
            <div className="mt-8 md:hidden">
                <h4 className="text-xl font-bold text-slate-900 font-poppins mb-2">{heroData.label}</h4>
                <p className="text-slate-500 text-sm font-hind">
                    {heroData.description}
                </p>
            </div>
          </>
        )}
      </Container>
    </Section>
  );
}
