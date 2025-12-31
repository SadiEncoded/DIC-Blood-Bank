'use server';

import { revalidatePath } from 'next/cache';

export async function submitContactForm(formData: {
  name: string;
  email: string;
  message: string;
  subject?: string;
}) {
  try {
    // Import the service dynamically
    const { contactService } = await import('@/features/contact/services/contact.service');

    await contactService.submitContactForm(formData);
    revalidatePath('/admin');

    return {
      success: true,
      message: 'বার্তা সফলভাবে পাঠানো হয়েছে! (Message sent successfully!)',
    };
  } catch (error: any) {
    console.error('Contact Form Error:', error);

    // Handle specific error codes
    if (error.code === 'CONFLICT_ERROR') {
      return {
        success: false,
        message: error.message,
      };
    }

    if (error.code === 'VALIDATION_ERROR') {
      return {
        success: false,
        message: error.message || 'Invalid form data',
      };
    }

    return {
      success: false,
      message: 'বার্তা পাঠাতে ব্যর্থ হয়েছে। (Failed to send message.)',
    };
  }
}

export async function submitBloodRequest(formData: {
  patientName: string;
  bloodType: string;
  units: number;
  hospital: string;
  location: string;
  contactName: string;
  contactPhone: string;
  urgency: string;
  neededBy: string;
  reason?: string;
}) {
  try {
    // Import the service dynamically to avoid circular dependencies
    const { bloodRequestService } = await import('@/features/blood-requests/services/blood-request.service');
    
    // Map form data to service input format
    const serviceInput = {
      patient_name: formData.patientName,
      blood_type: formData.bloodType as any,
      units: Number(formData.units),
      hospital: formData.hospital,
      location: formData.location,
      contact_name: formData.contactName,
      contact_phone: formData.contactPhone,
      urgency: formData.urgency.toUpperCase() as any,
      needed_by: formData.neededBy,
      notes: formData.reason,
    };

    const result = await bloodRequestService.create(serviceInput) as any;

    // Revalidate relevant paths
    revalidatePath('/donors');
    revalidatePath('/admin');
    revalidatePath('/donate');
    revalidatePath('/');

    return {
      success: true,
      message: 'Blood request submitted successfully!',
      trackingId: result.tracking_id,
    };
  } catch (error: any) {
    console.error('Blood Request Error:', error);
    
    // Handle specific error types
    if (error.code === 'AUTHENTICATION_ERROR') {
      return {
        success: false,
        message: 'রক্তের অনুরোধ করতে আপনাকে অবশ্যই লগ-ইন করতে হবে। (You must be logged in to request blood.)',
      };
    }

    if (error.code === 'VALIDATION_ERROR') {
      return {
        success: false,
        message: error.message || 'Invalid form data. Please check your inputs.',
      };
    }

    return {
      success: false,
      message: error.message || 'Failed to submit request.',
    };
  }
}

export async function registerDonor(formData: any) {
    try {
        const { userService } = await import('@/features/auth/services/user.service');
        
        const location = `${formData.district}, ${formData.upazila}`;
        const birthYear = new Date(formData.dateOfBirth).getFullYear();
        const age = new Date().getFullYear() - birthYear;

        await userService.registerAsDonor({
            bloodGroup: formData.bloodGroup,
            location: location,
            lastDonation: formData.lastDonation,
            age: age
        });

        revalidatePath('/');
        revalidatePath('/donors');
        revalidatePath('/admin');

        return { success: true, message: 'Donor profile updated successfully!' };
    } catch (error: any) {
        console.error('Registration Error:', error);
        
        if (error.code === 'AUTHENTICATION_ERROR') {
            return { success: false, message: 'You must be logged in to register as a donor.' };
        }

        return { success: false, message: error.message || 'Failed to register.' };
    }
}
