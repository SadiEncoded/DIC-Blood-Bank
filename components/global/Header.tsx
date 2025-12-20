'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, UserPlus, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Search Donor', href: '/searchDonor' },
  { label: 'Events', href: '/events' },
  { label: 'Community', href: '/community' },
  { label: 'Donors', href: '/donors' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
];

export default function Header() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          
          {/* Logo Section */}
          <Link href="/" className="relative flex items-center group">
            <div className="relative h-9 w-32 md:h-11 md:w-40 transition-transform duration-300 group-hover:scale-[1.02]">
              <Image 
                src="/blood-bank-logo.png" 
                alt="DIC Blood Bank" 
                fill 
                className="object-contain" 
                priority 
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
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

          {/* Action Button */}
          <div className="flex items-center gap-4">
            <Link 
              href="/register"
              className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white text-[12px] font-bold uppercase tracking-wider rounded-lg hover:bg-rose-600 transition-all shadow-sm active:scale-95"
            >
              Become a Donor
            </Link>

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
                      path === link.href 
                        ? 'bg-rose-50 text-rose-600' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-slate-100">
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 py-4 bg-rose-600 text-white font-bold rounded-xl shadow-lg shadow-rose-100"
                >
                  Register Now <UserPlus size={18} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
