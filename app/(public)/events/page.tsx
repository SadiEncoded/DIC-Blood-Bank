import { getEvents } from '@/lib/services/events.service';
import EventGrid from './components/EventGrid';
import EventsHero from './components/EventsHero';

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
      <EventGrid initialEvents={events} />
    </main>
  );
}
