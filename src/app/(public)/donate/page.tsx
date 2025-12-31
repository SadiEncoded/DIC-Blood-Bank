import BloodRequestList from '@/features/blood-requests/components/BloodRequestList';
import DonateHero from '@/features/blood-requests/components/DonateHero';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Donate Blood | DIC Blood Bank',
  description: 'View active blood requests and save lives in your community.',
};

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-slate-50/30 selection:bg-rose-500/10 selection:text-rose-600">
      <DonateHero />
      <BloodRequestList />
    </div>
  );
}
