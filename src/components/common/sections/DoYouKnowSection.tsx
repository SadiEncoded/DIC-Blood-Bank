'use client';

import { Container, Section } from '@/components/ui';
import { FeaturedArticleCard } from '@/features/learn';
import { useLearnArticles } from '@/features/learn/hooks/useLearnArticles';
import { motion } from 'framer-motion';

export default function DoYouKnowSection() {
  const { articles } = useLearnArticles(3); // Fetch top 3 articles
  return (
    <div className="bg-[#ffffff] font-sans antialiased text-slate-900">
      <Section className="!py-10 md:!py-20">
        <Container>
          {/* HEADER */}
          <header className="mb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="md:px-4 px-1 text-rose-600 font-bold tracking-[0.2em] text-[11px] md:text-xs uppercase block mb-4"
                >
                  Health Awareness Portal
                </motion.span>
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="md:px-4 text-2xl md:text-5xl font-black text-slate-800 py-2 md:py-4 font-anek leading-[1] tracking-tight"
                >
                  আপনি কি<br/> <span className="text-white px-4 md:px-6 py-1.5 md:py-2 bg-rose-600 italic font-anek inline-block transform -skew-x-6 mt-1 md:mt-2">জানেন ?</span>
                </motion.h1>
              

              <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="md:p-4 p-1 text-slate-600 text-base md:text-xl font-hind leading-relaxed max-w-2xl mx-auto"
              >
              রক্তদান সম্পর্কে সঠিক তথ্য আপনার সংশয় দূর করবে এবং জীবন বাঁচাতে সঠিক সিদ্ধান্ত নিতে সাহায্য করবে।
              </motion.p>
              </div>

              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="p-2 md:p-4 mb-8 text-slate-500/90 max-w-sm font-hind md:text-lg text-md leading-relaxed border-l-2 border-rose-400 text-hind pl-2 md:pl-4"
              >
                রক্তদান বিষয়ক সকল তথ্য জানতে আমাদের কমিউনিটি পেজে আমাদের সকল ব্লগ পোস্ট দেখুন।
              </motion.p>
            </div>
             
             
             {/* ELEGANT DIVIDER */}
          <div className="flex items-center justify-center gap-4 md:mb-24 mb-12 opacity-20">
            <div className="h-px w-full bg-slate-800" />
           
          </div>
          </header>

          <div className="space-y-16 md:space-y-32">
            {articles.map((article, idx) => (
              <FeaturedArticleCard key={article.id || idx} article={article} index={idx} />
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
