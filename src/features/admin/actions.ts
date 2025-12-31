/**
 * Admin Server Actions
 * Standardized actions using AdminService and other services
 */

'use server';

import { userService } from '@/features/auth/services/user.service';
import { bloodRequestService } from '@/features/blood-requests/services/blood-request.service';
import { eventService } from '@/features/events/services/event.service';
import { isAppError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { revalidatePath } from 'next/cache';
import { adminService } from './services/admin.service';

type ActionResult<T = unknown> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
  };
};

/**
 * Get admin dashboard statistics
 */
export async function getAdminDashboardStats(): Promise<ActionResult> {
  try {
    const stats = await adminService.getDashboardStats();
    return {
      success: true,
      data: stats,
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

    logger.error('Failed to get dashboard stats', error as Error);
    return {
      success: false,
      error: {
        message: 'Failed to load dashboard statistics',
        code: 'INTERNAL_ERROR',
      },
    };
  }
}

/**
 * Get blood requests with filters (admin)
 */
export async function getAdminBloodRequests(filters?: {
  status?: string;
  urgency?: string;
  bloodType?: string;
  searchTerm?: string;
}): Promise<ActionResult> {
  try {
    const requests = await adminService.getBloodRequests(filters);
    return {
      success: true,
      data: requests,
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

    logger.error('Failed to get blood requests', error as Error);
    return {
      success: false,
      error: {
        message: 'Failed to load blood requests',
        code: 'INTERNAL_ERROR',
      },
    };
  }
}

/**
 * Update blood request status (admin)
 */
export async function updateBloodRequestStatus(
  id: string,
  status: string
): Promise<ActionResult> {
  try {
    const result = await bloodRequestService.updateStatus(id, status);

    revalidatePath('/admin');
    revalidatePath('/donors');

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

    logger.error('Failed to update request status', error as Error);
    return {
      success: false,
      error: {
        message: 'Failed to update request status',
        code: 'INTERNAL_ERROR',
      },
    };
  }
}

/**
 * Get all donors with filters (admin)
 */
export async function getAdminDonors(filters?: {
  is_verified?: boolean;
  is_available?: boolean;
  blood_type?: string;
}): Promise<ActionResult> {
  try {
    const donors = await adminService.getDonors(filters);
    return {
      success: true,
      data: donors,
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

    logger.error('Failed to get donors', error as Error);
    return {
      success: false,
      error: {
        message: 'Failed to load donors',
        code: 'INTERNAL_ERROR',
      },
    };
  }
}

/**
 * Verify donor (admin)
 */
export async function verifyDonor(
  userId: string,
  isVerified: boolean
): Promise<ActionResult> {
  try {
    const result = await userService.verifyDonor(userId, isVerified);

    revalidatePath('/admin');

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

    logger.error('Failed to verify donor', error as Error);
    return {
      success: false,
      error: {
        message: 'Failed to verify donor',
        code: 'INTERNAL_ERROR',
      },
    };
  }
}

/**
 * Update user role (admin)
 */
export async function updateUserRole(
  userId: string,
  role: 'donor' | 'admin'
): Promise<ActionResult> {
  try {
    const result = await userService.updateUserRole(userId, role);

    revalidatePath('/admin');

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

    logger.error('Failed to update user role', error as Error);
    return {
      success: false,
      error: {
        message: 'Failed to update user role',
        code: 'INTERNAL_ERROR',
      },
    };
  }
}

/**
 * Create event (admin)
 */
export async function createEvent(input: {
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  image_url?: string;
}): Promise<ActionResult> {
  try {
    const result = await eventService.create(input as any);

    revalidatePath('/admin');
    revalidatePath('/events');

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

    logger.error('Failed to create event', error as Error);
    return {
      success: false,
      error: {
        message: 'Failed to create event',
        code: 'INTERNAL_ERROR',
      },
    };
  }
}

/**
 * Update event (admin)
 */
export async function updateEvent(
  id: string,
  input: {
    title?: string;
    description?: string;
    date?: string;
    location?: string;
    is_active?: boolean;
  }
): Promise<ActionResult> {
  try {
    const result = await eventService.update(id, input as any);

    revalidatePath('/admin');
    revalidatePath('/events');

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

    logger.error('Failed to update event', error as Error);
    return {
      success: false,
      error: {
        message: 'Failed to update event',
        code: 'INTERNAL_ERROR',
      },
    };
  }
}

/**
 * Delete event (admin)
 */
export async function deleteEvent(id: string): Promise<ActionResult> {
  try {
    await eventService.delete(id);

    revalidatePath('/admin');
    revalidatePath('/events');

    return {
      success: true,
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

    logger.error('Failed to delete event', error as Error);
    return {
      success: false,
      error: {
        message: 'Failed to delete event',
        code: 'INTERNAL_ERROR',
      },
    };
  }
}

/**
 * Export blood requests data (admin)
 */
export async function exportBloodRequests(filters?: {
  dateFrom?: string;
  dateTo?: string;
  status?: string;
}): Promise<ActionResult> {
  try {
    const data = await adminService.exportBloodRequests(filters);
    return {
      success: true,
      data,
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

    logger.error('Failed to export data', error as Error);
    return {
      success: false,
      error: {
        message: 'Failed to export data',
        code: 'INTERNAL_ERROR',
      },
    };
  }
}

/**
 * Get system health (admin)
 */
export async function getSystemHealth(): Promise<ActionResult> {
  try {
    const health = await adminService.getSystemHealth();
    return {
      success: true,
      data: health,
    };
  } catch (error) {
    logger.error('Failed to get system health', error as Error);
    return {
      success: false,
      error: {
        message: 'Failed to get system health',
        code: 'INTERNAL_ERROR',
      },
    };
  }
}
