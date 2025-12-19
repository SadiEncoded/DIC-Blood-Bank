'use client';

import { CONTACT_INFO, DEVELOPER_INFO } from '@/app/lib/data/contact';
import { Code2, ExternalLink, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Become a Donor', href: '/donate' },
    { label: 'Events', href: '/events' },
    { label: 'About Us', href: '/about' },
  ];

  const resources = [
    { label: 'Blood Donation Guide', href: '/guide' },
    { label: 'Eligibility Check', href: '/eligibility' },
    { label: 'FAQs', href: '/faq' },
    { label: 'Emergency Request', href: '/searchDonor' },
  ];

  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Main Grid: Stacked on mobile, 4 columns on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">

          {/* Brand - Full width on mobile, 4/12 on desktop */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-6">
            <div className="relative w-48 h-12"> {/* Adjusted height to prevent logo squashing */}
              <Image
                src="/blood-bank-logo.png"
                alt="DIC Blood Bank Logo"
                fill
                className="object-contain object-left"
              />
            </div>

            <p className="text-slate-600 text-sm leading-relaxed max-w-sm font-hind">
              A student-led humanitarian initiative connecting voluntary blood donors
              with patients in need across the Chandpur region.
            </p>

            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center">
                   <CONTACT_INFO.address.icon size={14} className="text-rose-600" />
                </div>
                {CONTACT_INFO.address.full}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center">
                  <Phone size={14} className="text-rose-600" />
                </div>
                {CONTACT_INFO.phones.primary}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {CONTACT_INFO.socials.map((link, i) => {
                const Icon = link.icon;
                return (
                  <a
                    key={i}
                    href={link.href}
                    aria-label={link.label}
                    className="w-10 h-10 rounded-xl bg-white border border-slate-200
                               flex items-center justify-center text-slate-500
                               hover:border-rose-300 hover:text-rose-600 hover:shadow-sm transition-all"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-rose-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-6">
              Resources
            </h4>
            <ul className="space-y-3">
              {resources.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-rose-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Developer Attribution */}
          <div className="sm:col-span-2 lg:col-span-3">
            <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-6">
              Technical Development
            </h4>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-100 ring-2 ring-slate-50">
                  <Image
                    src={DEVELOPER_INFO.image}
                    alt={DEVELOPER_INFO.name}
                    fill
                    className="object-cover"
                  />
                </div>
 
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">
                    {DEVELOPER_INFO.name}
                  </p>
                  <p className="text-[10px] text-slate-500 flex items-center gap-1 uppercase tracking-tight">
                    <Code2 size={12} className="text-rose-500" />
                    {DEVELOPER_INFO.role}
                  </p>
                </div>
 
                <a href={DEVELOPER_INFO.socials.find(s => s.label === 'GitHub')?.href || '#'} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
                   <ExternalLink size={14} className="text-slate-400" />
                </a>
              </div>
 
              <div className="flex gap-4 pt-4 mt-4 border-t border-slate-100">
                {DEVELOPER_INFO.socials.map((social, i) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-rose-600 transition-colors"
                      title={social.label}
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row
                        items-center justify-between gap-6">
          <p className="text-xs text-slate-400 font-hind order-2 md:order-1">
            © {new Date().getFullYear()} DIC Blood Bank. Built with heart for Chandpur.
          </p>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-[10px] font-bold uppercase tracking-widest order-1 md:order-2">
            <Link href="/privacy" className="text-slate-500 hover:text-rose-600 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-slate-500 hover:text-rose-600 transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="text-slate-500 hover:text-rose-600 transition-colors">
              Contact
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
