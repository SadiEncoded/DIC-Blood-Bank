/**
 * Donor Server Actions
 * Standardized server actions using the donor service
 */

'use server';

import { isAppError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { mapDBToBloodType } from '@/utils/db-mapping';
import { revalidatePath } from 'next/cache';
import { donorService } from './services/donor.service';

type ActionResult<T = unknown> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
  };
};

/**
 * Search for donors by blood type and location
 * Requires valid tracking ID
 */
export async function searchDonorsAction(query: {
  bloodType?: string;
  location?: string;
  trackingId?: string;
}): Promise<ActionResult> {
  try {
    const { bloodType, location, trackingId } = query;

    // Validate tracking ID is provided
    if (!trackingId) {
      return {
        success: false,
        error: {
          message: 'Tracking ID is required',
          code: 'VALIDATION_ERROR',
        },
      };
    }

    // Verify tracking ID exists and request is active
    const supabase = await createClient();
    const { data: requests, error: reqError } = await supabase
      .from('blood_requests')
      .select('status')
      .eq('tracking_id', trackingId);

    if (reqError || !requests || requests.length === 0) {
      return {
        success: false,
        error: {
          message: 'Invalid Tracking ID',
          code: 'NOT_FOUND',
        },
      };
    }

    const requestStatus = requests[0]?.status;

    if (requestStatus !== 'FULFILLED' && requestStatus !== 'PENDING') {
      return {
        success: false,
        error: {
          message: 'Request is not active',
          code: 'AUTHORIZATION_ERROR',
        },
      };
    }

    if (!bloodType) {
      return {
        success: false,
        error: {
          message: 'Blood type is required',
          code: 'VALIDATION_ERROR',
        },
      };
    }

    // Search for donors
    const donors = await donorService.searchDonors(bloodType, location);

    // Map to expected format
    const mappedDonors = donors.map(d => ({
      id: d.id,
      name: d.full_name || 'Anonymous',
      bloodType: mapDBToBloodType(d.blood_type),
      location: d.location || 'Unknown',
      phone: d.phone_number || '',
      lastDonation: d.last_donation || 'Never',
      donationCount: d.donation_count || 0,
      isVerified: d.is_verified || false,
      isAvailable: d.is_available,
      facebookUrl: d.facebook_url || null,
      averageRating: d.average_rating || 0,
      ratingCount: d.rating_count || 0,
    }));

    return {
      success: true,
      data: mappedDonors,
    };
  } catch (error) {
    if (isAppError(error)) {
      return {
        success: false,
        error: {
          message: error.message,
          code: error.code,
        },
      };
    }

    logger.error('Unexpected error in searchDonorsAction', error as Error);
    return {
      success: false,
      error: {
        message: 'Failed to search donors',
        code: 'INTERNAL_ERROR',
      },
    };
  }
}

/**
 * Get donor count
 */
export async function getDonorCountAction(): Promise<ActionResult> {
  try {
    const supabase = await createClient();
    const { count, error } = await supabase
      .from('active_donors')
      .select('*', { count: 'exact', head: true });

    if (error) {
      logger.error('Failed to fetch donor count', error);
      return {
        success: true,
        data: 0,
      };
    }

    return {
      success: true,
      data: count || 0,
    };
  } catch (error) {
    logger.error('Unexpected error in getDonorCountAction', error as Error);
    return {
      success: true,
      data: 0,
    };
  }
}

/**
 * Confirm donation and increment count (admin only)
 */
export async function confirmDonationAction(donorId: string): Promise<ActionResult> {
  try {
    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(donorId)) {
      return {
        success: false,
        error: {
          message: 'Invalid Donor ID format',
          code: 'VALIDATION_ERROR',
        },
      };
    }

    const result = await donorService.incrementDonationCount(donorId);

    return {
      success: true,
      data: result ? {
        newCount: (result as any).donation_count,
      } : null,
    };
  } catch (error) {
    if (isAppError(error)) {
      return {
        success: false,
        error: {
          message: error.message,
          code: error.code,
        },
      };
    }

    logger.error('Unexpected error in confirmDonationAction', error as Error);
    return {
      success: false,
      error: {
        message: 'Failed to confirm donation',
        code: 'INTERNAL_ERROR',
      },
    };
  }
}

/**
 * Update donor availability
 */
export async function updateDonorAvailabilityAction(
  isAvailable: boolean
): Promise<ActionResult> {
  try {
    const result = await donorService.updateAvailability(isAvailable);

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    if (isAppError(error)) {
      return {
        success: false,
        error: {
          message: error.message,
          code: error.code,
        },
      };
    }

    logger.error('Unexpected error in updateDonorAvailabilityAction', error as Error);
    return {
      success: false,
      error: {
        message: 'Failed to update availability',
        code: 'INTERNAL_ERROR',
      },
    };
  }
}

/**
 * Get current user's donor stats
 */
export async function getDonorStatsAction(): Promise<ActionResult> {
  try {
    const stats = await donorService.getDonorStats();
    
    return {
      success: true,
      data: stats,
    };
  } catch (error) {
    logger.error('Unexpected error in getDonorStatsAction', error as Error);
    return {
      success: false,
      error: {
        message: 'Failed to fetch donor stats',
        code: 'INTERNAL_ERROR',
      },
    };
  }
}

/**
 * Update donor profile with cooldown check
 */
export async function updateDonorProfileAction(data: {
  full_name: string;
  age: number;
  last_donation?: string | null;
  location: string;
  facebook_url?: string | null;
}): Promise<ActionResult> {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        error: {
          message: 'Unauthorized',
          code: 'UNAUTHORIZED'
        }
      };
    }

    // Check last update time
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('last_profile_update')
      .eq('id', user.id)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    if (profile?.last_profile_update) {
      const lastUpdate = new Date(profile.last_profile_update);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - lastUpdate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // Constraint: 7 days
      if (diffTime < 7 * 24 * 60 * 60 * 1000) {
         // Calculate remaining days properly
         const remainingTime = (7 * 24 * 60 * 60 * 1000) - diffTime;
         const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
         
        const nextUpdateDate = new Date(lastUpdate.getTime() + 7 * 24 * 60 * 60 * 1000);
        return {
          success: false,
          error: {
            message: `You can update again in ${remainingDays} days (${nextUpdateDate.toLocaleDateString()}).`,
            code: 'RATE_LIMIT_EXCEEDED'
          }
        };
      }
    }

    // Update profile via service
    const result = await donorService.updateProfile({
      full_name: data.full_name,
      age: data.age,
      last_donation: data.last_donation || undefined,
      location: data.location,
      facebook_url: data.facebook_url || undefined,
      last_profile_update: new Date().toISOString()
    });

    if (result) {
      // Revalidate paths for reactive updates
      revalidatePath('/');
      revalidatePath('/donors');
      
      return {
        success: true,
        data: { message: 'Profile updated successfully' }
      };
    }

    return {
      success: false,
      error: {
        message: 'Failed to update profile',
        code: 'INTERNAL_ERROR'
      }
    };

  } catch (error) {
    logger.error('Unexpected error in updateDonorProfileAction', error as Error);
    return {
      success: false,
      error: {
        message: 'Failed to update profile',
        code: 'INTERNAL_ERROR'
      }
    };
  }
}
