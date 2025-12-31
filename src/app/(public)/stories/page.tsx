import StoriesClientView from '@/features/stories/components/fullstory';
import { getEnrichedStories } from '@/features/stories/services';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Success Stories | DIC Blood Bank',
  description: 'Read inspiring stories from our donors and the lives they have helped save.',
};

export default async function StoriesPage() {
  const stories = await getEnrichedStories();

  return <StoriesClientView initialStories={stories} />;
}
