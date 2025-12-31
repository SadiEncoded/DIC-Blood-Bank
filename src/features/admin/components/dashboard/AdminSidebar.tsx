'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
    BookOpen,
    Calendar as CalendarDays,
    FileText,
    HeartHandshake,
    Home,
    LayoutDashboard,
    MessageSquare,
    ShieldCheck,
    UserCircle,
    X
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface User {
    email?: string;
}

interface AdminSidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    setViewMode: (mode: 'list' | 'create') => void;
    currentUser: User | null;
    isOpen?: boolean;
    onClose?: () => void;
}

export const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'donors', icon: HeartHandshake, label: 'Donors' },
    { id: 'events', icon: CalendarDays, label: 'Events' },
    { id: 'posts', icon: FileText, label: 'Learn Articles' },
    { id: 'announcements', icon: MessageSquare, label: 'Official Notices' },
    { id: 'requests', icon: MessageSquare, label: 'Blood Requests' },
    { id: 'verifications', icon: ShieldCheck, label: 'Verify Donation' },
    { id: 'stories', icon: BookOpen, label: 'Stories' },
];

export const AdminSidebar = ({ activeTab, setActiveTab, setViewMode, currentUser, isOpen, onClose }: AdminSidebarProps) => {
    const router = useRouter();

    const sidebarContent = (
        <div className="flex flex-col h-full bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800">
            <div className="p-3.5 md:p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <div>
                    <h2 className="text-sm md:text-xl font-bold text-rose-600 tracking-tight">DIC ADMIN</h2>
                    <p className="text-[8px] md:text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-0.5 md:mt-1">Management Core</p>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => router.push('/')} className="p-1.5 md:p-2 text-zinc-400 hover:text-zinc-600 rounded-lg transition-colors">
                        <Home size={16} />
                    </button>
                    {onClose && (
                        <button onClick={onClose} className="p-1.5 text-zinc-400 hover:text-zinc-600 md:hidden">
                            <X size={18} />
                        </button>
                    )}
                </div>
            </div>

            <nav className="flex-1 p-2 md:p-4 space-y-0.5 md:space-y-1 overflow-y-auto custom-scrollbar">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            setActiveTab(item.id);
                            setViewMode('list');
                            if (onClose) onClose();
                        }}
                        className={`w-full flex items-center gap-3 md:gap-3 px-4 md:px-4 py-3.5 md:py-3 rounded-xl md:rounded-xl text-sm md:text-sm font-bold transition-all ${
                            activeTab === item.id 
                            ? 'bg-rose-50 text-rose-600 shadow-sm dark:bg-rose-500/10' 
                            : 'text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                        }`}
                    >
                        <item.icon size={18} strokeWidth={activeTab === item.id ? 2.5 : 2} className="md:w-[18px] md:h-[18px]" />
                        {item.label}
                    </button>
                ))}
            </nav>

            {currentUser && (
                <div className="p-3 md:p-4 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 md:py-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg md:rounded-2xl">
                        <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-zinc-500 shrink-0">
                            <UserCircle size={16} className="md:w-6 md:h-6" />
                        </div>
                        <div className="min-w-0 pr-1 md:pr-2">
                            <p className="text-[7px] md:text-[8px] font-bold text-rose-600 uppercase tracking-widest">Admin Access</p>
                            <p className="text-[10px] md:text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">{currentUser.email}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0">
                {sidebarContent}
            </aside>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] md:hidden">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="absolute top-0 left-0 bottom-0 w-64 max-w-[80vw] shadow-2xl"
                        >
                            {sidebarContent}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};
