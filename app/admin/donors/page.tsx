import { getDonorsPendingApproval } from '@/lib/services/admin.service';
import { Filter, Search, ShieldCheck } from 'lucide-react';
import DonorApprovalList from './components/DonorApprovalList';

export default async function AdminDonorsPage() {
  const result = await getDonorsPendingApproval();
  const pendingDonors = result.success ? result.data : [];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-poppins">Donor Verification</h1>
          <p className="text-slate-500 mt-2 font-hind">Review and verify new donor registrations to maintain data quality.</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="px-5 py-2.5 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-bold border border-emerald-100 flex items-center gap-2">
                <ShieldCheck size={18} /> {pendingDonors.length} Pending Approval
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search by name, email or phone..."
                    className="w-full pl-12 pr-6 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-rose-500/20 transition-all font-hind"
                />
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-slate-50 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-colors">
                    <Filter size={18} /> Filters
                </button>
            </div>
        </div>

        {/* List */}
        <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
            <div className="bg-slate-50/50 px-8 py-4 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pending Verification Queue</h3>
            </div>
            <DonorApprovalList donors={pendingDonors} />
        </div>
      </div>
    </div>
  );
}
