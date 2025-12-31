'use client';

import { DONATE_PAGE_CONTENT } from '@/assets/data/shared';
import { Hero } from '@/components/ui/featureshero';

export default function DonateHero() {
  const { badge, title, splitTitle, description, chips } = DONATE_PAGE_CONTENT;

  return (
    <Hero
      badge={badge}
      title={title}
      splitTitle={splitTitle}
      description={description}
      chips={chips}
      variant="blue"
      className="!pb-32 md:!pb-48"
    />
  );
}
