/**
 * Post Service
 * Handles community announcement posts
 */

import { logger } from '@/lib/logger';
import { BaseService } from '@/lib/services/base.service';

export class PostService extends BaseService {
  /**
   * List all posts of a specific type (admin only)
   */
  async listAll(type?: 'article' | 'announcement') {
    await this.requireAdmin();
    logger.debug('Listing all posts', { type });

    const supabase = await this.getAdminSupabase();
    let query = supabase
      .from('article_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (type) {
      query = query.eq('post_type', type);
    }

    return this.executeQuery('listAllPosts', async () => await query);
  }

  /**
   * List published posts for public view (Articles only by default for Learn page)
   */
  async listPublishedArticles() {
    logger.debug('Listing published articles');

    const supabase = await this.getSupabase();
    return this.executeQuery('listPublishedArticles', async () =>
      await supabase
        .from('article_posts')
        .select('*')
        .eq('is_active', true)
        .eq('post_type', 'article')
        .order('created_at', { ascending: false })
    );
  }

  /**
   * List published announcements for community view
   */
  async listPublishedAnnouncements() {
    logger.debug('Listing published announcements');

    const supabase = await this.getSupabase();
    return this.executeQuery('listPublishedAnnouncements', async () =>
      await supabase
        .from('article_posts')
        .select('*')
        .eq('is_active', true)
        .eq('post_type', 'announcement')
        .order('created_at', { ascending: false })
    );
  }

  /**
   * Create a new post (admin only)
   */
  async create(input: any) {
    await this.requireAdmin();

    logger.info('Creating community post', { title: input.title });

    const supabase = await this.getAdminSupabase();
    return this.executeQuery('createPost', async () =>
      await supabase
        .from('article_posts')
        .insert({
          ...input,
          created_at: new Date().toISOString(),
        })
        .select()
        .single()
    );
  }

  /**
   * Update a post (admin only)
   */
  async update(id: string, input: any) {
    await this.requireAdmin();

    logger.info('Updating community post', { postId: id });

    const supabase = await this.getAdminSupabase();
    return this.executeQuery('updatePost', async () =>
      await supabase
        .from('article_posts')
        .update({
          ...input,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single()
    );
  }

  /**
   * Delete a post (admin only)
   */
  async delete(id: string) {
    await this.requireAdmin();

    logger.warn('Deleting community post', { postId: id });

    const supabase = await this.getAdminSupabase();
    return this.executeQuery('deletePost', async () =>
      await supabase
        .from('article_posts')
        .delete()
        .eq('id', id)
        .select()
        .single()
    );
  }

  /**
   * Toggle published status (admin only)
   */
  async togglePublished(id: string, isPublished: boolean) {
    await this.requireAdmin();

    logger.info('Toggling community post status', { postId: id, isPublished });

    const supabase = await this.getAdminSupabase();
    return this.executeQuery('togglePostPublished', async () =>
      await supabase
        .from('article_posts')
        .update({
          is_active: isPublished,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single()
    );
  }
}

export const postService = new PostService();
