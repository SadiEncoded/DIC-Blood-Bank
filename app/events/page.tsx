'use client';

import { events } from '@/app/lib/data/events';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, MapPin, Zap } from 'lucide-react';
import Image from 'next/image';

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-rose-500/30 selection:text-rose-900">
      
      {/* Premium Header */}
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
            <Calendar className="w-4 h-4 text-rose-500" />
            <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-slate-300">
              আসন্ন কর্মসূচি / Upcoming Events
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-fluid-hero font-heading-opt text-white mb-6 leading-tight tracking-tight font-poppins"
          >
            কমিউনিটি <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-600 font-bengali-opt">ইভেন্টসমূহ</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-sm md:text-xl text-slate-400 max-w-2xl mx-auto font-hind leading-relaxed"
          >
            রক্তদান অভিযান, স্বাস্থ্য সচেতনতা সেমিনার এবং কমিউনিটি বন্ডিং কার্যক্রমের মাধ্যমে আমরা এগিয়ে চলেছি। যুক্ত হোন আমাদের পরবর্তী কর্মসূচিতে।
          </motion.p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 md:-mt-16 relative z-30 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-[#fdfdfd] rounded-[2rem] border border-slate-100 overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-rose-100/50 hover:border-rose-100 transition-all duration-500 flex flex-col"
            >
              {/* Image Section */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl text-[10px] font-bold text-slate-900 shadow-md border border-white/50 font-poppins">
                  {event.date}
                </div>
                <div className="absolute top-4 left-4 bg-rose-600 px-3 py-1 rounded-lg text-[9px] font-bold text-white uppercase tracking-widest shadow-sm">
                  {event.category}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-rose-600 font-bold text-[10px] uppercase tracking-widest mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  {event.location}
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2 font-poppins group-hover:text-rose-600 transition-colors leading-tight">
                  {event.title}
                </h3>
                <p className="text-sm font-hind text-slate-500 font-medium mb-4">{event.bangla}</p>
                
                <p className="text-slate-500 text-sm font-hind leading-relaxed line-clamp-3 mb-8">
                  {event.description}
                </p>

                <div className="mt-auto pt-6 border-t border-slate-50">
                  <button className="w-full py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-rose-600 hover:border-rose-600 hover:text-white hover:shadow-lg hover:shadow-rose-200 transition-all duration-300 font-poppins flex items-center justify-center gap-2 group/btn">
                    GET INVOLVED <Zap className="w-4 h-4 transition-transform group-hover/btn:scale-125" />
                  </button>
                </div>
              </div>

              {/* Texture Overlay */}
              <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Empty State / More Coming Soon */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-12 rounded-[3rem] border-2 border-dashed border-slate-100 bg-slate-50/30 text-center"
        >
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Clock className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-400 font-poppins">Stay Tuned for More Events</h3>
          <p className="text-slate-400 font-hind mt-2">আমরা প্রতিনিয়ত নতুন কর্মসূচি নিয়ে কাজ করছি। খুব শীঘ্রই আরও ইভেন্ট যোগ করা হবে।</p>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto relative overflow-hidden bg-slate-900 rounded-[3rem] p-8 md:p-20 text-center shadow-2xl">
          <div className="absolute inset-0 pointer-events-none opacity-[0.1] mix-blend-soft-light bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-blue-500/5" />
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-fluid-section font-heading-opt text-white font-poppins leading-tight">
              আপনার প্রতিষ্ঠানে রক্তদান <br className="hidden md:block" />
              <span className="text-rose-400 font-bengali-opt">কর্মসূচি করতে চান?</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-xl max-w-2xl mx-auto font-hind leading-relaxed">
              আমরা বিভিন্ন শিক্ষা প্রতিষ্ঠান এবং সংস্থায় রক্তদান অভিযান পরিচালনায় সহযোগিতা করি। আমাদের সাথে যোগাযোগ করুন।
            </p>
            <div className="flex justify-center pt-4">
              <a 
                href="/contact" 
                className="group inline-flex items-center gap-3 px-8 py-4 bg-rose-600 text-white font-bold rounded-2xl hover:bg-rose-700 hover:shadow-2xl hover:shadow-rose-500/30 transition-all font-poppins text-base md:text-lg"
              >
                HOST A DRIVE <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
