'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
    BadgeCheck,
    ExternalLink,
    Facebook
} from 'lucide-react';
import { ActionGroup } from './ActionGroup';
import { StatusBadge } from './StatusBadge';
import { AuthorCell, isValidFacebookUrl } from './utils';

interface DataTableProps {
    data: any[];
    activeTab: 'donors' | 'events' | 'posts' | 'stories';
    processingIds: Set<string>;
    handleToggleStatus: (item: any) => Promise<void>;
    handleEdit: (item: any) => void;
    handleDelete: (id: string) => Promise<void>;
    handleUpdateDonorStatus: (id: string, status: boolean) => Promise<void>;
    handleUpdateRequestStatus: (id: string, status: string) => Promise<void>;
}

export const DataTable = ({
    data,
    activeTab,
    processingIds,
    handleToggleStatus,
    handleEdit,
    handleDelete,
    handleUpdateDonorStatus,
    handleUpdateRequestStatus
}: DataTableProps) => {
    const getColumns = () => {
        switch(activeTab) {
            case 'donors': return ['Name', 'Blood Type', 'Role', 'Facebook', 'Location', 'Availability'];
            case 'events': return ['Title', 'Date', 'Location', 'Posted By', 'Status'];
            case 'posts': return ['Title', 'Date', 'Posted By', 'Status'];
            case 'stories': return ['Title', 'Date', 'Donor', 'Status'];
            default: return [];
        }
    };

    return (
        <div className="w-full">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-200 dark:border-zinc-800">
                            {getColumns().map(col => (
                                <th key={col} className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">{col}</th>
                            ))}
                            <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                    <AnimatePresence mode="popLayout">
                        {data.map((item: any) => (
                            <motion.tr 
                                key={item.id} 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors group"
                            >
                                {activeTab === 'donors' && (
                                    <>
                                        <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100 text-sm whitespace-nowrap">
                                            <div className="flex items-center gap-1.5">
                                                {item.full_name || item.name}
                                                {item.is_verified && (
                                                    <BadgeCheck size={16} className="text-blue-500 fill-blue-500/10" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-500 text-sm font-bold">{item.blood_type}</td>
                                        <td className="px-6 py-4 text-sm"><StatusBadge type="role" value={item.role} /></td>
                                        <td className="px-6 py-4">
                                            {item.facebook_url ? (
                                                <a 
                                                    href={item.facebook_url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className={`flex items-center gap-1.5 p-1.5 rounded-lg transition-all ${isValidFacebookUrl(item.facebook_url) ? 'text-blue-600 hover:bg-blue-50' : 'text-zinc-400 hover:text-rose-600 hover:bg-rose-50'}`}
                                                    title={item.facebook_url}
                                                >
                                                    <Facebook size={18} />
                                                    <ExternalLink size={12} className="opacity-50" />
                                                </a>
                                            ) : (
                                                <span className="text-zinc-300 italic text-xs">No link</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-500 text-sm">{item.location}</td>
                                        <td className="px-6 py-4 text-sm"><StatusBadge type="availability" value={item.is_available} /></td>
                                    </>
                                )}
                                {activeTab === 'events' && (
                                    <>
                                        <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100 text-sm">{item.title}</td>
                                        <td className="px-6 py-4 text-zinc-500 text-sm whitespace-nowrap">{new Date(item.date).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-zinc-500 text-sm whitespace-nowrap">{item.location}</td>
                                        <td className="px-6 py-4"><AuthorCell author={item.profiles?.full_name} /></td>
                                        <td className="px-6 py-4"><StatusBadge type="published" value={item.is_active} /></td>
                                    </>
                                )}
                                {activeTab === 'posts' && (
                                    <>
                                        <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100 text-sm">{item.title}</td>
                                        <td className="px-6 py-4 text-zinc-500 text-sm whitespace-nowrap">{new Date(item.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4"><AuthorCell author={item.profiles?.full_name} /></td>
                                        <td className="px-6 py-4"><StatusBadge type="published" value={item.is_active} /></td>
                                    </>
                                )}
                                {activeTab === 'stories' && (
                                    <>
                                        <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100 text-sm">{item.title}</td>
                                        <td className="px-6 py-4 text-zinc-500 text-sm whitespace-nowrap">{new Date(item.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4"><AuthorCell author={item.profiles?.full_name} /></td>
                                        <td className="px-6 py-4"><StatusBadge type="published" value={item.is_published} /></td>
                                    </>
                                )}
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
                        ))}
                    </AnimatePresence>
                    </tbody>
                </table>
            </div>

            {/* Mobile Card Layout */}
            <div className="md:hidden divide-y divide-zinc-100 dark:divide-zinc-800/50">
                <AnimatePresence mode="popLayout">
                    {data.map((item: any) => (
                        <motion.div 
                            key={item.id} 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="p-5 mb-2 rounded-[20px] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-1.5 flex-1">
                                    <div className="flex flex-wrap gap-2 mb-1">
                                         {activeTab === 'donors' && (
                                            <>
                                                <span className="text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-500/10 px-2.5 py-1 rounded-md">{item.blood_type}</span>
                                                {item.is_verified && <BadgeCheck size={18} className="text-blue-500 fill-white" />}
                                            </>
                                        )}
                                        {(activeTab === 'events' || activeTab === 'posts' || activeTab === 'stories') && (
                                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest bg-zinc-50 px-2 py-1 rounded-md">
                                                {new Date(item.date || item.created_at).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>

                                    <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg leading-tight">
                                        {item.full_name || item.name || item.title}
                                    </h4>
                                    
                                    {activeTab === 'donors' && (
                                        <div className="flex items-center gap-1.5 text-sm text-zinc-500 font-medium">
                                            <span className="truncate max-w-[180px]">{item.location}</span>
                                        </div>
                                    )}

                                    {activeTab !== 'donors' && item.profiles?.full_name && (
                                        <div className="flex items-center gap-2 pt-1">
                                            <div className="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center text-[10px] font-black text-zinc-500">
                                                {item.profiles.full_name[0]}
                                            </div>
                                            <span className="text-xs text-zinc-500 font-medium">{item.profiles.full_name}</span>
                                        </div>
                                    )}
                                </div>

                                {activeTab === 'donors' && item.facebook_url && (
                                    <a 
                                        href={item.facebook_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-blue-600 p-2.5 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all"
                                    >
                                        <Facebook size={20} />
                                    </a>
                                )}
                            </div>

                            <div className="mt-4 pt-4 border-t border-dashed border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                                <div className="flex gap-2">
                                    {activeTab === 'donors' ? (
                                        <>
                                            <StatusBadge type="role" value={item.role} />
                                            <StatusBadge type="availability" value={item.is_available} />
                                        </>
                                    ) : (
                                        <StatusBadge type="published" value={item.is_active ?? item.is_published} />
                                    )}
                                </div>
                                <div className="scale-110 origin-right">
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
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};
