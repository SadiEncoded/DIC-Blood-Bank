import CommunityGallery from '@/features/community/components/CommunityGallery';
import CommunityHero from '@/features/community/components/CommunityHero';
import CommunityPosts from '@/features/community/components/CommunityPosts';
import EventsShowcase from '@/features/community/components/EventsShowcase';
import { getEvents } from '@/features/events/services';

export const dynamic = 'force-dynamic';

export default async function CommunityPage() {
  const events = await getEvents();

  return (
    <main className="min-h-screen selection:bg-rose-500/30 selection:text-rose-900">
      <CommunityHero />
      <CommunityGallery />
      <CommunityPosts />
      <EventsShowcase events={events as any} />
    </main>
  );
}
