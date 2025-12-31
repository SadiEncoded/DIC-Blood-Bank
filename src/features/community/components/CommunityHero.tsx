'use client';

import { COMMUNITY_HERO } from "@/assets/data/community";
import { Hero } from "@/components/ui/featureshero";

export default function CommunityHero() {
  const { badge, title, splitTitle, description, chips } = COMMUNITY_HERO;

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
