'use client';

import { motion } from 'framer-motion';
import { Github, Heart, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const socialLinks = [
    { icon: Mail, href: '#', label: 'Email' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'Github' },
  ];

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Find Donors', href: '/donors' },
    { label: 'Register to Donate', href: '/donate' },
    { label: 'About Us', href: '/about' },
  ];

  const resources = [
    { label: 'Blood Donation Guide', href: '/guide' },
    { label: 'Eligibility Check', href: '/eligibility' },
    { label: 'FAQs', href: '/faq' },
    { label: 'Emergency Request', href: '/searchDonor' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-50 via-white to-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-red-600 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <h3 className="font-bold text-2xl text-gray-900">DIC Blood Bank</h3>
            </div>
            
            <p className="text-gray-600 leading-relaxed mb-6 text-sm">
              A student-led initiative connecting donors with those in need, delivering hope and saving lives across the Chandpur region.
            </p>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>Chandpur, Chittagong, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-rose-500" />
                <span>+880 1234-567890</span>
              </div>
            </div>

            <div className="flex gap-2">
              {socialLinks.map((link, idx) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={idx}
                    href={link.href}
                    aria-label={link.label}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-rose-500 flex items-center justify-center text-gray-700 hover:text-white transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.href} 
                    className="text-gray-600 hover:text-rose-600 transition-colors text-sm inline-flex items-center group"
                  >
                    <span className="w-0 h-px bg-rose-600 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-3">
            <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2.5">
              {resources.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.href} 
                    className="text-gray-600 hover:text-rose-600 transition-colors text-sm inline-flex items-center group"
                  >
                    <span className="w-0 h-px bg-rose-600 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Developer Card */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Developed By</h4>
            <motion.a
              href="#"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="block relative overflow-hidden bg-gradient-to-br from-white to-gray-50 p-4 rounded-2xl border border-gray-200 hover:border-rose-300 hover:shadow-xl transition-all duration-300 group"
            >
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-50/0 to-rose-100/0 group-hover:from-rose-50/50 group-hover:to-rose-100/30 transition-all duration-300" />
              
              <div className="relative">
                <div className="flex items-start gap-3 mb-3">
                  <div className="relative">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden ring-2 ring-rose-500 ring-offset-2 group-hover:ring-rose-600 transition-all">
                      <Image
                        src="/Creator-img.png"
                        alt="Mahmudul Hasan Sadi"
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* Online Status Indicator */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-sm mb-0.5 group-hover:text-rose-600 transition-colors">
                      Mahmudul Hasan Sadi
                    </p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Lead Developer</p>
                  </div>
                </div>
                
                {/* Social Links */}
                <div className="flex gap-1.5 pt-2 border-t border-gray-100">
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="w-7 h-7 rounded-lg bg-gray-100 group-hover:bg-rose-500 flex items-center justify-center transition-colors"
                  >
                    <Github className="w-3.5 h-3.5 text-gray-600 group-hover:text-white transition-colors" />
                  </motion.span>
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="w-7 h-7 rounded-lg bg-gray-100 group-hover:bg-rose-500 flex items-center justify-center transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-gray-600 group-hover:text-white transition-colors" />
                  </motion.span>
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="w-7 h-7 rounded-lg bg-gray-100 group-hover:bg-rose-500 flex items-center justify-center transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-gray-600 group-hover:text-white transition-colors" />
                  </motion.span>
                </div>
              </div>
            </motion.a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} DIC Blood Bank. Saving lives, one donation at a time.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-500 hover:text-rose-600 transition-colors">
                Privacy Policy
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/terms" className="text-gray-500 hover:text-rose-600 transition-colors">
                Terms of Service
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/contact" className="text-gray-500 hover:text-rose-600 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
