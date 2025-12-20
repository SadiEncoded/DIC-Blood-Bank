import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import "dotenv/config";

// Import centralized data
import { FOUNDERS, MISSION_VISION } from '../app/lib/data/about/index';
import { COMMUNITY_HERO, TEAM_SECTION } from '../app/lib/data/community/index';
import { DONOR_REGISTRY } from '../app/lib/data/donors/index';
import { DONOR_STORIES, HERO_CONTENT, INFO_SECTIONS } from '../app/lib/data/homepage/index';

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting seeding...');

  // --- HOME PAGE ---
  const home = await prisma.page.upsert({
    where: { slug: 'home' },
    update: {},
    create: {
      slug: 'home',
      title: 'Home Page',
    },
  });

  // Hero Section
  await prisma.section.upsert({
    where: { pageId_identifier: { pageId: home.id, identifier: 'hero' } },
    update: {},
    create: {
      pageId: home.id,
      identifier: 'hero',
      badge: HERO_CONTENT.badge,
      title: HERO_CONTENT.title,
      description: HERO_CONTENT.description,
      items: {
        create: [
          ...HERO_CONTENT.typingPhrases.map((phrase, idx) => ({ key: 'typing-phrase', content: phrase, order: idx })),
          { key: 'cta-donor', content: HERO_CONTENT.cta.donor },
          { key: 'cta-find', content: HERO_CONTENT.cta.find },
          { key: 'trust-value', content: HERO_CONTENT.trust.value },
          { key: 'trust-label', content: HERO_CONTENT.trust.label },
        ],
      },
    },
  });

  const whyDonate = INFO_SECTIONS[0]!;
  const whoCanDonate = INFO_SECTIONS[1]!;

  // Why Donate Section
  await prisma.section.upsert({
    where: { pageId_identifier: { pageId: home.id, identifier: 'why-donate' } },
    update: {},
    create: {
      pageId: home.id,
      identifier: 'why-donate',
      title: whyDonate.title,
      items: {
        create: whyDonate.items.map((item, idx) => ({
          content: item.text,
          icon: 'Droplet', // Simplified for seeding
          order: idx,
        })),
      },
    },
  });

  // Who Can Donate
  await prisma.section.upsert({
    where: { pageId_identifier: { pageId: home.id, identifier: 'who-can-donate' } },
    update: {},
    create: {
      pageId: home.id,
      identifier: 'who-can-donate',
      title: whoCanDonate.title,
      items: {
        create: whoCanDonate.items.map((item, idx) => ({
          content: item.text,
          icon: 'Shield',
          order: idx,
        })),
      },
    },
  });

  // --- ABOUT PAGE ---
  const about = await prisma.page.upsert({
    where: { slug: 'about' },
    update: {},
    create: {
      slug: 'about',
      title: 'About Us',
    },
  });

  await prisma.section.upsert({
    where: { pageId_identifier: { pageId: about.id, identifier: 'mission-vision' } },
    update: {},
    create: {
      pageId: about.id,
      identifier: 'mission-vision',
      badge: MISSION_VISION.header.badge,
      title: MISSION_VISION.header.title,
      description: MISSION_VISION.header.description,
      items: {
        create: [
          { key: 'mission', title: MISSION_VISION.mission.title, content: MISSION_VISION.mission.content, badge: MISSION_VISION.mission.badge, icon: 'Target' },
          { key: 'vision', title: MISSION_VISION.vision.title, content: MISSION_VISION.vision.content, badge: MISSION_VISION.vision.badge, icon: 'Zap' },
        ],
      },
    },
  });

  // --- COMMUNITY PAGE ---
  const community = await prisma.page.upsert({
    where: { slug: 'community' },
    update: {},
    create: {
      slug: 'community',
      title: 'Our Community',
    },
  });

  await prisma.section.upsert({
    where: { pageId_identifier: { pageId: community.id, identifier: 'community-hero' } },
    update: {},
    create: {
      pageId: community.id,
      identifier: 'community-hero',
      badge: COMMUNITY_HERO.badge,
      title: COMMUNITY_HERO.title,
      description: COMMUNITY_HERO.description,
      items: {
        create: COMMUNITY_HERO.chips.map((chip, idx) => ({
          key: 'chip',
          content: chip.label,
          icon: 'Zap',
          order: idx,
        })),
      },
    },
  });

  await prisma.section.upsert({
    where: { pageId_identifier: { pageId: community.id, identifier: 'team-section' } },
    update: {},
    create: {
      pageId: community.id,
      identifier: 'team-section',
      badge: TEAM_SECTION.badge,
      title: TEAM_SECTION.titlePre + ' ' + TEAM_SECTION.titleMain,
      subtitle: TEAM_SECTION.classTag,
      description: TEAM_SECTION.description,
      image: TEAM_SECTION.image,
    },
  });

  // --- FOUNDERS/TEAM ---
  console.log('👥 Seeding Team Members...');
  for (const member of FOUNDERS) {
    await prisma.teamMember.upsert({
      where: { name: member.name },
      update: member,
      create: member,
    });
  }

  // --- DONORS ---
  console.log('🩸 Seeding Donors...');
  const bloodTypeMap: Record<string, any> = {
    'A+': 'A_POSITIVE',
    'A-': 'A_NEGATIVE',
    'B+': 'B_POSITIVE',
    'B-': 'B_NEGATIVE',
    'AB+': 'AB_POSITIVE',
    'AB-': 'AB_NEGATIVE',
    'O+': 'O_POSITIVE',
    'O-': 'O_NEGATIVE',
  };

  for (const donor of DONOR_REGISTRY) {
    await prisma.donor.upsert({
      where: { phone: donor.phone || donor.id.toString() }, // Use phone or id as unique key
      update: {},
      create: {
        name: donor.name,
        phone: donor.phone || `017${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
        bloodType: bloodTypeMap[donor.blood] || 'O_POSITIVE',
        location: donor.location || 'Dhaka',
        donationCount: donor.count,
        tier: (donor.tier.toUpperCase()) as any,
        lastDonation: donor.lastDonation ? new Date(donor.lastDonation) : null,
      },
    });
  }

  // --- DONOR STORIES ---
  console.log('📖 Seeding Donor Stories...');
  for (const story of DONOR_STORIES) {
    await (prisma.donorStory as any).upsert({
      where: { id: story.id.toString() },
      update: {},
      create: {
        id: story.id.toString(),
        name: story.name,
        location: story.location,
        bloodType: story.bloodType,
        donations: story.donations,
        story: story.story,
        rating: 5,
      },
    });
  }

  console.log('✅ Seeding completed.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
