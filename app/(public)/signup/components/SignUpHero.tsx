'use client';
import { Container, Section } from "@/components/ui";
import { SIGNUP_PAGE_CONTENT } from "@/lib/data/signup";
import { motion } from "framer-motion";
import { Users2 } from "lucide-react";

export function SignUpHero() {
  const { badge, title, splitTitle, description, chips } = SIGNUP_PAGE_CONTENT.hero;

  return (
    <Section variant="dark" className="!pt-14 md:!pt-16 !pb-12 md:!pb-16">
      <Container>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-[#0f172a] to-[#1e293b]" />
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
          className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight font-poppins"
        >
          {title} <br className="md:hidden" />
          <span className="text-rose-500 font-hind">
             {splitTitle}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-sm md:text-md lg:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10 font-hind opacity-90"
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
              <span className="text-[8px] md:text-[10px] font-bold text-slate-300 uppercase tracking-widest font-poppins">
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
