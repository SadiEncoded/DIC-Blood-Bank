import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env
dotenv.config({ path: resolve(process.cwd(), '.env') });

const supabaseUrl = "https://qrbwarjduncwgglandiz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyYndhcmpkdW5jd2dnbGFuZGl6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjM5Njk1MywiZXhwIjoyMDgxOTcyOTUzfQ.8yMDEnb7PExKgKF2zzql5pEmj3xSAbRQO0euqapND1Y";

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const SEED_DATA = [
  {
    donor: {
      full_name: 'রাফি ইসলাম',
      email: 'rafi.islam@example.com',
      phone_number: '01711111111',
      blood_type: 'O+',
      location: 'Chandpur',
      age: 28,
      donation_count: 12,
      last_donation: '2024-12-01',
      is_verified: true,
    },
    story: {
      title: 'A Gift of Life on a Rainy Night',
      subtitle: 'How a midnight call saved a newborn',
      content: 'It was 2 AM when I received the call. A newborn baby at Chandpur Sadar Hospital needed O+ blood urgently. Despite the heavy rain, I knew I had to go. Seeing the relief on the father’s face after the transfusion was the best reward I could ever imagine. Blood donation isn’t just about giving blood; it’s about giving hope.',
      category: 'Emergency Response',
      read_time: '4 min read',
      color_theme: 'rose',
      is_featured: true,
    }
  },
  {
    donor: {
      full_name: 'সানজিদা আক্তার',
      email: 'sanjida.akter@example.com',
      phone_number: '01722222222',
      blood_type: 'A+',
      location: 'Baburhat',
      age: 24,
      donation_count: 3,
      last_donation: '2024-10-15',
      is_verified: true,
    },
    story: {
      title: 'Crossing the Fear of Needles',
      subtitle: 'My journey to becoming a regular donor',
      content: 'I used to be terrified of needles. But after seeing my grandmother struggle to find blood during her surgery, I realized my fear was nothing compared to the pain of losing a loved one. I donated for the first time that day, and now I am a regular donor. It’s a small step for me, but a giant leap for someone in need.',
      category: 'Personal Journey',
      read_time: '3 min read',
      color_theme: 'blue',
      is_featured: true,
    }
  },
  {
    donor: {
      full_name: 'মেহেদী হাসান',
      email: 'mehedi.hasan@example.com',
      phone_number: '01733333333',
      blood_type: 'B+',
      location: 'Chandpur',
      age: 32,
      donation_count: 18,
      last_donation: '2024-11-20',
      is_verified: true,
    },
    story: {
      title: '18 Times and Counting',
      subtitle: 'Why I never miss a donation cycle',
      content: 'I started donating blood when I was in university. Since then, I’ve donated 18 times. To me, it’s a responsibility as a healthy human being. Every time I donate, I feel lighter and happier. Our blood is a resource that regenerates, but for some, it’s a resource they can’t live without.',
      category: 'Community Impact',
      read_time: '5 min read',
      color_theme: 'purple',
      is_featured: true,
    }
  }
];

async function seed() {
  console.log('🚀 Starting Seeding Process...');

  for (const item of SEED_DATA) {
    console.log(`\n👤 Seeding Donor: ${item.donor.full_name}`);
    
    // 1. Seed Profile
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .upsert(item.donor, { onConflict: 'email' })
      .select()
      .single();

    if (profileError) {
      console.error(`❌ Profile Error for ${item.donor.full_name}:`, profileError.message);
      continue;
    }

    console.log(`✅ Profile Seeded (ID: ${profileData.id})`);

    // 2. Seed Story
    const { error: storyError } = await supabase
      .from('stories')
      .upsert({
        ...item.story,
        donor_id: profileData.id,
        is_published: true,
      }, { onConflict: 'title' }); // Using title as a proxy for conflict if ID isn't known

    if (storyError) {
      console.error(`❌ Story Error for ${item.donor.full_name}:`, storyError.message);
    } else {
      console.log(`✅ Story Seeded: ${item.story.title}`);
    }
  }

  console.log('\n✨ Seeding Complete!');
}

seed().catch(err => {
  console.error('CRITICAL SEED ERROR:', err);
  process.exit(1);
});
