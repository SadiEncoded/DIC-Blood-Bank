// Donor Registry Data
import { Donor } from '@/lib/types';

// Dummy Donor Registry
export const DONORS: Donor[] = [
  { id: 1, name: 'রাফি ইসলাম', count: 12, blood: 'O+', tier: 'Gold', year: '2022', lastDonation: '2024-12-01', location: 'Chandpur', hasStory: true },
  { id: 2, name: 'সানজিদা আক্তার', count: 3, blood: 'A+', tier: 'Bronze', year: '2023', lastDonation: '2024-10-15', location: 'Baburhat' },
  { id: 3, name: 'মেহেদী হাসান', count: 18, blood: 'B+', tier: 'Platinum', year: '2021', lastDonation: '2024-11-20', location: 'Chandpur', hasStory: true },
  { id: 4, name: 'তানভীর আহমেদ', count: 7, blood: 'AB+', tier: 'Silver', year: '2022', lastDonation: '2024-09-05', location: 'Baburhat', hasStory: true },
  { id: 5, name: 'নুসরাত জাহান', count: 2, blood: 'O-', tier: 'Bronze', year: '2024', lastDonation: '2024-08-12', location: 'Chandpur' },
  { id: 6, name: 'সাকিব মাহমুদ', count: 9, blood: 'A-', tier: 'Silver', year: '2022', lastDonation: '2024-12-10', location: 'Baburhat', hasStory: true },
  { id: 7, name: 'ইমরান হোসেন', count: 5, blood: 'B-', tier: 'Bronze', year: '2023', lastDonation: '2024-07-18', location: 'Chandpur' },
  { id: 8, name: 'ফারহানা ইয়াসমিন', count: 14, blood: 'AB-', tier: 'Gold', year: '2021', lastDonation: '2024-11-02', location: 'Baburhat', hasStory: true },
  { id: 9, name: 'আরিফুল ইসলাম', count: 6, blood: 'O+', tier: 'Silver', year: '2022', lastDonation: '2024-10-01', location: 'Chandpur', hasStory: true },
  { id: 10, name: 'মাহমুদা আক্তার', count: 1, blood: 'A+', tier: 'Bronze', year: '2024', lastDonation: '2024-06-30', location: 'Baburhat' },

  // ---- filler donors (no stories) ----
  { id: 11, name: 'সাজিদ খান', count: 4, blood: 'B+', tier: 'Bronze', year: '2023', lastDonation: '2024-09-10', location: 'Chandpur' },
  { id: 12, name: 'রিমি আক্তার', count: 8, blood: 'O+', tier: 'Silver', year: '2022', lastDonation: '2024-10-21', location: 'Baburhat', hasStory: true },
  { id: 13, name: 'নাঈম রহমান', count: 15, blood: 'A+', tier: 'Gold', year: '2021', lastDonation: '2024-11-11', location: 'Chandpur', hasStory: true },
  { id: 14, name: 'তামান্না হক', count: 2, blood: 'AB+', tier: 'Bronze', year: '2024', lastDonation: '2024-08-05', location: 'Baburhat' },
  { id: 15, name: 'রিদওয়ান কবির', count: 20, blood: 'O-', tier: 'Platinum', year: '2020', lastDonation: '2024-12-05', location: 'Chandpur', hasStory: true },
];

export const DONORS_PAGE_CONTENT = {
  registry: {
    eyebrow: "Our Donors",
    title: "জীবন রক্ষাকারী",
    italicTitle: "তালিকা",
    subtitle: "নিবেদিত রক্তদাতাদের সম্পূর্ণ তথ্যভাণ্ডার যা চাঁদপুর জেলাবাসীর জন্য এক শক্তির উৎস।",
  },
  hallOfFame: {
    eyebrow: "Hall of Fame",
    title: "সম্মাননা",
    italicTitle: "বোর্ড",
    subtitle: "যাদের রক্তদানে বেঁচেছে অসংখ্য প্রাণ, তাদের ত্যাগের স্বীকৃতি।",
  }
};
