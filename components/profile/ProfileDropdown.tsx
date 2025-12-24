'use client';

import { createClient } from '@/lib/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronDown,
  LogOut,
  Shield,
  User as UserIcon
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ProfileMenuItem from './ProfileMenuItem';

interface Profile {
  full_name: string | null;
  role: string | null;
}

interface ProfileDropdownProps {
  user: User;
}

export default function ProfileDropdown({ user }: ProfileDropdownProps) {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const supabase = createClient();
  const router = useRouter();

  // Fetch profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      const { data } = await supabase
        .from('profiles')
        .select('full_name, role')
        .eq('id', user.id)
        .single();

      if (data) {
        setProfile(data);
      }
    };

    loadProfile();
  }, [user, supabase]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const name =
    profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  const role = profile?.role || 'Member';

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white pl-1 pr-3 py-1 shadow-sm hover:bg-slate-50 transition-colors"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-600 text-sm font-bold overflow-hidden">
          <UserIcon size={20} />
        </div>

        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-50 mt-2 w-64 rounded-xl border border-slate-100 bg-white p-2 shadow-xl"
          >
            {/* Profile info */}
            <div className="px-3 py-3 bg-slate-50 rounded-lg mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 font-bold overflow-hidden">
                <UserIcon size={24} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-900 truncate">{name}</p>
                <span className="text-[10px] font-black uppercase tracking-widest bg-red-100 text-red-700 px-2 py-0.5 rounded">
                  {role}
                </span>
              </div>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col gap-1">
              <Link href="/profile" onClick={() => setOpen(false)}>
                <ProfileMenuItem icon={<UserIcon size={16} />} label="Profile Settings" />
              </Link>
              <Link href="/security" onClick={() => setOpen(false)}>
                <ProfileMenuItem icon={<Shield size={16} />} label="Security" />
              </Link>
            </div>

            <div className="my-2 h-px bg-slate-100" />

            {/* Sign Out */}
            <ProfileMenuItem
              icon={<LogOut size={16} />}
              label="Sign Out"
              danger
              onClick={handleLogout}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
