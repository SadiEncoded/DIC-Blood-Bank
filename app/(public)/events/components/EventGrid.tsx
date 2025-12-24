'use client';

import { Event } from '@/lib/types/event';
import { motion } from 'framer-motion';
import { Calendar, Filter, MapPin, Search } from 'lucide-react';
import { useState } from 'react';

interface EventGridProps {
  initialEvents: Event[];
}

const categories = ['All', 'Blood Drive', 'Seminar', 'Workshop', 'Foundation Day'];

export default function EventGrid({ initialEvents }: EventGridProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = initialEvents.filter(event => {
    const matchesCategory = activeCategory === 'All' || event.category === activeCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Search events or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white border-none rounded-[2rem] shadow-sm focus:ring-2 focus:ring-rose-500/20 transition-all font-hind"
            />
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            <Filter size={18} className="text-slate-400 hidden md:block" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-200' 
                    : 'bg-white text-slate-500 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2.5rem] overflow-hidden border border-white shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/60 transition-all group"
            >
              <div className="h-56 relative overflow-hidden">
                {event.image_url ? (
                  <img 
                    src={event.image_url} 
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                    <Calendar size={48} />
                  </div>
                )}
                <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur rounded-xl text-xs font-bold text-rose-600 shadow-sm">
                  {event.category}
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-2 text-rose-500 font-bold text-sm mb-3">
                  <Calendar size={16} />
                  {new Date(event.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-poppins group-hover:text-rose-600 transition-colors">
                  {event.title}
                </h3>
                
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-6 font-hind">
                  <MapPin size={16} className="text-slate-300" />
                  {event.location}
                </div>

                <p className="text-slate-500 text-sm font-hind line-clamp-2 leading-relaxed mb-8">
                  {event.description}
                </p>

                <button className="w-full py-4 bg-slate-50 text-slate-900 rounded-2xl font-bold text-sm group-hover:bg-rose-600 group-hover:text-white transition-all transform active:scale-95">
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-40">
             <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-slate-300" />
             </div>
             <p className="text-slate-400 font-hind font-medium">No events found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
