'use client'

import { CONTACT_INFO } from '@/app/lib/data/contact'
import { Mail, User } from 'lucide-react'
import InfoRow from '../components/InfoRow';
import EmergencyContact from './EmergencyContact';

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <h2 className="text-fluid-section font-heading-opt text-slate-900 mb-2">
        যোগাযোগের তথ্য
      </h2>
      <p className="text-slate-600 font-hind leading-relaxed">
        জরুরি রক্তদানের প্রয়োজন, সাধারণ জিজ্ঞাসা অথবা সহযোগিতার জন্য নিচের মাধ্যমগুলো ব্যবহার করুন।
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
            {CONTACT_INFO.socials.map((social, idx) => {
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
