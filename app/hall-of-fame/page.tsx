'use client';

import { motion } from 'framer-motion';
import { Award, Heart, ArrowUpRight, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { HallHero } from './components/HallHero';
import { STATS, DONORS, TONE, TIER_STYLE } from '@/app/lib/data/hall-of-fame';
import { useState } from 'react';

const PAGE_SIZE = 6;

export default function HallOfFame() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(DONORS.length / PAGE_SIZE);

  const paginatedDonors = DONORS.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <main className="bg-white pb-24 font-hind">
      <HallHero />

      <section className="max-w-6xl mx-auto px-6 mt-12">
        
        {/* Institutional Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-200 rounded-xl overflow-hidden mb-12 shadow-sm">
          {STATS.map((stat, i) => (
            <div 
              key={i} 
              className={`flex flex-col p-8 bg-white ${i !== STATS.length - 1 ? 'border-b md:border-b-0 md:border-r border-slate-100' : ''}`}
            >
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                {stat.label}
              </span>
              <div className={`text-3xl font-bold ${TONE[stat.tone as keyof typeof TONE]}`}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* The Donor Registry Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 w-20">Rank</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">Donor Name</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 hidden md:table-cell">Tier Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">Blood</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 text-right">Unit Count</th>
                  <th className="px-6 py-4 w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedDonors.map((donor, idx) => (
                  <tr key={donor.id} className="group hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-5">
                      <span className="text-sm font-medium text-slate-400 font-mono">
                        {String((page - 1) * PAGE_SIZE + idx + 1).padStart(2, '0')}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-rose-50 group-hover:text-rose-500 transition-colors">
                          <User size={14} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-800 tracking-tight">{donor.name}</div>
                          <div className="text-[10px] text-slate-400 font-medium">Joined {donor.year}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 hidden md:table-cell">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${TIER_STYLE[donor.tier as keyof typeof TIER_STYLE]}`}>
                        <Award size={10} />
                        {donor.tier}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                        {donor.blood}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 text-sm font-bold text-slate-800">
                        <span className="font-mono">{donor.count}</span>
                        <Heart size={12} className="text-rose-500 fill-rose-500 opacity-20" />
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <button className="text-slate-300 hover:text-rose-600 transition-colors">
                        <ArrowUpRight size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Institutional Footer Navigation */}
          <footer className="px-8 py-5 border-t border-slate-100 flex items-center justify-between bg-slate-50/20">
            <p className="text-[11px] font-medium text-slate-400 italic">
              * Data last updated: {new Date().toLocaleDateString('bn-BD')}
            </p>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrev}
                disabled={page === 1}
                className="p-2 border border-slate-200 rounded-md text-slate-500 hover:bg-white hover:text-rose-600 disabled:opacity-20 transition-all shadow-sm"
              >
                <ChevronLeft size={16} />
              </button>
              
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">
                Page {page} <span className="text-slate-300 mx-1">/</span> {totalPages}
              </span>

              <button
                onClick={handleNext}
                disabled={page === totalPages}
                className="p-2 border border-slate-200 rounded-md text-slate-500 hover:bg-white hover:text-rose-600 disabled:opacity-20 transition-all shadow-sm"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}
