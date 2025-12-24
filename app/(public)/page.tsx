import CTASection from '@/components/sections/CTASection';
import DonorStoriesSection from '@/components/sections/DonorStoriesSection';
import HeroSection from '@/components/sections/HeroSection';
import InfosSection from '@/components/sections/InfosSection';
import ProcessSection from '@/components/sections/ProcessSection';
import { DONOR_STATS } from '@/lib/data/Home-Content';
import { getDonorCount } from '@/lib/services/donors.service';
import { getEnrichedStories } from '@/lib/services/stories.service';
import { Stat } from '@/lib/types';

const formatBn = (num: number | bigint) =>
  new Intl.NumberFormat('bn-BD').format(Number(num));

export default async function Home() {
  const donorCount = await getDonorCount();
  const stories = await getEnrichedStories();
  
  const dynamicStats: Stat[] = [
    { label: "মোট দাতা", value: formatBn(donorCount), tone: "rose" },
    { label: "রক্তের অনুরোধ", value: DONOR_STATS[1]?.value || "4500+", tone: "blue" },
    { label: "সফল ক্যাম্পেইন", value: DONOR_STATS[2]?.value || "48", tone: "emerald" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection stats={dynamicStats} />
      <InfosSection />
      <ProcessSection />
      <DonorStoriesSection initialStories={stories} />
      <CTASection />
    </div>
  );
}
