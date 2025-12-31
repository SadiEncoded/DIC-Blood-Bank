import { AdminReportsTable } from '@/features/reports/components/AdminReportsTable';
import { getReports } from '@/features/reports/services/actions';
import { AlertCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminReportsPage() {
  const result = await getReports();

  if (!result.success || !result.data) {
    return (
        <div className="p-12 text-center">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Failed to load reports</h2>
            <p className="text-slate-500 mt-2">{result.error || 'Unknown error occurred'}</p>
        </div>
    );
  }

  return (
    <div className="container py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-3xl font-black text-slate-900 font-anek">Report Management</h1>
            <p className="text-slate-500 font-medium mt-1">Review and manage user reports and flags.</p>
        </div>
      </div>
      <AdminReportsTable initialReports={result.data} />
    </div>
  );
}
