// @/features/donors/hooks/useDonorMatching.ts
import { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { searchDonors } from '../services';
import type { Donor } from '../types';

export function useDonorMatching(trackingId?: string, bloodType?: string, location?: string) {
    const [donors, setDonors] = useState<Donor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const supabase = useMemo(() => createClient(), []);

    const fetchData = useCallback(async () => {
        if (!trackingId) return;
        setIsLoading(true);
        try {
            const results = await searchDonors({ trackingId, bloodType, location });
            setDonors(results);
        } catch (err) {
            setError(err as Error);
        } finally {
            setIsLoading(false);
        }
    }, [trackingId, bloodType, location]);

    useEffect(() => {
        fetchData();

        const channel = supabase
            .channel(`donor_sync_${trackingId}`)
            .on('postgres_changes', { 
                event: 'UPDATE', 
                schema: 'public', 
                table: 'profiles' 
            }, (payload) => {
                setDonors(prev => prev.map(d => d.id === payload.new.id ? { ...d, ...payload.new } : d));
            })
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, [fetchData, trackingId, supabase]);

    return { donors, isLoading, error, refetch: fetchData };
}
