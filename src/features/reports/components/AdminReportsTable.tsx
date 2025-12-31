'use client';

import { updateReportStatus } from '@/features/reports/services/actions';
import { Check, Clock, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Report {
  id: string;
  created_at: string;
  reason: string;
  details: string;
  status: 'PENDING' | 'RESOLVED' | 'DISMISSED';
  reporter: { full_name: string } | null;
  target: { full_name: string } | null;
}

interface AdminReportsTableProps {
  initialReports: Report[];
}

export function AdminReportsTable({ initialReports }: AdminReportsTableProps) {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleStatusUpdate = async (id: string, newStatus: 'RESOLVED' | 'DISMISSED') => {
    setProcessingId(id);
    try {
      const result = await updateReportStatus(id, newStatus);
      if (result.success) {
        setReports(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
        toast.success(`Report marked as ${newStatus.toLowerCase()}`);
      } else {
        toast.error('Failed to update report status');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold flex items-center gap-1"><Clock size={12} /> Pending</span>;
      case 'RESOLVED':
        return <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold flex items-center gap-1"><Check size={12} /> Resolved</span>;
      case 'DISMISSED':
        return <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold flex items-center gap-1"><X size={12} /> Dismissed</span>;
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Reporter</th>
              <th className="px-6 py-4">Reported User</th>
              <th className="px-6 py-4">Reason</th>
              <th className="px-6 py-4">Details</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reports.length === 0 ? (
                <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400 font-medium">
                        No reports found.
                    </td>
                </tr>
            ) : (
                reports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">{getStatusBadge(report.status)}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{report.reporter?.full_name || 'Unknown'}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{report.target?.full_name || 'Unknown'}</td>
                    <td className="px-6 py-4">
                        <span className="font-medium text-rose-600">{report.reason}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 max-w-xs truncate" title={report.details}>
                        {report.details || '-'}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                        {new Date(report.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                        {report.status === 'PENDING' && (
                            <div className="flex justify-end gap-2">
                            <button
                                onClick={() => handleStatusUpdate(report.id, 'RESOLVED')}
                                disabled={!!processingId}
                                className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors disabled:opacity-50"
                                title="Resolve Report"
                            >
                                <Check size={16} />
                            </button>
                            <button
                                onClick={() => handleStatusUpdate(report.id, 'DISMISSED')}
                                disabled={!!processingId}
                                className="p-2 bg-slate-100 text-slate-500 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50"
                                title="Dismiss Report"
                            >
                                <X size={16} />
                            </button>
                            </div>
                        )}
                    </td>
                </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
