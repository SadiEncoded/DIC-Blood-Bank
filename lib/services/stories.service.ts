'use server';

import { EnrichedDonorStory } from '@/lib/types/donorStory';
import { mapDBToBloodType } from '@/lib/utils/db-mapping';
import { createClient } from '@/lib/utils/supabase/server';

export async function getEnrichedStories(): Promise<EnrichedDonorStory[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('stories')
    .select(`
      *,
      profiles:donor_id (
        full_name,
        blood_type,
        location,
        is_verified,
        donation_count
      )
    `)
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('CRITICAL: Stories fetch failed');
    console.error('Error Code:', error.code);
    console.error('Error Message:', error.message);
    console.error('Error Details:', error.details);
    return [];
  }

  // Map the join result to the EnrichedDonorStory interface
  return (data as any[]).map(story => ({
    ...story,
    donor_name: story.profiles?.full_name,
    blood_type: mapDBToBloodType(story.profiles?.blood_type),
    location: story.profiles?.location,
    is_verified: story.profiles?.is_verified,
    donations: story.profiles?.donation_count
  })) as EnrichedDonorStory[];
}
