'use client';
import AboutHero from '@/features/about/components/AboutHero';
import CallToActionSection from '@/features/about/components/CTA';
import FounderTeamSection from '@/features/about/components/FounderTeam';
import MissionVisionSection from '@/features/about/components/MissionVision';
import StorySection from '@/features/about/components/StorySection';
import ValuesSection from '@/features/about/components/ValuesSection';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pb-20 selection:bg-rose-500/30 selection:text-rose-900">
      <AboutHero />
      <MissionVisionSection />
      <StorySection />
      <FounderTeamSection />
      <ValuesSection />
      <CallToActionSection />

    </div>
  );
}
