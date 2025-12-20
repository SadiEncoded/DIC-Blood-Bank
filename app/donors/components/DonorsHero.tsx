'use client';

import { motion } from "framer-motion";
import { ChevronDown, Star } from "lucide-react";

export function DonorsHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0f1a] pt-24 md:pt-40 pb-24 md:pb-32">
      {/* Background Layering matching CommunityHero */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-[#0f172a] to-[#0a0f1a]" />
        
        {/* Glow Orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full opacity-[0.15] bg-[radial-gradient(circle_at_50%_0%,rgba(244,63,94,0.4)_0%,transparent_70%)]" />
        
        {/* Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.05] mix-blend-soft-light bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 mb-8"
        >
          <Star size={14} className="text-rose-500 fill-rose-500/20" />
          <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-slate-300 font-poppins">
            Blood Heroes
          </span>
        </motion.div>
        
        {/* Heading with Gradient Text */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight font-poppins"
        >
          আমাদের <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-500 to-red-600 font-hind">
             রক্তদাতা
          </span>
        </motion.h1>
        
        {/* Description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="text-slate-400 font-hind text-base md:text-xl max-w-3xl mx-auto leading-relaxed opacity-90"
        >
          আপনার প্রয়োজনে পাশে দাঁড়াতে প্রস্তুত আমাদের নিবেদিত রক্তদাতাদের তালিকা। <br className="hidden md:block" /> 
          রক্তদান মহৎ দান, মানবতার সেবায় এগিয়ে আসুন।
        </motion.p>

         {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] tracking-[0.4em] text-slate-500 uppercase font-medium">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-slate-600" />
          </motion.div>
        </motion.div>
      </div>

      {/* Grid Overlay - Masked for smoothness */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.05] [mask-image:radial-gradient(white,transparent_85%)] pointer-events-none" />
    </section>
  );
}
