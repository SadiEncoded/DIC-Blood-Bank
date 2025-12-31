/**
 * User Service
 * Handles user profile operations
 */

import { logger } from '@/lib/logger';
import { BaseService } from '@/lib/services/base.service';
import { userSchemas, validateData } from '@/lib/validation/schemas';
import { mapBloodTypeToDB } from '@/utils/db-mapping';
import { z } from 'zod';

type UpdateProfileInput = z.infer<typeof userSchemas.updateProfile>;

export class UserService extends BaseService {
  /**
   * Get current user's profile
   */
  async getMyProfile() {
    const user = await this.getCurrentUser();
    return this.getUserProfile(user.id);
  }

  /**
   * Update current user's profile
   */
  async updateMyProfile(input: UpdateProfileInput) {
    const user = await this.getCurrentUser();
    const validated = validateData(userSchemas.updateProfile, input);

    logger.info('Updating user profile', { userId: user.id });

    const supabase = await this.getSupabase();
    return this.executeQuery('updateUserProfile', async () =>
      await supabase
        .from('profiles')
        .update({
          ...validated,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select()
        .single()
    );
  }

  /**
   * Get user profile by ID (admin only)
   */
  async getProfileById(userId: string) {
    await this.requireAdmin();
    return this.getUserProfile(userId);
  }

  /**
   * List all users (admin only)
   */
  async listAllUsers(filters?: { role?: string; is_available?: boolean }) {
    await this.requireAdmin();

    logger.debug('Listing all users', filters);

    const supabase = await this.getSupabase();
    let query = supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.role) {
      query = query.eq('role', filters.role);
    }

    if (filters?.is_available !== undefined) {
      query = query.eq('is_available', filters.is_available);
    }

    return this.executeQuery('listAllUsers', async () => await query);
  }

  /**
   * Update user role (admin only)
   */
  async updateUserRole(userId: string, role: 'donor' | 'admin') {
    await this.requireAdmin();

    logger.warn('Updating user role', { userId, role });

    const supabase = await this.getSupabase();
    return this.executeQuery('updateUserRole', async () =>
      await supabase
        .from('profiles')
        .update({
          role,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)
        .select()
        .single()
    );
  }

  /**
   * Verify donor (admin only)
   */
  async verifyDonor(userId: string, isVerified: boolean) {
    await this.requireAdmin();

    logger.info('Updating donor verification status', { userId, isVerified });

    const supabase = await this.getSupabase();
    return this.executeQuery('verifyDonor', async () =>
      await supabase
        .from('profiles')
        .update({
          is_verified: isVerified,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)
        .select()
        .single()
    );
  }

  /**
   * Register or update user as a donor
   */
  async registerAsDonor(input: {
    bloodGroup: string;
    location: string;
    lastDonation: string;
    age: number;
  }) {
    const user = await this.getCurrentUser();

    logger.info('Registering user as donor', { userId: user.id });

    const supabase = await this.getSupabase();
    return this.executeQuery('registerDonor', async () =>
      await supabase
        .from('profiles')
        .update({
          blood_type: mapBloodTypeToDB(input.bloodGroup) as any,
          location: input.location,
          last_donation: input.lastDonation,
          age: input.age,
          is_available: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select()
        .single()
    );
  }

  /**
   * Get user statistics
   */
  async getUserStats() {
    const supabase = await this.getSupabase();

    const [totalUsers, activeDonors, verifiedDonors] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'donor')
        .eq('is_available', true),
      supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'donor')
        .eq('is_verified', true),
    ]);

    return {
      totalUsers: totalUsers.count || 0,
      activeDonors: activeDonors.count || 0,
      verifiedDonors: verifiedDonors.count || 0,
    };
  }
}

// Export singleton instance
export const userService = new UserService();
