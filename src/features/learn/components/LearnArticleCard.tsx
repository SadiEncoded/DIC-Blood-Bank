'use client';

import { ICON_MAP, LearnArticle } from '@/assets/data/learn/content';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight, Clock, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { ElementType } from 'react';

interface ArticleCardCompactProps {
  article: LearnArticle;
  index: number;
}

export function LearnArticleCard({ article, index }: ArticleCardCompactProps) {
  const theme = article.color_theme;
  
  // Uses your ICON_MAP from content.ts
  const MainIcon = ICON_MAP[article.icon] as ElementType || ChevronRight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.15,
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
      className="group relative flex flex-col h-full"
    >
      {/* 1. DYNAMIC THEME GLOW */}
      <div className={`absolute -inset-2 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10
        ${theme === 'rose' ? 'bg-rose-500' : theme === 'blue' ? 'bg-blue-500' : 'bg-purple-500'}`} 
      />

      <div className="relative flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl md:rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm group-hover:shadow-2xl group-hover:shadow-slate-200/60 transition-all duration-500">
        
        {/* 2. IMAGE SECTION */}
        <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden m-1.5 md:m-2 rounded-xl md:rounded-[1.5rem] bg-slate-100 dark:bg-slate-800">
          <motion.img 
            src={article.image_url} 
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

          {/* Theme Icon Badge */}
          <div className="absolute top-2 md:top-4 right-2 md:right-4">
            <div className="p-1.5 md:p-2.5 backdrop-blur-md bg-white/20 border border-white/30 rounded-lg md:rounded-2xl text-white shadow-xl">
              <MainIcon className="w-3.5 h-3.5 md:w-5 md:h-5" strokeWidth={2.5} />
            </div>
          </div>

          {/* Category Label */}
          <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4">
            <span className="px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-[0.15em] bg-white text-slate-900 shadow-lg">
              {article.category}
            </span>
          </div>
        </div>

        {/* 3. CONTENT SECTION */}
        <div className="px-4 md:px-6 pb-4 md:pb-6 pt-3 md:pt-4 flex flex-col flex-grow">
          
          {/* Metadata Grid */}
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <div className="flex items-center gap-1 md:gap-1.5 px-1.5 md:px-2 py-0.5 md:py-1 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
              <Calendar size={11} className="text-slate-400 md:w-3 md:h-3" />
              <span className="text-[9px] md:text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">
                {article.display_date}
              </span>
            </div>
            <div className="flex items-center gap-1 md:gap-1.5 px-1.5 md:px-2 py-0.5 md:py-1 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
              <Clock size={11} className="text-slate-400 md:w-3 md:h-3" />
              <span className="text-[9px] md:text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">
                {article.read_time}
              </span>
            </div>
          </div>

          <h3 className="text-base md:text-xl font-bold text-slate-900 dark:text-white font-anek leading-tight md:leading-snug group-hover:text-rose-600 transition-colors duration-300 line-clamp-2 mb-2 md:mb-3">
            {article.title}
          </h3>

          <p className="hidden md:block text-slate-500 dark:text-slate-400 font-hind text-[15px] leading-relaxed line-clamp-3 mb-6">
            {article.description}
          </p>

          {/* 4. FOOTER: ACTIONS & CREATOR */}
          <div className="mt-auto flex items-center justify-between pt-3 md:pt-4 border-t border-slate-50 dark:border-slate-800">
            <Link 
              href={`/learn/${article.id}`}
              className={`flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs font-black uppercase tracking-wider md:tracking-widest transition-all duration-300
                ${theme === 'rose' ? 'text-rose-600' : theme === 'blue' ? 'text-blue-600' : 'text-purple-600'}`}
            >
              বিস্তারিত পড়ুন 
              <span className="inline-flex items-center justify-center w-4 h-4 md:w-6 md:h-6 rounded-full border border-current group-hover:translate-x-1 transition-transform">
                <ChevronRight className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
              </span>
            </Link>

            {/* Creator Identity */}
            {article.creator && (
              <div className="flex items-center gap-1.5 md:gap-2.5">
                <div className="flex flex-col items-end">
                <span className="text-[7px] md:text-[8px] uppercase tracking-tighter text-slate-400 font-bold leading-none">Editor</span>
                <span className="text-[9px] md:text-[10px] font-black text-slate-700 dark:text-slate-300 font-anek leading-tight">
                    {article.creator.name}
                  </span>
                </div>
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 overflow-hidden shadow-sm flex items-center justify-center">
                  {article.creator.avatar ? (
                    <img src={article.creator.avatar} alt={article.creator.name} className="w-full h-full object-cover" />
                  ) : (
                    <UserCircle size={16} className="text-slate-400 md:w-[18px] md:h-[18px]" />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
