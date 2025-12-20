import prisma from '@/app/lib/db/client';
import { Container, Section, SectionHeader } from '@/components/ui';
import DonorSearch from './components/DonorSearch';
import { EmergencyContact } from './components/EmergencyContact';
import { BloodRequestForm } from './components/RequestForm';
import { RequestHero } from './components/RequestHero';
import { RequestsList } from './components/RequestsList';

export default async function RequestPage() {
  const dbRequests = await prisma.bloodRequest.findMany({
    where: {
      isFulfilled: false,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 6,
  });

  const requests = dbRequests.map(r => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
    neededBy: r.neededBy.toLocaleDateString('bn-BD'),
  }));

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-rose-500/30 selection:text-rose-900">
      <RequestHero />
      
      {/* Search Section (Coming Next) */}
      <Section className="relative z-30 -mt-20">
        <Container>
           {/* Placeholder for real search component */}
           <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 mb-12">
             <SectionHeader 
               title="রক্তদাতা খুঁজুন" 
               subtitle="নিকটবর্তী রক্তদাতাদের খুঁজুন এবং জরুরি প্রয়োজনে সরাসরি যোগাযোগ করুন।"
               eyebrow="Search Donors"
             />
             <DonorSearch />
           </div>
        </Container>
      </Section>

      {/* Live Requests Feed */}
      <Section variant="slate" className="py-20">
        <Container>
          <SectionHeader 
            title="লাইভ অনুরোধসমূহ" 
            subtitle="বর্তমানের জরুরি রক্তের অনুরোধগুলো দেখুন এবং জীবন বাঁচাতে এগিয়ে আসুন।"
            eyebrow="Live Feed"
            centered
          />
          <RequestsList requests={requests as any} />
        </Container>
      </Section>

      {/* Request Form Section */}
      <Section className="py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <SectionHeader 
              title="রক্তের জন্য অনুরোধ করুন" 
              subtitle="আপনার প্রয়োজনীয় রক্তের তথ্য বিস্তারিত প্রদান করুন।"
              eyebrow="Post a Request"
              className="mb-10"
            />
            <BloodRequestForm />
          </div>
        </Container>
      </Section>

      <EmergencyContact />
    </div>
  );
}
