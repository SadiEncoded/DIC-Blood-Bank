'use client';

import { ICON_MAP, LearnArticle } from '@/assets/data/learn/content';
import { motion } from 'framer-motion';
import { ArrowRight, Bookmark, Clock, Share2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { ElementType } from 'react';

interface LearnArticleCardProps {
  article: LearnArticle;
  index: number;
}

export function FeaturedArticleCard({ article, index }: LearnArticleCardProps) {
  const isEven = index % 2 === 0;
  const theme = article.color_theme;
  const MainIcon = ICON_MAP[article.icon] as ElementType || Bookmark;

  const colorVariants = {
    rose: "text-rose-600 bg-rose-50 border-rose-100 ring-rose-500/20",
    blue: "text-blue-600 bg-blue-50 border-blue-100 ring-blue-500/20",
    purple: "text-purple-600 bg-purple-50 border-purple-100 ring-purple-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white border border-slate-200 rounded-2xl md:rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:border-slate-300"
    >
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
        
        {/* VISUAL BLOCK: Content Preview */}
        <div className="w-full lg:w-[42%] relative overflow-hidden bg-slate-100">
          <img 
            src={article.image_url} 
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
          />
          
          {/* Subtle Overlay Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

          {/* Floating Category Chip */}
          <div className="absolute top-4 md:top-6 left-4 md:left-6 z-10">
            <div className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl backdrop-blur-md border shadow-sm font-bold text-[8px] md:text-[10px] uppercase tracking-widest ${colorVariants[theme]}`}>
              <MainIcon className="w-3 h-3 md:w-3.5 md:h-3.5" />
              {article.category}
            </div>
          </div>
        </div>

        {/* CONTENT BLOCK: Information Hierarchy */}
        <div className="w-full lg:w-[58%] p-6 md:p-8 lg:p-14 flex flex-col">
          
          {/* Header Meta */}
          <div className="flex items-center justify-between mb-4 md:mb-8">
            <div className="flex items-center gap-3 md:gap-4">
               {article.creator && (
                 <div className="flex items-center gap-2 md:gap-3">
                    {article.creator.avatar ? (
                      <img src={article.creator.avatar} className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-slate-200" alt="" />
                    ) : (
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-slate-200 bg-slate-100 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-slate-400">{article.creator.name[0]}</span>
                      </div>
                    )}
                    <span className="text-[10px] md:text-[11px] font-black text-slate-900 uppercase tracking-tight">{article.creator.name}</span>
                 </div>
               )}
               <span className="text-slate-300">|</span>
               <div className="flex items-center gap-1.5 text-slate-500 text-[10px] md:text-[11px] font-bold">
                  <Clock className="w-3 h-3 md:w-3.5 md:h-3.5" />
                  {article.read_time}
               </div>
            </div>
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-200 group-hover:text-rose-400 transition-colors" />
          </div>

          {/* Body */}
          <h2 className="text-xl md:text-3xl lg:text-4xl font-black text-slate-900 font-anek leading-[1.2] md:leading-[1.15] mb-4 md:mb-6">
            {article.title}
          </h2>

          <p className="text-slate-600 font-hind text-base md:text-lg leading-relaxed mb-6 md:mb-8 line-clamp-3 md:line-clamp-none">
            {article.description}
          </p>

          {/* ENHANCEMENT: Hover-only Key Points Section */}
          <div className="relative h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:mb-10 transition-all duration-500 ease-in-out overflow-hidden">
             <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">What you will learn:</p>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {article.key_points.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-700 font-hind">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    {p.text}
                  </div>
                ))}
             </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-auto flex items-center justify-between">
            <Link 
              href={`/learn/${article.id}`}
              className={`group/link inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-2.5 md:py-3.5 rounded-xl md:rounded-2xl font-bold text-sm md:text-base transition-all
                ${theme === 'rose' ? 'bg-rose-600 text-white shadow-rose-200 hover:bg-rose-700' : 
                  theme === 'blue' ? 'bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700' : 
                  'bg-purple-600 text-white shadow-purple-200 hover:bg-purple-700'} shadow-lg`}
            >
              বিস্তারিত পড়ুন
              <ArrowRight className="w-4 h-4 md:w-[18px] md:h-[18px] transition-transform group-hover/link:translate-x-1" />
            </Link>

            <div className="flex gap-2">
               <button className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-lg md:rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all">
                  <Share2 className="w-4 h-4 md:w-[18px] md:h-[18px]" />
               </button>
               <button className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-lg md:rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all">
                  <Bookmark className="w-4 h-4 md:w-[18px] md:h-[18px]" />
               </button>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
