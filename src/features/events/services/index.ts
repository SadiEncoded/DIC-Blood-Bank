/**
 * Events Server Actions
 * Uses EventService for all operations
 */

'use server';

import { eventService } from './event.service';

/**
 * Get all active events
 */
export async function getEvents() {
  try {
    return await eventService.listActive();
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return [];
  }
}

/**
 * Get upcoming events
 */
export async function getUpcomingEvents(limit: number = 5) {
  try {
    return await eventService.getUpcoming(limit);
  } catch (error) {
    console.error('Failed to fetch upcoming events:', error);
    return [];
  }
}
