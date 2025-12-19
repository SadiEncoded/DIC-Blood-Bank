'use client';
import { COMMUNITY_HERO } from "@/app/lib/data/community";
import { motion } from "framer-motion";
import { Users2 } from "lucide-react";
import { Container, Section } from "../../../components/ui";

export default function CommunityHero() {
  const { badge, title, description, chips } = COMMUNITY_HERO;

  return (
    <Section variant="dark" className="!pt-20 md:!pt-32 !pb-24 md:!pb-32">
      <Container>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-[#0f172a] to-[#1e293b]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(244,63,94,0.05)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.1] mix-blend-soft-light bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      </div>

      <div className="relative z-10 text-center">

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/5 mb-6"
        >
          <Users2 className="w-4 h-4 text-rose-500" />
          <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-slate-300">
            {badge}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight font-poppins"
        >
          {title.split(' ').slice(0, 2).join(' ')} <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-600 font-hind">
             {title.split(' ').slice(2).join(' ')}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-sm md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10 font-hind opacity-90"
        >
          {description}
        </motion.p>

        <div className="flex flex-wrap justify-center gap-3">
          {chips.map((chip, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-sm transition-all hover:bg-white/[0.08]"
            >
              <chip.icon size={14} className="text-rose-500" />
              <span className="text-[10px] md:text-[11px] font-bold text-slate-300 uppercase tracking-widest font-poppins">
                {chip.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      </Container>
    </Section>

  );
}
