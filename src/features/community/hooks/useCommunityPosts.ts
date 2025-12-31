'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export const useCommunityPosts = (initialData: any[] = []) => {
  const [posts, setPosts] = useState<any[]>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('article_posts')
          .select('*')
          .eq('is_active', true)
          .eq('post_type', 'announcement')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (err: any) {
        console.error('Error fetching community posts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    // Setup Realtime Subscription
    const channel = supabase
      .channel('community_posts_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'article_posts', filter: 'is_active=eq.true' },
        (payload: any) => {
          // Synchronize changes in real-time, filtering for announcement post types
          if (payload.new && (payload.new as any).post_type !== 'announcement') return;
          
          if (payload.eventType === 'INSERT') {
            setPosts(prev => [payload.new, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
              if (!payload.new.is_active) {
                setPosts(prev => prev.filter(post => post.id !== payload.new.id));
              } else {
                setPosts(prev => prev.map(post => 
                    post.id === payload.new.id ? payload.new : post
                ));
              }
          } else if (payload.eventType === 'DELETE') {
            setPosts(prev => prev.filter(post => post.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { posts, loading, error };
};
