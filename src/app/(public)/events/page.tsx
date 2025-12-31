import EventGrid from '@/features/events/components/EventGrid';
import EventsHero from '@/features/events/components/EventsHero';
import { getEvents } from '@/features/events/services';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Events & Campaigns | DIC Blood Bank',
  description: 'Join our upcoming blood donation drives, awareness seminars, and community workshops.',
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <main className="min-h-screen pb-10">
      
      {/* Hero Section */}
      <EventsHero />

      {/* Events Grid Section */}
      <EventGrid initialEvents={events as any} />
    </main>
  );
}
