'use client';

import { DonorStories_CONTENT } from '@/assets/data/home/featurestoryContent';
import { Container, Section } from '@/components/ui';
import { EnrichedDonorStory } from '@/features/stories/types';
import { motion, useSpring } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Heart, Quote } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface DonorStoriesSectionProps {
  initialStories?: EnrichedDonorStory[];
}

export default function DonorStoriesSection({ initialStories = [] }: DonorStoriesSectionProps) {
  const featured = initialStories.filter(s => s.is_featured);
  const stories = featured.length > 0 ? featured : initialStories;

  const [index, setIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsToShow(1);
      else if (window.innerWidth < 1024) setItemsToShow(2);
      else setItemsToShow(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const xSpring = useSpring(0, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const gap = 24; 
    const containerWidth = trackRef.current?.offsetWidth || 0;
    const cardWidth = (containerWidth - (gap * (itemsToShow - 1))) / itemsToShow;
    xSpring.set(-(index * (cardWidth + gap)));
  }, [index, itemsToShow, xSpring]);

  if (stories.length === 0) return null;

  const handleNext = () => index < stories.length - itemsToShow && setIndex(i => i + 1);
  const handlePrev = () => index > 0 && setIndex(i => i - 1);

  return (
    <Section variant="white" className="select-none">
      <Container>
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-rose-500 mb-2 md:mb-3">
              <Heart size={14} fill="currentColor" /> {DonorStories_CONTENT.eyebrow}
            </div>
            <h2 className="text-2xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {DonorStories_CONTENT.title} <span className="text-rose-600 italic font-medium">{DonorStories_CONTENT.italicTitle}</span>
            </h2>
          </div>
          
          <Link 
            href="/stories" 
            className="group hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-rose-600 transition-all"
          >
            Explore Archive
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Carousel Track */}
        <div className="relative mb-8" ref={trackRef}>
          <motion.div
            drag="x"
            dragElastic={1}
            dragMomentum={false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -40) handleNext();
              else if (info.offset.x > 40) handlePrev();
            }}
            style={{ x: xSpring }}
            className="flex gap-4 md:gap-6 cursor-grab active:cursor-grabbing touch-none"
          >
            {stories.map((story, i) => (
              <motion.div
                key={story.id}
                animate={{ 
                  opacity: i >= index && i < index + itemsToShow ? 1 : 0.4,
                  scale: i >= index && i < index + itemsToShow ? 1 : 0.95,
                }}
                className="min-w-[85vw] sm:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] bg-slate-50 md:bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 border border-slate-100 flex flex-col justify-between h-[280px] md:h-[320px] transition-colors hover:border-rose-100"
              >
                <div>
                  <Quote className="text-rose-500/10 mb-3 md:mb-4 text-rose-500" size={32} fill="currentColor" />
                  <p className="text-sm md:text-lg text-slate-600 font-medium font-hind leading-relaxed italic line-clamp-4 md:line-clamp-4">
                    "{story.content}"
                  </p>
                </div>

                <div className="flex items-center gap-3 md:gap-4 pt-5 md:pt-6 border-t border-slate-200/60 md:border-slate-50">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-slate-900 rounded-lg md:rounded-xl flex items-center justify-center text-white font-bold text-xs">
                    {story.donor_name?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm md:text-base leading-tight">
                      {story.donor_name}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                       <span className="text-[10px] md:text-[9px] font-black text-rose-500 uppercase tracking-widest">{story.blood_type}</span>
                       <span className="w-1 h-1 rounded-full bg-slate-300" />
                       <span className="text-[10px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest">{story.donations || 0} Donations</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile-Optimized Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 md:border-slate-50">
          <Link 
            href="/stories" 
            className="md:hidden flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-rose-600"
          >
            View All Stories
            <ArrowRight size={12} />
          </Link>

          <div className="hidden md:flex gap-1.5">
            {stories.slice(0, stories.length - itemsToShow + 1).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === i ? 'w-10 bg-rose-600' : 'w-2 bg-slate-200'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={index === 0}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 bg-white hover:bg-slate-900 hover:text-white disabled:opacity-50 transition-all active:scale-90 shadow-sm"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              disabled={index >= stories.length - itemsToShow}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 bg-white hover:bg-slate-900 hover:text-white disabled:opacity-50 transition-all active:scale-90 shadow-sm"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </Container>
    </Section>
  );
}
