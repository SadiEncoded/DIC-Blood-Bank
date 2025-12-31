'use server';

import { signUpSchema } from '@/features/auth/schemas/index';
import { createClient } from '@/lib/supabase/server';
import { mapBloodTypeToDB } from '@/utils/db-mapping';
import { headers } from 'next/headers';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = await createClient();

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message.includes('Email not confirmed')) {
      return { error: 'Please verify your email before logging in.' };
    }
    return { error: error.message };
  }

  return { success: true };
}

export async function signup(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const validated = signUpSchema.safeParse(rawData);

  if (!validated.success) {
    return { error: validated.error.issues[0]?.message || 'Invalid input' };
  }

  const { name, email, password, phone, bloodType, location, age, lastDonated, facebookUrl } = validated.data;
  
  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        phone: phone,
        blood_type: mapBloodTypeToDB(bloodType),
        location: location,
        age: parseInt(age),
        last_donation: lastDonated || null,
        facebook_url: facebookUrl || null,
      },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true, message: 'Check your email for a verification link!' };
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    return { error: error.message };
  }
  
  return { success: true };
}
