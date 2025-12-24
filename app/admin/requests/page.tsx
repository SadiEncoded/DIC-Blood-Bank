'use client';

import { RequestDetailDrawer } from '@/components/admin/RequestDetailDrawer';
import { RequestRow } from '@/components/admin/RequestRow';
import { StatCard } from '@/components/admin/StatCard';
import {
    exportRequestsData,
    getAdminStats,
    getBloodRequests,
    updateRequestStatus,
    type AdminStats,
} from '@/lib/services/admin.service';
import { AnimatePresence } from 'framer-motion';
import {
    Activity,
    ArrowUpDown,
    Clock,
    Download,
    HeartPulse,
    SearchIcon,
    ShieldAlert
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface BloodRequest {
  id: string;
  tracking_id: string;
  patient_name: string;
  blood_type: string;
  hospital: string;
  urgency: 'NORMAL' | 'URGENT' | 'CRITICAL';
  created_at: string;
  units: number;
  contact_name: string;
  contact_phone: string;
  location: string;
  needed_by: string;
  notes?: string;
  status: string;
}

export default function AdminRequestsPage() {
  const [selectedReq, setSelectedReq] = useState<BloodRequest | null>(null);
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    pendingRequests: 0,
    activeSearches: 0,
    criticalNeeds: 0,
    verifiedDonors: 0,
    totalDonors: 0,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Load data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [requestsResult, statsData] = await Promise.all([
      getBloodRequests(),
      getAdminStats(),
    ]);

    if (requestsResult.success) {
      setRequests(requestsResult.data as BloodRequest[]);
    }
    setStats(statsData);
    setLoading(false);
  };

  const handleApprove = async () => {
    if (!selectedReq) return;
    const result = await updateRequestStatus(selectedReq.id, 'FULFILLED');
    if (result.success) {
      toast.success('Request approved successfully');
      loadData();
      setSelectedReq(null);
    } else {
      toast.error(result.error || 'Failed to approve request');
    }
  };

  const handleReject = async () => {
    if (!selectedReq) return;
    const result = await updateRequestStatus(selectedReq.id, 'CANCELLED');
    if (result.success) {
      toast.success('Request rejected');
      loadData();
      setSelectedReq(null);
    } else {
      toast.error(result.error || 'Failed to reject request');
    }
  };

  const handleFlag = () => {
    toast.info('Flag feature coming soon');
  };

  const handleExport = async () => {
    const result = await exportRequestsData();
    if (result.success && result.csv) {
      const blob = new Blob([result.csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `blood-requests-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success('Data exported successfully');
    } else {
      toast.error('Failed to export data');
    }
  };

  const filteredRequests = requests.filter(
    (req) =>
      req.tracking_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.blood_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.hospital.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const bloodStockPercentage = stats.totalDonors > 0 
    ? Math.min(100, Math.round((stats.verifiedDonors / stats.totalDonors) * 100))
    : 0;

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 font-poppins">Medical Requisitions</h1>
        <p className="text-slate-500 mt-2 font-hind">Manage and fulfill live hospital blood requests.</p>
      </div>

      <div className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="Pending Requisitions"
            value={stats.pendingRequests}
            color="text-amber-600"
            icon={Clock}
          />
          <StatCard
            label="Active Match Search"
            value={stats.activeSearches}
            color="text-blue-600"
            icon={Activity}
          />
          <StatCard
            label="Critical Unmet Need"
            value={stats.criticalNeeds}
            color="text-rose-600"
            icon={ShieldAlert}
          />
          <StatCard
            label="Blood Stock Level"
            value={`${bloodStockPercentage}%`}
            color="text-emerald-600"
            icon={HeartPulse}
          />
        </div>

        {/* Request Table */}
        <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden flex flex-col min-h-[500px]">
          {/* Table Header */}
          <div className="px-4 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 bg-white">
            <div>
              <h2 className="text-xs font-black text-slate-800 uppercase tracking-widest">
                Medical Requisition Queue
              </h2>
              <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5 flex items-center gap-1">
                <Activity size={10} className="text-emerald-500" /> System live • Real-time
                patient needs
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative group">
                <SearchIcon
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={12}
                />
                <input
                  type="text"
                  placeholder="FILTER BY ID/BLOOD GROUP..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded text-[10px] font-bold tracking-wider outline-none w-64 focus:border-slate-400 transition-colors"
                />
              </div>
              <button
                onClick={handleExport}
                className="px-3 py-1.5 bg-slate-900 text-white rounded text-[10px] font-bold flex items-center gap-1.5 hover:bg-slate-800 transition-colors uppercase tracking-widest"
              >
                <Download size={12} /> Data Export
              </button>
            </div>
          </div>

          <div className="overflow-auto flex-1">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-slate-400 text-sm">Loading requests...</div>
              </div>
            ) : (
              <table className="w-full text-left border-collapse table-fixed min-w-[1000px]">
                <thead className="bg-slate-50 sticky top-0 z-10 border-b border-slate-200">
                  <tr className="text-[9px] font-black text-slate-500 uppercase tracking-[0.15em]">
                    <th className="px-4 py-3 w-10 text-center">#</th>
                    <th className="px-4 py-3 w-28">
                      Ref ID <ArrowUpDown size={10} className="inline ml-1" />
                    </th>
                    <th className="px-4 py-3">Patient Identification</th>
                    <th className="px-4 py-3">Facility Location</th>
                    <th className="px-4 py-3 w-24 text-center">Group</th>
                    <th className="px-4 py-3 w-24 text-center">Units</th>
                    <th className="px-4 py-3 w-40">Entry Timestamp</th>
                    <th className="px-4 py-3 w-32 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRequests.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-8 text-center text-slate-400 text-sm">
                        No requests found
                      </td>
                    </tr>
                  ) : (
                    filteredRequests.map((req, idx) => (
                      <RequestRow
                        key={req.id}
                        req={req}
                        idx={idx}
                        isSelected={selectedReq?.id === req.id}
                        onClick={(request: BloodRequest) => setSelectedReq(request)}
                      />
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Contextual Action Drawer */}
        <AnimatePresence>
          {selectedReq && (
            <RequestDetailDrawer
              request={selectedReq}
              onApprove={handleApprove}
              onReject={handleReject}
              onFlag={handleFlag}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
