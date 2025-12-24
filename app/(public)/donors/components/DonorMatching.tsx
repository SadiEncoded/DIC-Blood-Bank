'use client';

import { searchDonors } from '@/lib/services/donors.service';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, MapPin, Search, Users, Activity, ShieldCheck, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

// --- Types ---
interface Donor {
  id: string;
  name: string;
  bloodType: string;
  location: string;
  isAvailable: boolean;
}

interface DonorMatchingProps {
  trackingId?: string;
  bloodType?: string;
  location?: string;
}

// --- Main Component ---
export function DonorMatching({ trackingId, bloodType, location }: DonorMatchingProps) {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDonors() {
      if (!trackingId) return;
      try {
        setLoading(true);
        await new Promise(r => setTimeout(r, 2500)); // Deliberate "thinking" time
        const results = await searchDonors({ trackingId, bloodType, location });
        setDonors(results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDonors();
  }, [trackingId, bloodType, location]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 space-y-12">
      
      {/* 1. Header & Radar Section */}
      <section className="flex flex-col items-center text-center space-y-6">
        <div className="relative flex items-center justify-center w-40 h-40">
          <AnimatePresence>
            {loading && (
              <>
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-rose-200"
                  />
                ))}
              </>
            )}
          </AnimatePresence>
          
          <motion.div 
            layout
            className={`relative z-10 w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-700 ${
              loading ? 'bg-rose-500 rotate-0' : 'bg-slate-900 rotate-[360deg]'
            }`}
          >
            {loading ? (
              <Search className="w-8 h-8 text-white animate-pulse" />
            ) : (
              <Activity className="w-8 h-8 text-emerald-400" />
            )}
          </motion.div>
        </div>

        <div className="max-w-xl mx-auto space-y-2">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight"
          >
            {loading ? 'Matching your request...' : 'Matches identified.'}
          </motion.h3>
          <p className="text-slate-500 text-lg font-medium">
            {loading 
              ? 'Broadcasting to verified donors in your immediate vicinity.' 
              : `We found ${donors.length} donors ready to respond.`}
          </p>
        </div>
      </section>

      {/* 2. Status Bento Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <StatusPill icon={Users} label="Target Blood" value={bloodType || 'Any'} />
        <StatusPill icon={MapPin} label="Search Radius" value={location || 'Global'} />
        <StatusPill 
          icon={loading ? Loader2 : ShieldCheck} 
          label="Verification" 
          value={loading ? 'Scanning...' : 'Verified'} 
          active={!loading}
        />
      </div>

      {/* 3. Results Grid */}
      <div className="relative">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-slate-100 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div 
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {donors.map((donor) => (
              <DonorCard key={donor.id} donor={donor} />
            ))}
            
            {donors.length === 0 && <EmptyState />}
          </motion.div>
        )}
      </div>
    </div>
  );
}

// --- Sub-components ---

function StatusPill({ icon: Icon, label, value, active = false }: any) {
  return (
    <div className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center gap-4 hover:shadow-sm transition-shadow">
      <div className={`p-2 rounded-xl ${active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
        <Icon size={20} className={active ? '' : 'animate-spin-slow'} />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400">{label}</p>
        <p className="text-sm font-bold text-slate-700">{value}</p>
      </div>
    </div>
  );
}

function DonorCard({ donor }: { donor: Donor }) {
  return (
    <motion.div 
      variants={{ hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } }}
      whileHover={{ y: -4 }}
      className="group relative bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between transition-all"
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-xl shadow-slate-200 group-hover:bg-rose-600 transition-colors">
          {donor.bloodType}
        </div>
        <div>
          <h4 className="font-bold text-slate-900 text-lg tracking-tight">{donor.name}</h4>
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1 text-xs font-medium text-slate-400">
              <MapPin size={12} /> {donor.location}
            </span>
            <span className={`w-1.5 h-1.5 rounded-full ${donor.isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
          </div>
        </div>
      </div>
      <button className="p-3 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-slate-900 group-hover:text-white transition-all">
        <ArrowRight size={20} />
      </button>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <div className="col-span-full py-16 text-center bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
      <p className="text-slate-400 font-medium">
        No immediate matches. <br />
        <span className="text-sm">We are expanding the search radius to 50km...</span>
      </p>
    </div>
  );
}
