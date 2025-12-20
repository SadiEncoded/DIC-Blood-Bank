'use client';

import { motion } from 'framer-motion';
import { Clock, MapPin, Zap } from 'lucide-react';
import Image from 'next/image';

interface EventCardProps {
  event: any;
  idx: number;
}

export function EventCard({ event, idx }: EventCardProps) {
  return (
    <motion.div
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
  );
}

export function EventsGrid({ events }: { events: any[] }) {
  return (
    <section className="max-w-7xl mx-auto px-6 -mt-12 md:-mt-16 relative z-30 pb-24">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, idx) => (
          <EventCard key={idx} event={event} idx={idx} />
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
  );
}
