'use client';

import { theme } from '@/app/lib/config';
import { DONOR_STORIES } from '@/app/lib/data/homepage';
import { DonorStory } from '@/app/lib/types';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Plus, Quote } from 'lucide-react';
import { useRef } from 'react';

export default function DonorStoriesSection({ stories }: { stories?: DonorStory[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const activeStories = stories || DONOR_STORIES;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[#FBFBFC] text-slate-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Section */}
        <motion.div 
          {...theme.animations.variants.fadeInUp}
          animate={isInView ? theme.animations.variants.fadeInUp.whileInView : {}}
          className="mb-20 border-l-2 border-rose-600 pl-8"
        >
          <span className="text-rose-600 font-bold tracking-[0.4em] uppercase text-[10px]">The Human Connection</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mt-4 mb-8 font-poppins">
            অনুপ্রেরণনামূলক <br />
            <span className="text-slate-400 font-light italic">গল্প</span>
          </h2>
          <p className="max-w-xl text-slate-500 text-lg leading-relaxed font-hind">
            Real narratives from our community of life-savers. Every drop tells a story of hope and resilience.
          </p>
        </motion.div>

        {/* Carousel Area */}
        <div className="relative mb-16">
          <div 
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 pb-8"
          >
            {activeStories.map((story: DonorStory, index: number) => (
              <motion.div 
                key={story.id}
                {...theme.animations.variants.fadeInUp}
                animate={isInView ? theme.animations.variants.fadeInUp.whileInView : {}}
                transition={{ ...theme.animations.transitions.smooth, delay: index * 0.1 }}
                className="snap-center shrink-0 w-[85vw] md:w-[400px]"
              >
                <div className="group relative bg-white p-10 rounded-[2.5rem] border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:shadow-rose-100/50">
                  
                  <Quote className="absolute top-10 right-10 w-12 h-12 text-slate-50 group-hover:text-rose-100 transition-colors duration-500" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-5 mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-sm font-bold shadow-xl shadow-slate-200">
                        {story.bloodType}
                      </div>
                      <div>
                        <h3 className="font-bold text-xl tracking-tight leading-none mb-2 font-poppins">
                          {story.name}
                        </h3>
                        <div className="flex items-center gap-2 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                          <MapPin size={12} className="text-rose-500" /> {story.location}
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-600 leading-relaxed text-base md:text-lg mb-10 font-normal font-hind italic">
                      &quot;{story.story}&quot;
                    </p>

                    <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Impact</span>
                        <span className="text-xl font-bold text-slate-900 font-poppins">{story.donations} <span className="text-xs font-normal text-slate-400 ml-1">Donations</span></span>
                      </div>
                      <button className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 hover:bg-rose-600 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300">
                        <Plus size={20} />
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
          <div className="flex items-center bg-white border border-slate-200/60 p-2 rounded-full shadow-2xl shadow-rose-100/20">
            <button 
              onClick={() => scroll('left')}
              className="p-4 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all active:scale-90"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="w-[1px] h-8 bg-slate-100 mx-2" />

            <button className="px-8 py-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-800 hover:text-rose-600 transition-colors font-poppins">
               Share Story
            </button>

            <div className="w-[1px] h-8 bg-slate-100 mx-2" />

            <button 
              onClick={() => scroll('right')}
              className="p-4 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all active:scale-90"
            >
              <ChevronRight size={24} />
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
