import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

// ==========================================
// ⚡ MANUAL CONFIGURATION - EDIT THIS SECTION
// ==========================================

const EVENT_DETAILS = {
  title: "New CLI Event",
  bangla_title: "নতুন সিএলআই ইভেন্ট",
  description: "This event was created from the command line script.",
  date: new Date("2025-02-01T10:00:00"), // Future date
  location: "Dhaka, Bangladesh",
  category: "Blood Drive",
  image_url: "https://images.unsplash.com/photo-1615461066841-6116e61058f4",
  is_active: true
};

// ==========================================
// 🔧 SYSTEM CONFIGURATION - DO NOT EDIT BELOW
// ==========================================

// Hardcoded for reliability during troubleshooting
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qrbwarjduncwgglandiz.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_KEY) {
  console.error("❌ ERROR: Missing SUPABASE_SERVICE_ROLE_KEY in .env file.");
  process.exit(1);
}

async function createEvent() {
  console.log('🚀 Initializing Admin Client...');
  
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY as string, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  console.log('📝 Creating event:', EVENT_DETAILS.title);

  const { data, error } = await supabase
    .from('events')
    .insert({
      ...EVENT_DETAILS,
      date: EVENT_DETAILS.date.toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) {
    console.error('❌ FAILED to create event:', error.message);
    console.error('Details:', error);
    process.exit(1);
  }

  console.log('✅ SUCCESS! Event created with ID:', data.id);
  console.log('✨ You can view it in the app now.');
}

createEvent().catch(console.error);
