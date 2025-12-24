'use client';

import { 
  Calendar, 
  Droplet, 
  MapPin, 
  MessageSquare, 
  Phone, 
  ShieldCheck, 
  ArrowUpRight 
} from 'lucide-react';

interface MatchedDonorCardProps {
  name: string;
  initials: string;
  type: string;
  donations: string;
  bloodGroup?: string;
  location?: string;
  lastDonation?: string;
  onCall?: () => void;
  onMessage?: () => void;
}

export function MatchedDonorCard({ 
  name, 
  initials, 
  type, 
  donations, 
  bloodGroup = "O+", 
  location = "Dhaka, BD",
  lastDonation = "2 months ago", 
  onCall, 
  onMessage 
}: MatchedDonorCardProps) {
  return (
    <div className="group w-full max-w-sm bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-all duration-300">
      
      {/* Top Section: Essential Info */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 font-medium text-sm">
              {initials}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                {name}
                <ShieldCheck size={14} className="text-blue-500" />
              </h4>
              <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                {type} • {donations}
              </p>
            </div>
          </div>
          <div className="px-2 py-0.5 rounded bg-rose-50 border border-rose-100">
             <span className="text-[10px] font-bold text-rose-600 tracking-tight">{bloodGroup}</span>
          </div>
        </div>

        {/* Info Rows: Subtle and Scannable */}
        <div className="space-y-2.5 mb-5">
          <div className="flex items-center gap-2.5 text-slate-600">
            <MapPin size={14} className="text-slate-400" />
            <span className="text-xs truncate">{location}</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-600">
            <Calendar size={14} className="text-slate-400" />
            <span className="text-xs">Last donated: {lastDonation}</span>
          </div>
        </div>

        {/* Action Buttons: Clean & Functional */}
        <div className="flex gap-2">
          <button 
            onClick={onCall}
            className="flex-1 h-9 bg-slate-900 hover:bg-black text-white rounded-lg flex items-center justify-center gap-2 transition-colors active:scale-95"
          >
            <Phone size={14} />
            <span className="text-xs font-medium">Call</span>
          </button>
          
          <button 
            onClick={onMessage}
            className="px-3 h-9 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg flex items-center justify-center transition-all active:scale-95"
          >
            <MessageSquare size={14} />
          </button>
          
          <button 
            className="px-3 h-9 bg-white border border-slate-200 hover:bg-slate-50 text-slate-400 rounded-lg flex items-center justify-center transition-all group-hover:text-slate-600"
          >
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* Footer Decoration: Subtle progress/status line */}
      <div className="h-1 w-full bg-slate-50">
        <div className="h-full bg-blue-500 w-1/3 opacity-40 group-hover:w-full transition-all duration-700" />
      </div>
    </div>
  );
}
