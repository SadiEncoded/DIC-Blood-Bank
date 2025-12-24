'use client';

import CommunityHero from './components/CommunityHero';
import EventsShowcase from './components/EventsShowcase';
import TeamSection from './components/TeamSection';

export default function CommunityPage() {
  return (
    <main className="min-h-screen selection:bg-rose-500/30 selection:text-rose-900">
      <CommunityHero />
      <EventsShowcase />
      <TeamSection />
    </main>
  );
}
