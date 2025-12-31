'use server';

import { revalidatePath } from 'next/cache';
import { ratingsService } from './ratings.service';

export async function submitRating(targetId: string, score: number, comment?: string) {
  try {
    await ratingsService.submitRating(targetId, score, comment);
    
    // Revalidate relevant paths
    revalidatePath('/donors');
    revalidatePath('/admin');
    
    return { success: true, error: null };
  } catch (error: any) {
    console.error('Error submitting rating:', error);
    return { success: false, error: error.message };
  }
}

export async function getRatingsForTarget(targetId: string) {
  try {
    const data = await ratingsService.getRatingsForTarget(targetId);
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
