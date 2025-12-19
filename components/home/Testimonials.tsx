'use client';
import donorStories from '@/app/lib/data/donorstories';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Quote, MapPin, Plus } from 'lucide-react';
import { useRef } from 'react';

export default function DonorStoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-[#FBFBFC] text-slate-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 border-l-2 border-rose-600 pl-8"
        >
          <span className="text-rose-600 font-medium tracking-[0.2em] uppercase text-xs">The Human Connection</span>
          <h2 className="text-5xl md:text-6xl tracking-tight mt-4 mb-6">
            অনুপ্রেরণনামূলক <span className="font-serif italic text-slate-400 text-6xl md:text-7xl">গল্প</span>
          </h2>
          <p className="max-w-xl text-slate-500 text-lg leading-relaxed">
            Real narratives from our community of life-savers. Every drop tells a story of hope and resilience.
          </p>
        </motion.div>

        {/* Carousel Area */}
        <div className="relative mb-10">
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 pb-4"
          >
            {donorStories.map((story, index) => (
              <motion.div 
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="snap-center shrink-0 w-[85vw] md:w-[360px]"
              >
                <div className="group relative bg-white p-8 rounded-[32px] border border-slate-100 transition-all duration-500 hover:shadow-xl hover:shadow-slate-200/50">
                  
                  <Quote className="absolute top-8 right-8 w-10 h-10 text-slate-50 group-hover:text-rose-300 transition-colors" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                        {story.bloodType}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg tracking-tight leading-none mb-1.5">
                          {story.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                          <MapPin size={10} className="text-rose-500" /> {story.location}
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-600 leading-relaxed text-sm md:text-base mb-8 font-light line-clamp-4">
                      "{story.story}"
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Donations</span>
                        <span className="text-lg font-inter italic text-slate-900">{story.donations} <span className="text-[10px] font-sans font-normal not-italic text-slate-400">Times</span></span>
                      </div>
                      <button className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-900 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Streamlined Centered Controller */}
        <div className="flex justify-center">
          <div className="flex items-center bg-white border border-slate-200/60 p-1.5 rounded-full shadow-lg shadow-slate-200/40">
            <button 
              onClick={() => scroll('left')}
              className="p-3 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all active:scale-90"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="w-[1px] h-6 bg-slate-100 mx-1" />

            <button className="px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-800 hover:text-rose-600 transition-colors">
               Share Story
            </button>

            <div className="w-[1px] h-6 bg-slate-100 mx-1" />

            <button 
              onClick={() => scroll('right')}
              className="p-3 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all active:scale-90"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
