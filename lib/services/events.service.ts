'use server';

import { Event } from '@/lib/types/event';
import { createClient } from '@/lib/utils/supabase/server';

export async function getEvents(): Promise<Event[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('is_active', true)
    .order('date', { ascending: true });

  if (error) {
    console.error('CRITICAL: Events fetch failed');
    console.error('Error Code:', error.code);
    console.error('Error Message:', error.message);
    return [];
  }

  return data as Event[];
}
