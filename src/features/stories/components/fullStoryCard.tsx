'use client';

import { EnrichedDonorStory } from '@/features/stories/types';
import { BadgeCheck, Droplets, MapPin } from 'lucide-react';

interface StoryCardProps {
  story: EnrichedDonorStory;
  index: number;
}

export function StoryCard({ story, index }: StoryCardProps) {
  return (
    <article className="py-12 group transition-all duration-500 border-b border-slate-100 last:border-0">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
        
        {/* Sidebar: Scaled Profile Section */}
        <div className="md:col-span-3">
          <div className="md:sticky md:top-24">
            <span className="text-[9px] font-bold font-anek text-slate-200 tracking-[0.2em] uppercase block mb-3">
              Entry {String(index + 1).padStart(2, '0')}
            </span>
            
            {/* Scaled Profile Initial */}
            <div className="md:h-16 h-10 md:w-16 w-10 rounded-full bg-slate-900 flex items-center justify-center text-white text-2xl font-bold font-anek mb-4 group-hover:bg-rose-600 transition-colors duration-500 shadow-lg shadow-slate-100">
              {story.donor_name?.charAt(0)}
            </div>
            
            <div className="space-y-0.5">
              <p className="text-lg font-bold text-slate-900 font-anek leading-tight flex items-center gap-1.5 pt-2">
                {story.donor_name}
                {story.is_verified && <BadgeCheck size={18} className="text-blue-500 fill-blue-500/10" />}
              </p>
              <p className="text-[10px] md:text-[14px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 pt-2">
                <MapPin size={10} className="text-rose-300" /> {story.location}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-9">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 font-anek leading-tight mb-5">
            {story.title}
          </h2>
          
          <div className="relative border-l-2 border-slate-100 pl-6 md:pl-8">
            <p className="text-md md:text-xl leading-relaxed text-slate-500 font-light italic mb-8 font-hind">
              "{story.content}"
            </p>

            {/* Scaled Footer Stats */}
            <div className="flex flex-wrap items-center gap-8 pt-6 border-t border-slate-100/60">
              <div className="flex flex-col">
                <span className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-2">রক্তের গ্রুপ</span>
                <div className="flex items-center gap-1.5 text-xl font-bold text-rose-500 font-anek">
                  <Droplets size={18} /> {story.blood_type}
                </div>
              </div>
              
              <div className="flex flex-col border-l border-slate-100 pl-8">
                <span className="text-xs md:text-sm font-black text-slate-400 uppercase mb-2 font-hind">মোট অবদান</span>
                <p className="text-sm md:text-md font-bold text-slate-800 font-hind">
                  {story.donations} বার রক্তদান
                </p>
              </div>

              <div className="flex flex-col border-l border-slate-100 pl-8">
                <span className="text-xs md:text-sm font-black text-slate-400 uppercase mb-2 font-hind">Status</span>
                {story.is_verified ? (
                  <div className="flex items-center gap-1 text-sm md:text-md font-bold text-emerald-600 uppercase tracking-tight">
                    <BadgeCheck size={13} className="text-blue-500 fill-blue-500/10" /> Verified
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-sm md:text-md font-bold text-slate-400 uppercase tracking-tight">
                    <span className="w-2 h-2 rounded-full bg-slate-300" /> Member
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </article>
  );
}
