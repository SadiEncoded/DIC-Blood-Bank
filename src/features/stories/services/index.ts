/**
 * Stories Server Actions
 * Uses StoryService for all operations
 */

'use server';

import { storyService } from './story.service';

/**
 * Get all published stories with enriched donor data
 */
export async function getEnrichedStories() {
  try {
    return await storyService.listPublished();
  } catch (error) {
    console.error('Failed to fetch stories:', error);
    return [];
  }
}

/**
 * Get story by ID with enriched donor data
 */
export async function getEnrichedStoryById(id: string) {
  try {
    return await storyService.getById(id);
  } catch (error) {
    console.error('Failed to fetch story:', error);
    return null;
  }
}
