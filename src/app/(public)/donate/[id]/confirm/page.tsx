'use client';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/Container';
import { getBloodRequestByTrackingIdAction } from '@/features/blood-requests/actions';
import { DonationVerificationWizard } from '@/features/blood-requests/components';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DonationConfirmPage() {
    const { id: trackingId } = useParams();
    const router = useRouter();
    const [request, setRequest] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRequest() {
            if (!trackingId) return;
            
            try {
                const result = await getBloodRequestByTrackingIdAction(trackingId as string);
                if (result.success) {
                    setRequest(result.data);
                } else {
                    console.error('Request fetch failed:', result.error);
                }
            } catch (err) {
                console.error('Error fetching request:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchRequest();
    }, [trackingId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
            </div>
        );
    }

    if (!request) {
        return (
            <Container className="min-h-screen flex flex-col items-center justify-center text-center px-6">
                <h1 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">Request Not Found</h1>
                <p className="text-slate-500 mb-8 max-w-sm">The blood request you are looking for doesn't exist or has been completed.</p>
                <Button onClick={() => router.push('/donate')}>
                    Back to Donate
                </Button>
            </Container>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 py-12 lg:py-24">
            <Container>
                <div className="max-w-2xl mx-auto">
                    <button 
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors mb-8 group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest font-anek">Cancel and Go Back</span>
                    </button>

                    <DonationVerificationWizard request={request} />
                </div>
            </Container>
        </main>
    );
}
