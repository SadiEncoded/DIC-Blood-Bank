'use client';

import { CONTACT_PAGE_CONTENT } from '@/assets/data/contact';
import { Hero } from '@/components/ui/featureshero';

export default function ContactHero() {
  const { hero } = CONTACT_PAGE_CONTENT;

  return (
    <Hero
      badge={hero.badge}
      title={hero.title}
      splitTitle={hero.splitTitle}
      description={hero.description}
      variant="rose"
    />
  );
}
