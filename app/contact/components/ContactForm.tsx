'use client'

import { Textarea } from '@/components/forms'
import { Button, Input } from '@/components/ui'
import { Mail, User } from 'lucide-react'

export default function ContactForm() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-fluid-card font-heading-opt font-semibold mb-6 text-slate-900">
        বার্তা পাঠান
      </h3>

      <form className="space-y-5">
        <Input 
          label="নাম" 
          placeholder="আপনার পূর্ণ নাম"
          icon={<User className="w-4 h-4" />}
        />
        
        <Input 
          label="ইমেইল" 
          placeholder="example@email.com" 
          type="email"
          icon={<Mail className="w-4 h-4" />}
        />
        
        <Input 
          label="বিষয়" 
          placeholder="বার্তার বিষয়"
        />

        <Textarea
          label="বার্তা"
          rows={4}
          placeholder="আপনার বার্তা লিখুন"
        />

        <Button
          type="submit"
          variant="gradient"
          size="lg"
          fullWidth
          className="mt-4"
        >
          পাঠান
        </Button>
      </form>
    </div>
  )
}
