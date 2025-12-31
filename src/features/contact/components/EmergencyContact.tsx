'use client'

import { CONTACT_INFO } from '@/assets/data/contact';

export default function EmergencyContact() {
  return (
    <div className="space-y-4 px-2">
      <div className="flex items-center gap-2 border-l-2 border-red-500 pl-4">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">
          Emergency Desk
        </span>
      </div>
      
      <div className="space-y-5 pl-4">
        {CONTACT_INFO.phones.emergency.map((admin) => (
          <div key={admin.phone} className="group flex flex-col">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter transition-colors group-hover:text-red-500">
              {admin.name}
            </span>
            <a 
              href={`tel:${admin.phone}`} 
              className="text-sm font-medium text-slate-600 transition-all hover:tracking-wide hover:text-slate-900"
            >
              {admin.phone}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
