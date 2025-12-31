'use client';

import { Container, Section } from '@/components/ui';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useLearnArticles } from '../hooks/useLearnArticles';
import { FeaturedArticleCard } from './FeaturedArticleCard';
import { LearnArticleCard } from './LearnArticleCard';

interface ArticleFeedProps {
  limit?: number;
  excludeId?: string;
  layout?: 'list' | 'grid' | 'masonry'; // Added masonry option
}

export default function ArticleFeed({ limit, excludeId, layout = 'list' }: ArticleFeedProps) {
  const { articles, loading } = useLearnArticles(limit, excludeId);

  // Layout-specific wrapper classes
  const getContainerStyles = () => {
    switch (layout) {
      case 'masonry':
        return "columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-8 space-y-4 md:space-y-8";
      case 'grid':
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8";
      default: // list
        return "grid grid-cols-1 gap-12 md:gap-24";
    }
  };

  if (loading) {
      return (
          <Section variant="light" className="!pt-0 !pb-16 md:!pb-32">
            <Container>
                <div className="flex justify-center items-center min-h-[200px]">
                    <Loader2 className="animate-spin text-rose-500" size={32} />
                </div>
            </Container>
          </Section>
      );
  }

  if (!articles.length) return null;

  return (
    <Section variant="light" className="!pt-0 !pb-16 md:!pb-32">
      <Container>
        <div className={getContainerStyles()}>
          {articles.map((article, idx) => (
            <div 
              key={article.id || idx} 
              className={layout === 'masonry' ? "break-inside-avoid mb-8" : ""}
            >
              {layout === 'list' ? (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <FeaturedArticleCard article={article} index={idx} />
                </motion.div>
              ) : (
                /* Both Masonry and Grid use the Compact card */
                <LearnArticleCard article={article} index={idx} />
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
