import { PrismaPg } from '@prisma/adapter-pg';
import "dotenv/config";
import { PrismaClient } from '../generated/prisma/client';

// Import centralized data
import { MISSION_VISION } from '../app/lib/data/about.js';
import { COMMUNITY_HERO, TEAM_SECTION } from '../app/lib/data/community.js';
import { team } from '../app/lib/data/founders.js';
import { HERO_CONTENT, TYPING_PHRASES } from '../app/lib/data/hero.js';
import { WHO_CAN_DONATE, WHY_DONATE } from '../app/lib/data/info.js';

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
          ...TYPING_PHRASES.map((phrase, idx) => ({ key: 'typing-phrase', content: phrase, order: idx })),
          { key: 'cta-donor', content: HERO_CONTENT.cta.donor },
          { key: 'cta-find', content: HERO_CONTENT.cta.find },
          { key: 'trust-value', content: HERO_CONTENT.trust.value },
          { key: 'trust-label', content: HERO_CONTENT.trust.label },
        ],
      },
    },
  });

  // Why Donate Section
  await prisma.section.upsert({
    where: { pageId_identifier: { pageId: home.id, identifier: 'why-donate' } },
    update: {},
    create: {
      pageId: home.id,
      identifier: 'why-donate',
      title: WHY_DONATE.title,
      items: {
        create: WHY_DONATE.items.map((item, idx) => ({
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
      title: WHO_CAN_DONATE.title,
      items: {
        create: WHO_CAN_DONATE.items.map((item, idx) => ({
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
  for (const member of team) {
    await prisma.teamMember.upsert({
      where: { name: member.name },
      update: member,
      create: member,
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
