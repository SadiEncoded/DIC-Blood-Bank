'use client'

import { motion } from 'framer-motion'
import { Users2 } from 'lucide-react'

export default function ContactHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0f1a] pt-20 md:pt-32 pb-24 md:pb-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-[#0f172a] to-[#1e293b]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(244,63,94,0.05)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.1] mix-blend-soft-light bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-16 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/5 mb-6"
        >
          <Users2 className="w-4 h-4 text-rose-500" />
          <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-slate-300">
            যোগাযোগ / Contact
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-fluid-hero font-heading-opt text-white mb-6 leading-tight tracking-tight"
        >
          আমাদের সাথে <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-600 font-bengali-opt">যোগাযোগ করুন</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-sm md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          আপনার মতামত, প্রশ্ন বা পরামর্শ আমাদের সেবাকে আরও উন্নত করতে সাহায্য করবে। জরুরি রক্তদানের প্রয়োজন বা সাধারণ তথ্যের জন্য আমরা সর্বদা আপনার সাথে আছি।
        </motion.p>
      </div>
    </section>
  )
}
