'use client';

import { Donor, DonorTier } from '@/app/lib/types';
import { motion } from 'framer-motion';
import { Droplet, Star, Trophy } from 'lucide-react';

const TIER_STYLE: Record<DonorTier, string> = {
  Platinum: 'bg-slate-50 text-slate-700 border-slate-200',
  Gold: 'bg-amber-50 text-amber-700 border-amber-100',
  Silver: 'bg-slate-50 text-slate-500 border-slate-100',
  Bronze: 'bg-orange-50 text-orange-700 border-orange-100',
};

interface LeaderboardProps {
  topDonors: Donor[];
}

export function HallOfFameLeaderboard({ topDonors }: LeaderboardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {topDonors.map((donor, idx) => (
        <motion.div
          key={donor.id}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1 }}
          className="relative bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
        >
          {/* Rank Badge */}
          <div className="absolute top-0 right-0 p-4">
            <span className={`
               flex items-center justify-center w-12 h-12 rounded-2xl text-xl font-bold
               ${idx === 0 ? 'bg-amber-100/50 text-amber-600' : 
                 idx === 1 ? 'bg-slate-100/50 text-slate-600' : 
                 'bg-orange-100/50 text-orange-600'}
            `}>
              #{idx + 1}
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className={`
              p-3 rounded-2xl 
              ${idx === 0 ? 'bg-amber-100 text-amber-600' : 
                 idx === 1 ? 'bg-slate-100 text-slate-600' : 
                 'bg-orange-100 text-orange-600'}
            `}>
              <Trophy size={24} className="fill-current" />
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-2 font-poppins">{donor.name}</h3>
          
          <div className="flex flex-wrap gap-2 mb-6">
             <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${TIER_STYLE[donor.tier]}`}>
                <Star size={10} className="fill-current" />
                {donor.tier}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-100 text-[10px] font-bold uppercase tracking-wider">
               <Droplet size={10} className="fill-current" />
               {donor.blood}
            </span>
          </div>

          <div className="flex items-end justify-between pt-4 border-t border-slate-50">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Donated</p>
              <p className="text-2xl font-bold text-slate-900 font-mono">{donor.count} <span className="text-sm font-medium text-slate-400">units</span></p>
            </div>
            
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Last</p>
              <p className="text-sm font-bold text-slate-600">{donor.lastDonation}</p>
            </div>
          </div>
          
          <div className={`absolute top-0 left-0 w-full h-1 ${
             idx === 0 ? 'bg-amber-400' : 
             idx === 1 ? 'bg-slate-400' : 
             'bg-orange-400'}
          `} />
        </motion.div>
      ))}
    </div>
  );
}
