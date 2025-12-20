import prisma from '@/app/lib/db/client';
import { Donor } from '@/app/lib/types';
import { Container, Section, SectionHeader } from '@/components/ui';
import { DonorsHero } from './components/DonorsHero';
import { DonorsTable } from './components/DonorsTable';
import { HallOfFameLeaderboard } from './components/HallOfFameLeaderboard';

export default async function DonorsPage() {
  const dbDonors = await prisma.donor.findMany({
    orderBy: {
      donationCount: 'desc'
    }
  });

  const bloodTypeMapRev: Record<string, any> = {
    'A_POSITIVE': 'A+',
    'A_NEGATIVE': 'A-',
    'B_POSITIVE': 'B+',
    'B_NEGATIVE': 'B-',
    'AB_POSITIVE': 'AB+',
    'AB_NEGATIVE': 'AB-',
    'O_POSITIVE': 'O+',
    'O_NEGATIVE': 'O-',
  };

  const donors: Donor[] = dbDonors.map(d => ({
    id: d.id,
    name: d.name,
    count: d.donationCount,
    blood: bloodTypeMapRev[d.bloodType] || d.bloodType,
    tier: (d.tier.charAt(0) + d.tier.slice(1).toLowerCase()) as any,
    year: d.createdAt.getFullYear().toString(),
    lastDonation: d.lastDonation ? (d.lastDonation.toISOString().split('T')[0] || 'N/A') : 'N/A',
    phone: d.phone,
    location: d.location
  }));

  const topDonors = donors.slice(0, 3); // Already sorted by donationCount desc

  return (
    <main className="min-h-screen bg-slate-50">
      <DonorsHero />

      {/* Primary Section: All Donors Table */}
      <Section className="relative z-20 -mt-20">
        <Container>
           <div className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl shadow-slate-200/50">
             <SectionHeader 
               title="Donor Registry" 
               subtitle="A complete list of our heroes who have contributed to saving lives in our community."
               className="mb-10"
             />
             <DonorsTable donors={donors} />
            </div>
        </Container>
      </Section>

      {/* Secondary Section: Hall of Fame Leaderboard */}
      <Section variant="slate">
        <Container>
          <SectionHeader 
            eyebrow="Recognition"
            title="Hall of Fame" 
            subtitle="Honoring our most dedicated contributors who have set the standard for humanitarian service."
            centered
          />
          <HallOfFameLeaderboard topDonors={topDonors} />
        </Container>
      </Section>
    </main>
  );
}
