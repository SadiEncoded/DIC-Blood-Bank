'use client';

import { Donor, DonorTier } from '@/app/lib/types';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Droplet, Medal } from 'lucide-react';
import { useState } from 'react';

const TIER_STYLE: Record<DonorTier, string> = {
  Platinum: 'bg-slate-50 text-slate-700 border-slate-200',
  Gold: 'bg-amber-50 text-amber-700 border-amber-100',
  Silver: 'bg-slate-50 text-slate-500 border-slate-100',
  Bronze: 'bg-orange-50 text-orange-700 border-orange-100',
};

interface DonorsTableProps {
  donors: Donor[];
}

const PAGE_SIZE = 10;

export function DonorsTable({ donors }: DonorsTableProps) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(donors.length / PAGE_SIZE);

  const paginatedDonors = donors.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="py-5 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-20">Rank</th>
              <th className="py-5 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Donor Name</th>
              <th className="py-5 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Blood Group</th>
              <th className="py-5 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Total Units</th>
              <th className="py-5 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Badge</th>
              <th className="py-5 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Last Donation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {paginatedDonors.map((donor, idx) => {
              const globalRank = (page - 1) * PAGE_SIZE + idx + 1;
              return (
                <motion.tr 
                  key={donor.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group hover:bg-rose-50/30 transition-colors"
                >
                  <td className="py-4 px-6 text-center">
                    <span className={`
                      inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold
                      ${globalRank <= 3 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}
                    `}>
                      {globalRank}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-bold text-slate-700 text-base">{donor.name}</p>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-rose-50 text-rose-600 font-bold text-sm">
                      <Droplet size={12} className="fill-current" />
                      {donor.blood}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="font-mono font-bold text-slate-900 text-lg">{donor.count}</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${TIER_STYLE[donor.tier]}`}>
                      <Medal size={12} />
                      {donor.tier}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <p className="text-sm font-medium text-slate-500">{donor.lastDonation}</p>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-6 border-t border-slate-100 bg-slate-50/50">
        <p className="text-sm text-slate-500 font-medium">
          Showing <span className="text-slate-900 font-bold">{(page - 1) * PAGE_SIZE + 1}</span> to <span className="text-slate-900 font-bold">{Math.min(page * PAGE_SIZE, donors.length)}</span> of <span className="text-slate-900 font-bold">{donors.length}</span> donors
        </p>
        
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:border-rose-200 hover:text-rose-600 hover:shadow-sm transition-all shadow-sm"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:border-rose-200 hover:text-rose-600 hover:shadow-sm transition-all shadow-sm"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
