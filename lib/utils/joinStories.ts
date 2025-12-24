import { Donor, DonorStory, EnrichedDonorStory } from '@/lib/types';

export function joinStories(stories: DonorStory[], donors: Donor[]): EnrichedDonorStory[] {
  const donorMap = new Map<number, Donor>(donors.map(d => [d.id, d]));

  const enriched = stories.map(story => {
    const donor = donorMap.get(typeof story.donorId === 'string' ? parseInt(story.donorId) : story.donorId);
    if (!donor) return null;

    const enrichedStory: EnrichedDonorStory = {
      ...story,
      donorName: donor.name,
      bloodType: donor.blood,
      donations: donor.count,
      location: donor.location,
    };
    return enrichedStory;
  });

  return enriched.filter((story): story is EnrichedDonorStory => story !== null);
}
