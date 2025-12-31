import { bloodRequestService } from '@/features/blood-requests/services/blood-request.service';
import { postService } from '@/features/community/services/post.service';
import { contactService } from '@/features/contact/services/contact.service';
import { eventService } from '@/features/events/services/event.service';
import { storyService } from '@/features/stories/services/story.service';
import { logger } from '@/lib/logger';
import { BaseService } from '@/lib/services/base.service';

export class AdminService extends BaseService {
  /**
   * Service Getters (Connections)
   */
  getBloodRequestService() { return bloodRequestService; }
  getContactService() { return contactService; }
  getEventService() { return eventService; }
  getPostService() { return postService; }
  getStoryService() { return storyService; }

  /**
   * Get dashboard statistics
   */
  async getDashboardStats() {
    await this.requireAdmin();

    logger.info('Fetching admin dashboard stats');

    const supabase = await this.getAdminSupabase();

    const fetchCount = async (query: any) => {
      try {
        const { count, error } = await query;
        if (error) throw error;
        return count || 0;
      } catch (err) {
        logger.error('Counter query failed', err as any);
        return 0;
      }
    };

    // Get all stats in parallel
    const [
      pendingRequests,
      criticalRequests,
      totalDonors,
      verifiedDonors,
      activeDonors,
      unreadMessages,
      activeEvents,
      livesSaved,
      pendingVerifications,
    ] = await Promise.all([
      // Pending blood requests
      fetchCount(supabase
        .from('blood_requests')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'PENDING')),

      // Critical blood requests
      fetchCount(supabase
        .from('blood_requests')
        .select('*', { count: 'exact', head: true })
        .eq('urgency', 'CRITICAL')
        .eq('status', 'PENDING')),

      // Total donors
      fetchCount(supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'donor')),

      // Verified donors
      fetchCount(supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'donor')
        .eq('is_verified', true)),

      // Active donors
      fetchCount(supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'donor')
        .eq('is_available', true)),

      // Unread contact messages
      contactService.getUnreadCount().catch(() => 0),

      // Active events
      fetchCount(supabase
        .from('events')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true)),

      // Lives saved count
      fetchCount(supabase
        .from('lives_saved')
        .select('*', { count: 'exact', head: true })),

      // Pending verifications
      fetchCount(supabase
        .from('donation_verifications')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'PENDING')),
    ]);

    return {
      pendingRequests,
      criticalNeeds: criticalRequests,
      totalDonors,
      verifiedDonors,
      activeDonors,
      unreadMessages,
      activeEvents,
      livesSaved,
      pendingVerifications,
    };
  }

  /**
   * Get recent activity
   */
  async getRecentActivity(limit: number = 10) {
    await this.requireAdmin();

    logger.debug('Fetching recent activity', { limit });

    const supabase = await this.getAdminSupabase();

    // Get recent blood requests
    const { data: recentRequests } = await supabase
      .from('blood_requests')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    // Get recent contact messages
    const { data: recentMessages } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    return {
      recentRequests: recentRequests || [],
      recentMessages: recentMessages || [],
    };
  }

  /**
   * Get blood requests with filters
   */
  async getBloodRequests(filters?: {
    status?: string;
    urgency?: string;
    bloodType?: string;
    searchTerm?: string;
    limit?: number;
  }) {
    await this.requireAdmin();

    logger.debug('Admin fetching blood requests', { filters });

    // Use the blood request service
    return bloodRequestService.list(filters as any);
  }

  /**
   * Get all donors with filters
   */
  async getDonors(filters?: {
    is_verified?: boolean;
    is_available?: boolean;
    blood_type?: string;
    limit?: number;
  }) {
    await this.requireAdmin();

    logger.debug('Admin fetching donors', { filters });

    const supabase = await this.getAdminSupabase();
    let query = supabase
      .from('profiles')
      .select('*')
      .eq('role', 'donor')
      .order('created_at', { ascending: false });

    if (filters?.is_verified !== undefined) {
      query = query.eq('is_verified', filters.is_verified);
    }

    if (filters?.is_available !== undefined) {
      query = query.eq('is_available', filters.is_available);
    }

    if (filters?.blood_type) {
      query = query.eq('blood_type', filters.blood_type);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    return this.executeQuery('adminGetDonors', async () => await query);
  }

  /**
   * Export data for reporting
   */
  async exportBloodRequests(filters?: {
    dateFrom?: string;
    dateTo?: string;
    status?: string;
  }) {
    await this.requireAdmin();

    logger.info('Exporting blood requests', { filters });

    const supabase = await this.getSupabase();
    let query = supabase
      .from('blood_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.dateFrom) {
      query = query.gte('created_at', filters.dateFrom);
    }

    if (filters?.dateTo) {
      query = query.lte('created_at', filters.dateTo);
    }

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    return this.executeQuery('exportBloodRequests', async () => await query);
  }

  /**
   * Get system health metrics
   */
  async getSystemHealth() {
    await this.requireAdmin();

    const supabase = await this.getSupabase();

    // Check database connection
    const { error: dbError } = await supabase.from('profiles').select('id').limit(1);

    // Get table sizes
    const [requestsCount, profilesCount, eventsCount] = await Promise.all([
      supabase.from('blood_requests').select('*', { count: 'exact', head: true }),
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('events').select('*', { count: 'exact', head: true }),
    ]);

    return {
      databaseConnected: !dbError,
      tables: {
        bloodRequests: requestsCount.count || 0,
        profiles: profilesCount.count || 0,
        events: eventsCount.count || 0,
      },
      timestamp: new Date().toISOString(),
    };
  }
}

// Export singleton instance
export const adminService = new AdminService();
