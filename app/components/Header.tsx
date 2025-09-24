'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [open, setOpen] = useState(false);
  const navItems = ['Home', 'About Us', 'Find Donors', 'Register', 'Contact'];

  // Map item to path
  const getPath = (item: string) => {
    switch (item) {
      case 'Home': return '/';
      case 'About Us': return '/about';
      case 'Find Donors': return '/donors';
      case 'Register': return '/register';
      case 'Contact': return '/contact';
      default: return '/';
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-20">
        
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/">
            <Image
              src="/blood-bank-logo.png"
              alt="DIC Blood Bank"
              width={130}
              height={45}
              className="object-contain"
              priority
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2 text-[15px] font-medium h-full">
          {navItems.map((item, i) => {
            const path = getPath(item);
            const isRegister = item === 'Register';
            const isFindDonors = item === 'Find Donors';

            return (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="list-none"
              >
                <Link
                  href={path}
                  className={
                    isRegister
                      ? "ml-2 px-5 py-2.5 bg-[#D60A0A] text-white rounded-full hover:bg-[#B30000] transform hover:scale-105 transition-all duration-200 shadow-[0_0_0_3px_rgba(214,10,10,0.1)]"
                      : isFindDonors
                        ? "relative h-full px-4 py-2 flex items-center text-[#00234B] hover:text-[#D60A0A] transition-colors group"
                        : "relative h-full px-4 py-2 flex items-center text-[#00234B] hover:text-[#D60A0A] transition-colors group"
                  }
                >
                  <span>{item}</span>
                  {!isRegister && (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-[#D60A0A] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
                  )}
                </Link>
              </motion.li>
            );
          })}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-lg"
        >
          <ul className="flex flex-col p-4 space-y-2 text-[#00234B] font-medium">
            {navItems.map((item) => {
              const path = getPath(item);
              return (
                <li key={item}>
                  <Link
                    href={path}
                    className="block px-4 py-2 rounded hover:bg-[#f5f5f5] transition"
                    onClick={() => setOpen(false)} // close menu on click
                  >
                    {item}
                  </Link>
                </li>
              );
            })}
          </ul>
        </motion.nav>
      )}
    </header>
  );
}
