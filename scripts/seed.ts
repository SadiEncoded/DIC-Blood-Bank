import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env
dotenv.config({ path: resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

const DONORS = [
  { name: 'রাফি ইসলাম', count: 12, blood: 'O+', lastDonation: '2024-12-01', location: 'Chandpur', age: 28 },
  { name: 'সানজিদা আক্তার', count: 3, blood: 'A+', lastDonation: '2024-10-15', location: 'Baburhat', age: 24 },
  { name: 'মেহেদী হাসান', count: 18, blood: 'B+', lastDonation: '2024-11-20', location: 'Chandpur', age: 32 },
  { name: 'তানভীর আহমেদ', count: 7, blood: 'AB+', lastDonation: '2024-09-05', location: 'Baburhat', age: 29 },
  { name: 'নুসরাত জাহান', count: 2, blood: 'O-', lastDonation: '2024-08-12', location: 'Chandpur', age: 22 },
  { name: 'সাকিব মাহমুদ', count: 9, blood: 'A-', lastDonation: '2024-12-10', location: 'Baburhat', age: 30 },
  { name: 'ইমরান হোসেন', count: 5, blood: 'B-', lastDonation: '2024-07-18', location: 'Chandpur', age: 26 },
  { name: 'ফারহানা ইয়াসমিন', count: 14, blood: 'AB-', lastDonation: '2024-11-02', location: 'Baburhat', age: 27 },
  { name: 'আরিফুল ইসলাম', count: 6, blood: 'O+', lastDonation: '2024-10-01', location: 'Chandpur', age: 31 },
  { name: 'মাহমুদা আক্তার', count: 1, blood: 'A+', lastDonation: '2024-06-30', location: 'Baburhat', age: 23 },
  { name: 'সাজিদ খান', count: 4, blood: 'B+', lastDonation: '2024-09-10', location: 'Chandpur', age: 25 },
  { name: 'রিমি আক্তার', count: 8, blood: 'O+', lastDonation: '2024-10-21', location: 'Baburhat', age: 28 },
  { name: 'নাঈম রহমান', count: 15, blood: 'A+', lastDonation: '2024-11-11', location: 'Chandpur', age: 33 },
  { name: 'তামান্না হক', count: 2, blood: 'AB+', lastDonation: '2024-08-05', location: 'Baburhat', age: 21 },
  { name: 'রিদওয়ান কবির', count: 20, blood: 'O-', lastDonation: '2024-12-05', location: 'Chandpur', age: 35 },
];

async function seed() {
  console.log('Seeding donors...');
  
  for (const donor of DONORS) {
    const { error } = await supabase.from('donors').upsert({
      name: donor.name,
      blood_type: donor.blood,
      location: donor.location,
      age: donor.age,
      donation_count: donor.count,
      last_donation: donor.lastDonation,
      phone: `017000000${Math.floor(Math.random() * 100).toString().padStart(2, '0')}`, // Mocking phone for uniqueness
      is_verified: true,
    }, { onConflict: 'phone' });
    
    if (error) {
      console.error(`Error seeding ${donor.name}:`, error.message);
    } else {
      console.log(`Seeded: ${donor.name}`);
    }
  }
  
  console.log('Done.');
}

seed();
