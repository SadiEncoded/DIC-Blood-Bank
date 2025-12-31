'use client';

import { Event } from "@/features/events/types";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Plus } from "lucide-react";
import Link from 'next/link';

export default function EventsShowcase({ events }: { events: Event[] }) {
  // Take exactly 2 events to keep the section height low
  const showcaseEvents = events
    .filter(e => e.is_active)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 2);

  if (showcaseEvents.length === 0) return null;

  return (
    <section className="bg-white py-10 md:py-16 border-y border-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Minimal Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 md:mb-10">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 font-anek tracking-tight">
              Upcoming <span className="text-rose-600 italic">Initiatives</span>
            </h3>
            <p className="text-slate-400 text-xs md:text-sm font-hind mt-1">Join our next community activities.</p>
          </div>
          <Link href="/events" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-2 self-start md:self-auto">
            View All <ArrowRight size={14} />
          </Link>
        </div>

        {/* Compact 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {showcaseEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative bg-slate-50 rounded-2xl md:rounded-3xl p-4 md:p-5 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 border border-transparent hover:border-slate-100"
            >
              <div className="flex gap-4 md:gap-5">
                {/* Date Side-Badge */}
                <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-white rounded-xl md:rounded-2xl flex flex-col items-center justify-center border border-slate-100 shadow-sm">
                  <span className="text-base md:text-lg font-black text-slate-900 leading-none">
                    {new Date(event.date).getDate()}
                  </span>
                  <span className="text-[7px] md:text-[8px] font-bold text-rose-500 uppercase">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <span className="text-[8px] md:text-[9px] font-bold text-rose-600 uppercase tracking-widest block mb-1">
                    {event.category}
                  </span>
                  <h4 className="text-sm md:text-base font-bold text-slate-900 font-anek truncate mb-1 md:mb-2 group-hover:text-rose-600 transition-colors">
                    {event.title}
                  </h4>
                  <div className="flex items-center gap-1.5 md:gap-2 text-slate-400">
                    <MapPin size={11} className="text-slate-300 md:w-3 md:h-3" />
                    <span className="text-[9px] md:text-[10px] font-medium uppercase truncate">{event.location}</span>
                  </div>
                </div>
              </div>

              <Link 
                href={`/events/${event.id}`} 
                className="absolute inset-0 z-10" 
                aria-label="View event details"
              />
            </motion.div>
          ))}

          {/* Compact Redirect Tile */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-2xl md:rounded-3xl p-4 md:p-5 flex items-center justify-between group hover:bg-rose-600 transition-colors duration-500 cursor-pointer"
          >
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-rose-600 transition-colors">
                <Plus size={16} className="md:w-[18px]" />
              </div>
              <div className="text-left">
                <p className="text-white text-xs md:text-sm font-bold font-anek">More Events</p>
                <p className="text-slate-400 group-hover:text-rose-100 text-[9px] md:text-[10px] font-medium transition-colors">Explore full calendar</p>
              </div>
            </div>
            <Link href="/events" className="text-white opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all">
              <ArrowRight size={18} className="md:w-5 md:h-5" />
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
