'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#00234B] text-white mt-auto">
      <div className="max-w-6xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
            <motion.div whileHover={{ x: 5 }} className="flex flex-col space-y-3">
              <Link href="tel:+8801681279979" className="text-gray-300 hover:text-white transition-colors flex items-center justify-center md:justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#D60A0A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +880 1681-279979
              </Link>
              <Link href="mailto:daffodil.cse24@gmail.com" className="text-gray-300 hover:text-white transition-colors flex items-center justify-center md:justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#D60A0A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                daffodil.cse24@gmail.com
              </Link>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <div className="flex flex-col space-y-3">
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block">About</Link>
              <Link href="/donate" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block">Donate</Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block">Contact</Link>
            </div>
          </div>

          {/* Location */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-semibold mb-6">Location</h3>
            <motion.div whileHover={{ x: -5 }} className="text-gray-300 space-y-3">
              <p className="flex items-center justify-center md:justify-end">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:ml-2 mr-2 text-[#D60A0A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Daffodil International College
              </p>
              <p className="flex items-center justify-center md:justify-end">
                <span className="md:ml-7">Baburhat, Chandpur</span>
              </p>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-gray-700/50 mt-12 pt-8 text-center text-sm text-gray-400">
          © 2025 DIC Blood Bank | Created By Mahmudul Hasan Sadi
        </div>
      </div>
    </footer>
  );
}
