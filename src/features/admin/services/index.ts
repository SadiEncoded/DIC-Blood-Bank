'use server';

import { userService } from '@/features/auth/services/user.service';
import { bloodRequestService } from '@/features/blood-requests/services/blood-request.service';
import { postService } from '@/features/community/services/post.service';
import { eventService } from '@/features/events/services/event.service';
import { storyService } from '@/features/stories/services/story.service';
import { revalidatePath } from 'next/cache';
import { adminService } from './admin.service';
import { AdminStats, BloodRequestFilters, RequestStatus } from './types';

/**
 * Get all blood requests with optional filtering
 */
export async function getBloodRequests(filters?: BloodRequestFilters) {
  try {
    const data = await adminService.getBloodRequests(filters as any);
    return { success: true, data: data || [], error: null };
  } catch (error: any) {
    console.error('Error fetching blood requests:', error);
    return { success: false, data: [], error: error.message };
  }
}

/**
 * Update blood request status
 */
export async function updateRequestStatus(
  requestId: string,
  status: RequestStatus
) {
  try {
    await bloodRequestService.updateStatus(requestId, status);
    revalidatePath('/admin');
    revalidatePath('/admin/requests');
    revalidatePath('/donors');
    revalidatePath('/donate');
    revalidatePath('/');
    return { success: true, error: null };
  } catch (error: any) {
    console.error('Error updating request status:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Delete a blood request
 */
export async function deleteBloodRequest(id: string) {
  try {
    await bloodRequestService.delete(id);
    revalidatePath('/admin');
    revalidatePath('/admin/requests');
    revalidatePath('/donate');
    revalidatePath('/');
    return { success: true, error: null };
  } catch (error: any) {
    console.error('Error deleting blood request:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get donors pending approval (unverified)
 */
export async function getDonorsPendingApproval() {
  try {
    const data = await adminService.getDonors({ is_verified: false });
    return { success: true, data: data || [], error: null };
  } catch (error: any) {
    console.error('Error fetching pending donors:', error);
    return { success: false, data: [], error: error.message };
  }
}

/**
 * Approve/verify a donor
 */
export async function approveDonor(donorId: string) {
  try {
    await userService.verifyDonor(donorId, true);
    revalidatePath('/admin/donors');
    revalidatePath('/donors');
    revalidatePath('/');
    return { success: true, error: null };
  } catch (error: any) {
    console.error('Error approving donor:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get admin dashboard statistics
 */
export async function getAdminStats(): Promise<AdminStats> {
  const stats = await adminService.getDashboardStats();
  return {
    pendingRequests: stats.pendingRequests,
    activeSearches: stats.pendingRequests,
    criticalNeeds: stats.criticalNeeds,
    verifiedDonors: stats.verifiedDonors,
    totalDonors: stats.totalDonors,
  };
}

/**
 * Get donors with filters
 */
export async function getDonors(filters?: { status?: string; bloodType?: string; searchTerm?: string }) {
  try {
    const serviceFilters: any = {};
    if (filters?.status === 'verified') serviceFilters.is_verified = true;
    if (filters?.status === 'pending') serviceFilters.is_verified = false;
    if (filters?.bloodType) serviceFilters.blood_type = filters.bloodType;

    const data = await adminService.getDonors(serviceFilters);
    return { success: true, data: data || [], error: null };
  } catch (error: any) {
    console.error('Error fetching donors:', error);
    return { success: false, data: [], error: error.message };
  }
}

/**
 * Toggle donor verification
 */
export async function updateDonorVerification(donorId: string, isVerified: boolean) {
    try {
        await userService.verifyDonor(donorId, isVerified);
        revalidatePath('/admin');
        revalidatePath('/admin/donors');
        revalidatePath('/donors');
        revalidatePath('/');
        return { success: true, error: null };
    } catch (error: any) {
        console.error('Error updating donor verification:', error);
        return { success: false, error: error.message };
    }
}

// --- Event Management Actions ---

export async function getAllEvents() {
    try {
        const result = await eventService.listAll();
        return { success: true, data: result };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

export async function upsertEvent(event: any) {
    try {
        if (event.id) {
            await eventService.update(event.id, event);
        } else {
            await eventService.create(event);
        }
        revalidatePath('/admin/events');
        revalidatePath('/events');
        revalidatePath('/');
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

export async function deleteEvent(id: string) {
    try {
        await eventService.delete(id);
        revalidatePath('/admin/events');
        revalidatePath('/events');
        revalidatePath('/');
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

export async function toggleEventActive(id: string, isActive: boolean) {
    try {
        await eventService.toggleActive(id, isActive);
        revalidatePath('/admin/events');
        revalidatePath('/events');
        revalidatePath('/');
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

// --- Story Management Actions ---

export async function getAllStories() {
    try {
        const result = await storyService.listAll();
        return { success: true, data: result };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

export async function upsertStory(story: any) {
    try {
        if (story.id) {
            await storyService.update(story.id, story);
        } else {
            await storyService.create(story);
        }
        revalidatePath('/admin/stories');
        revalidatePath('/stories');
        revalidatePath('/');
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

export async function deleteStory(id: string) {
    try {
        await storyService.delete(id);
        revalidatePath('/admin/stories');
        revalidatePath('/stories');
        revalidatePath('/');
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

export async function toggleStoryPublish(id: string, isPublished: boolean) {
    try {
        await storyService.togglePublish(id, isPublished);
        revalidatePath('/admin/stories');
        revalidatePath('/stories');
        revalidatePath('/');
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

export async function toggleStoryFeature(id: string, isFeatured: boolean) {
    try {
        await storyService.update(id, { is_featured: isFeatured } as any);
        revalidatePath('/admin/stories');
        revalidatePath('/stories');
        revalidatePath('/');
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

// --- Community Post Management Actions ---

export async function getPosts() {
    try {
        const result = await postService.listAll();
        return { success: true, data: result };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

export async function upsertPost(post: any) {
    try {
        if (post.id) {
            await postService.update(post.id, post);
        } else {
            await postService.create(post);
        }
        revalidatePath('/admin');
        revalidatePath('/community');
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

export async function deletePost(id: string) {
    try {
        await postService.delete(id);
        revalidatePath('/admin');
        revalidatePath('/community');
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

export async function togglePostPublish(id: string, isPublished: boolean) {
    try {
        await postService.togglePublished(id, isPublished);
        revalidatePath('/admin');
        revalidatePath('/community');
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

export async function getAdminDashboardData() {
    try {
        const stats = await adminService.getDashboardStats();
        const [requests, events, stories, posts, donors, verifications] = await Promise.all([
            adminService.getBloodRequests({ limit: 10 }),
            eventService.listAll(),
            storyService.listAll(),
            postService.listAll(),
            adminService.getDonors({ limit: 10 }),
            bloodRequestService.listVerifications()
        ]);

        return {
            success: true,
            stats,
            requests: requests || [],
            events: events || [],
            stories: stories || [],
            posts: posts || [],
            donors: donors || [],
            verifications: verifications || []
        };
    } catch (error: any) {
        console.error('❌ Error fetching dashboard data:', error);
        return {
            success: false,
            error: error.message || 'An unexpected error occurred',
            details: error.code || 'UNKNOWN_ERROR'
        };
    }
}

/**
 * Verify/Approve a donation proof
 */
export async function verifyDonationAction(verificationId: string) {
    try {
        await bloodRequestService.confirmVerification(verificationId);
        revalidatePath('/admin');
        revalidatePath('/donors');
        revalidatePath('/');
        return { success: true };
    } catch (error: any) {
        console.error('Error verifying donation:', error);
        return { success: false, error: error.message };
    }
}
