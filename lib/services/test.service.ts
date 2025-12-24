'use server';


import { revalidatePath } from 'next/cache';

import { createClient } from '@/lib/utils/supabase/server';

export async function verifyRequest(trackingId: string) {
    const supabase = await createClient();
    try {
        const { data: requests, error: fetchError } = await supabase
            .from('blood_requests')
            .select('*')
            .eq('tracking_id', trackingId);

        if (fetchError || !requests || requests.length === 0) {
             return { success: false, message: 'Invalid Tracking ID' };
        }

        const request = requests[0];

        // 2. Update status
        const { error: updateError } = await supabase
            .from('blood_requests')
            .update({ status: 'VERIFIED' })
            .eq('id', request.id);

        if (updateError) throw updateError;

        revalidatePath('/donors'); // Refresh the page to unlock search if user is there? 
        // Actually this is an admin action, so revalidating public page might be good.

        return { success: true, message: `Request ${trackingId} verified successfully` };

    } catch (error: any) {
        console.error('Verification Error:', error);
        return { success: false, message: error.message };
    }
}

export async function getAllRequests() {
    const supabase = await createClient();
    try {
        const { data, error } = await supabase
            .from('blood_requests')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        return { success: true, data };
    } catch (error: any) {
        console.error('Fetch Requests Error:', error);
        return { success: false, error: error.message };
    }
}
