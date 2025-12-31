/**
 * Contact Service
 * Handles contact form submissions
 */

import { ConflictError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { BaseService } from '@/lib/services/base.service';
import { contactSchemas, validateData } from '@/lib/validation/schemas';
import { z } from 'zod';

type CreateContactInput = z.infer<typeof contactSchemas.create>;

export class ContactService extends BaseService {
  /**
   * Submit contact form
   * Rate limited to 1 message per 24 hours for authenticated users
   */
  async submitContactForm(input: CreateContactInput) {
    const validated = validateData(contactSchemas.create, input);

    // Get user if authenticated (optional)
    const user = await this.getOptionalUser();

    logger.info('Processing contact form submission', {
      email: validated.email,
      userId: user?.id,
    });

    // Rate limiting for authenticated users
    if (user) {
      await this.checkRateLimit(user.id);
    }

    const supabase = await this.getSupabase();
    return this.executeQuery('submitContactForm', async () =>
      await supabase
        .from('contact_messages')
        .insert({
          name: validated.name,
          email: validated.email,
          subject: validated.subject,
          message: validated.message,
          user_id: user?.id || null,
        })
        .select()
        .single()
    );
  }

  /**
   * Check if user has submitted in the last 24 hours
   */
  private async checkRateLimit(userId: string) {
    const supabase = await this.getSupabase();
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const { data: recentMessages } = await supabase
      .from('contact_messages')
      .select('created_at')
      .eq('user_id', userId)
      .gte('created_at', twentyFourHoursAgo)
      .limit(1);

    if (recentMessages && recentMessages.length > 0) {
      logger.warn('Rate limit exceeded for contact form', { userId });
      throw new ConflictError(
        'আপনি ইতিমধ্যে আজ একটি বার্তা পাঠিয়েছেন। অনুগ্রহ করে ২৪ ঘণ্টা পরে আবার চেষ্টা করুন। (You can only send one message per day)'
      );
    }
  }

  /**
   * Get all contact messages (admin only)
   */
  async listAll(filters?: { unread?: boolean; limit?: number }) {
    await this.requireAdmin();

    logger.debug('Listing contact messages', filters);

    const supabase = await this.getSupabase();
    let query = supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.unread) {
      query = query.eq('is_read', false);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    return this.executeQuery('listContactMessages', async () => await query);
  }

  /**
   * Mark message as read (admin only)
   */
  async markAsRead(id: string) {
    await this.requireAdmin();

    logger.info('Marking contact message as read', { messageId: id });

    const supabase = await this.getSupabase();
    return this.executeQuery('markContactMessageAsRead', async () =>
      await supabase
        .from('contact_messages')
        .update({ is_read: true })
        .eq('id', id)
        .select()
        .single()
    );
  }

  /**
   * Delete contact message (admin only)
   */
  async delete(id: string) {
    await this.requireAdmin();

    logger.warn('Deleting contact message', { messageId: id });

    const supabase = await this.getSupabase();
    return this.executeQuery('deleteContactMessage', async () =>
      await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id)
        .select()
        .single()
    );
  }

  /**
   * Get unread message count (admin only)
   */
  async getUnreadCount() {
    await this.requireAdmin();

    const supabase = await this.getSupabase();
    const { count, error } = await supabase
      .from('contact_messages')
      .select('*', { count: 'exact', head: true })
      .eq('is_read', false);

    if (error) {
      logger.error('Failed to get unread count', error);
      return 0;
    }

    return count || 0;
  }
}

// Export singleton instance
export const contactService = new ContactService();
