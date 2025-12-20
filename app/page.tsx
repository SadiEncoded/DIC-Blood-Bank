import prisma from '@/app/lib/db/client';
import { Stat } from '@/app/lib/types';
import CTA from '@/components/home/CTA';
import Hero from '@/components/home/Hero';
import Infos from '@/components/home/Infos';
import Process from '@/components/home/Process';
import Testimonials from '@/components/home/Testimonials';

export default async function Home() {
  const donorCount = await prisma.donor.count();
  const requestsCount = await prisma.bloodRequest.count();
  const dbStories = await prisma.donorStory.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10
  });
  
  const dynamicStats: Stat[] = [
    { label: "মোট দাতা", value: `${donorCount}+`, tone: "rose" },
    { label: "রক্তের অনুরোধ", value: `${requestsCount}`, tone: "blue" },
    { label: "সফল ক্যাম্পেইন", value: "৪৮", tone: "emerald" },
  ];

  const stories = (dbStories as any).map((s: any) => ({
    id: s.id,
    name: s.name,
    location: s.location || 'Dhaka',
    bloodType: s.bloodType || 'O+',
    donations: s.donations,
    story: s.story || s.quote, // Handle either field name if Prisma is out of sync
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Hero stats={dynamicStats} />
      <Infos />
      <Process />
      <Testimonials stories={stories} />
      <CTA />
    </div>
  );
}
