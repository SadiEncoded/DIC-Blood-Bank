export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
export type DonorTier = 'Platinum' | 'Gold' | 'Silver' | 'Bronze';
export type ColorTone = 'rose' | 'blue' | 'emerald' | 'amber';
export type ColorThemeKey = 'rose' | 'blue' | 'purple';

export interface Stat {
  label: string;
  value: string;
  tone: ColorTone;
}
