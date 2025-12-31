'use client';

import { ABOUT_HERO_CONTENT } from '@/assets/data/about/content';
import { Hero } from '@/components/ui/featureshero';

export default function AboutHero() {
  const { badge, title, splitTitle, description } = ABOUT_HERO_CONTENT;

  return (
    <Hero
      badge={badge}
      title={title}
      splitTitle={splitTitle}
      description={description}
      variant="rose"
    />
  );
}
