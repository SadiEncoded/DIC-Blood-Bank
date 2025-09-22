'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          
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

          {/* Navigation */}
          <nav className="h-full">
            <ul className="flex items-center h-full space-x-2 text-[15px] font-medium">

              {['Home', 'About Us', 'Find Donors', 'Register', 'Contact'].map((item, i) => {
                if (item === 'Register') {
                  return (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                      <Link
                        href="/register"
                        className="ml-2 px-5 py-2.5 bg-[#D60A0A] text-white rounded-full 
                                   hover:bg-[#B30000] transform hover:scale-105 transition-all duration-200
                                   shadow-[0_0_0_3px_rgba(214,10,10,0.1)]"
                      >
                        {item}
                      </Link>
                    </motion.li>
                  );
                }
                const path = item === 'Home' ? '/' : `/${item.toLowerCase().replace(/ /g, '')}`;
                return (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Link
                      href={path}
                      className="relative h-full px-4 py-2 flex items-center text-[#00234B] hover:text-[#D60A0A] transition-colors group"
                    >
                      <span>{item}</span>
                      <span className="absolute bottom-0 left-0 w-full h-1 bg-[#D60A0A] 
                                        transform scale-x-0 group-hover:scale-x-100 
                                        transition-transform duration-200 origin-left rounded-full"
                      />
                    </Link>
                  </motion.li>
                );
              })}
              
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
