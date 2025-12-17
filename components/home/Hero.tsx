'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Search, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// --- Typewriter Effect (Updated for Dark Theme) ---
const TYPING_PHRASES = ["Be A Hero", "Save A Life", "Donate Blood"];

function TypewriterEffect() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(timeout);
  }, [blink]);

  useEffect(() => {
    const currentPhrase = TYPING_PHRASES[index];
    if (!currentPhrase) return;

    if (subIndex === currentPhrase.length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % TYPING_PHRASES.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -75 : 150));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <span className="inline-block min-w-[200px] text-left">
      {TYPING_PHRASES[index]?.substring(0, subIndex) || ''}
      <span className={`${blink ? 'opacity-100' : 'opacity-0'} ml-1 inline-block w-1 h-8 md:h-12 bg-rose-500 align-middle shadow-[0_0_10px_rgba(244,63,94,0.8)]`} />
    </span>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section className="relative w-full min-h-[100vh] overflow-hidden bg-gradient-to-br from-slate-950 via-[#0f172a] to-rose-950/40 flex items-center pt-24 lg:pt-0 mt-0 selection:bg-rose-500/30 selection:text-rose-100">
      
      {/* 1. Atmosphere & Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Texture Overlay */}
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080?text=Noise')] opacity-[0.03] mix-blend-overlay" />
        
        {/* Glow Effects */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-rose-600/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center pt-8">
        
        {/* --- Left Content --- */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg shadow-black/5 mb-8 hover:bg-white/10 transition-colors cursor-default group"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
            <span className="text-sm font-medium text-slate-300 tracking-wide uppercase group-hover:text-white transition-colors">
              মুমূর্ষু রোগীর সেবায় সর্বদা প্রস্তুত
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-8 font-manrope">
            <span className="block text-slate-100">DIC Blood Bank</span>
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-500 to-rose-400 pb-2">
              <TypewriterEffect />
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-lg leading-relaxed font-light">
            আপনার এক ব্যাগ রক্ত বাঁচাতে পারে একটি জীবন। কোনো প্রতিদান ছাড়াই মানুষের পাশে দাঁড়ানোর আনন্দ নিন। আজই যোগ দিন আমাদের সাথে।
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <Link href="/donate" className="group relative px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-semibold shadow-lg shadow-rose-900/40 overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] ring-1 ring-white/20">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="relative flex items-center gap-3">
                Become a Donor <Heart className="w-5 h-5 fill-current" />
              </span>
            </Link>
            
            <Link href="/searchDonor" className="group px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-slate-200 rounded-2xl font-semibold hover:bg-white/10 hover:border-white/20 transition-all hover:shadow-lg active:scale-[0.98]">
               <span className="flex items-center gap-3">
                Find Donors <Search className="w-5 h-5 text-rose-400 group-hover:text-rose-300" />
               </span>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex items-center gap-5 pt-8 border-t border-white/5 w-full lg:w-auto justify-center lg:justify-start">
             <div className="flex -space-x-4">
               {[1,2,3,4].map((i) => (
                 <div key={i} className="w-12 h-12 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center relative shadow-lg">
                    <Users className="w-6 h-6 text-slate-400" />
                 </div>
               ))}
               <div className="w-12 h-12 rounded-full border-2 border-slate-900 bg-rose-600 flex items-center justify-center text-xs text-white font-bold relative shadow-lg">
                 10k+
               </div>
             </div>
             <div className="text-left">
               <p className="text-white font-bold text-lg leading-none">১০,০০০+</p>
               <p className="text-slate-500 text-sm">ডোনার আমাদের সাথে আছেন</p>
             </div>
          </div>
        </motion.div>

        {/* --- Right Visual --- */}
        <motion.div style={{ y: y1 }} className="relative hidden lg:block h-full min-h-[600px] w-full">
             
             {/* Main Image Container */}
             <div className="absolute inset-0 flex items-center justify-center">
               <div className="relative w-[550px] h-[550px]">
                 
                 {/* Glowing Orb Behind */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-rose-500/20 rounded-full blur-[80px] animate-pulse" />
                 
                 {/* Main Hero Image */}
                 <div className="relative z-10 w-full h-full transform transition-transform hover:scale-[1.02] duration-700">
                    <Image 
                      src="/herorightsideimg.svg" 
                      alt="Life Saving Concept" 
                      fill 
                      className="object-contain drop-shadow-[0_20px_50px_rgba(225,29,72,0.3)]"
                      priority
                    />
                 </div>


                 
               </div>
             </div>
        </motion.div>
      </div>
    </section>
  );
}
