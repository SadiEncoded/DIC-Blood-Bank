import { logger } from '@/lib/logger';
import { BaseService } from '@/lib/services/base.service';

export class RatingsService extends BaseService {
  /**
   * Submit a rating for a donor
   */
  async submitRating(targetId: string, score: number, comment?: string) {
    const user = await this.getCurrentUser();
    const supabase = await this.getSupabase();

    logger.info('Submitting user rating', { reviewerId: user.id, targetId, score });

    // Prevent self-rating
    if (user.id === targetId) {
      throw new Error("You cannot rate yourself.");
    }

    const { data, error } = await supabase
      .from('user_ratings')
      .upsert({
        reviewer_id: user.id,
        target_id: targetId,
        score,
        comment,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'reviewer_id,target_id'
      })
      .select()
      .single();

    if (error) {
      logger.error('Failed to submit rating', error);
      throw error;
    }

    return data;
  }

  /**
   * Get ratings for a specific target (donor)
   */
  async getRatingsForTarget(targetId: string) {
    const supabase = await this.getSupabase();
    
    const { data, error } = await supabase
      .from('user_ratings')
      .select(`
        *,
        reviewer:reviewer_id(full_name)
      `)
      .eq('target_id', targetId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}

export const ratingsService = new RatingsService();
