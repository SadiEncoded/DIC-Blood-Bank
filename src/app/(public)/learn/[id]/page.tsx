import FeaturedArticle from '@/features/learn/components/FullArticle';
import ArticleFeed from '@/features/learn/components/LearnFeed';
import { createClient } from '@/lib/supabase/server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: article } = await supabase
    .from('article_posts')
    .select('*')
    .eq('id', id)
    .single();
  
  if (!article) return { title: 'Article Not Found' };

  return {
    title: `${article.title} | Awareness Portal`,
    description: article.description,
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: article } = await supabase
    .from('article_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fcfdfe]">
      {/* FULL ARTICLE CONTENT */}
      {/* 
        We need to cast article to any or proper type because DB types 
        might not exactly match the strict LearnArticle interface yet 
        (though we aligned them closely). 
      */}
      <FeaturedArticle article={article as any} showBackLink={true} />
      
      {/* RELATED ARTICLES SECTION */}
      <section className="bg-white border-t border-slate-100 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-rose-600 font-bold text-[10px] uppercase tracking-[0.3em] mb-3">
                Continue Learning
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 font-anek">
                আরো পড়ুন
              </h2>
            </div>
            <div className="hidden md:block h-px bg-slate-100 flex-grow mx-8 mb-4" />
          </div>
          
          {/* FEED COMPONENT */}
          <ArticleFeed excludeId={article.id} limit={2} />
        </div>
      </section>
    </main>
  );
}
