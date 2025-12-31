'use client';

import {
    Bell,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    Circle,
    Edit,
    Trash2
} from 'lucide-react';
import { toast } from 'sonner';
import { LoadingSpinner } from './LoadingSpinner';

interface ActionGroupProps {
    activeTab: string;
    item: any;
    isProcessing: boolean;
    onToggle: (item: any) => void;
    onEdit: (item: any) => void;
    onDelete: (id: string) => void;
    onUpdateDonor: (id: string, status: boolean) => void;
    onUpdateStatus: (id: string, status: string) => void;
    onToggleExpand?: (id: string) => void;
    isExpanded?: boolean;
}

export const ActionGroup = ({ 
    activeTab, 
    item, 
    isProcessing, 
    onToggle, 
    onEdit, 
    onDelete, 
    onUpdateDonor,
    onUpdateStatus,
    onToggleExpand,
    isExpanded
}: ActionGroupProps) => {
    if (isProcessing) return <div className="px-3"><LoadingSpinner /></div>;

    return (
        <div className="flex items-center justify-end gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all">
            {activeTab === 'donors' && (
                <button 
                    onClick={() => onUpdateDonor(item.id, item.is_verified || false)}
                    title={item.is_verified ? "Unverify Donor" : "Verify Donor"}
                    className={`p-1.5 rounded-lg transition-all ${item.is_verified ? 'text-emerald-600 hover:bg-emerald-50' : 'text-zinc-400 hover:text-emerald-600 hover:bg-emerald-50'}`}
                >
                    <CheckCircle size={16} />
                </button>
            )}
            {activeTab === 'requests' && (
                <div className="flex items-center gap-2">
                    {item.urgency === 'CRITICAL' && item.status === 'PENDING' && (
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                toast.info("Escalating to community feed...");
                                // This could trigger a specific post creation logic
                            }}
                            title="Post Article"
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-all animate-pulse"
                        >
                            <Bell size={16} />
                        </button>
                    )}
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleExpand?.(item.id);
                        }}
                        className="p-1.5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-lg transition-all"
                    >
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                </div>
            )}
            {(activeTab === 'posts' || activeTab === 'events' || activeTab === 'stories') && (
                <>
                    <button 
                        onClick={() => onToggle(item)}
                        title={(item.is_published ?? item.is_active) ? "Unpublish" : "Publish"}
                        className="p-1.5 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                    >
                        {(item.is_published ?? item.is_active) ? <CheckCircle size={16} /> : <Circle size={16} />}
                    </button>
                    <button 
                        onClick={() => onEdit(item)}
                        title="Edit"
                        className="p-1.5 text-zinc-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all"
                    >
                        <Edit size={16} />
                    </button>
                    <button 
                        onClick={() => onDelete(item.id)}
                        title="Delete"
                        className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-all"
                    >
                        <Trash2 size={16} />
                    </button>
                </>
            )}
        </div>
    );
};
