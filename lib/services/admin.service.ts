'use server';

import { createClient } from '@/lib/utils/supabase/server';
import { revalidatePath } from 'next/cache';

// Types
export type RequestStatus = 'PENDING' | 'FULFILLED' | 'CANCELLED';
export type UrgencyLevel = 'NORMAL' | 'URGENT' | 'CRITICAL';

export interface BloodRequestFilters {
  status?: RequestStatus;
  urgency?: UrgencyLevel;
  bloodType?: string;
  searchTerm?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface AdminStats {
  pendingRequests: number;
  activeSearches: number;
  criticalNeeds: number;
  verifiedDonors: number;
  totalDonors: number;
}

/**
 * Get all blood requests with optional filtering
 */
export async function getBloodRequests(filters?: BloodRequestFilters) {
  const supabase = await createClient();
  
  let query = supabase
    .from('blood_requests')
    .select('*')
    .order('created_at', { ascending: false });

  // Apply filters
  if (filters?.status) {
    query = query.eq('status', filters.status);
  }
  if (filters?.urgency) {
    query = query.eq('urgency', filters.urgency);
  }
  if (filters?.bloodType) {
    query = query.eq('blood_type', filters.bloodType);
  }
  if (filters?.searchTerm) {
    query = query.or(`tracking_id.ilike.%${filters.searchTerm}%,patient_name.ilike.%${filters.searchTerm}%,hospital.ilike.%${filters.searchTerm}%`);
  }
  if (filters?.dateFrom) {
    query = query.gte('created_at', filters.dateFrom);
  }
  if (filters?.dateTo) {
    query = query.lte('created_at', filters.dateTo);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching blood requests:', error);
    return { success: false, data: [], error: error.message };
  }

  return { success: true, data: data || [], error: null };
}

/**
 * Update blood request status
 */
export async function updateRequestStatus(
  requestId: string,
  status: RequestStatus
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('blood_requests')
    .update({ status })
    .eq('id', requestId);

  if (error) {
    console.error('Error updating request status:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/requests');
  return { success: true, error: null };
}

/**
 * Get donors pending approval (unverified)
 */
export async function getDonorsPendingApproval() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'donor')
    .eq('is_verified', false)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching pending donors:', error);
    return { success: false, data: [], error: error.message };
  }

  return { success: true, data: data || [], error: null };
}

/**
 * Approve/verify a donor
 */
export async function approveDonor(donorId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('profiles')
    .update({ is_verified: true })
    .eq('id', donorId);

  if (error) {
    console.error('Error approving donor:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/donors');
  return { success: true, error: null };
}

/**
 * Get admin dashboard statistics
 */
export async function getAdminStats(): Promise<AdminStats> {
  const supabase = await createClient();

  // Get pending requests count
  const { count: pendingCount } = await supabase
    .from('blood_requests')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'PENDING');

  // Get critical requests count
  const { count: criticalCount } = await supabase
    .from('blood_requests')
    .select('*', { count: 'exact', head: true })
    .eq('urgency', 'CRITICAL')
    .eq('status', 'PENDING');

  // Get verified donors count
  const { count: verifiedCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'donor')
    .eq('is_verified', true);

  // Get total donors count
  const { count: totalCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'donor');

  return {
    pendingRequests: pendingCount || 0,
    activeSearches: pendingCount || 0,
    criticalNeeds: criticalCount || 0,
    verifiedDonors: verifiedCount || 0,
    totalDonors: totalCount || 0,
  };
}

/**
 * Get all events (including inactive)
 */
export async function getAllEvents() {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });
  
    if (error) throw error;
    return data;
}
  
/**
 * Create or update event
 */
export async function upsertEvent(event: any) {
    const supabase = await createClient();
    const { error } = await supabase
      .from('events')
      .upsert(event);
  
    if (error) throw error;
    revalidatePath('/admin/events');
    revalidatePath('/events');
    return { success: true };
}
  
/**
 * Delete event
 */
export async function deleteEvent(id: string) {
    const supabase = await createClient();
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);
  
    if (error) throw error;
    revalidatePath('/admin/events');
    revalidatePath('/events');
    return { success: true };
}
  
/**
 * Get all stories
 */
export async function getAllStories() {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('stories')
      .select(`
        *,
        profiles:donor_id (full_name)
      `)
      .order('created_at', { ascending: false });
  
    if (error) throw error;
    return data;
}
  
/**
 * Create or update story
 */
export async function upsertStory(story: any) {
    const supabase = await createClient();
    const { error } = await supabase
      .from('stories')
      .upsert(story);
  
    if (error) throw error;
    revalidatePath('/admin/stories');
    revalidatePath('/stories');
    return { success: true };
}
  
/**
 * Delete story
 */
export async function deleteStory(id: string) {
    const supabase = await createClient();
    const { error } = await supabase
      .from('stories')
      .delete()
      .eq('id', id);
  
    if (error) throw error;
    revalidatePath('/admin/stories');
    revalidatePath('/stories');
    return { success: true };
}

/**
 * Export blood requests as CSV
 */
export async function exportRequestsData() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blood_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return { success: false, error: error.message };
  }

  if (!data || data.length === 0) {
    return { success: true, csv: 'No data' };
  }

  // Simple CSV generation
  const headers = Object.keys(data[0]!).join(',');
  const rows = data.map(row => 
    Object.values(row).map(val => `"${val}"`).join(',')
  ).join('\n');
  
  const csv = `${headers}\n${rows}`;
  return { success: true, csv };
}
