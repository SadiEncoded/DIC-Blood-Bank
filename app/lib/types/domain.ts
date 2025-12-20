// Shared Type Definitions

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
export type DonorTier = 'Platinum' | 'Gold' | 'Silver' | 'Bronze';
export type ColorTone = 'rose' | 'blue' | 'emerald' | 'amber';

export interface Donor {
  id: string | number;
  name: string;
  count: number;
  blood: BloodGroup;
  tier: DonorTier;
  year: string;
  lastDonation: string;
  phone?: string;
  location?: string;
}

export type DonorStory = {
  id: string | number;
  name: string;
  location: string;
  bloodType: string;
  donations: number;
  story: string;
}
export type ColorThemeKey = 'rose' | 'blue' | 'purple';

export interface Stat {
  label: string;
  value: string;
  tone: ColorTone;
}
