import { z } from 'zod';
import { BLOOD_TYPES } from './constants';

export const bloodRequestSchema = z.object({
  patientName: z.string().min(2, 'Patient name is required'),
  bloodType: z.enum(BLOOD_TYPES),
  hospital: z.string().min(2, 'Hospital name is required'),
  requiredBy: z.string().min(1, 'Date is required'),
  urgency: z.enum(['normal', 'urgent', 'critical']),
  unitsNeeded: z.number().min(1).max(10),
  contactName: z.string().min(2, 'Contact person name is required'),
  contactPhone: z.string().regex(/^(?:\+88)?01[3-9]\d{8}$/, 'Valid BD phone number required'),
  reason: z.string().optional(),
});

export type BloodRequestFormValues = z.infer<typeof bloodRequestSchema>;

import { WORKFLOW_STEPS } from './constants';

export type WorkflowStep = typeof WORKFLOW_STEPS[number];

export type StepProps = {
  form: import('react-hook-form').UseFormReturn<BloodRequestFormValues>;
};
