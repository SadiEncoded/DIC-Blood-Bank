'use server'

import prisma from '@/app/lib/db/client';

export async function searchDonors(query: {
  bloodType?: string;
  location?: string;
}) {
  try {
    const bloodTypeMap: Record<string, any> = {
      'A+': 'A_POSITIVE',
      'A-': 'A_NEGATIVE',
      'B+': 'B_POSITIVE',
      'B-': 'B_NEGATIVE',
      'AB+': 'AB_POSITIVE',
      'AB-': 'AB_NEGATIVE',
      'O+': 'O_POSITIVE',
      'O-': 'O_NEGATIVE',
    };

    const dbBloodType = query.bloodType ? bloodTypeMap[query.bloodType] : undefined;

    const dbDonors = await prisma.donor.findMany({
      where: {
        bloodType: dbBloodType,
        location: query.location ? {
          contains: query.location,
          mode: 'insensitive',
        } : undefined,
        availability: true,
      },
      orderBy: {
        donationCount: 'desc',
      },
      take: 50, // Limit results for performance
    });

    const bloodTypeMapRev: Record<string, any> = {
      'A_POSITIVE': 'A+',
      'A_NEGATIVE': 'A-',
      'B_POSITIVE': 'B+',
      'B_NEGATIVE': 'B-',
      'AB_POSITIVE': 'AB+',
      'AB_NEGATIVE': 'AB-',
      'O_POSITIVE': 'O+',
      'O_NEGATIVE': 'O-',
    };

    return dbDonors.map(d => ({
      id: d.id,
      name: d.name,
      bloodType: bloodTypeMapRev[d.bloodType] || d.bloodType,
      location: d.location,
      phone: d.phone,
      donationCount: d.donationCount,
      lastDonation: d.lastDonation ? d.lastDonation.toISOString().split('T')[0] : 'N/A',
      isVerified: d.isVerified,
    }));
  } catch (error) {
    console.error('Donor search error:', error);
    return [];
  }
}
