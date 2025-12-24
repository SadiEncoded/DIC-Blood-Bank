'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, UserPlus, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProfileDropdown from '../profile/ProfileDropdown';

import { HEADER_CONTENT, NAV_LINKS } from '@/lib/data/shared';

import { User } from '@supabase/supabase-js';
import { AuthModal } from '../auth/AuthModal';

export default function Header({ user }: { user?: User | null }) {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [authOpen, setAuthOpen] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openAuth = (view: 'login' | 'signup') => {
    setAuthView(view);
    setAuthOpen(true);
    setMobileOpen(false);
  };

  const userInitials = user?.email?.substring(0, 2).toUpperCase() || 'U';
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const userAvatar = user?.user_metadata?.avatar_url;

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-100 py-3 shadow-sm'
            : 'bg-white py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative flex items-center group">
            <div className="relative h-9 w-32 md:h-11 md:w-40 transition-transform duration-300 group-hover:scale-[1.02]">
              <Image src="/blood-bank-logo.png" alt="DIC Blood Bank" fill className="object-contain" priority />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = path === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-[13px] font-bold tracking-tight transition-all duration-200 rounded-lg ${
                    isActive
                      ? 'text-rose-600 bg-rose-50/50'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {!user && (
              <Link
                href="/signup"
                className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white text-[12px] font-bold uppercase tracking-wider rounded-lg hover:bg-rose-600 transition-all shadow-sm active:scale-95"
              >
                {HEADER_CONTENT.cta}
              </Link>
            )}

            {user ? (
              <div className="relative hidden md:block">
                <ProfileDropdown user={user} />
              </div>
            ) : (
              <button
                onClick={() => openAuth('login')}
                className="hidden md:flex text-sm font-bold text-slate-600 hover:text-rose-600 transition-colors"
              >
                Log In
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 bg-slate-50 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60] lg:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-white z-[70] shadow-2xl p-8 lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <div className="relative h-8 w-28">
                  <Image src="/blood-bank-logo.png" alt="Logo" fill className="object-contain" />
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <X size={20} className="text-slate-500" />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                      path === link.href ? 'bg-rose-50 text-rose-600' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                {!user && (
                  <button
                    onClick={() => openAuth('login')}
                    className="px-4 py-3 rounded-xl text-sm font-bold transition-colors text-left text-slate-600 hover:bg-slate-50"
                  >
                    Log In
                  </button>
                )}
              </div>

              <div className="mt-auto pt-6 border-t border-slate-100">
                {!user ? (
                  <Link
                    href="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="flex w-full items-center justify-center gap-2 py-4 bg-rose-600 text-white font-bold rounded-xl shadow-lg shadow-rose-100"
                  >
                    {HEADER_CONTENT.mobileCta} <UserPlus size={18} />
                  </Link>
                ) : (
                  <div className="flex flex-col gap-2">
                    <ProfileDropdown user={user} />
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AnimatePresence>
        {authOpen && (
          <AuthModal
            isOpen={authOpen}
            onClose={() => setAuthOpen(false)}
            defaultView={authView}
          />
        )}
      </AnimatePresence>
    </>
  );
}
