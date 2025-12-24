import { motion } from 'framer-motion';

interface BloodRequest {
  id: string;
  tracking_id: string;
  patient_name: string;
  blood_type: string;
  hospital: string;
  urgency: string;
  created_at: string;
  units: number;
  contact_name: string;
  contact_phone: string;
  location: string;
  needed_by: string;
  notes?: string;
}

interface RequestDetailDrawerProps {
  request: BloodRequest;
  onApprove: () => void;
  onReject: () => void;
  onFlag: () => void;
}

export function RequestDetailDrawer({
  request,
  onApprove,
  onReject,
  onFlag,
}: RequestDetailDrawerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white border border-slate-200 rounded p-5 flex flex-col md:flex-row gap-8"
    >
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 text-white rounded flex items-center justify-center font-black text-sm">
              {request.blood_type}
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                {request.patient_name} — Requisition Form
              </h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase">
                ID: {request.tracking_id} • Contact: {request.contact_name}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onFlag}
              className="px-4 py-1.5 border border-slate-200 rounded text-[10px] font-bold text-slate-600 hover:bg-slate-50 uppercase tracking-widest transition-colors"
            >
              Mark Flagged
            </button>
            <button
              onClick={onReject}
              className="px-4 py-1.5 border border-rose-200 rounded text-[10px] font-bold text-rose-600 hover:bg-rose-50 uppercase tracking-widest transition-colors"
            >
              Reject
            </button>
            <button
              onClick={onApprove}
              className="px-4 py-1.5 bg-emerald-600 text-white rounded text-[10px] font-bold hover:bg-emerald-700 shadow-sm uppercase tracking-widest transition-colors"
            >
              Approve & Match
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { l: 'Facility', v: request.hospital },
            { l: 'Location', v: request.location },
            { l: 'Req. Units', v: `${request.units} Bag(s)` },
            { l: 'Urgency Level', v: request.urgency },
            { l: 'Needed By', v: new Date(request.needed_by).toLocaleDateString() },
            { l: 'Contact Phone', v: request.contact_phone },
            { l: 'Submission', v: new Date(request.created_at).toLocaleString() },
            { l: 'Blood Type', v: request.blood_type },
          ].map((item, i) => (
            <div key={i}>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                {item.l}
              </p>
              <p className="text-[10px] font-bold text-slate-800 uppercase">
                {item.v}
              </p>
            </div>
          ))}
        </div>

        {request.notes && (
          <div className="pt-4 border-t border-slate-100">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              Additional Notes
            </p>
            <p className="text-sm text-slate-600 italic">{request.notes}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
