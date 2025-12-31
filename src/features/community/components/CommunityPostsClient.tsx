'use client';

import { Container, Section, SectionHeader } from '@/components/ui';
import { useCommunityPosts } from '../hooks/useCommunityPosts';
import PostCard from './PostCard';

export default function CommunityPostsClient({ initialPosts = [] }: { initialPosts?: any[] }) {
  const { posts } = useCommunityPosts(initialPosts);

  // No longer showing spinner here since we have initialPosts from server

  if (!posts.length) return null;

  return (
    <Section variant="light" className="!py-10 md:!py-24">
      {/* Top divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* Editorial rails */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 w-[1200px] -translate-x-1/2">
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-slate-200/60 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-slate-200/60 to-transparent" />
      </div>

      <Container>
        <SectionHeader
          eyebrow="Official Updates"
          title="Announcements &"
          italicTitle="Notices"
          subtitle="Verified updates, important notices, and official communications from DIC Blood Bank."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-10 md:mt-16">
          {posts.map((post: any, idx: number) => (
            <PostCard key={post.id || idx} post={post} index={idx} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
