'use client';
import { motion } from 'framer-motion';
import { Clock, Phone, ShieldCheck } from 'lucide-react';

export function EmergencyContact() {
  return (
    <section className="max-w-5xl mx-auto px-6 pb-24">
      <div className="relative bg-slate-950 rounded-[3rem] p-8 md:p-16 text-center overflow-hidden border border-white/5 shadow-2xl">
        
        {/* Animated Background Atmosphere */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(244,63,94,0.18),transparent_70%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
            </span>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-rose-200 font-poppins">
              Emergency Response Live
            </span>
          </motion.div>

          {/* Heading */}
          <h2 className="text-xl md:text-3xl font-bold text-white mb-6 font-hind leading-relaxed">
            জরুরি রক্ত সহায়তার জন্য <br className="md:hidden" /> 
            সরাসরি যোগাযোগ করুন
          </h2>

          {/* Large Interactive Phone Number */}
          <motion.a 
            href="tel:+8801234567890" 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex flex-col md:flex-row items-center gap-4 md:gap-6 bg-white/5 hover:bg-white/10 border border-white/10 p-6 md:p-8 rounded-[2rem] transition-all duration-300 mb-10 shadow-inner"
          >
            <div className="p-4 bg-rose-600 rounded-2xl shadow-lg shadow-rose-600/20 group-hover:bg-rose-500 transition-colors">
              <Phone className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <span className="text-3xl md:text-6xl font-bold text-white tracking-tighter font-poppins">
              +880 1234-567890
            </span>
          </motion.a>

          {/* Institutional Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl pt-8 border-t border-white/10">
            <div className="flex items-center justify-center gap-3 text-slate-400">
              <Clock className="w-4 h-4 text-rose-500" />
              <span className="text-xs md:text-sm font-medium">Available 24/7 Days</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-rose-500" />
              <span className="text-xs md:text-sm font-medium">Verified Blood Bank</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-slate-400">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-5 h-5 rounded-full border border-slate-900 bg-slate-800" />
                ))}
              </div>
              <span className="text-xs md:text-sm font-medium">1.2k+ Volunteers Active</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
