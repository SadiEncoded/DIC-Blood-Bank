'use client';

import { LOGO_SRC, NAV_LINKS } from '@/assets/data/shared';
import ProfileDropdown from '@/components/common/profile/ProfileDropdown';
import TickerTape from '@/components/ui/TickerTape';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MobileMenu } from './MobileMenu';

const AuthModal = dynamic(() => import('@/features/auth/components/AuthModal').then(mod => mod.AuthModal), { ssr: false });

const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
  <div className="relative w-5 h-5 flex flex-col justify-center items-center">
    <motion.span
      animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
      className="w-5 h-0.5 bg-slate-900 rounded-full absolute top-1"
      transition={{ duration: 0.2 }}
    />
    <motion.span
      animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
      className="w-5 h-0.5 bg-slate-900 rounded-full absolute"
      transition={{ duration: 0.2 }}
    />
    <motion.span
      animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
      className="w-5 h-0.5 bg-slate-900 rounded-full absolute bottom-1"
      transition={{ duration: 0.2 }}
    />
  </div>
);

export default function Header({ user }: { user?: User | null }) {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  const [profileName, setProfileName] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Fetch profile name if user exists
    const fetchProfile = async () => {
      if (user) {
        const supabase = createClient();
        const { data } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single();
        if (data?.full_name) {
          setProfileName(data.full_name);
        }
      }
    };
    
    fetchProfile();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [user]);

  const openAuth = (view: 'login' | 'signup') => {
    setAuthView(view);
    setAuthOpen(true);
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
            : 'bg-white border-b border-transparent'
        }`}
      >
        <AnimatePresence>
          {!scrolled && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <TickerTape />
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'h-14 md:h-16' : 'h-16 md:h-24'
        }`}>
          {/* Logo Section */}
          <Link href="/" className="relative flex items-center transition-all duration-300 hover:scale-105 active:scale-95 shrink-0">
            <div className={`relative transition-all duration-500 ${
              scrolled ? 'h-8 w-28 md:h-9 md:w-32' : 'h-10 w-36 md:h-12 md:w-44'
            }`}>
              <Image 
                src={LOGO_SRC} 
                alt="DIC Blood Bank" 
                fill 
                className="object-contain" 
                priority 
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1.5 bg-slate-50/50 backdrop-blur-sm rounded-2xl border border-slate-200/50 self-center">
            {NAV_LINKS.map((link) => {
              const isActive = path === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-2 px-4 py-2 text-[11px] font-black uppercase tracking-wider transition-all duration-300 rounded-xl overflow-hidden ${
                    isActive
                      ? 'text-rose-600'
                      : 'text-slate-500 hover:text-slate-900 group'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-bg"
                      className="absolute inset-0 bg-white shadow-sm rounded-xl"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon size={14} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-rose-600' : 'text-slate-400 group-hover:text-slate-600'} />
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Action Area */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            {!user ? (
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={() => openAuth('login')}
                  className="px-4 py-2 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-rose-600 transition-colors"
                >
                  Log In
                </button>
                <Link
                  href="/signup"
                  className="px-6 py-2.5 bg-rose-600 text-white text-[11px] font-black uppercase tracking-[0.15em] rounded-xl hover:bg-rose-700 transition-all shadow-lg shadow-rose-200 active:scale-95"
                >
                  Become Donor
                </Link>
              </div>
            ) : (
              <ProfileDropdown user={user} />
            )}

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileOpen(true)}
              className={`lg:hidden flex items-center justify-center p-3 rounded-2xl transition-all duration-300 ${
                mobileOpen 
                  ? 'bg-rose-600 text-white shadow-xl shadow-rose-200' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <HamburgerIcon isOpen={mobileOpen} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu 
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        user={user}
        profileName={profileName}
        navLinks={NAV_LINKS}
        onAuthOpen={openAuth}
        onLogout={() => {
          // Trigger logout if needed, but ProfileDropdown already has handler
          // Creating simpler redirect based on user requirements if necessary
          setMobileOpen(false);
          window.location.href = '/';
        }}
      />

      <AuthModal 
        isOpen={authOpen} 
        onClose={() => setAuthOpen(false)} 
        defaultView={authView} 
      />
    </>
  );
}
