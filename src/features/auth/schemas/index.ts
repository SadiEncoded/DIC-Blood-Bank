import { z } from 'zod';

const phoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;

export const signUpSchema = z.object({
  name: z.string().min(2, { message: "নাম অন্তত ২ অক্ষরের হতে হবে। (Name must be at least 2 characters)" }),
  email: z.string().email({ message: "সঠিক ইমেইল ঠিকানা প্রদান করুন। (Invalid email address)" }),
  phone: z.string().regex(phoneRegex, { message: "সঠিক বাংলাদেশি ফোন নম্বর প্রদান করুন। (Invalid Bangladeshi phone number)" }),
  bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
    message: "রক্তের গ্রুপ নির্বাচন করুন। (Please select blood group)"
  }),
  location: z.string().min(3, { message: "বর্তমান ঠিকানা প্রদান করুন। (Location is required)" }),
  age: z.string().refine((val) => {
    const num = parseInt(val);
    return !isNaN(num) && num >= 18 && num <= 65;
  }, { message: "রক্তদানের জন্য আপনার বয়স ১৮ থেকে ৬৫ এর মধ্যে হতে হবে। (Age must be between 18-65)" }),
  password: z.string().min(6, { message: "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে। (Password must be at least 6 characters)" }),
  confirmPassword: z.string(),
  lastDonated: z.string().optional().or(z.literal('')),
  facebookUrl: z.string().optional().or(z.literal('')),
}).refine((data) => data.password === data.confirmPassword, {
  message: "পাসওয়ার্ড মেলেনি। (Passwords do not match)",
  path: ["confirmPassword"],
});

export type SignUpInput = z.infer<typeof signUpSchema>;
