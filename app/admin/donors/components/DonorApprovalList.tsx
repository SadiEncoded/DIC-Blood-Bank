'use client';

import { approveDonor } from '@/lib/services/admin.service';
import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function DonorApprovalList({ donors }: { donors: any[] }) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleApprove = async (id: string) => {
    setLoading(id);
    try {
      const res = await approveDonor(id);
      if (res.success) {
        toast.success('Donor verified successfully!');
      } else {
        toast.error(res.error || 'Failed to verify donor.');
      }
    } catch (err) {
      toast.error('An error occurred.');
    } finally {
      setLoading(null);
    }
  };

  if (donors.length === 0) {
    return (
        <div className="p-20 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="text-slate-200" size={32} />
            </div>
            <h3 className="font-bold text-slate-400 font-poppins">No Pending Approvals</h3>
            <p className="text-slate-400 text-sm font-hind mt-2">All donor profiles are currently verified.</p>
        </div>
    );
  }

  return (
    <div className="divide-y divide-slate-50">
      {donors.map((donor) => (
        <div key={donor.id} className="p-8 hover:bg-slate-50/50 transition-colors">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 font-bold border border-rose-100 flex-shrink-0">
                {donor.blood_type || '?'}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg font-poppins">{donor.full_name}</h4>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2">
                  <div className="flex items-center gap-2 text-sm text-slate-500 font-hind">
                    <Mail size={14} className="text-slate-400" />
                    {donor.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 font-hind">
                    <Phone size={14} className="text-slate-400" />
                    {donor.phone_number || 'No phone'}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 font-hind">
                    <MapPin size={14} className="text-slate-400" />
                    {donor.location || 'No location'}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => handleApprove(donor.id)}
                disabled={loading === donor.id}
                className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100 disabled:opacity-50 flex items-center gap-2"
              >
                {loading === donor.id ? 'Processing...' : (
                    <>
                        <ShieldCheck size={18} /> Verify Donor
                    </>
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
