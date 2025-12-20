'use client';

import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Container, Section } from '../../../components/ui';

export function RequestHero() {
  return (
    <Section variant="dark" className="!pt-24 md:!pt-40 !pb-32 md:!pb-48">
      <Container>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-[#0f172a] to-[#0a0f1a]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full opacity-[0.1] bg-[radial-gradient(circle_at_50%_0%,rgba(244,63,94,0.4)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 text-center md:text-left">

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 mb-8"
        >
          <AlertCircle size={14} className="text-rose-500" />
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-slate-300">
            Urgent Blood Request
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight font-poppins"
        >
          রক্তের জন্য <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-600 font-hind">
            অনুরোধ করুন
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-slate-400 font-hind text-lg md:text-xl max-w-2xl leading-relaxed mx-auto md:mx-0"
        >
          আপনার প্রয়োজনীয় রক্তের তথ্য প্রদান করুন। আমাদের টিম দ্রুত নিকটবর্তী 
          স্বেচ্ছাসেবী রক্তদাতাদের সাথে যোগাযোগ করবে।
        </motion.p>
      </div>
      </Container>
    </Section>

  );
}
