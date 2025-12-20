'use client';

import { FOUNDERS } from '@/app/lib/data/about';
import { ShowcaseSection } from '@/components/ui';

export default function FounderTeamSection() {
  return (
    <ShowcaseSection
      layout="grid"
      eyebrow="Our Founders"
      title="The Minds Behind"
      italicTitle="DIC Blood Bank"
      rightLabel="Class of Phoenix '24"
      gridData={FOUNDERS}
    />
  );
}
