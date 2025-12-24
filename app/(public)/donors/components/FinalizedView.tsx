'use client';

import { HeartHandshake, CheckCircle2, Shield } from 'lucide-react';
import { MatchedDonorCard } from './MatchedDonorCard';
import { motion } from 'framer-motion';

const MOCK_CONFIRMED_DONORS = [
  {
    id: 1,
    name: "Ahmed Shafir",
    initials: "AS",
    type: "Super Donor",
    donations: "12 Donations",
    bloodGroup: "O+",
    location: "Dhanmondi, Dhaka",
    lastDonation: "2 weeks ago"
  },
  {
    id: 2,
    name: "Rahim Uddin",
    initials: "RU",
    type: "Regular Donor",
    donations: "3 Donations",
    bloodGroup: "O+",
    location: "Mirpur 10, Dhaka",
    lastDonation: "4 months ago"
  },
  {
    id: 3,
    name: "Karim Hasan",
    initials: "KH",
    type: "Verified Donor",
    donations: "8 Donations",
    bloodGroup: "O+",
    location: "Uttara, Dhaka",
    lastDonation: "1 month ago"
  }
];

export function FinalizedView() {
  const donorCount = MOCK_CONFIRMED_DONORS.length;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
      {/* Refined Header */}
      <header className="flex flex-col items-center text-center mb-20">
        <div className="relative mb-8">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 shadow-sm"
          >
            <HeartHandshake size={40} strokeWidth={1.25} />
          </motion.div>
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="absolute -top-3 -right-3 bg-white p-1 rounded-full shadow-sm"
          >
            <CheckCircle2 size={28} className="text-emerald-500" fill="currentColor" fillOpacity={0.1} />
          </motion.div>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-medium text-slate-900 tracking-tight">
            Matching Confirmed
          </h1>
          <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">
            {donorCount > 1 
              ? `We've successfully coordinated with ${donorCount} verified donors who are ready to assist with your request.`
              : "A verified donor has reviewed and accepted your donation request."
            }
          </p>
        </div>
      </header>

      {/* Grid Layout */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        {/* Optical Anchor: A very faint background plate */}
        <div className="absolute inset-0 bg-slate-50/40 rounded-[2rem] -m-4 md:-m-10 pointer-events-none border border-slate-100/30" />
        
        <div className={`relative grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${
          donorCount === 1 ? 'max-w-sm mx-auto' : ''
        }`}>
          {MOCK_CONFIRMED_DONORS.map((donor, idx) => (
            <motion.div
              key={donor.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx + 0.3 }}
            >
              <MatchedDonorCard {...donor} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Trust Footer */}
      <footer className="mt-24 pt-8 border-t border-slate-100 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-slate-400">
          <Shield size={14} />
          <p className="text-[11px] font-semibold tracking-[0.1em] uppercase">
            BloodLink Protocol Verified
          </p>
        </div>
        <p className="text-xs text-slate-400 max-w-xs text-center leading-relaxed">
          All donors have been cross-referenced with medical eligibility records.
        </p>
      </footer>
    </div>
  );
}
