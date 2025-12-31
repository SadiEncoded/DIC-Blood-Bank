'use client';

import { SEARCHPAGE_HERO_CONTENT } from '@/assets/data/search/content';
import { Hero } from '@/components/ui/featureshero';

export default function DonorsHero() {
  const { badge, title, splitTitle, description, chips } = SEARCHPAGE_HERO_CONTENT;

  return (
    <Hero
      badge={badge}
      title={title}
      splitTitle={splitTitle}
      description={description}
      chips={chips}
      variant="rose"
      className="!pb-20 md:!pb-48"
    />
  );
}
