'use client';

import { searchDonors } from '@/app/lib/actions/donors';
import { BLOOD_TYPES } from '@/app/lib/config';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Droplet, Loader2, MapPin, Phone, Search, Users } from 'lucide-react';
import { useState } from 'react';

export default function DonorSearch() {
  const [bloodType, setBloodType] = useState('');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    const donors = await searchDonors({ bloodType, location });
    setResults(donors);
    setIsSearching(false);
    setHasSearched(true);
  };

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative group">
          <Droplet className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-rose-500 transition-colors" />
          <select
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-rose-500 focus:ring-4 focus:ring-rose-50/50 transition-all outline-none text-sm font-bold appearance-none cursor-pointer"
          >
            <option value="">সকল রক্ত (All Types)</option>
            {BLOOD_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>

        <div className="flex-[2] relative group">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-rose-500 transition-colors" />
          <input
            type="text"
            placeholder="ঠিকানা লিখুন (Ex: Chandpur, Dhaka...)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-rose-500 focus:ring-4 focus:ring-rose-50/50 transition-all outline-none text-sm font-hind"
          />
        </div>

        <button
          type="submit"
          disabled={isSearching}
          className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-rose-600 transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-sm tracking-widest uppercase shadow-lg shadow-slate-200"
        >
          {isSearching ? <Loader2 className="animate-spin h-5 w-5" /> : <Search size={20} />}
          {isSearching ? "Searching..." : "খুঁজুন / Search"}
        </button>
      </form>

      {/* Results View */}
      <div className="relative min-h-[200px]">
        <AnimatePresence mode="wait">
          {!hasSearched ? (
            <motion.div 
              key="intro"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 text-center text-slate-400"
            >
              <Users className="w-16 h-16 mb-4 opacity-20" />
              <p className="font-hind">আপনার প্রয়োজনীয় রক্ত এবং ঠিকানা অনুযায়ী দাতা খুঁজুন।</p>
            </motion.div>
          ) : isSearching ? (
             <motion.div 
               key="searching"
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="flex flex-col items-center justify-center py-12 text-center"
             >
               <Loader2 className="w-12 h-12 mb-4 text-rose-500 animate-spin" />
               <p className="font-hind text-slate-500">ডাটাবেস চেক করা হচ্ছে...</p>
             </motion.div>
          ) : results.length > 0 ? (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {results.map((donor, idx) => (
                <motion.div
                  key={donor.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-md hover:shadow-xl transition-all group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-slate-200">
                      {donor.bloodType}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 font-poppins flex items-center gap-2">
                        {donor.name}
                        {donor.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-rose-500" />}
                      </h3>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{donor.location}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                     <div className="flex justify-between text-xs font-hind text-slate-500">
                        <span>Total Donations:</span>
                        <span className="font-bold text-slate-900">{donor.donationCount} Times</span>
                     </div>
                     <div className="flex justify-between text-xs font-hind text-slate-500">
                        <span>Last Donation:</span>
                        <span className="font-bold text-slate-900">{donor.lastDonation}</span>
                     </div>
                  </div>

                  <a 
                    href={`tel:${donor.phone}`}
                    className="w-full py-3 bg-slate-50 group-hover:bg-rose-600 group-hover:text-white rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    যোগাযোগ করুন / CONTACT
                  </a>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="no-results"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center text-slate-400"
            >
              <Search className="w-16 h-16 mb-4 opacity-20" />
              <p className="font-hind">দুঃখিত, কোনো দাতা খুঁজে পাওয়া যায়নি।</p>
              <button onClick={() => setHasSearched(false)} className="mt-4 text-rose-600 text-sm font-bold hover:underline">রিসেট করুন</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
