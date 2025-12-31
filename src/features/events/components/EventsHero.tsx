'use client';

import { EVENTS_PAGE_CONTENT } from '@/assets/data/events';
import { Hero } from '@/components/ui/featureshero';

export default function EventsHero() {
  const { hero } = EVENTS_PAGE_CONTENT;

  return (
    <Hero
      badge={hero.eyebrow}
      title={hero.title}
      splitTitle={hero.splitTitle}
      description={hero.subtitle}
      variant="rose"
    />
  );
}
