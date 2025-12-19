'use client';

import { motion } from "framer-motion";
import { Activity, ShieldCheck, Users } from "lucide-react";
import { Container, Section } from "../../../components/ui";

export function RegisterHero() {
  const chips = [
    { icon: Activity, label: "Live Stats" },
    { icon: Users, label: "1.2k Donors" },
    { icon: ShieldCheck, label: "Verified" },
  ];

  return (
    <Section variant="dark" className="!pt-24 md:!pt-32 !pb-32 md:!pb-48">
      <Container>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-[#0f172a] to-[#1e293b]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(244,63,94,0.05)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.1] mix-blend-soft-light bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center text-center">

        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/5 mb-8 shadow-2xl"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0a0f1a] bg-slate-800" />
            ))}
          </div>
          <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-slate-300">
            Join <span className="text-rose-400 font-bold">500+</span> Heroes today
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight font-poppins"
        > 
          হয়ে উঠুন একজন <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-500 to-red-600 font-hind font-medium">
            রক্তদাতা হিরো
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-sm md:text-lg max-w-2xl mb-10 font-hind leading-relaxed opacity-90"
        >
          আপনার এক সিদ্ধান্ত বাঁচিয়ে দিতে পারে একটি জীবন। <br className="hidden md:block" />
          আজই নাম নিবন্ধন করুন এবং মানবিকতার মিছিলে শামিল হোন।
        </motion.p>

        <div className="flex flex-wrap justify-center gap-3">
          {chips.map((chip, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-sm"
            >
              <chip.icon size={14} className="text-rose-500" />
              <span className="text-[11px] font-bold text-slate-300 font-poppins uppercase tracking-wider">{chip.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
      </Container>
    </Section>

  );
}
