import { BLOOD_TYPES } from '@/config';
import { z } from 'zod';

/**
 * Zod schema for blood request form validation.
 * Includes improved error messages and phone number regex for Bangladesh.
 */
export const bloodRequestSchema = z.object({
  patientName: z.string().min(2, 'রুগীর নাম কমপক্ষে ২ অক্ষরের হতে হবে (Patient name is required)'),
  bloodType: (z.enum as any)([...BLOOD_TYPES], {
    invalid_type_error: 'রক্তের গ্রুপ নির্বাচন করুন (Select blood group)',
    required_error: 'রক্তের গ্রুপ নির্বাচন করুন (Select blood group)'
  }),
  hospital: z.string().min(2, 'হাসপাতালের নাম প্রয়োজন (Hospital name is required)'),
  requiredBy: z.string().min(1, 'তারিখ প্রয়োজন (Date is required)'),
  urgency: (z.enum as any)(['normal', 'urgent', 'critical'], {
    invalid_type_error: 'জরুরিতা নির্ধারণ করুন (Select urgency)',
    required_error: 'জরুরিতা নির্ধারণ করুন (Select urgency)'
  }),
  unitsNeeded: z.number().min(1, 'কমপক্ষে ১ ব্যাগ রক্ত প্রয়োজন').max(10, 'সর্বোচ্চ ১০ ব্যাগ পর্যন্ত অনুরোধ করা যাবে'),
  contactName: z.string().min(2, 'আপনার নাম প্রয়োজন (Requester name is required)'),
  contactPhone: z.string().regex(/^(?:\+88)?01[3-9]\d{8}$/, 'সঠিক ফোন নম্বর প্রদান করুন (Valid BD phone number required)'),
  reason: z.string().optional(),
});

export type BloodRequestFormValues = z.infer<typeof bloodRequestSchema>;

/**
 * Interface representing a Donor in the search results.
 */
export interface Donor {
  id: string;
  name: string;
  bloodType: string;
  location: string;
  isAvailable: boolean;
  phone?: string;
  lastDonation?: string;
  donationCount?: number;
  isVerified?: boolean;
  facebookUrl?: string;
  averageRating?: number;
  ratingCount?: number;
}

/**
 * Types and interfaces for the multi-step request workflow.
 */
import { WORKFLOW_STEPS } from './constants';

export type WorkflowStep = typeof WORKFLOW_STEPS[number];

export type StepProps = {
  onNext: () => void;
  onPrev: () => void;
  data?: any;
};
