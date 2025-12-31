/**
 * Centralized Validation Schemas
 * Provides reusable validation schemas using Zod
 */

import { z } from 'zod';

// ============================================
// Reusable Field Validators
// ============================================

export const validators = {
  email: z.string().email('Invalid email address').toLowerCase(),
  
  phone: z
    .string()
    .regex(/^(?:\+88)?01[3-9]\d{8}$/, 'Invalid Bangladesh phone number')
    .transform((val) => val.replace(/^\+88/, '')),
  
  bloodType: z.string().refine((val) => ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].includes(val), {
    message: 'Invalid blood type',
  }),
  
  age: z
    .number()
    .int('Age must be a whole number')
    .min(18, 'Must be at least 18 years old')
    .max(100, 'Invalid age'),
  
  date: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).or(z.date()),
  
  uuid: z.string().uuid('Invalid ID format'),
  
  url: z.string().url('Invalid URL format').optional(),
  
  nonEmptyString: (fieldName: string, min: number = 2, max: number = 200) =>
    z
      .string()
      .min(min, `${fieldName} must be at least ${min} characters`)
      .max(max, `${fieldName} must not exceed ${max} characters`)
      .trim(),

  facebookUrl: z
    .string()
    .trim()
    .url('Invalid URL format')
    .refine(
      (val) => {
        if (!val) return true;
        const fbRegex = /^(https?:\/\/)?(www\.)?(facebook|fb)\.com\/(profile\.php\?id=\d+|[a-zA-Z0-9\.]+\/?)$/;
        return fbRegex.test(val);
      },
      'Must be a valid Facebook profile URL'
    )
    .optional()
    .or(z.literal('')),
};

// ============================================
// User/Profile Schemas
// ============================================

export const userSchemas = {
  signup: z.object({
    full_name: validators.nonEmptyString('Full name', 2, 100),
    email: validators.email,
    phone_number: validators.phone,
    blood_type: validators.bloodType,
    location: validators.nonEmptyString('Location', 2, 200),
    age: validators.age,
    last_donation: z.string().optional(),
    facebook_url: validators.facebookUrl,
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(100, 'Password is too long'),
  }),

  login: z.object({
    email: validators.email,
    password: z.string().min(1, 'Password is required'),
  }),

  updateProfile: z.object({
    full_name: validators.nonEmptyString('Full name', 2, 100).optional(),
    phone_number: validators.phone.optional(),
    location: validators.nonEmptyString('Location', 2, 200).optional(),
    facebook_url: validators.facebookUrl,
    is_available: z.boolean().optional(),
  }),
};

// ============================================
// Blood Request Schemas
// ============================================

export const bloodRequestSchemas = {
  create: z.object({
    patient_name: validators.nonEmptyString('Patient name', 2, 100),
    blood_type: validators.bloodType,
    units: z
      .number()
      .int('Units must be a whole number')
      .min(1, 'At least 1 unit required')
      .max(10, 'Maximum 10 units allowed'),
    hospital: validators.nonEmptyString('Hospital', 2, 200),
    location: validators.nonEmptyString('Location', 2, 200),
    contact_name: validators.nonEmptyString('Contact name', 2, 100),
    contact_phone: validators.phone,
    urgency: z.string().refine((val) => ['NORMAL', 'URGENT', 'CRITICAL'].includes(val), {
      message: 'Invalid urgency level',
    }),
    needed_by: validators.date,
    notes: z.string().max(500, 'Notes must not exceed 500 characters').optional(),
  }),

  update: z.object({
    status: z.enum(['PENDING', 'APPROVED', 'FULFILLED', 'CANCELLED']).optional(),
    notes: z.string().max(500).optional(),
  }),

  filter: z.object({
    status: z.enum(['PENDING', 'APPROVED', 'FULFILLED', 'CANCELLED']).optional(),
    blood_type: validators.bloodType.optional(),
    urgency: z.enum(['NORMAL', 'URGENT', 'CRITICAL']).optional(),
    location: z.string().optional(),
  }),
};

// ============================================
// Event Schemas
// ============================================

export const eventSchemas = {
  create: z.object({
    title: validators.nonEmptyString('Title', 5, 200),
    description: validators.nonEmptyString('Description', 10, 1000),
    date: validators.date,
    location: validators.nonEmptyString('Location', 2, 200),
    category: z.string().refine((val) => ['Blood Drive', 'Seminar', 'Workshop'].includes(val), {
      message: 'Invalid event category',
    }),
    image_url: validators.url,
    is_active: z.boolean().default(true),
  }),

  update: z.object({
    title: validators.nonEmptyString('Title', 5, 200).optional(),
    description: validators.nonEmptyString('Description', 10, 1000).optional(),
    date: validators.date.optional(),
    location: validators.nonEmptyString('Location', 2, 200).optional(),
    is_active: z.boolean().optional(),
  }),
};

// ============================================
// Contact Message Schema
// ============================================

export const contactSchemas = {
  create: z.object({
    name: validators.nonEmptyString('Name', 2, 100),
    email: validators.email,
    subject: validators.nonEmptyString('Subject', 5, 200).optional(),
    message: validators.nonEmptyString('Message', 10, 1000),
  }),
};

// ============================================
// Story Schemas
// ============================================

export const storySchemas = {
  create: z.object({
    title: validators.nonEmptyString('Title', 5, 100),
    content: validators.nonEmptyString('Story content', 50, 2000),
  }),
  
  update: z.object({
    title: validators.nonEmptyString('Title', 5, 100).optional(),
    content: validators.nonEmptyString('Story content', 50, 2000).optional(),
    is_published: z.boolean().optional(),
  }),
};

// ============================================
// Helper Functions
// ============================================

/**
 * Safely parse and validate data with a schema
 */
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}

/**
 * Validate data and return result with error details
 */
export function safeValidateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: z.ZodError } {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  return { success: false, errors: result.error };
}
