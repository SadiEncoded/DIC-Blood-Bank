'use client'

import { CONTACT_INFO, CONTACT_PAGE_CONTENT } from '@/lib/data/contact';
import { Mail, User } from 'lucide-react';
import InfoRow from '../components/InfoRow';
import EmergencyContact from './EmergencyContact';

interface SocialLink {
  icon: React.ElementType;
  href: string;
  label: string;
}

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <h2 className="text-fluid-section font-heading-opt text-slate-900 mb-2">
        {CONTACT_PAGE_CONTENT.info.title}
      </h2>
      <p className="text-slate-600 font-hind leading-relaxed">
        {CONTACT_PAGE_CONTENT.info.description}
      </p>

      <div className="space-y-4">
        <InfoRow icon={User} label="Institution" value={CONTACT_INFO.institution} />
        
        <EmergencyContact />

        <div className="pt-2">
          <InfoRow icon={Mail} label="Official Email" value={CONTACT_INFO.emails.official} />
        </div>
        
        <div className="pt-4 border-t border-slate-100 mt-6">
          <div className="text-xs font-medium uppercase text-slate-500 font-poppins mb-2">
            Official Socials
          </div>
          <div className="flex gap-3">
            {CONTACT_INFO.socials.map((social: any, idx: number) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-rose-600 hover:border-rose-200 transition-all"
                  title={social.label}
                >
                  <Icon size={18} />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
