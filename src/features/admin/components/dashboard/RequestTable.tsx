'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Phone,
  Search,
  Trash2
} from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { ActionGroup } from './ActionGroup';
import { StatusBadge } from './StatusBadge';
import { UrgencyBadge } from './UrgencyBadge';

interface RequestTableProps {
    data: any[];
    activeTab: string;
    processingIds: Set<string>;
    expandedRows: Set<string>;
    setExpandedRows: React.Dispatch<React.SetStateAction<Set<string>>>;
    handleToggleStatus: (item: any) => Promise<void>;
    handleEdit: (item: any) => void;
    handleDelete: (id: string) => Promise<void>;
    handleUpdateDonorStatus: (id: string, status: boolean) => Promise<void>;
    handleUpdateRequestStatus: (id: string, status: string) => Promise<void>;
    setActiveTab: (tab: string) => void;
    setSearchQuery: (query: string) => void;
}

export const RequestTable = ({
    data,
    activeTab,
    processingIds,
    expandedRows,
    setExpandedRows,
    handleToggleStatus,
    handleEdit,
    handleDelete,
    handleUpdateDonorStatus,
    handleUpdateRequestStatus,
    setActiveTab,
    setSearchQuery
}: RequestTableProps) => {
    return (
        <div className="w-full">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-200 dark:border-zinc-800">
                            <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider w-10"></th>
                            <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Urgency</th>
                            <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Patient</th>
                            <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Blood</th>
                            <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Hospital</th>
                            <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                        <AnimatePresence mode="popLayout">
                            {data.map((item: any) => {
                                const isExpanded = expandedRows.has(item.id);
                                return (
                                    <React.Fragment key={item.id}>
                                        <motion.tr 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors group cursor-pointer ${item.urgency?.toUpperCase() === 'CRITICAL' && item.status === 'PENDING' ? 'bg-rose-50/30 dark:bg-rose-900/10' : ''}`}
                                            onClick={() => setExpandedRows(prev => {
                                                const next = new Set(prev);
                                                if (next.has(item.id)) next.delete(item.id);
                                                else next.add(item.id);
                                                return next;
                                            })}
                                        >
                                            <td className="px-6 py-4">
                                                {isExpanded ? <ChevronUp size={16} className="text-zinc-400" /> : <ChevronDown size={16} className="text-zinc-400" />}
                                            </td>
                                            <td className="px-6 py-4"><UrgencyBadge level={item.urgency} /></td>
                                            <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100 text-sm">{item.patient_name}</td>
                                            <td className="px-6 py-4 text-zinc-500 text-sm font-bold">{item.blood_type}</td>
                                            <td className="px-6 py-4 text-zinc-500 text-sm truncate max-w-[150px]">{item.hospital}</td>
                                            <td className="px-6 py-4"><StatusBadge type="request" value={item.status} /></td>
                                            <td className="px-6 py-4 text-right whitespace-nowrap">
                                                <ActionGroup 
                                                    activeTab={activeTab}
                                                    item={item}
                                                    isProcessing={processingIds.has(item.id)}
                                                    onToggle={handleToggleStatus}
                                                    onEdit={handleEdit}
                                                    onDelete={handleDelete}
                                                    onUpdateDonor={handleUpdateDonorStatus}
                                                    onUpdateStatus={handleUpdateRequestStatus}
                                                />
                                            </td>
                                        </motion.tr>
                                        {isExpanded && (
                                            <motion.tr 
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="bg-zinc-50/50 dark:bg-zinc-900/20"
                                            >
                                                <td colSpan={7} className="px-8 py-6 border-b border-zinc-100 dark:border-zinc-800/50">
                                                    <div className="grid grid-cols-3 gap-8">
                                                        <div className="space-y-4">
                                                            <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Medical Info</h4>
                                                            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-sm">
                                                                <div>
                                                                    <p className="text-[10px] text-zinc-400 font-bold uppercase">Units Needed</p>
                                                                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{item.units || 1} Bag(s)</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[10px] text-zinc-400 font-bold uppercase">Reason</p>
                                                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.reason || 'Not specified'}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[10px] text-zinc-400 font-bold uppercase">Required By</p>
                                                                    <p className="text-sm font-semibold text-rose-600">{item.needed_by ? new Date(item.needed_by).toLocaleDateString() : 'ASAP'}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-4">
                                                            <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Contact Person</h4>
                                                            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-sm">
                                                                <div>
                                                                    <p className="text-[10px] text-zinc-400 font-bold uppercase">Name</p>
                                                                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{item.contact_name}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[10px] text-zinc-400 font-bold uppercase">Phone</p>
                                                                    <a href={`tel:${item.contact_phone}`} className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-2">
                                                                        <Phone size={14} /> {item.contact_phone}
                                                                    </a>
                                                                </div>
                                                                <div className="pt-2 flex gap-2">
                                                                    <button 
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            navigator.clipboard.writeText(`Blood Request: ${item.blood_type}\nPatient: ${item.patient_name}\nHospital: ${item.hospital}\nContact: ${item.contact_phone}`);
                                                                            toast.success("Details copied to clipboard");
                                                                        }}
                                                                        className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-lg text-xs font-bold hover:bg-zinc-200"
                                                                    >
                                                                        <Copy size={12} /> Copy Intel
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-4">
                                                            <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Tactical Actions</h4>
                                                            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col gap-2 shadow-sm">
                                                                <button 
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setActiveTab('donors');
                                                                        setSearchQuery(`${item.blood_type} ${item.location || ''}`);
                                                                    }}
                                                                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-600 text-white rounded-lg text-xs font-black uppercase tracking-wider hover:bg-rose-700 active:scale-95 transition-all shadow-lg shadow-rose-200 dark:shadow-none"
                                                                >
                                                                    <Search size={14} /> Quick Match Donors
                                                                </button>
                                                                
                                                                 <div className="grid grid-cols-2 gap-2 mt-2">
                                                                    {item.status === 'PENDING' && (
                                                                        <button 
                                                                            onClick={(e) => { e.stopPropagation(); handleUpdateRequestStatus(item.id, 'APPROVED'); }}
                                                                            className="px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30 rounded-lg text-xs font-bold hover:bg-blue-100"
                                                                        >
                                                                            Approve Case
                                                                        </button>
                                                                    )}
                                                                    <button 
                                                                        onClick={(e) => { e.stopPropagation(); handleUpdateRequestStatus(item.id, 'FULFILLED'); }}
                                                                        className="px-3 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 rounded-lg text-xs font-bold hover:bg-emerald-100"
                                                                    >
                                                                        Fulfill Case
                                                                    </button>
                                                                    <button 
                                                                        onClick={(e) => { e.stopPropagation(); handleUpdateRequestStatus(item.id, 'CANCELLED'); }}
                                                                        className={`px-3 py-2 bg-zinc-50 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400 border border-zinc-100 dark:border-zinc-800/50 rounded-lg text-xs font-bold hover:bg-zinc-100 ${item.status === 'PENDING' ? 'col-span-2' : ''}`}
                                                                    >
                                                                        Cancel Case
                                                                    </button>
                                                                </div>
                                                                
                                                                <button 
                                                                    onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                                                                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30 rounded-lg text-xs font-bold hover:bg-rose-100 hover:text-rose-800 transition-colors mt-2"
                                                                >
                                                                    <Trash2 size={12} /> Delete Case
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            {/* Mobile Card Layout */}
            <div className="md:hidden divide-y divide-zinc-100 dark:divide-zinc-800/50">
                <AnimatePresence mode="popLayout">
                    {data.map((item: any) => {
                        const isExpanded = expandedRows.has(item.id);
                        return (
                            <motion.div 
                                key={item.id} 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-5 mb-2 rounded-[20px] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm ${item.urgency?.toUpperCase() === 'CRITICAL' && item.status === 'PENDING' ? 'ring-2 ring-rose-500/20 bg-rose-50/10' : ''}`}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div 
                                        className="space-y-1.5 flex-1 cursor-pointer"
                                        onClick={() => setExpandedRows(prev => {
                                            const next = new Set(prev);
                                            if (next.has(item.id)) next.delete(item.id);
                                            else next.add(item.id);
                                            return next;
                                        })}
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <UrgencyBadge level={item.urgency} />
                                            <span className="text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-500/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                                {item.blood_type}
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-base leading-tight">{item.patient_name}</h4>
                                        <p className="text-sm text-zinc-500 font-medium truncate max-w-[220px]">{item.hospital}</p>
                                        
                                        <div className="flex items-center gap-2 pt-1">
                                            <StatusBadge type="request" value={item.status} />
                                            <span className="text-xs text-zinc-400 font-medium bg-zinc-50 px-2 py-1 rounded-full">
                                                {item.needed_by ? new Date(item.needed_by).toLocaleDateString() : 'ASAP'}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <button 
                                        onClick={() => setExpandedRows(prev => {
                                            const next = new Set(prev);
                                            if (next.has(item.id)) next.delete(item.id);
                                            else next.add(item.id);
                                            return next;
                                        })}
                                        className="p-2 -mr-2 text-zinc-400 active:bg-zinc-50 rounded-full"
                                    >
                                        {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                                    </button>
                                </div>

                                {isExpanded && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="mt-5 pt-5 border-t border-dashed border-zinc-200 dark:border-zinc-800 space-y-5"
                                    >
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3.5 rounded-xl">
                                                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">Units Needed</p>
                                                <p className="text-sm font-black text-zinc-900 dark:text-zinc-100">{item.units || 1} Bag(s)</p>
                                            </div>
                                            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3.5 rounded-xl">
                                                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">Contact</p>
                                                <p className="text-sm font-black text-zinc-900 dark:text-zinc-100 truncate">{item.contact_name}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Quick Actions</p>
                                                <span className="text-[10px] text-zinc-300 font-bold">ID: {item.id.slice(0,6)}...</span>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-3">
                                                <a 
                                                    href={`tel:${item.contact_phone}`} 
                                                    className="flex flex-col items-center justify-center gap-1.5 h-20 bg-blue-50 text-blue-700 rounded-2xl font-bold text-sm active:scale-95 transition-transform border border-blue-100 dark:bg-blue-900/20 dark:border-blue-800/30"
                                                >
                                                    <Phone size={20} className="mb-1" />
                                                    Call Contact
                                                </a>
                                                <button 
                                                    onClick={() => {
                                                        setActiveTab('donors');
                                                        setSearchQuery(`${item.blood_type} ${item.location || ''}`);
                                                    }}
                                                    className="flex flex-col items-center justify-center gap-1.5 h-20 bg-rose-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-rose-200 dark:shadow-none active:scale-95 transition-transform"
                                                >
                                                    <Search size={20} className="mb-1" />
                                                    Find Donors
                                                </button>
                                            </div>

                                            {/* Advanced Actions Drawer */}
                                            <div className="pt-2">
                                                <ActionGroup 
                                                    activeTab={activeTab}
                                                    item={item}
                                                    isProcessing={processingIds.has(item.id)}
                                                    onToggle={handleToggleStatus}
                                                    onEdit={handleEdit}
                                                    onDelete={handleDelete}
                                                    onUpdateDonor={handleUpdateDonorStatus}
                                                    onUpdateStatus={handleUpdateRequestStatus}
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
};
