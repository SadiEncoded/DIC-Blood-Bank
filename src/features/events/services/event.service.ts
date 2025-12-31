/**
 * Event Service
 * Handles event management operations
 */

import { logger } from '@/lib/logger';
import { BaseService } from '@/lib/services/base.service';
import { eventSchemas, validateData } from '@/lib/validation/schemas';
import { z } from 'zod';

type CreateEventInput = z.infer<typeof eventSchemas.create>;
type UpdateEventInput = z.infer<typeof eventSchemas.update>;

export class EventService extends BaseService {
  /**
   * Create a new event (admin only)
   */
  async create(input: CreateEventInput) {
    await this.requireAdmin();

    const validated = validateData(eventSchemas.create, input);

    logger.info('Creating event', { title: validated.title });

    const supabase = await this.getSupabase();
    return this.executeQuery('createEvent', async () =>
      await supabase
        .from('events')
        .insert({
          ...validated,
          created_at: new Date().toISOString(),
        })
        .select()
        .single()
    );
  }

  /**
   * Get event by ID
   */
  async getById(id: string) {
    logger.debug('Fetching event', { eventId: id });

    const supabase = await this.getSupabase();
    return this.executeQuery('getEvent', async () =>
      await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single()
    );
  }

  /**
   * List all active events
   */
  async listActive() {
    logger.debug('Listing active events');

    const supabase = await this.getSupabase();
    const query = supabase
      .from('events')
      .select('*')
      .eq('is_active', true)
      .order('date', { ascending: true });

    return this.executeQuery('listActiveEvents', async () => await query);
  }

  /**
   * List all events (admin only)
   */
  async listAll() {
    await this.requireAdmin();

    logger.debug('Listing all events');

    const supabase = await this.getAdminSupabase();
    return this.executeQuery('listAllEvents', async () =>
      await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false })
    );
  }

  /**
   * Update event (admin only)
   */
  async update(id: string, input: UpdateEventInput) {
    await this.requireAdmin();

    const validated = validateData(eventSchemas.update, input);

    logger.info('Updating event', { eventId: id });

    const supabase = await this.getAdminSupabase();
    return this.executeQuery('updateEvent', async () =>
      await supabase
        .from('events')
        .update({
          ...validated,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single()
    );
  }

  /**
   * Toggle event active status (admin only)
   */
  async toggleActive(id: string, isActive: boolean) {
    await this.requireAdmin();

    logger.info('Toggling event status', { eventId: id, isActive });

    const supabase = await this.getAdminSupabase();
    return this.executeQuery('toggleEventActive', async () =>
      await supabase
        .from('events')
        .update({
          is_active: isActive,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single()
    );
  }

  /**
   * Delete event (admin only)
   */
  async delete(id: string) {
    await this.requireAdmin();

    logger.warn('Deleting event', { eventId: id });

    const supabase = await this.getSupabase();
    return this.executeQuery('deleteEvent', async () =>
      await supabase
        .from('events')
        .delete()
        .eq('id', id)
        .select()
        .single()
    );
  }

  /**
   * Get upcoming events
   */
  async getUpcoming(limit: number = 5) {
    logger.debug('Fetching upcoming events', { limit });

    const supabase = await this.getSupabase();
    const query = supabase
      .from('events')
      .select('*')
      .eq('is_active', true)
      .gte('date', new Date().toISOString())
      .order('date', { ascending: true })
      .limit(limit);

    return this.executeQuery('getUpcomingEvents', async () => await query);
  }

  /**
   * Get events by category
   */
  async getByCategory(category: string) {
    logger.debug('Fetching events by category', { category });

    const supabase = await this.getSupabase();
    return this.executeQuery('getEventsByCategory', async () =>
      await supabase
        .from('events')
        .select('*')
        .eq('is_active', true)
        .eq('category', category)
        .order('date', { ascending: true })
    );
  }

  /**
   * Get total count of successful campaigns (completed events)
   */
  async getSuccessfulCampaignsCount(): Promise<number> {
      try {
          const supabase = await this.getSupabase();
          const { count } = await supabase
              .from('events')
              .select('*', { count: 'exact', head: true })
              .lt('date', new Date().toISOString());
          return count || 0;
      } catch (error: any) {
          logger.error('Failed to fetch successful campaigns count', error);
          return 0;
      }
  }
}

// Export singleton instance
export const eventService = new EventService();
