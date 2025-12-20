'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, Droplet, MapPin, Phone, User } from 'lucide-react';

interface Request {
  id: string;
  patientName: string;
  bloodType: string;
  units: number;
  hospital: string;
  location: string;
  contactName: string | null;
  contactPhone: string;
  urgency: string;
  neededBy: string;
  notes: string | null;
  createdAt: string;
}

export function RequestsList({ requests }: { requests: Request[] }) {
  if (requests.length === 0) {
    return (
      <div className="bg-slate-50 border border-dashed border-slate-200 rounded-[2rem] p-12 text-center">
        <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-400 font-poppins">No Active Blood Requests</h3>
        <p className="text-slate-400 font-hind mt-2">বর্তমানে কোন রক্তের অনুরোধ নেই। প্রয়োজনে অনুরোধ করতে নিচের ফর্মটি ব্যবহার করুন।</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {requests.map((request, idx) => (
        <motion.div
          key={request.id}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.05 }}
          className="group relative bg-[#fdfdfd] p-6 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-rose-100/30 transition-all duration-300 flex flex-col"
        >
          {/* Urgency Badge */}
          <div className="absolute top-4 right-4">
             <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
               request.urgency === 'CRITICAL' ? 'bg-rose-100 text-rose-600' :
               request.urgency === 'URGENT' ? 'bg-amber-100 text-amber-600' :
               'bg-slate-100 text-slate-600'
             }`}>
               {request.urgency}
             </span>
          </div>

          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-slate-200">
              {request.bloodType.replace('_POSITIVE', '+').replace('_NEGATIVE', '-')}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 font-poppins text-lg leading-tight">
                {request.patientName}
              </h3>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Patient / রোগী</p>
            </div>
          </div>

          <div className="space-y-3 mb-6 flex-1">
            <div className="flex items-center gap-2 text-slate-600 text-sm font-hind">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span className="font-medium">{request.hospital}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 text-sm font-hind">
              <Calendar className="w-4 h-4 text-rose-500" />
              <span>Needed By: <span className="font-bold">{request.neededBy}</span></span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 text-sm font-hind">
              <Droplet className="w-4 h-4 text-rose-500" />
              <span>Units: <span className="font-bold">{request.units} Unit(s)</span></span>
            </div>
            {request.contactName && (
              <div className="flex items-center gap-2 text-slate-600 text-sm font-hind">
                <User className="w-4 h-4 text-rose-500" />
                <span>Contact: <span className="font-bold">{request.contactName}</span></span>
              </div>
            )}
          </div>

          <div className="pt-5 border-t border-slate-50">
            <a 
              href={`tel:${request.contactPhone}`}
              className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-rose-200 flex items-center justify-center gap-2 group/btn"
            >
              <Phone className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
              গরমলাইন / CALL NOW
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
