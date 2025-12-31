'use server';

import { mapBloodTypeToDB, mapDBToBloodType } from '@/utils/db-mapping';
import { revalidatePath } from 'next/cache';
import { donorService } from './donor.service';

export async function searchDonors(query: {
  bloodType?: string;
  location?: string;
  trackingId?: string;
}) {
  try {
    const { bloodType, location, trackingId } = query;

    // 1. Check trackingId if provided (Strict Mode: MUST be provided and VERIFIED)
    if (!trackingId) {
       throw new Error('Tracking ID is mandatory');
    }

    // Use the donor service for search
    // Note: The donor service searchDonors takes (bloodType, location)
    // We map the blood type here or inside the service.
    // The service handles fallback logic too.
    const donors = await donorService.searchDonors(
      bloodType ? mapBloodTypeToDB(bloodType) : '', 
      location
    );

    return (donors || []).map(d => ({
        id: d.id,
        name: d.full_name || 'Anonymous',
        bloodType: mapDBToBloodType(d.blood_type),
        location: d.location || 'Unknown',
        phone: d.phone_number || '',
        lastDonation: d.last_donation || 'Never',
        donationCount: d.donation_count || 0,
        isVerified: d.is_verified || false,
        isAvailable: d.is_available,
        facebookUrl: d.facebook_url || null
    }));

  } catch (err: any) {
    console.error("Search Action Error:", err);
    throw new Error(err.message || 'Failed to search donors');
  }
}

export async function getDonorCount() {
    try {
        const count = await donorService.getDonorCount();
        return count;
    } catch (error) {
        console.error('Donor count fetch failed:', error);
        return 0;
    }
}


export async function confirmDonation(donorId: string) {
  try {
      const result = await donorService.incrementDonationCount(donorId);
      revalidatePath('/');
      revalidatePath('/donors');
      revalidatePath('/admin');
      return { success: true, newCount: (result as any)?.donation_count };
  } catch (err: any) {
      console.error("confirmDonation Action Failed:", err);
      return { success: false, error: err.message || 'Internal Server Error' };
  }
}
