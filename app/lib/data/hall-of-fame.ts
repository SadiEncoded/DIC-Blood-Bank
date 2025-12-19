// 1. Define Types for strict safety
export type DonorTier = 'Platinum' | 'Gold' | 'Silver' | 'Bronze';
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
export type ColorTone = 'rose' | 'blue' | 'emerald' | 'amber';

export interface Stat {
  label: string;
  value: string;
  tone: ColorTone;
}

export interface Donor {
  id: number;
  name: string;
  count: number;
  blood: BloodGroup;
  tier: DonorTier;
  year: string;
}

// 2. Statistics Data
export const STATS: Stat[] = [
  { label: "মোট দাতা", value: "১২০০+", tone: "rose" },
  { label: "ব্লাড ব্যাগ সংগৃহীত", value: "৪৫০০+", tone: "blue" },
  { label: "সফল ক্যাম্পেইন", value: "৪৮", tone: "emerald" },
];

// 3. Donor Registry Data
export const DONORS: Donor[] = [
  { id: 1, name: "ড. আব্দুল্লাহ মামুন", count: 32, blood: "O+", tier: "Platinum", year: "২০২৪" },
  { id: 2, name: "ইঞ্জি. সাজিদ আহমেদ", count: 28, blood: "A+", tier: "Platinum", year: "২০২৪" },
  { id: 3, name: "প্রফেসর ড. নাসরিন আক্তার", count: 25, blood: "B+", tier: "Gold", year: "২০২৩" },
  { id: 4, name: "মেহেদী হাসান সাগর", count: 22, blood: "AB+", tier: "Gold", year: "২০২৪" },
  { id: 5, name: "রাহাত কবির", count: 18, blood: "B+", tier: "Silver", year: "২০২৩" },
  { id: 6, name: "তানভীর হাসান", count: 16, blood: "O-", tier: "Silver", year: "২০২৩" },
  { id: 7, name: "ফাতেমা তুজ জোহরা", count: 14, blood: "A-", tier: "Silver", year: "২০২২" },
  { id: 8, name: "কামরুল ইসলাম আরিফ", count: 12, blood: "B+", tier: "Silver", year: "২০২৪" },
  { id: 9, name: "নুসরাত জাহান মিম", count: 9, blood: "O+", tier: "Bronze", year: "২০২৩" },
  { id: 10, name: "শরিফুল ইসলাম", count: 8, blood: "AB-", tier: "Bronze", year: "২০২৪" },
  { id: 11, name: "জেসমিন আক্তার লতা", count: 7, blood: "A+", tier: "Bronze", year: "২০২২" },
  { id: 12, name: "মাহমুদুল হাসান সাদি", count: 6, blood: "O+", tier: "Bronze", year: "২০২৪" },
  { id: 13, name: "সৈয়দা সামিয়া আক্তার", count: 5, blood: "B-", tier: "Bronze", year: "২০২৩" },
  { id: 14, name: "তৌহিদুল আলম", count: 4, blood: "O-", tier: "Bronze", year: "২০২৪" },
  { id: 15, name: "আহমেদ জুবায়ের", count: 3, blood: "A+", tier: "Bronze", year: "২০২৪" },
];

// Optional: Helper function to ensure they are always sorted by donation count
// You can use this in your component: const sortedDonors = [...DONORS].sort((a, b) => b.count - a.count);

// 4. Style Mapping (Institutional & Clean)
export const TONE: Record<ColorTone, string> = {
  rose: 'text-rose-600',
  blue: 'text-blue-600',
  emerald: 'text-emerald-600',
  amber: 'text-amber-600',
};

// Using a more structured mapping for Tiers (Border, Background, and Text)
export const TIER_STYLE: Record<DonorTier, string> = {
  Platinum: 'bg-slate-50 text-slate-700 border-slate-200',
  Gold: 'bg-amber-50 text-amber-700 border-amber-100',
  Silver: 'bg-slate-50 text-slate-500 border-slate-100',
  Bronze: 'bg-orange-50 text-orange-700 border-orange-100',
};
