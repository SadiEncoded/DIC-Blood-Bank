/**
 * Story Service
 * Handles donor story operations
 */

import { logger } from '@/lib/logger';
import { BaseService } from '@/lib/services/base.service';
import { mapDBToBloodType } from '@/utils/db-mapping';

export class StoryService extends BaseService {
  /**
   * Get all published stories with donor information
   */
  async listPublished() {
    logger.debug('Fetching published stories');

    const supabase = await this.getSupabase();
    const { data, error } = await supabase
      .from('stories')
      .select(`
        *,
        profiles:donor_id (
          full_name,
          blood_type,
          location,
          is_verified,
          donation_count
        )
      `)
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) {
      logger.error('Failed to fetch stories', error);
      return [];
    }

    // Enrich stories with donor data
    return (data as any[]).map(story => ({
      ...story,
      donor_name: story.profiles?.full_name || 'Anonymous Donor',
      blood_type: mapDBToBloodType(story.profiles?.blood_type) || 'Unknown',
      location: story.profiles?.location || 'General',
      is_verified: story.profiles?.is_verified || false,
      donations: story.profiles?.donation_count || 0,
    }));
  }

  /**
   * Get story by ID with donor information
   */
  async getById(id: string) {
    logger.debug('Fetching story by ID', { storyId: id });

    const supabase = await this.getSupabase();
    const { data, error } = await supabase
      .from('stories')
      .select(`
        *,
        profiles:donor_id (
          full_name,
          blood_type,
          location,
          is_verified,
          donation_count
        )
      `)
      .eq('id', id)
      .single();

    if (error || !data) {
      logger.error('Failed to fetch story', error as any);
      return null;
    }

    // Enrich with donor data
    return {
      ...data,
      donor_name: (data as any).profiles?.full_name || 'Anonymous Donor',
      blood_type: mapDBToBloodType((data as any).profiles?.blood_type) || 'Unknown',
      location: (data as any).profiles?.location || 'General',
      is_verified: (data as any).profiles?.is_verified || false,
      donations: (data as any).profiles?.donation_count || 0,
    };
  }

  async create(input: {
    donor_id: string;
    title: string;
    content: string;
    is_published?: boolean;
  }) {
    await this.requireAdmin();

    logger.info('Creating new story', { donorId: input.donor_id });

    const supabase = await this.getAdminSupabase();
    return this.executeQuery('createStory', async () =>
      await supabase
        .from('stories')
        .insert({
          ...input,
          is_published: input.is_published ?? false,
        })
        .select()
        .single()
    );
  }

  /**
   * Submit new story (donor only)
   */
  async submit(input: {
    donor_id: string;
    title: string;
    content: string;
  }) {
    // No admin check, but implies authentication check in upper layer
    logger.info('Submitting new story for review', { donorId: input.donor_id });

    const supabase = await this.getSupabase();
    return this.executeQuery('submitStory', async () =>
      await supabase
        .from('stories')
        .insert({
          ...input,
          is_published: false, // Always false for submission
        })
        .select()
        .single()
    );
  }

  /**
   * Update story (admin only)
   */
  async update(
    id: string,
    input: {
      title?: string;
      content?: string;
      is_published?: boolean;
    }
  ) {
    await this.requireAdmin();

    logger.info('Updating story', { storyId: id });

    const supabase = await this.getAdminSupabase();
    return this.executeQuery('updateStory', async () =>
      await supabase
        .from('stories')
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
   * Publish/unpublish story (admin only)
   */
  async togglePublish(id: string, isPublished: boolean) {
    await this.requireAdmin();

    logger.info('Toggling story publish status', { storyId: id, isPublished });

    const supabase = await this.getAdminSupabase();
    return this.executeQuery('toggleStoryPublish', async () =>
      await supabase
        .from('stories')
        .update({
          is_published: isPublished,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single()
    );
  }

  /**
   * Delete story (admin only)
   */
  async delete(id: string) {
    await this.requireAdmin();

    logger.warn('Deleting story', { storyId: id });

    const supabase = await this.getAdminSupabase();
    return this.executeQuery('deleteStory', async () =>
      await supabase.from('stories').delete().eq('id', id).select().single()
    );
  }

  /**
   * Get all stories (admin only)
   */
  async listAll() {
    await this.requireAdmin();

    logger.debug('Fetching all stories (admin)');

    const supabase = await this.getAdminSupabase();
    return this.executeQuery('listAllStories', async () =>
      await supabase
        .from('stories')
        .select(`
          *,
          profiles:donor_id (
            full_name,
            blood_type,
            location
          )
        `)
        .order('created_at', { ascending: false })
    );
  }
}

// Export singleton instance
export const storyService = new StoryService();
