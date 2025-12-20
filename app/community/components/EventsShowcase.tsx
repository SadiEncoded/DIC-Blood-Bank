'use client';

import { events } from "@/app/lib/data/shared";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, MapPin, Plus } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

export default function EventsShowcase() {
  return (
    <section className="bg-slate-50 py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[10px] font-bold tracking-[0.4em] text-rose-600 uppercase mb-4 block"
            >
              The Highlights
            </motion.span>
            <motion.h3 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-slate-900 font-poppins tracking-tighter"
            >
              Community <br /> 
              <span className="text-slate-400 font-light italic">In Motion</span>
            </motion.h3>
          </div>
          <Link 
            href="/events" 
            className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-widest hover:border-rose-500 hover:text-rose-600 transition-all duration-300 shadow-sm"
          >
            Explore All Events <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Horizontal Staggered Layout */}
        <div className="flex flex-col gap-8 md:gap-16">
          {events.slice(0, 2).map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col lg:flex-row items-center gap-8 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Event Image with Architectural Frame */}
              <div className="relative w-full lg:w-3/5 aspect-[16/10] rounded-[2.5rem] overflow-hidden group shadow-2xl shadow-slate-200">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                {/* Floating Date Badge */}
                <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-white/50">
                   <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-1">Coming Next</p>
                   <p className="text-xl font-bold text-slate-900 font-poppins">{event.date}</p>
                </div>
              </div>

              {/* Event Details */}
              <div className="w-full lg:w-2/5 space-y-6 lg:px-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-rose-50 border border-rose-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">{event.category}</span>
                </div>

                <h4 className="text-3xl md:text-4xl font-bold text-slate-900 font-poppins leading-tight">
                  {event.title}
                </h4>
                
                <p className="text-lg font-medium text-slate-500 font-hind leading-relaxed">
                  {event.bangla}
                </p>

                <p className="text-slate-500 leading-relaxed font-hind opacity-80">
                  {event.description}
                </p>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin size={18} className="text-rose-500" />
                    <span className="text-xs font-bold uppercase tracking-widest">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Calendar size={18} className="text-rose-500" />
                    <span className="text-xs font-bold uppercase tracking-widest">Mark Calendar</span>
                  </div>
                </div>

                <div className="pt-8">
                  <button className="flex items-center gap-3 text-[10px] font-bold text-rose-600 uppercase tracking-[0.3em] group hover:gap-5 transition-all">
                    Register For Event <Plus size={14} className="bg-rose-600 text-white rounded-full p-0.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
