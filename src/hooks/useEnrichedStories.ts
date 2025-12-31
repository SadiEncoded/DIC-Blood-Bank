import { getEnrichedStories } from '@/features/stories/services';
import { EnrichedDonorStory } from '@/features/stories/types';
import { useEffect, useState } from 'react';

export function useEnrichedStories() {
  const [stories, setStories] = useState<EnrichedDonorStory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStories() {
      try {
        const data = await getEnrichedStories();
        setStories(data);
      } finally {
        setLoading(false);
      }
    }
    fetchStories();
  }, []);

  return { stories, loading };
}
