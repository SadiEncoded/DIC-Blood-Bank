'use client';

import { LEARN_HERO_CONTENT } from '@/assets/data/learn/content';
import { Hero } from '@/components/ui/featureshero';

export default function LearnHero() {
  const { badge, title, splitTitle, description, chips } = LEARN_HERO_CONTENT;

  return (
    <Hero
      badge={badge}
      title={title}
      splitTitle={splitTitle}
      description={description}
      chips={chips}
      variant="rose"
    />
  );
}
