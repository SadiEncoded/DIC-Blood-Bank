import { BloodGroup, DonorTier } from './shared';

export interface Donor {
  id: number;
  name: string;
  count: number;
  blood: BloodGroup;
  tier: DonorTier;
  year: string;
  lastDonation: string;
  phone?: string;
  location?: string;
  hasStory?: boolean;
}
