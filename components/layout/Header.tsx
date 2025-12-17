'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Bell, Calendar, Menu, Sparkles, TrendingUp, UserPlus, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const UPDATES = [
  { text: 'Blood Drive This Weekend', icon: Calendar, color: 'from-red-500 to-pink-500', href: '/events' },
  { text: 'Urgent: O- Blood Needed!', icon: Sparkles, color: 'from-orange-400 to-red-500', href: '/urgent', urgent: true },
  { text: '500+ Lives Saved This Month', icon: TrendingUp, color: 'from-rose-500 to-red-600', href: '/impact' },
];

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Search Donor', href: '/searchDonor' },
  { label: 'Become a Donar', href: '/donate' },
  { label: 'Community', href: '/community' },
  { label: 'About', href: '/about' },
];

export default function Header() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setUpdateIndex(i => (i + 1) % UPDATES.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const current = UPDATES[updateIndex];
  const Icon = current.icon;

  return (
    <>
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-3 shadow-lg' : 'py-5'} bg-white/95 backdrop-blur-sm border-b border-gray-200`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-12 w-40">
              <Image src="/blood-bank-logo.png" alt="DIC Blood Bank" fill className="object-contain" priority />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  path === link.href 
                    ? 'bg-red-50 text-red-600 font-semibold' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-red-600'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Live Update Ticker */}
            <motion.a
              href={current.href}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-gray-50 to-red-50 rounded-xl border border-gray-200 shadow-sm"
            >
              <motion.div
                animate={current.urgent ? { scale: [1, 1.1, 1] } : { rotate: 360 }}
                transition={current.urgent ? { repeat: Infinity, duration: 1.5 } : { repeat: Infinity, duration: 4, ease: 'linear' }}
                className={`p-1.5 rounded-full bg-gradient-to-r ${current.color} text-white`}
              >
                <Icon className="w-3.5 h-3.5" />
              </motion.div>
              <span className={`text-xs font-medium ${current.urgent ? 'text-red-700' : 'text-gray-900'}`}>
                {current.text}
              </span>
            </motion.a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link href="/notifications" className="hidden lg:block p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Bell className="w-5 h-5 text-gray-700" />
            </Link>
            
            <Link 
              href="/donate"
              className="hidden lg:flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all"
            >
              Register <UserPlus className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-50"
            >
              <Menu className="w-6 h-6" />
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
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <div className="relative h-8 w-24">
                  <Image src="/blood-bank-logo.png" alt="DIC Blood Bank" fill className="object-contain" />
                </div>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-gray-100">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="p-4 space-y-2">
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-medium transition-all ${
                      path === link.href
                        ? 'bg-red-50 text-red-600 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="pt-4 border-t">
                  <Link
                    href="/donate"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-full"
                  >
                    Register <UserPlus className="w-4 h-4" />
                  </Link>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Latest Update</div>
                  <div className="text-sm text-gray-900">{current.text}</div>
                </div>
              </nav>

              <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white text-xs text-gray-600">
                © {new Date().getFullYear()} DIC Blood Bank
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
