'use client';

import { EnrichedDonorStory } from '@/features/stories/types';
import { motion } from 'framer-motion';
import { ArrowUpRight, Heart, Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { StoryCard } from './fullStoryCard';
import { SubmitStoryModal } from './SubmitStoryModal';

interface StoriesClientViewProps {
  initialStories: EnrichedDonorStory[];
}

export default function StoriesClientView({ initialStories }: StoriesClientViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white min-h-screen selection:bg-rose-100 selection:text-rose-900 font-hind">
      
      {/* 1. Header */}
      <header className="md:pt-24 pt-12 pb-12 border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-3 md:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-xs md:text-md lg:text-xl font-black uppercase tracking-[0.3em] text-rose-500 mb-6"
          >
            Story Archive
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter text-slate-900 font-anek leading-none mb-4"
          >
            অনুপ্রাণিত <span className="text-rose-600 italic font-medium"> গল্পসমূহ</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl md:text-3xl text-hind font-semibold text-slate-400 mb-2"
          >
            নিজে পড়ুন এবং অন্যকেও জানান।
          </motion.p>
        </div>
      </header>

      {/* 2. Main Narrative Feed */}
      <main className="mx-auto max-w-4xl px-4 lg:px-6">
        {initialStories.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {initialStories.map((story, index) => (
              <StoryCard key={story.id} story={story} index={index} />
            ))}
          </div>
        ) : (
          <div className="py-40 text-center">
            <Heart className="mx-auto text-slate-100 mb-4" size={48} strokeWidth={1} />
            <p className="text-slate-400 font-anek font-light text-sm italic">No narratives found in the archive yet.</p>
          </div>
        )}
      </main>

      {/* 3. Better Open-Layout Footer */}
      <footer className="mt-20 border-t border-slate-100 pt-24 pb-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-20">
            
            {/* Left: Branding & Message */}
            <div className="max-w-sm">
              <Heart className="text-rose-500 mb-8" size={32} fill="currentColor" opacity={0.8} />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 font-inter leading-tight mb-4 tracking-tight">
                Every story starts <br />
                with a <span className="text-rose-600 italic">decision.</span>
              </h2>
              <p className="text-xl md:text-2xl font-bold text-slate-300 font-anek mb-6 leading-none uppercase tracking-widest">
                সিদ্ধান্ত নিন, জীবন বাঁচান
              </p>
              <p className="text-slate-400 text-md md:text-md font-light leading-relaxed font-hind">
                This archive is a living record of generosity. Help us expand it by sharing your journey or becoming a donor today.
              </p>
            </div>

            {/* Right: Clean, Structured Actions */}
            <div className="w-full md:w-auto flex flex-col gap-4 min-w-md">
              <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Next Steps/ পরবর্তী ধাপ</span>
              
              <Link href="/signup" className="group flex items-center justify-between w-full px-6 py-5 border border-slate-900 bg-slate-900 text-white rounded-2xl hover:bg-rose-600 hover:border-rose-600 transition-all duration-300">
                <div className="flex flex-col items-start">
                  <span className="text-[9px] font-bold uppercase tracking-widest opacity-70">Register</span>
                  <span className="text-sm font-bold font-anek">নিবন্ধন করুন</span>
                </div>
                <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform" />
              </Link>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="group flex items-center justify-between w-full px-6 py-5 border border-slate-200 bg-white text-slate-600 rounded-2xl hover:border-slate-400 hover:text-slate-900 transition-all duration-300"
              >
                <div className="flex flex-col items-start">
                  <span className="text-[9px] font-bold uppercase tracking-widest opacity-70">Share Story</span>
                  <span className="text-sm font-bold font-anek">গল্প জমা দিন</span>
                </div>
                <Plus size={20} className="group-hover:rotate-90 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      <SubmitStoryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
