'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import DonorProfileModal from './DonorProfileModal';
import DonorProfileMobile from './DonorProfileModalMobile';
import ProfileMenuItem from './ProfileMenuItem';
import ProfileUpdateModal from './ProfileUpdateModal';

interface Profile {
  full_name: string | null;
  role: string | null;
  blood_type: string | null;
}

interface ProfileDropdownProps {
  user: User;
}

export default function ProfileDropdown({ user }: ProfileDropdownProps) {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const supabase = createClient();
  const router = useRouter();
  const { logoutUser } = useAuth();
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Fetch profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      const { data } = await supabase
        .from('profiles')
        .select('full_name, role, blood_type')
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
    await logoutUser();
    router.push('/');
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
        suppressHydrationWarning
        className={`flex items-center gap-2.5 bg-white p-1 pr-3 rounded-full shadow-sm border border-slate-100 hover:shadow-md transition-all ${open ? 'ring-2 ring-rose-500/20 shadow-md' : ''}`}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-600 shadow-sm border border-rose-200/50">
          <UserIcon size={18} strokeWidth={2.5} />
        </div>

        <div className="text-left hidden md:block">
            <p className="text-[9px] font-bold text-slate-400 uppercase leading-none">{name.split(' ')[0]}</p>
            <p className={`text-[10px] font-extrabold uppercase leading-none mt-0.5 ${profile?.role === 'donor' ? 'text-emerald-500' : 'text-rose-500'}`}>
              {profile?.role === 'donor' ? 'Ready' : role}
            </p>
        </div>
        
        <ChevronDown
          size={14}
          className={`text-slate-300 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
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
            className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-slate-100 bg-white p-1.5 shadow-xl"
          >
            {/* Profile info */}
            <div className="px-2 py-2 bg-slate-50/50 rounded-lg mb-1.5 flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 font-bold overflow-hidden">
                <UserIcon size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-bold text-slate-900 truncate">{name}</p>
                <div className="mt-0.5">
                  <span className="text-[9px] font-black uppercase tracking-widest bg-rose-100/50 text-rose-700 px-1.5 py-0.5 rounded">
                    {role}
                  </span>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col gap-1">

              <ProfileMenuItem 
                icon={<UserIcon size={16} />} 
                label="Profile Settings" 
                onClick={() => {
                  setOpen(false);
                  setIsUpdateModalOpen(true);
                }}
              />
              
              {profile && (
                <ProfileMenuItem 
                  icon={<LayoutDashboard size={16} />} 
                  label="Donor Dashboard" 
                  onClick={() => {
                    setOpen(false);
                    setIsModalOpen(true);
                  }}
                />
              )}

              {/* Removing Security Option as requested */}
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

      {isMobile ? (
        <DonorProfileMobile 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          user={user}
          profile={profile}
        />
      ) : (
        <DonorProfileModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          user={user}
          profile={profile}
        />
      )}
      
      <ProfileUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        user={user}
      />
    </div>
  );
}
