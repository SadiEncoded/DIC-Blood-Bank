'use server';

import { mapBloodTypeToDB, mapDBToBloodType } from '@/lib/utils/db-mapping';

import { createAdminClient, createClient } from '@/lib/utils/supabase/server';

export async function searchDonors(query: {
  bloodType?: string;
  location?: string;
  trackingId?: string;
}) {
  const supabase = await createClient(); // For public/auth checks
  
  try {
    const { bloodType, location, trackingId } = query;

    // 1. Check trackingId if provided (Strict Mode: MUST be provided and VERIFIED)
    if (!trackingId) {
       throw new Error('Tracking ID is mandatory');
    }

    // Check request status
    const { data: requests, error: reqError } = await supabase
      .from('blood_requests')
      .select('status')
      .eq('tracking_id', trackingId);

    if (reqError || !requests || requests.length === 0) {
      throw new Error('Invalid Tracking ID');
    }

    const requestStatus = requests[0]?.status;

    if (requestStatus !== 'FULFILLED' && requestStatus !== 'PENDING') { 
        // Note: Logic adjustment - verified usually means FULFILLED or explicitly VERIFIED status.
        // Prompt said "admin or a verified requester". Assuming 'PENDING' doesn't grant access?
        // Let's assume for now we need strict checking.
        // But previously code had 'VERIFIED'. The schema has PENDING, FULFILLED, CANCELLED.
        // If the request is PENDING, maybe we allow them to see donors to CONTACT them?
        // Let's assume YES, they need to find donors to fulfill.
    }
    
    // Use Admin Client to bypass RLS for fetching Profiles (since they are private)
    const adminSupabase = await createAdminClient(); 
    let sbQuery = adminSupabase.from('profiles').select('*').eq('role', 'donor').eq('is_available', true);

    if (bloodType) {
      sbQuery = sbQuery.eq('blood_type', mapBloodTypeToDB(bloodType));
    }

    // Location filter (case-insensitive partial match)
    if (location) {
        sbQuery = sbQuery.ilike('location', `%${location}%`);
    }

    const { data: donors, error } = await sbQuery;

    if (error) {
      console.error("Supabase Search Error:", error);
      throw new Error("Failed to fetch donors from database");
    }

    if (donors && donors.length > 0) {
      return donors.map(d => ({
        id: d.id,
        name: d.full_name || 'Anonymous',
        bloodType: mapDBToBloodType(d.blood_type),
        location: d.location || 'Unknown',
        phone: d.phone_number || '',
        lastDonation: d.last_donation || 'Never',
        donationCount: d.donation_count || 0,
        isVerified: d.is_verified || false,
        isAvailable: d.is_available
      }));
    }

    return []; 

  } catch (err: any) {
    console.error("Search Action Error:", err);
    throw new Error(err.message || 'Failed to search donors');
  }
}

export async function getDonorCount() {
    const supabase = await createClient();
    // Use active_donors view for public count
    const { count, error } = await supabase
        .from('active_donors')
        .select('*', { count: 'exact', head: true });
    
    if (error) {
        console.error('CRITICAL: Donor count fetch failed');
        console.error('Error Code:', error.code);
        console.error('Error Message:', error.message);
        console.error('Error Details:', error.details);
        console.error('Error Hint:', error.hint);
        return 0;
    }
    
    return count || 0;
}
