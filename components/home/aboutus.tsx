'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { Award, Clock, Droplet, Heart, Shield, Users } from 'lucide-react';
import { useRef } from 'react';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const slideIn: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function AboutDICBloodBank() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <>
      {/* HERO SECTION - Standard Brand Palette */}
      <section
        ref={sectionRef}
        aria-labelledby="about-heading"
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 py-24 md:py-32"
      >
        {/* Subtle Patterns */}
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080?text=Background')] opacity-5 mix-blend-overlay" />
        <div className="absolute top-0 right-0 h-64 w-64 bg-rose-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 bg-rose-600/10 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">
          <div className="text-center mb-16">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-6 py-3 backdrop-blur-md mb-8"
            >
              <Heart className="h-5 w-5 text-rose-500" />
              <span className="text-sm font-semibold uppercase tracking-wider text-rose-100">
                ডি আই সি ব্লাড ব্যাংক
              </span>
            </motion.div>

            <motion.h2
              id="about-heading"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 0.1 }}
              className="mb-8 text-4xl md:text-6xl font-bold text-white leading-tight"
            >
              রক্ত দিন, <br />
              <span className="text-rose-500 bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-red-500">
                জীবন বাঁচান
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-light font-hind"
            >
              “রক্ত দাও, মানুষ বাঁচাও, নিজেকে বাঁচাও” — এই আদর্শের সঙ্গে{' '}
              <span className="font-semibold text-white">২০২৫ সালের জানুয়ারি</span>
              {' এ'} ড্যাফোডিল ইন্টারন্যাশনাল কলেজ, বাবুরহাটে{' '}
              <span className="font-semibold text-rose-400">DIC Blood Bank</span>
              {' এর'} যাত্রা শুরু।
            </motion.p>
          </div>

          {/* Impact Grid */}
          <motion.div
            variants={slideIn}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            <ImpactCard
              icon={<Droplet className="h-10 w-10 text-rose-500" />}
              value="১০,০০০+"
              label="নিবন্ধিত দাতা"
            />
            <ImpactCard
              icon={<Users className="h-10 w-10 text-white" />}
              value="১৩+"
              label="বছরের অভিজ্ঞতা"
            />
            <ImpactCard
              icon={<Shield className="h-10 w-10 text-rose-500" />}
              value="১০০%"
              label="বিনামূল্যে"
            />
            <ImpactCard
              icon={<Clock className="h-10 w-10 text-white" />}
              value="২৪/৭"
              label="সেবা"
            />
          </motion.div>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="relative bg-gradient-to-b from-slate-50 to-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Mission */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 border border-rose-100 px-4 py-2 w-fit">
                <Award className="h-4 w-4 text-rose-600" />
                <span className="text-sm font-semibold text-rose-800 uppercase tracking-wide">
                  আমাদের মিশন
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight font-anekBangla">
                <span className="text-rose-600">শিক্ষার্থী</span>{' '}
                <span className="text-slate-700">নেতৃত্বাধীন</span> <br />
                <span className="text-slate-900">মানবিক উদ্যোগ</span>
              </h3>

              <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-hind">
                <p>
                  আমরা একটি <span className="font-semibold text-rose-600">বিনামূল্যে প্ল্যাটফর্ম</span>{' '}
                  যা জরুরি মুহূর্তে দ্রুত ও{' '}
                  <span className="font-semibold text-slate-800">নির্ভরযোগ্য রক্তদাতা</span>{' '}
                  নিশ্চিত করে। কোনো আর্থিক লেনদেন ছাড়াই,{' '}
                  <span className="font-semibold text-slate-900">শুধুমাত্র বিশ্বাসের সেতু</span>।
                </p>

                <p className="text-rose-800 font-medium">
                  প্রতিটি ফোঁটা রক্ত একটি জীবনের গল্প। আমরা সেই গল্পের{' '}
                  <span className="text-rose-600">সংযোগকারী</span>।
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-rose-500" />
                    যাচাইকৃত দাতা
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-rose-500" />
                    ২৪ ঘণ্টা সক্রিয়
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4 text-rose-500" />
                    ১০০% স্বেচ্ছাসেবী
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right - Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/50">
                <div className="absolute inset-0 bg-slate-50/50 opacity-50 rounded-3xl" />
                
                <div className="relative z-10 text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-200">
                    <Heart className="h-12 w-12 text-white" />
                  </div>
                  
                  <h4 className="text-2xl font-bold text-slate-900 mb-4 font-anekBangla">
                    আপনার এক ফোঁটা, <br />
                    কারো এক জীবন
                  </h4>
                  
                  <p className="text-slate-500 leading-relaxed font-hind">
                    একটি সিদ্ধান্ত যা চিরকালের জন্য বদলে যেতে পারে।{' '}
                    <span className="text-rose-600 font-medium">আজই শুরু করুন।</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative bg-gradient-to-r from-rose-800 to-slate-900 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/400?text=Pattern')] opacity-5 mix-blend-overlay" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight font-anekBangla">
              এক ফোঁটা <span className="text-rose-400">রক্ত,</span> <br />
              <span className="text-white">এক জীবনের</span> <br />
              <span className="text-rose-200">আলো
            </span>
            </h3>

            <p className="text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto font-hind">
              আপনার আজকের সাহায্য কারো{' '}
              <span className="font-semibold text-white">আগামীকালের আশা</span>।{' '}
              এখনই যোগ দিন, একটি জীবন বদলে দিন।
            </p>
          </motion.div>

          <motion.a
            href="/donate"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="group inline-flex items-center gap-3 rounded-full bg-white text-rose-700 px-12 py-5 text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 backdrop-blur-md border border-white/20"
          >
            <Heart className="h-5 w-5 group-hover:scale-110 transition-transform fill-current" />
            এখনই দাতা হোন
            <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </div>
      </section>
    </>
  );
}

function ImpactCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center transition-all hover:bg-white/10 hover:border-white/20"
    >
      <div className="mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
        {icon}
      </div>
      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      <div className="text-sm uppercase tracking-wider text-rose-200/80 group-hover:text-rose-200">
        {label}
      </div>
    </motion.div>
  );
}
