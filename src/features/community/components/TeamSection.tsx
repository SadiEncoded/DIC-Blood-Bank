'use client';

import { TEAM_SECTION } from "@/assets/data/community";
import { ShowcaseSection } from '@/components/ui';

export default function TeamSection() {
  const { badge, titlePre, titleMain, classTag, teamLabel, description, image } = TEAM_SECTION;

  return (
    <ShowcaseSection
      layout="hero"
      eyebrow={badge}
      title={titlePre}
      italicTitle={titleMain}
      rightLabel={classTag}
      heroData={{
        image,
        label: teamLabel,
        description
      }}
    />
  );
}
