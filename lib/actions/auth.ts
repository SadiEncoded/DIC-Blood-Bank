'use server';

import { mapBloodTypeToDB } from '@/lib/utils/db-mapping';
import { createClient } from '@/lib/utils/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { signUpSchema } from '../validations/auth';

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

  redirect('/');
}

export async function signup(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const validated = signUpSchema.safeParse(rawData);

  if (!validated.success) {
    return { error: validated.error.issues[0]?.message || 'Invalid input' };
  }

  const { name, email, password, phone, bloodType, location, age, lastDonated } = validated.data;
  
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
  await supabase.auth.signOut();
  redirect('/');
}
