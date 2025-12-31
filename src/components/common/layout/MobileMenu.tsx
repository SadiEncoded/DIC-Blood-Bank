'use client';

import type { User as SupabaseUser } from '@supabase/supabase-js';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, LayoutDashboard, LogIn, LogOut, Settings, User, UserPlus, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: SupabaseUser | null | undefined;
  profileName?: string | null;
  navLinks: Array<{ label: string; href: string; icon: any }>;
  onAuthOpen: (view: 'login' | 'signup') => void;
  onLogout: () => void;
}

export function MobileMenu({ isOpen, onClose, user, profileName, navLinks, onAuthOpen, onLogout }: MobileMenuProps) {
  const pathname = usePathname();
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[300px] bg-white/95 backdrop-blur-2xl z-[110] shadow-2xl flex flex-col border-l border-slate-100"
          >
            {/* Header Area */}
            <div className="p-6 flex items-center justify-between border-b border-slate-100/50">
              <div className="relative h-8 w-24">
                <Image 
                  src="/blood-bank-logo.png" 
                  alt="DIC Blood Bank" 
                  fill 
                  className="object-contain" 
                  priority
                />
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
              >
                <X size={20} />
              </button>
            </div>

            {/* Profile Section */}
            <div className={`px-6 py-6 border-b border-slate-100/50 transition-colors duration-300 ${isProfileExpanded ? 'bg-slate-50/80' : 'bg-gradient-to-b from-slate-50/50 to-transparent'}`}>
              {user ? (
                <div className="space-y-4">
                  <button 
                    onClick={() => setIsProfileExpanded(!isProfileExpanded)}
                    className="w-full flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 shadow-sm border border-rose-200/50 group-active:scale-95 transition-transform">
                      <User size={24} strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm font-black text-slate-900 truncate uppercase tracking-tight">
                        {profileName || user.user_metadata?.full_name || 'Donor'}
                      </p>
                      <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest">
                         Verified Member
                      </p>
                    </div>
                    <div className={`p-2 rounded-full bg-white border border-slate-100 text-slate-400 transition-transform duration-300 ${isProfileExpanded ? 'rotate-180 text-rose-500 border-rose-100 shadow-sm' : ''}`}>
                      <ChevronDown size={14} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isProfileExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 gap-2 pt-2">
                          <Link
                            href="/profile/settings"
                            onClick={onClose}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-100 text-slate-600 hover:text-rose-600 hover:border-rose-100 shadow-sm transition-all"
                          >
                            <Settings size={18} />
                            <span className="text-[11px] font-black uppercase tracking-widest">Settings</span>
                          </Link>
                          <Link
                            href="/profile/dashboard"
                            onClick={onClose}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-100 text-slate-600 hover:text-rose-600 hover:border-rose-100 shadow-sm transition-all"
                          >
                            <LayoutDashboard size={18} />
                            <span className="text-[11px] font-black uppercase tracking-widest">Dashboard</span>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">JOIN THE CAUSE</h3>
                    <p className="text-xs text-slate-500 font-medium">Be a life saver in your community.</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onAuthOpen('login')}
                      className="flex-1 py-2.5 px-4 bg-white border border-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                      <LogIn size={14} /> Log In
                    </button>
                    <button
                      onClick={() => onAuthOpen('signup')}
                      className="flex-1 py-2.5 px-4 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all shadow-md shadow-rose-200 flex items-center justify-center gap-2"
                    >
                      <UserPlus size={14} /> Join Now
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 overflow-y-auto py-6 px-3">
              <div className="space-y-1">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 border ${
                          isActive 
                            ? 'bg-rose-50 text-rose-600 border-rose-100 shadow-sm' 
                            : 'bg-white text-slate-600 border-slate-100 hover:border-rose-100 hover:text-rose-600 shadow-sm'
                        }`}
                      >
                        <div className={`transition-colors ${
                          isActive ? 'text-rose-600' : 'text-slate-400 group-hover:text-rose-600'
                        }`}>
                          <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-widest">
                          {link.label}
                        </span>
                        {isActive && (
                          <motion.div 
                            layoutId="active-nav-dot"
                            className="ml-auto w-1.5 h-1.5 bg-rose-500 rounded-full"
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </nav>

            {/* Footer Section */}
            {user && (
              <div className="p-4 border-t border-slate-100/50">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100 hover:bg-rose-100 transition-all active:scale-[0.98] shadow-sm"
                >
                  <LogOut size={18} />
                  <span className="text-[11px] font-black uppercase tracking-widest">Sign Out</span>
                </button>
              </div>
            )}

            <div className="bg-slate-50 p-6 text-center">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">
                DIC Blood Bank v1.0
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
