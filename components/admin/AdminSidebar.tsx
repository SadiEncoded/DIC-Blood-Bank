'use client';

import { logout } from '@/lib/actions/auth';
import {
    BarChart3,
    BookOpen,
    Calendar,
    ChevronRight,
    Droplets,
    LogOut,
    Settings,
    Users
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { label: 'Dashboard', href: '/admin', icon: BarChart3 },
  { label: 'Blood Requests', href: '/admin/requests', icon: Droplets },
  { label: 'Verified Donors', href: '/admin/donors', icon: Users },
  { label: 'Events', href: '/admin/events', icon: Calendar },
  { label: 'Success Stories', href: '/admin/stories', icon: BookOpen },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-slate-400 flex flex-col z-50">
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center text-white">
            <Droplets size={20} fill="currentColor" />
          </div>
          <span className="font-bold text-white text-lg tracking-tight">DIC ADMIN</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40' 
                  : 'hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={20} className={isActive ? 'text-white' : 'text-slate-500 group-hover:text-rose-400'} />
              <span className="font-semibold text-sm flex-1">{item.label}</span>
              {isActive && <ChevronRight size={14} className="opacity-50" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-white/10">
        <Link 
          href="/admin/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 hover:text-white transition-colors mb-2"
        >
          <Settings size={20} />
          <span className="font-medium text-sm">Settings</span>
        </Link>
        <form action={logout}>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left text-rose-400 hover:bg-rose-950/30 transition-colors">
            <LogOut size={20} />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
