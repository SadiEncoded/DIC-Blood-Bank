import ActionSection from '@/components/common/sections/ActionSection';
import CTASection from '@/components/common/sections/CTASection';
import DoYouKnowSection from '@/components/common/sections/DoYouKnowSection';
import DonorStoriesSection from '@/components/common/sections/FeaturedStory';
import HomeHero from '@/components/common/sections/HomeHero';
import { bloodRequestService } from '@/features/blood-requests/services/blood-request.service';
import { getDonorCount } from '@/features/donors/services';
import { eventService } from '@/features/events/services/event.service';
import { getEnrichedStories } from '@/features/stories/services';

const formatBn = (num: number | bigint) =>
  new Intl.NumberFormat('bn-BD').format(Number(num));

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [donorCount, requestsCount, campaignCount, stories ] = await Promise.all([
    getDonorCount(),
    bloodRequestService.getTotalRequestsCount(),
    eventService.getSuccessfulCampaignsCount(),
    getEnrichedStories()
  ]);
  
  const dynamicStats = [
    { label: "মোট দাতা", value: formatBn(donorCount), tone: "rose" as const },
    { label: "রক্তের অনুরোধ", value: formatBn(requestsCount), tone: "blue" as const },
    { label: "সফল ক্যাম্পেইন", value: formatBn(campaignCount), tone: "emerald" as const },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <HomeHero stats={dynamicStats} />
      <DoYouKnowSection />
      <ActionSection />
      <DonorStoriesSection initialStories={stories} />
      <CTASection />
    </div>
  );
}
