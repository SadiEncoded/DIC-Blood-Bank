'use client';

import { RequestHero } from './components/RequestHero';
import { BloodRequestForm } from './components/RequestForm';
import { EmergencyContact } from './components/EmergencyContact';

export default function RequestPage() {
  return (
    <div className="min-h-screen bg-white pb-20 selection:bg-rose-500/30 selection:text-rose-900">
      <RequestHero />
      
      <section className="relative max-w-4xl mx-auto px-4 md:px-6 -mt-16 md:-mt-24 z-20">
        <BloodRequestForm />
      </section>
      <EmergencyContact />
    </div>
  );
}
