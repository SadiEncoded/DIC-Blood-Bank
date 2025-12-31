'use client';

import { LEARN_ARTICLES, LearnArticle } from '@/assets/data/learn/content';
import { Container } from '@/components/ui';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    BookOpen,
    CheckCircle2,
    Clock,
    Droplet,
    Info,
    UserCircle
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface FeaturedArticleProps {
  article?: LearnArticle;
  showBackLink?: boolean;
}

export default function FullArticle({ article: propArticle, showBackLink = false }: FeaturedArticleProps) {
  const article = propArticle || LEARN_ARTICLES[0];
  
  if (!article) return null;

  const content = article.full_content;
  const theme = article.color_theme;

  return (
    <section className="py-12 md:py-24 bg-[#fcfdfe] overflow-hidden">
      <Container>
        <div className="max-w-4xl mx-auto">
          
          {/* NAVIGATION (Left Aligned) */}
          {showBackLink && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 md:mb-12"
            >
              <Link 
                href="/learn"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-rose-600 font-bold text-xs uppercase tracking-widest transition-colors group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Awareness Portal
              </Link>
            </motion.div>
          )}

          {/* ARTICLE HEADER (Now Left Aligned) */}
          <header className="mb-8 md:mb-16 text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6 
                ${theme === 'rose' ? 'bg-rose-50 text-rose-600' : 
                  theme === 'blue' ? 'bg-blue-50 text-blue-600' : 
                  'bg-purple-50 text-purple-600'}`}
            >
              <BookOpen size={14} /> {article.headline}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 md:mb-8 leading-[1.1] font-anek tracking-tight"
            >
              {article.title}
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-3 md:gap-6 text-xs md:text-sm text-slate-500 font-medium border-b border-slate-100 pb-4 md:pb-8"
            >
              {article.creator && (
                <span className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center text-slate-400 border border-slate-200 shadow-sm">
                    {article.creator.avatar ? (
                      <img src={article.creator.avatar} alt={article.creator.name} className="w-full h-full object-cover" />
                    ) : (
                      <UserCircle size={20} />
                    )}
                  </div>
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Editor:</span> {article.creator.name}
                </span>
              )}
              <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
              <span className="flex items-center gap-2">
                <Calendar size={14} className="text-slate-400" />
                {article.display_date}
              </span>
              <span className="hidden md:flex items-center gap-2">
                <Clock size={14} className="text-slate-400" />
                {article.read_time || '5 min read'}
              </span>
            </motion.div>
          </header>

          {/* FEATURED IMAGE */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`relative aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-[2.5rem] overflow-hidden mb-8 md:mb-16 shadow-2xl 
              ${theme === 'rose' ? 'shadow-rose-100' : 
                theme === 'blue' ? 'shadow-blue-100' : 
                'shadow-purple-100'}`}
          >
            <Image 
              src={article.image_url} 
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
          </motion.div>

          {/* ARTICLE BODY */}
          <div className="space-y-8 md:space-y-16 mb-12 md:mb-24">
            {/* Introduction */}
            {content?.introduction && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`text-base md:text-xl lg:text-2xl text-slate-600 font-hind leading-relaxed font-light italic border-l-2 md:border-l-4 pl-4 md:pl-8
                  ${theme === 'rose' ? 'border-rose-500' : 
                    theme === 'blue' ? 'border-blue-500' : 
                    'border-purple-500'}`}
              >
                "{content.introduction}"
              </motion.div>
            )}

            {/* Sections */}
            {content?.sections.map((section, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="space-y-4 md:space-y-8"
              >
                <div className="flex items-center gap-4">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 font-anek shrink-0">
                    {section.sectionTitle}
                  </h2>
                  <div className="h-px bg-slate-200 flex-grow" />
                </div>

                <div className="grid grid-cols-1 gap-4 md:gap-8">
                  {section.content.map((block, bIdx) => {
                    if (block.type === 'text') {
                      return (
                        <p key={bIdx} className="text-base md:text-lg text-slate-600 font-hind leading-relaxed">
                          {block.body}
                        </p>
                      );
                    }
                    if (block.type === 'highlight') {
                      return (
                        <div key={bIdx} className={`rounded-xl md:rounded-[2rem] p-5 md:p-8 border relative group
                          ${theme === 'rose' ? 'bg-rose-50 border-rose-100' : 
                            theme === 'blue' ? 'bg-blue-50 border-blue-100' : 
                            'bg-purple-50 border-purple-100'}`}>
                          <div className="absolute top-0 right-8 transform -translate-y-1/2">
                            <div className={`p-3 rounded-2xl shadow-lg text-white
                              ${theme === 'rose' ? 'bg-rose-600 shadow-rose-200' : 
                                theme === 'blue' ? 'bg-blue-600 shadow-blue-200' : 
                                'bg-purple-600 shadow-purple-200'}`}>
                              <Droplet size={24} />
                            </div>
                          </div>
                          <h3 className="text-lg md:text-xl font-bold text-slate-900 font-anek mb-3 md:mb-4 flex items-center gap-2">
                            <Info size={20} className={
                              theme === 'rose' ? 'text-rose-500' : 
                              theme === 'blue' ? 'text-blue-500' : 
                              'text-purple-500'
                            } />
                            {block.heading}
                          </h3>
                          <p className="text-sm md:text-base text-slate-600 font-hind leading-relaxed">
                            {block.body}
                          </p>
                        </div>
                      );
                    }
                    if (block.type === 'list' && Array.isArray(block.body)) {
                      return (
                        <div key={bIdx} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {block.body.map((item, iIdx) => (
                            <div key={iIdx} className="flex items-start gap-3 md:gap-4 p-4 md:p-5 rounded-xl md:rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                              <div className={`mt-1 p-1.5 rounded-lg
                                ${theme === 'rose' ? 'bg-rose-50 text-rose-600' : 
                                  theme === 'blue' ? 'bg-blue-50 text-blue-600' : 
                                  'bg-purple-50 text-purple-600'}`}>
                                <CheckCircle2 size={18} />
                              </div>
                              <span className="text-sm md:text-base text-slate-700 font-hind font-medium leading-snug">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </motion.div>
            ))}

            {/* CONCLUSION (Restored to Centered Previous Version Design) */}
            {content?.conclusion && (
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className={`p-6 md:p-10 lg:p-16 rounded-2xl md:rounded-[3rem] text-center space-y-3 md:space-y-4
                   ${theme === 'rose' ? 'bg-rose-950 text-rose-50' : 
                     theme === 'blue' ? 'bg-blue-950 text-blue-50' : 
                     'bg-purple-950 text-purple-50'}`}
               >
                 <h3 className="text-xl md:text-2xl lg:text-3xl font-bold font-anek">উপসংহার</h3>
                 <p className="text-base md:text-lg lg:text-xl opacity-80 font-hind leading-relaxed max-w-2xl mx-auto">
                   {content.conclusion}
                 </p>
               </motion.div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

// Sub-component for simple icons
function Calendar({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
