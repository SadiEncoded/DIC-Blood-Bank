'use client'

import { CONTACT_INFO, CONTACT_PAGE_CONTENT } from '@/assets/data/contact';
import { Mail, User } from 'lucide-react';
import EmergencyContact from './EmergencyContact';
import InfoRow from './InfoRow';

interface SocialLink {
  icon: React.ElementType;
  href: string;
  label: string;
}

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl sm:text-2xl md:text-fluid-section font-heading-opt text-slate-900 mb-2">
        {CONTACT_PAGE_CONTENT.info.title}
      </h2>
      <p className="text-sm sm:text-base text-slate-600 font-hind leading-relaxed">
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
                  className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-rose-600 hover:border-rose-200 transition-all"
                  title={social.label}
                >
                  <Icon size={16} className="md:w-[18px] md:h-[18px]" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
