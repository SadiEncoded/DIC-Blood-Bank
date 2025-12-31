import { LearnArticle } from '@/assets/data/learn/content';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export const useLearnArticles = (limit?: number, excludeId?: string) => {
  const [articles, setArticles] = useState<LearnArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    
    const fetchArticles = async () => {
      try {
        let query = supabase
          .from('article_posts')
          .select('*')
          .eq('is_active', true)
          .eq('post_type', 'article')
          .order('created_at', { ascending: false });

        if (limit) query = query.limit(limit);
        if (excludeId) query = query.neq('id', excludeId);

        const { data, error } = await query;
        if (error) throw error;
        if (data) {
          // Type casting since DB field types might slightly differ from frontend types if not perfectly aligned
          setArticles(data as unknown as LearnArticle[]);
        }
      } catch (err: any) {
        console.error('Error fetching learn articles:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();

    // Setup Realtime Subscription
    const channel = supabase
      .channel('learn_articles_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'article_posts', filter: 'is_active=eq.true' },
        (payload: any) => {
          // Synchronize educational articles in real-time
          if (payload.new && (payload.new as any).post_type !== 'article') return;
          if (payload.eventType === 'INSERT') {
            setArticles(prev => [payload.new as unknown as LearnArticle, ...prev].slice(0, limit || prev.length + 1));
          } else if (payload.eventType === 'UPDATE') {
            if (!payload.new.is_active) {
                setArticles(prev => prev.filter(article => article.id !== payload.new.id));
            } else {
                setArticles(prev => prev.map(article => 
                    article.id === payload.new.id ? payload.new as unknown as LearnArticle : article
                ));
            }
          } else if (payload.eventType === 'DELETE') {
            setArticles(prev => prev.filter(article => article.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [limit, excludeId]);

  return { articles, loading, error };
};
