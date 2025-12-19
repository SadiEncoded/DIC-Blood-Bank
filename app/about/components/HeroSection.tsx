'use client';
import { motion } from 'framer-motion';
import { ChevronDown, Heart } from 'lucide-react';
import { Container, Section } from '../../../components/ui';

export default function HeroSection() {
  return (
    <Section variant="dark" className="!pt-28 md:!pt-36 !pb-12 md:!pb-24 flex items-center justify-center">
      <Container>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] bg-rose-900/20 blur-[140px] rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-[420px] h-[420px] bg-blue-900/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative text-center z-10">


        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8"
        >
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-current animate-pulse" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-300">
            আমাদের যাত্রা / Our Journey
          </span>
        </motion.div>

        {/* Headline - Using your perfect clamp sizes */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: 'easeOut' }}
          className="
            font-poppins font-bold text-white tracking-tight leading-[1.15]
            text-[clamp(2.2rem,5vw,3.75rem)]
            max-w-4xl mx-auto
            mb-6
          "
        > 
          DIC Blood Bank 
          <span className="
            block mt-2
            text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-500 to-rose-600
            font-anek-bangla italic font-medium
            text-[clamp(1.4rem,3.5vw,2.2rem)]
          "> 
            রক্ত হোক সুরক্ষিত, নিরাপদ ও সহজলভ্য! 
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="
            font-hind text-slate-400 leading-relaxed
            text-[clamp(0.9rem,2.2vw,1.1rem)]
            max-w-3xl mx-auto
          "
        >
          DIC Blood Bank—একটি শিক্ষার্থী-নেতৃত্বাধীন, মানবিক ও প্রযুক্তিনির্ভর সামাজিক উদ্যোগ, যার লক্ষ্য চাঁদপুর জেলার নাগরিকদের জন্য একটি নির্ভরযোগ্য, নিরাপদ এবং দ্রুত রক্তদাতা নেটওয়ার্ক গড়ে তোলা।
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
      </Container>
    </Section>
  );
}
