export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type DonorTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Hero';

export const BLOOD_GROUPS: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone_number?: string;
  blood_type?: BloodGroup;
  location?: string;
  age?: number;
  last_donation?: string;
  donation_count: number;
  is_available: boolean;
  is_verified: boolean;
  role: 'admin' | 'donor';
  created_at: string;
  updated_at: string;
  // Stats
  average_rating?: number;
  rating_count?: number;
  flag_count?: number;
}

export type ColorThemeKey = 'rose' | 'blue' | 'purple' | 'emerald' | 'amber' | 'slate';

export interface Stat {
  label: string;
  value: string;
  tone?: ColorThemeKey;
}
