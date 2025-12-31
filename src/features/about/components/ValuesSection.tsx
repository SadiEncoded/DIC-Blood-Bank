'use client';

import { motion } from 'framer-motion';
import { BadgeCheck, Heart, HeartHandshake, Users } from 'lucide-react';
import { useRef } from 'react';

const values = [
  {
    icon: <Heart size={24} strokeWidth={2} />,
    title: 'Humanity & Life Saving',
    bangla: 'মানবিকতা ও জীবনরক্ষা',
    desc: 'মানবিকতা ও জীবনসেবার মহান সংকল্প নিয়ে আমরা কাজ করি। চাঁদপুরকে রক্ত সংকদমমুক্ত করাই আমাদের লক্ষ্য।',
    color: 'text-rose-600',
  },
  {
    icon: <BadgeCheck size={24} strokeWidth={2} />,
    title: 'Transparency & Security',
    bangla: 'স্বচ্ছতা ও নিরাপত্তা',
    desc: 'নিরাপত্তা ও বিশ্বাসের ভিত্তিতে আমরা রক্তগ্রহীতা ও রক্তদাতাকে একত্রিত করি। তথ্যের সঠিকতা আমাদের মূল ভিত্তি।',
    color: 'text-blue-600',
  },
  {
    icon: <Users size={24} strokeWidth={2} />,
    title: 'Student-led Social Impact',
    bangla: 'শিক্ষার্থী-নেতৃত্বাধীন সামাজিক প্রভাব',
    desc: 'প্রযুক্তি এবং মানবিক মূল্যবোধ যে সমাজ পরিবর্তন করতে পারে তার জীবন্ত প্রমাণ এই শিক্ষার্থী পরিচালিত প্ল্যাটফর্ম।',
    color: 'text-emerald-600',
  },
  {
    icon: <HeartHandshake size={24} strokeWidth={2} />,
    title: 'Fast Service & Accessibility',
    bangla: 'দ্রুত সেবা ও সহজ প্রবেশাধিকার',
    desc: 'সময়মতো রক্তপ্রাপ্তি নিশ্চিত করাই আমাদের সার্থকতা। আপনার এক ব্যাগ রক্ত জীবন বাঁচাতে পারে।',
    color: 'text-violet-600',
  }
];

export default function ValuesSection() {
  const containerRef = useRef(null);
  
  return (
    <section ref={containerRef} className="relative bg-white border-y border-slate-100">
      {/* Mobile: Simple Card Layout */}
      <div className="lg:hidden px-4 py-12">
        <div className="mb-8">
          <span className="text-rose-500 font-bold text-[9px] uppercase tracking-[0.4em] block mb-3">
            Our Foundation
          </span>
          <h2 className="text-2xl font-bold text-slate-900 font-anek leading-tight tracking-tight mb-2">
            মূল্যবোধ ও নীতিমালা
          </h2>
          <p className="text-slate-500 text-sm">
            মানবিকতা ও নৈতিকতার ওপর দাঁড়িয়ে DIC Blood Bank প্রতিটি সিদ্ধান্ত গ্রহণ করে।
          </p>
        </div>

        <div className="space-y-6">
          {values.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-2xl p-4 border border-slate-100"
            >
              <div className="flex items-start gap-3">
                <div className={`shrink-0 p-2.5 rounded-xl bg-white ${item.color}`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-slate-900 font-poppins mb-1">
                    {item.title}
                  </h3>
                  <p className="text-rose-600 font-bold text-sm font-hind mb-2">
                    {item.bangla}
                  </p>
                  <p className="text-slate-600 text-xs font-hind leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Desktop: Original Sidebar Layout */}
      <div className="hidden lg:flex flex-row">
        
        {/* Left: Fixed Manifesto */}
        <div className="lg:w-5/12 lg:h-[80vh] lg:sticky lg:top-[10vh] overflow-hidden bg-slate-900 rounded-3xl my-10 ml-10">
          <div 
            className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale" 
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/40 to-transparent" />
          
          <div className="relative h-full flex flex-col justify-center p-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              <span className="text-rose-500 font-bold text-[9px] uppercase tracking-[0.4em] block">
                Our Foundation
              </span>
              <h2 className="text-5xl font-bold text-white font-anek leading-tight tracking-tight">
                মূল্যবোধ ও <br />
                <span className="text-slate-400 font-light italic">নীতিমালা</span>
              </h2>
              <div className="h-1 w-12 bg-rose-600 rounded-full mt-4" />
              <p className="text-slate-400 font-hind text-lg max-w-xs leading-relaxed pt-4">
                মানবিকতা ও নৈতিকতার ওপর দাঁড়িয়ে DIC Blood Bank প্রতিটি সিদ্ধান্ত গ্রহণ করে।
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right: Content Scroll */}
        <div className="lg:w-7/12 px-16 py-24 space-y-20 bg-white">
          {values.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6 }}
              className="group relative"
            >
              {/* Subtle Index Number */}
              <div className="absolute -top-8 -left-4 text-slate-50 text-7xl font-black font-anek select-none z-0 group-hover:text-rose-50/50 transition-colors">
                0{index + 1}
              </div>
              
              <div className="relative z-10 flex items-start gap-5">
                {/* Compact Icon Box */}
                <div className={`shrink-0 p-3 rounded-xl bg-slate-50 ${item.color} transition-all duration-300 group-hover:bg-white group-hover:shadow-md`}>
                  {item.icon}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="space-y-0.5">
                    <h3 className="text-xl font-bold text-slate-900 font-poppins tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-rose-600 font-bold text-base font-hind">
                      {item.bangla}
                    </p>
                  </div>

                  <p className="text-slate-500 font-hind text-base leading-relaxed max-w-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Subtle Progress Line */}
          <div className="pt-4 flex items-center gap-3 opacity-20">
             <div className="h-1 w-1 rounded-full bg-slate-900" />
             <div className="h-[1px] w-12 bg-slate-900" />
          </div>
        </div>

      </div>
    </section>
  );
}
