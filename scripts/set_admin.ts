
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

// ==========================================
// ⚡ MANUAL CONFIGURATION - EDIT THIS SECTION
// ==========================================

// Put your email here to make yourself an admin
// If you leave it empty, the script will ask for it (if interactive) or assume you wanted to edit this file.
const TARGET_USER_EMAIL = process.argv[2] || "YOUR_EMAIL_HERE"; 

// ==========================================
// 🔧 SYSTEM CONFIGURATION - DO NOT EDIT BELOW
// ==========================================

// Using the same credentials as create_event.ts for consistency
const SUPABASE_URL = "https://qrbwarjduncwgglandiz.supabase.co";
const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyYndhcmpkdW5jd2dnbGFuZGl6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjM5Njk1MywiZXhwIjoyMDgxOTcyOTUzfQ.8yMDEnb7PExKgKF2zzql5pEmj3xSAbRQO0euqapND1Y";

async function setAdminRole() {
  console.log('🚀 Initializing Admin Client...');
  
  if (!TARGET_USER_EMAIL || TARGET_USER_EMAIL === "YOUR_EMAIL_HERE") {
      console.log("⚠️  No email provided. Listing available users...");
      const { data: { users }, error } = await supabase.auth.admin.listUsers();
      if (error) {
          console.error("❌ Failed to list users:", error.message);
          return;
      }
      console.table(users.map(u => ({ id: u.id, email: u.email, last_sign_in: u.last_sign_in_at })));
      console.log("\n👇 RUN THIS COMMAND TO FIX PERMISSIONS:");
      console.log("npx tsx scripts/set_admin.ts <YOUR_EMAIL>");
      return;
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  console.log(`🔍 Looking for user: ${TARGET_USER_EMAIL}`);

  // 1. Get User ID from Auth (Admin API)
  const { data: { users }, error: userError } = await supabase.auth.admin.listUsers();
  
  if (userError) {
      console.error('❌ Failed to list users:', userError.message);
      process.exit(1);
  }

  const user = users.find(u => u.email?.toLowerCase() === TARGET_USER_EMAIL.toLowerCase());

  if (!user) {
      console.error(`❌ User with email '${TARGET_USER_EMAIL}' not found in Auth system.`);
      console.log("Available users (first 5):", users.slice(0, 5).map(u => u.email).join(', '));
      process.exit(1);
  }

  console.log(`✅ Found user ID: ${user.id}`);

  // 2. Update Profile in 'profiles' table
  console.log(`📝 Updating role to 'admin' in profiles table...`);

  const { error: updateError } = await supabase
    .from('profiles')
    .update({ role: 'admin' })
    .eq('id', user.id);

  if (updateError) {
    console.error('❌ FAILED to update profile:', updateError.message);
    process.exit(1);
  }

  // 3. Verify
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role === 'admin') {
      console.log('🎉 SUCCESS! User is now an ADMIN.');
      console.log('👉 Go back to the browser, RELOAD the page, and try creating an event.');
  } else {
      console.error('⚠️ Warning: Update appeared to succeed but verification failed. Current role:', profile?.role);
  }
}

setAdminRole().catch(console.error);
