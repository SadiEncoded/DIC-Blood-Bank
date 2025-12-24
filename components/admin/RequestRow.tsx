import { MapPin } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

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
  status: string;
}

interface RequestRowProps {
  req: BloodRequest;
  idx: number;
  isSelected: boolean;
  onClick: (req: BloodRequest) => void;
}

// Map urgency to status badge type
const getStatusType = (urgency: string, status: string) => {
  if (urgency === 'CRITICAL') return 'critical';
  if (status === 'FULFILLED') return 'completed';
  if (status === 'PENDING') return 'pending';
  return 'verified';
};

export function RequestRow({ req, idx, isSelected, onClick }: RequestRowProps) {
  const statusType = getStatusType(req.urgency, req.status);

  return (
    <tr
      className={`hover:bg-slate-50 transition-colors group cursor-pointer ${
        isSelected ? 'bg-slate-50' : ''
      }`}
      onClick={() => onClick(req)}
    >
      <td className="px-4 py-3.5 text-center text-[10px] font-bold text-slate-300">
        {idx + 1}
      </td>
      <td className="px-4 py-3.5 font-mono text-[10px] font-bold text-slate-400">
        {req.tracking_id}
      </td>
      <td className="px-4 py-3.5">
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-slate-900 uppercase">
            {req.patient_name}
          </span>
          <span className="text-[9px] text-slate-400 font-bold">
            Attn: {req.contact_name}
          </span>
        </div>
      </td>
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2 text-[10px] text-slate-600 font-bold uppercase">
          <MapPin size={10} className="text-slate-300" /> {req.hospital}
        </div>
      </td>
      <td className="px-4 py-3.5 text-center">
        <span className="inline-block px-2 py-1 bg-rose-600 text-white text-[10px] font-black rounded-sm min-w-[32px]">
          {req.blood_type}
        </span>
      </td>
      <td className="px-4 py-3.5 text-center text-[10px] font-black text-slate-700">
        {req.units} BAGS
      </td>
      <td className="px-4 py-3.5 text-[10px] text-slate-500 font-medium italic">
        {new Date(req.created_at).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </td>
      <td className="px-4 py-3.5 flex justify-end">
        <StatusBadge type={statusType as any} />
      </td>
    </tr>
  );
}
