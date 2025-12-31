'use client';

import { Event } from '@/features/events/types';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

// Unified transition for layout and entry
const transition = {
  duration: 0.6,
  ease: [0.215, 0.61, 0.355, 1] // Professional deceleration curve
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      ...transition,
      delay: i * 0.05, // Faster stagger for more responsiveness
    },
  }),
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

export default function EventGrid({ initialEvents }: { initialEvents: Event[] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const filteredEvents = initialEvents.filter(event => {
    const matchesCategory = activeCategory === 'All' || event.category === activeCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (!mounted) return null;

  return (
    <section className="py-20 bg-white min-h-screen selection:bg-rose-100 font-hind">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col gap-10 mb-16 border-b border-slate-50 pb-12">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-500 mb-4"
            >
              Public Schedule
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 font-anek tracking-tight mb-6">
              Current & Upcoming <span className="text-rose-600 italic font-medium">Events</span>
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full lg:w-[450px]">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text"
                placeholder="Find an event or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-12 py-4 bg-white border border-slate-200 rounded-xl focus:border-slate-900 focus:ring-0 transition-all font-hind text-sm outline-none"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto scrollbar-hide border-l border-slate-100 pl-4 sm:pl-8 -mx-6 px-6 sm:mx-0 sm:px-0">
              {['All', 'Blood Drive', 'Seminar', 'Workshop'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-widest transition-all relative py-2 px-1 whitespace-nowrap flex-shrink-0 ${
                    activeCategory === cat ? 'text-rose-600' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <motion.div 
                      layoutId="underline" 
                      transition={transition}
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-rose-600" 
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* The Grid: 'layout' here coordinates children movements */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
        >
          {/* popLayout prevents cards from "jumping" to the top before disappearing */}
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout="position" // This specifically animates the position change smoothly
                className="group flex flex-col h-full bg-white transition-all duration-500"
              >
                {/* Image Section */}
                <div className="aspect-[16/10] relative overflow-hidden rounded-2xl mb-6 bg-slate-100">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={transition}
                    src={event.image_url} 
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-50">
                    <span className="block text-lg font-black leading-none text-slate-900">{new Date(event.date).getDate()}</span>
                    <span className="text-[9px] uppercase font-bold text-rose-500 tracking-tighter">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 px-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">Location</span>
                    <span className="h-[1px] w-4 bg-slate-200" />
                    <span className="text-[11px] font-bold text-slate-500">{event.location}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 font-anek leading-tight group-hover:text-rose-600 transition-colors">
                    {event.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm font-hind leading-relaxed line-clamp-2 mb-6">
                    {event.description}
                  </p>

                  <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 group-hover:text-rose-600 transition-all">
                    Register Now 
                    <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-500" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 border-2 border-dashed border-slate-100 rounded-3xl"
          >
            <p className="text-slate-400 font-medium">No events found matching your search.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
