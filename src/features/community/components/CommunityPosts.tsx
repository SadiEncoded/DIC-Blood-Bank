import { postService } from '../services/post.service';
import CommunityPostsClient from './CommunityPostsClient';

export default async function CommunityPosts() {
  const posts = await postService.listPublishedAnnouncements();
  
  return <CommunityPostsClient initialPosts={posts || []} />;
}
