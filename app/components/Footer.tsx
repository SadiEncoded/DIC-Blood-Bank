'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';


export default function Footer() {
  const socialLinks = [
    { icon: Mail, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: Github, href: '#' },
  ];

  return (
    <footer className="relative bg-gradient-to-t from-[#001F3B] via-[#002B55] to-[#003366] text-white overflow-hidden">
      {/* Floating shapes */}
      <motion.div
        className="absolute -top-32 -left-32 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl"
        animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-36 -right-36 w-[24rem] h-[24rem] bg-teal-400/10 rounded-full blur-3xl"
        animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: 'easeInOut' }}
      />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-16">

        {/* Brand Section */}
        <div className="space-y-4">
          <h3 className="text-2xl md:text-3xl font-bold text-yellow-400">DIC Blood Bank</h3>
          <p className="text-gray-300 text-sm md:text-base max-w-sm bg-white/5 p-4 rounded-xl">
            A community-driven platform connecting donors and recipients to save lives.
          </p>
          <div className="flex gap-4 mt-3">
            {socialLinks.map((link, idx) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  whileHover={{ scale: 1.2, color: '#FFD700', transition: { duration: 0.3 } }}
                  className="text-gray-300"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </div>
        </div>

{/* Quick Links */}
<div className="space-y-2">
  <h4 className="text-lg font-semibold text-yellow-400 mb-2">Quick Links</h4>
  <ul className="space-y-2 text-gray-300">
    <li>
      <Link href="/" className="hover:text-white transition underline-offset-2 hover:underline">
        Home
      </Link>
    </li>
    <li>
      <Link href="/donors" className="hover:text-white transition underline-offset-2 hover:underline">
        Find Donors
      </Link>
    </li>
    <li>
      <Link href="/register" className="hover:text-white transition underline-offset-2 hover:underline">
        Register
      </Link>
    </li>
    <li>
      <Link href="/about" className="hover:text-white transition underline-offset-2 hover:underline">
        About
      </Link>
    </li>
  </ul>
</div>


        {/* Created By */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <p className="text-gray-400 uppercase tracking-wide text-sm">Created by</p>
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: '0px 15px 25px rgba(255,215,0,0.3)' }}
            className="flex items-center gap-3 cursor-pointer transition-shadow duration-300 bg-white/5 p-2 rounded-xl"
          >
            <Image
              src="/sadi.png"
              alt="Mahmudul Hasan Sadi"
              width={60}
              height={60}
              className="rounded-full border-2 border-yellow-400"
            />
            <div className="flex flex-col">
              <p className="font-semibold text-white text-lg">Mahmudul Hasan Sadi</p>
              <p className="text-gray-300 text-sm">Frontend Developer</p>
            </div>
          </motion.div>
          <p className="text-gray-400 text-xs mt-4">
            © {new Date().getFullYear()} DIC Blood Bank. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
