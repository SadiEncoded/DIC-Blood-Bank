'use client';

import { events } from '@/app/lib/data/shared';
import { EventsCTA } from './components/CTA';
import { EventsGrid } from './components/EventGrid';
import { EventsHero } from './components/Hero';

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-rose-500/30 selection:text-rose-900">
      <EventsHero />
      <EventsGrid events={events} />
      <EventsCTA />
    </div>
  );
}
