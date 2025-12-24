import { getEnrichedStories } from '@/lib/services/stories.service';
import { EnrichedDonorStory } from '@/lib/types';
import { useEffect, useState } from 'react';

export function useEnrichedStories() {
  const [stories, setStories] = useState<EnrichedDonorStory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getEnrichedStories();
    setStories(data);
    setLoading(false);
  }, []);

  return { stories, loading };
}
