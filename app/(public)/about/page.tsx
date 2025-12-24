'use client';
import AboutHero from './components/AboutHero';
import CallToActionSection from './components/CTA';
import FounderTeamSection from './components/FounderTeam';
import MissionVisionSection from './components/MissionVision';
import StorySection from './components/StorySection';
import ValuesSection from './components/ValuesSection';

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
