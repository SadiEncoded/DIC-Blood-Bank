'use client';

import { Container } from '@/components/ui';
import { BLOOD_TYPES } from '@/config';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowRight, Calendar, Clock, Filter, Loader2, MapPin, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { listBloodRequestsAction } from '../actions';
import RequestDetailsModal from './RequestDetailsModal';

export default function BloodRequestList() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal State
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filters
  const [bloodType, setBloodType] = useState('');
  const [urgency, setUrgency] = useState('');
  const [location, setLocation] = useState('');

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const result = await listBloodRequestsAction({
        status: 'PENDING',
        blood_type: bloodType || undefined,
        urgency: urgency || undefined,
        location: location || undefined,
      });

      if (result.success) {
        setRequests(result.data as any[]);
      } else {
        setError(result.error?.message || 'Failed to fetch requests');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [bloodType, urgency, location]);

  const handleViewDetails = (request: any) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container className="pb-24">
      {/* Search & Filter Bar */}
      <div className="relative z-30 -mt-6 sm:-mt-10 md:-mt-12 mb-8 sm:mb-10">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 p-4 sm:p-5 md:p-6">
          {/* Mobile: Horizontal Scrollable Pills */}
          <div className="flex sm:hidden gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
            {/* Blood Type Filter */}
            <div className="relative shrink-0">
              <select
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                className="h-12 pl-4 pr-10 bg-slate-50 border-none rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-rose-500 transition-all appearance-none cursor-pointer min-w-[120px] shadow-sm"
              >
                <option value="">All Types</option>
                {BLOOD_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <Filter size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            {/* Urgency Filter */}
            <div className="relative shrink-0">
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="h-12 pl-4 pr-10 bg-slate-50 border-none rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-rose-500 transition-all appearance-none cursor-pointer min-w-[130px] shadow-sm"
              >
                <option value="">Urgency</option>
                <option value="NORMAL">Normal</option>
                <option value="URGENT">Urgent</option>
                <option value="CRITICAL">Critical</option>
              </select>
              <AlertCircle size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            {/* Location Search */}
            <div className="relative flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-12 pl-10 pr-4 bg-slate-50 border-none rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-rose-500 transition-all outline-none placeholder:text-slate-400 shadow-sm"
              />
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden sm:grid grid-cols-2 md:grid-cols-12 gap-4">
            {/* Blood Type Filter */}
            <div className="md:col-span-3 relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors pointer-events-none">
                <Filter size={18} />
              </div>
              <select
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-slate-50 border-none rounded-2xl text-base font-bold text-slate-700 focus:ring-2 focus:ring-rose-500 transition-all appearance-none cursor-pointer"
              >
                <option value="">All Types</option>
                {BLOOD_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Urgency Filter */}
            <div className="md:col-span-3 relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors pointer-events-none">
                <AlertCircle size={18} />
              </div>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-slate-50 border-none rounded-2xl text-base font-bold text-slate-700 focus:ring-2 focus:ring-rose-500 transition-all appearance-none cursor-pointer"
              >
                <option value="">any Urgency</option>
                <option value="NORMAL">Normal</option>
                <option value="URGENT">Urgent</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>

            {/* Location Search */}
            <div className="col-span-2 md:col-span-6 relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors pointer-events-none">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search by city or area..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-slate-50 border-none rounded-2xl text-base font-bold text-slate-700 focus:ring-2 focus:ring-rose-500 transition-all outline-none placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 text-slate-400">
            <Loader2 size={48} className="animate-spin mb-6 text-rose-500" />
            <p className="text-sm font-black uppercase tracking-widest text-slate-500">Scanning Registry...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-40 text-center px-6">
            <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-500 mb-6 shadow-sm">
              <AlertCircle size={40} />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2 font-anek uppercase tracking-tight">Lookup Failed</h3>
            <p className="text-slate-500 text-base max-w-xs">{error}</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 text-center px-6">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 mb-6 shadow-sm">
              <Search size={40} />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2 font-anek uppercase tracking-tight">No Active Requests</h3>
            <p className="text-slate-500 text-base max-w-xs leading-relaxed">Try adjusting your filters to see more results.</p>
          </div>
        ) : (
          <div className="w-full">
            {/* Mobile View */}
            <div className="block sm:hidden divide-y divide-slate-100">
              {requests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-5 active:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => handleViewDetails(request)}
                >
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center border border-rose-100 shrink-0 shadow-sm">
                      <span className="text-rose-600 font-black text-sm">{request.blood_type}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <p className="text-slate-900 font-bold text-sm truncate uppercase font-anek tracking-tight">
                          {request.patient_name}
                        </p>
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border shrink-0 
                          ${request.urgency === 'CRITICAL' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                            request.urgency === 'URGENT' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                            'bg-blue-50 text-blue-600 border-blue-100'}`}
                        >
                          {request.urgency}
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs font-semibold flex items-center gap-1.5 mb-3">
                        <MapPin size={12} className="text-slate-400" /> {request.hospital}
                      </p>
                      <div className="flex items-center justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest pt-3 border-t border-slate-50 dashed">
                        <span className="flex items-center gap-1.5 text-slate-500"><Calendar size={12} className="text-slate-400" /> Needed {format(new Date(request.needed_by), 'MMM dd')}</span>
                        <span className="text-rose-600 flex items-center gap-1 bg-rose-50 px-2 py-0.5 rounded-md">View <ArrowRight size={10} /></span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop View (Standard Table) */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Patient & Type</th>
                    <th className="px-6 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] hidden md:table-cell">Institution</th>
                    <th className="px-6 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] hidden lg:table-cell">Urgency</th>
                    <th className="px-6 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Need By</th>
                    <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <AnimatePresence mode="popLayout">
                    {requests.map((request, index) => (
                      <motion.tr 
                        key={request.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: index * 0.05 }}
                        className="group hover:bg-slate-50/50 transition-colors cursor-pointer"
                        onClick={() => handleViewDetails(request)}
                      >
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center border border-rose-100 group-hover:bg-rose-600 transition-colors shrink-0 shadow-sm">
                              <span className="text-rose-600 font-bold text-base leading-none group-hover:text-white">{request.blood_type}</span>
                            </div>
                            <div className="min-w-0">
                              <p className="text-slate-900 font-black text-sm uppercase tracking-tight font-anek truncate mb-1">
                                {request.patient_name}
                              </p>
                              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                                <Clock size={12} /> {request.tracking_id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 hidden md:table-cell">
                          <div className="max-w-[200px]">
                             <p className="text-slate-700 text-xs font-black truncate mb-1">{request.hospital}</p>
                             <p className="text-slate-400 text-[10px] font-medium flex items-center gap-1">
                               <MapPin size={12} /> {request.location}
                             </p>
                          </div>
                        </td>
                        <td className="px-6 py-5 hidden lg:table-cell">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border 
                            ${request.urgency === 'CRITICAL' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                              request.urgency === 'URGENT' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                              'bg-blue-50 text-blue-600 border-blue-100'}`}
                          >
                            {request.urgency}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-slate-500">
                            <Calendar size={14} className="text-slate-400" />
                            <span className="text-xs font-black">{format(new Date(request.needed_by), 'MMM dd')}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <button 
                            className="inline-flex items-center gap-2 h-11 px-5 bg-white border border-slate-200 hover:border-rose-200 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-sm"
                          >
                            View Details
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <RequestDetailsModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        request={selectedRequest}
      />
    </Container>
  );
}
