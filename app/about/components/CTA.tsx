'use client';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function CallToActionSection() {
  return (
    <section className="px-6 pb-16 md:pb-20 relative z-20">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="group max-w-4xl mx-auto relative overflow-hidden bg-[#0a0f1a] rounded-3xl p-8 md:p-12 text-center shadow-xl border border-white/5"
      >
        {/* Background Glows - They slightly expand on group hover */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-rose-600/15 blur-[100px] rounded-full transition-all duration-700 group-hover:scale-110 group-hover:bg-rose-600/20" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-600/10 blur-[100px] rounded-full transition-all duration-700 group-hover:scale-110 group-hover:bg-blue-600/15" />
        </div>

        <div className="relative z-10">
          {/* Headline */}
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-poppins font-bold text-white leading-[1.2] text-[clamp(1.5rem,3vw,2.25rem)] mb-4 tracking-tight"
          >
            আপনিও হতে পারেন আমাদের{' '}
            <span className="text-transparent px-4 bg-clip-text bg-gradient-to-r from-rose-400 to-rose-600 italic font-light font-hind">
              মানবিক অংশীদার
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-slate-400 text-sm md:text-base max-w-xl mx-auto font-hind leading-relaxed mb-8"
          >
            স্বেচ্ছাসেবী হিসেবে যোগ দিন বা আমাদের রক্তদান কর্মসূচিতে অংশ নিন। আপনার একটি ক্ষুদ্র পদক্ষেপ বাঁচাতে পারে একটি অমূল্য জীবন।
          </motion.p>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4"
          >
            <a 
              href="/donate" 
              className="relative overflow-hidden group/btn w-full sm:w-auto px-8 py-3 md:px-10 md:py-4 bg-rose-600 text-white font-bold rounded-2xl hover:bg-rose-700 hover:shadow-lg hover:shadow-rose-500/30 transition-all duration-300 flex items-center justify-center gap-2 tracking-tight"
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
              
              <span className="relative z-10">আমাদের সাথে যোগ দিন</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
            </a>
            
            <a 
              href="/contact" 
              className="w-full sm:w-auto px-8 py-3 md:px-10 md:py-4 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-all border border-white/10 backdrop-blur-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-rose-400" />
              যোগাযোগ করুন
            </a>
          </motion.div>
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] pointer-events-none" />
      </motion.div>
    </section>
  );
}
