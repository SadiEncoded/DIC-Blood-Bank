/**
 * Blood Request Server Actions
 * Standardized server actions using the blood request service
 */

'use server';

import { isAppError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { revalidatePath } from 'next/cache';
import { bloodRequestService } from './services/blood-request.service';

/**
 * Standard action result type
 */
type ActionResult<T = unknown> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
    details?: unknown;
  };
};

/**
 * Create a new blood request
 */
export async function createBloodRequestAction(
  formData: unknown
): Promise<ActionResult> {
  try {
    const result = await bloodRequestService.create(formData as any);

    // Revalidate relevant paths
    revalidatePath('/donors');
    revalidatePath('/admin');
    revalidatePath('/donate');
    revalidatePath('/');

    return {
      success: true,
      data: {
        id: (result as any).id,
        tracking_id: (result as any).tracking_id,
        blood_type: (result as any).blood_type,
        location: (result as any).location,
      },
    };
  } catch (error) {
    if (isAppError(error)) {
      logger.warn('Blood request creation failed', { error: error.message });
      return {
        success: false,
        error: {
          message: error.message,
          code: error.code,
          details: error.details,
        },
      };
    }

    logger.error('Unexpected error in createBloodRequestAction', error as Error);
    return {
      success: false,
      error: {
        message: 'An unexpected error occurred. Please try again.',
        code: 'INTERNAL_ERROR',
      },
    };
  }
}

/**
 * Get blood request by tracking ID
 */
export async function getBloodRequestByTrackingIdAction(
  trackingId: string
): Promise<ActionResult> {
  try {
    const result = await bloodRequestService.getByTrackingId(trackingId);

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

    logger.error('Unexpected error in getBloodRequestByTrackingIdAction', error as Error);
    return {
      success: false,
      error: {
        message: 'Failed to fetch blood request',
        code: 'INTERNAL_ERROR',
      },
    };
  }
}

/**
 * List blood requests with filters
 */
export async function listBloodRequestsAction(
  filters?: {
    status?: string;
    blood_type?: string;
    urgency?: string;
    location?: string;
  }
): Promise<ActionResult> {
  try {
    const result = await bloodRequestService.list(filters as any);

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

    logger.error('Unexpected error in listBloodRequestsAction', error as Error);
    return {
      success: false,
      error: {
        message: 'Failed to fetch blood requests',
        code: 'INTERNAL_ERROR',
      },
    };
  }
}

/**
 * Get user's own blood requests
 */
export async function getMyBloodRequestsAction(): Promise<ActionResult> {
  try {
    const result = await bloodRequestService.getMyRequests();

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

    logger.error('Unexpected error in getMyBloodRequestsAction', error as Error);
    return {
      success: false,
      error: {
        message: 'Failed to fetch your blood requests',
        code: 'INTERNAL_ERROR',
      },
    };
  }
}

/**
 * Update blood request status (admin only)
 */
export async function updateBloodRequestStatusAction(
  id: string,
  status: string
): Promise<ActionResult> {
  try {
    const result = await bloodRequestService.updateStatus(id, status);

    revalidatePath('/admin');
    revalidatePath('/donors');
    revalidatePath('/donate');
    revalidatePath('/');

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

    return {
      success: false,
      error: {
        message: 'Failed to update blood request status',
        code: 'INTERNAL_ERROR',
      },
    };
  }
}

/**
 * Submit donation verification proof
 */
export async function submitDonationVerificationAction(data: {
    request_id: string;
    prescription_url: string;
    blood_bag_url: string;
}): Promise<ActionResult> {
    try {
        const result = await bloodRequestService.submitVerification(data);
        
        revalidatePath('/admin');
        revalidatePath(`/donate/${(result as any).request_id}/confirm`);

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

        logger.error('Unexpected error in submitDonationVerificationAction', error as Error);
        return {
            success: false,
            error: {
                message: 'Failed to submit verification',
                code: 'INTERNAL_ERROR',
            },
        };
    }
}
