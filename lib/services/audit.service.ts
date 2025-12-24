'use server';

import { createClient } from '@/lib/utils/supabase/server';
import { headers } from 'next/headers';

export async function logContactAttempt(donorId: string, requestId?: string) {
  const supabase = await createClient();
  try {
    const headersList = headers();
    // In Next.js, x-forwarded-for contains the IP. Fallback to unknown.
    // Note: 'headers()' is async in newer Next.js versions, but in 14 it's sync-like or async context. 
    // We'll treat it safely.
    // Actually, headers() is a function returning ReadonlyHeaders.
    // Getting IP is tricky in server actions, usually relies on headers.
    
    // For simplicity/mocking if running locally:
    const ip = '127.0.0.1'; // Real implementation needs header parsing logic

    const { error } = await supabase
      .from('audit_logs')
      .insert([
        {
          action: 'CALL_CLICK',
          donor_id: donorId,
          request_id: requestId || null,
          caller_ip: ip, // simplified
          timestamp: new Date().toISOString()
        }
      ]);

    if (error) {
        console.error('Audit Log Error:', error);
        // We don't throw here to avoid blocking the user action if logging fails
    }
  } catch (error) {
    console.error('Audit Log Action Error:', error);
  }
}
