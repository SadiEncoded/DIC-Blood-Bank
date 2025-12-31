/**
 * Donor Service
 * Handles donor search and profile operations
 */

import { logger } from '@/lib/logger';
import { BaseService } from '@/lib/services/base.service';

export class DonorService extends BaseService {
  /**
   * Search for donors by blood type and location
   */
  async searchDonors(bloodType: string, location?: string) {
    logger.info('Searching for donors', { bloodType, location });

    const supabase = await this.getSupabase();
    
    // Initial strict query
    let query = supabase
      .from('profiles')
      .select('*')
      .eq('role', 'donor')
      .eq('is_available', true)
      .eq('blood_type', bloodType)
      .order('donation_count', { ascending: false });

    if (location) {
      query = query.ilike('location', `%${location}%`);
    }

    let result = await this.executeQuery('searchDonors', async () => query);

    // Fallback: If no donors found with strict location, try broader search (Blood Type only)
    if ((!result || result.length === 0) && location) {
      logger.info('No donors found with strict location. Attempting broad search...', { bloodType });
      
      const fallbackQuery = supabase
        .from('profiles')
        .select('*')
        .eq('role', 'donor')
        .eq('is_available', true)
        .eq('blood_type', bloodType)
        .order('donation_count', { ascending: false });
      
      result = await this.executeQuery('searchDonorsFallback', async () => fallbackQuery);
    }

    logger.info('Donor search completed', {
      bloodType,
      location,
      count: Array.isArray(result) ? result.length : 0,
      isFallback: (!result || result.length === 0) && !!location
    });

    return result as any[];
  }

  /**
   * Get donor profile by ID
   */
  async getDonorById(id: string) {
    logger.debug('Fetching donor profile', { donorId: id });

    const supabase = await this.getSupabase();
    return this.executeQuery('getDonorById', async () =>
      supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single()
    );
  }

  /**
   * Update donor availability
   */
  async updateAvailability(isAvailable: boolean) {
    const user = await this.getCurrentUser();

    logger.info('Updating donor availability', {
      userId: user.id,
      isAvailable,
    });

    const supabase = await this.getSupabase();
    return this.executeQuery('updateDonorAvailability', async () =>
      supabase
        .from('profiles')
        .update({
          is_available: isAvailable,
        })
        .eq('id', user.id)
        .select()
        .single()
    );
  }

  /**
   * Update donor profile
   */
  async updateProfile(data: {
    full_name?: string;
    phone_number?: string;
    location?: string;
    facebook_url?: string;
    age?: number;
    last_donation?: string;
    last_profile_update?: string;
  }) {
    const user = await this.getCurrentUser();

    logger.info('Updating donor profile', { userId: user.id });

    const supabase = await this.getSupabase();
    return this.executeQuery('updateDonorProfile', async () =>
      supabase
        .from('profiles')
        .update({
          ...data,
        })
        .eq('id', user.id)
        .select()
        .single()
    );
  }

  /**
   * Get donor statistics
   */
  async getDonorStats(userId?: string) {
    const targetUserId = userId || (await this.getCurrentUser()).id;

    logger.debug('Fetching donor statistics', { userId: targetUserId });

    const supabase = await this.getSupabase();
    const profile = await this.executeQuery('getDonorStats', async () =>
      supabase
        .from('profiles')
        .select('donation_count, last_donation, created_at')
        .eq('id', targetUserId)
        .single()
    ) as any;

    return {
      totalDonations: profile.donation_count || 0,
      lastDonation: profile.last_donation,
      memberSince: profile.created_at,
    };
  }

  /**
   * Get total donor count (active)
   */
  async getDonorCount() {
    const supabase = await this.getSupabase();
    const { count, error } = await supabase
        .from('profiles') // Changed from active_donors view to base table for consistency with AdminService
        .select('*', { count: 'exact', head: true })
        .eq('is_verified', true)
        .eq('role', 'donor');
    
    if (error) {
        logger.error('Failed to get donor count', error);
        return 0;
    }
    
    return count || 0;
  }

  /**
   * Increment donation count (Atomic RPC)
   */
  async incrementDonationCount(userId: string) {
    await this.requireAdmin();

    logger.info('Incrementing donation count via RPC', { userId });

    const supabase = await this.getSupabase();
    
    return this.executeQuery('incrementDonationCount', async () =>
      supabase.rpc('increment_donation_count', { donor_id: userId })
    );
  }
}

// Export singleton instance
export const donorService = new DonorService();
