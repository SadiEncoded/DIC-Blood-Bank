'use server'

import prisma from '@/app/lib/db/client';
import { revalidatePath } from 'next/cache';

export async function submitContactForm(formData: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) {
  try {
    await prisma.contactMessage.create({
      data: {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      },
    });
    return { success: true, message: 'আপনার বার্তা সফলভাবে জমা হয়েছে!' };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return { success: false, message: 'একটি ত্রুটি ঘটেছে। দয়া করে পরে আবার চেষ্টা করুন।' };
  }
}

export async function submitBloodRequest(formData: {
  patientName: string;
  bloodType: any;
  units: number;
  hospital: string;
  location: string;
  contactName: string;
  contactPhone: string;
  urgency: any;
  neededBy: string;
  notes?: string;
}) {
  try {
    await prisma.bloodRequest.create({
      data: {
        patientName: formData.patientName,
        bloodType: formData.bloodType,
        units: formData.units,
        hospital: formData.hospital,
        location: formData.location,
        contactName: formData.contactName,
        contactPhone: formData.contactPhone,
        urgency: formData.urgency.toUpperCase(),
        neededBy: new Date(formData.neededBy),
        notes: formData.notes,
      },
    });
    revalidatePath('/searchDonor');
    return { success: true, message: 'রক্তের অনুরোধ সফলভাবে জমা হয়েছে!' };
  } catch (error) {
    console.error('Blood request submission error:', error);
    return { success: false, message: 'একটি ত্রুটি ঘটেছে। দয়া করে পরে আবার চেষ্টা করুন।' };
  }
}

export async function registerDonor(formData: {
  name: string;
  phone: string;
  email?: string;
  bloodType: any;
  location: string;
  lastDonation?: string;
}) {
  try {
    // Map string blood type to enum if needed, but assuming they match uppercase or handled by Prisma
    // The enum in schema is A_POSITIVE, etc. but UI uses A+
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

    await prisma.donor.create({
      data: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        bloodType: bloodTypeMap[formData.bloodType] || formData.bloodType,
        location: formData.location,
        lastDonation: formData.lastDonation ? new Date(formData.lastDonation) : null,
      },
    });
    revalidatePath('/donors');
    return { success: true, message: 'রেজিস্ট্রেশন সফল হয়েছে!' };
  } catch (error) {
    console.error('Donor registration error:', error);
    return { success: false, message: 'একটি ত্রুটি ঘটেছে। সম্ভবত এই ফোন নম্বরটি ইতিমধ্যে ব্যবহৃত হয়েছে।' };
  }
}
