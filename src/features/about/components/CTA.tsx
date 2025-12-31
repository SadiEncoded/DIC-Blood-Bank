'use client';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function CallToActionSection() {
  return (
    <section className="bg-white pt-8">
      <div className="flex flex-col lg:flex-row">
        {/* Left Spacer: Matches the width of the "Our Foundation" sticky block */}
        <div className="hidden lg:block" />

        {/* Right Content: Aligns with the Values list */}
        <div className="w-full px-6 md:px-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden bg-white rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 lg:p-14 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)]"
          >
            {/* Soft subtle glows for a clean look */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-24 -left-24 w-80 h-80 bg-rose-50 blur-[80px] rounded-full" />
              <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-50/50 blur-[80px] rounded-full" />
            </div>

            <div className="relative z-10 text-left">
              {/* Tagline */}
              <span className="text-rose-600 font-bold text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] block mb-4 md:mb-6">
                Next Step
              </span>

              {/* Headline: Dark text for white version */}
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 font-anek leading-tight tracking-tight mb-4 md:mb-6">
                আপনিও হতে পারেন আমাদের <br />
                <span className="text-slate-400 font-light italic">মানবিক অংশীদার</span>
              </h2>

              <p className="text-slate-500 font-hind text-sm md:text-base lg:text-lg leading-relaxed max-w-xl mb-8 md:mb-10">
                স্বেচ্ছাসেবী হিসেবে যোগ দিন বা আমাদের রক্তদান কর্মসূচিতে অংশ নিন। আপনার একটি ক্ষুদ্র পদক্ষেপ চাঁদপুরকে রক্ত সংকটমুক্ত করতে সাহায্য করবে।
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
                <a 
                  href="/signup" 
                  className="group/btn w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-rose-600 text-white font-bold text-sm md:text-base rounded-xl md:rounded-2xl hover:bg-rose-700 hover:shadow-lg hover:shadow-rose-500/30 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>আমাদের সাথে যোগ দিন</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
                
                <a 
                  href="/contact" 
                  className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-slate-50 text-slate-600 font-bold text-sm md:text-base rounded-xl md:rounded-2xl hover:bg-slate-100 transition-all border border-slate-200 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-rose-600" />
                  যোগাযোগ করুন
                </a>
              </div>
            </div>

            {/* Subtle Dotted Background instead of grid for white version */}
            <div className="absolute inset-0 opacity-[0.15] pointer-events-none bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
