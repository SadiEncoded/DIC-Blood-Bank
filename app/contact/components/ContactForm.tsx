'use client'

import { submitContactForm } from '@/app/lib/actions/forms'
import { Textarea } from '@/components/forms'
import { Button, FormField, Input } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, MessageSquare, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'আপনার নাম কমপক্ষে ২ অক্ষরের হতে হবে'),
  email: z.string().email('সঠিক ইমেইল এড্রেস প্রদান করুন'),
  subject: z.string().min(3, 'বিষয় উল্লেখ করুন'),
  message: z.string().min(10, 'বার্তাটি কমপক্ষে ১০ অক্ষরের হতে হবে'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    const result = await submitContactForm(data)
    if (result.success) {
      toast.success(result.message)
      reset()
    } else {
      toast.error(result.message)
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-fluid-card font-heading-opt font-semibold mb-6 text-slate-900">
        বার্তা পাঠান <span className="text-slate-400 font-normal text-sm font-poppins">/ Send Message</span>
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormField label="নাম / Name" error={errors.name}>
          <Input 
            {...register('name')}
            placeholder="আপনার পূর্ণ নাম"
            icon={<User className="w-4 h-4" />}
          />
        </FormField>
        
        <FormField label="ইমেইল / Email" error={errors.email}>
          <Input 
            {...register('email')}
            placeholder="example@email.com" 
            type="email"
            icon={<Mail className="w-4 h-4" />}
          />
        </FormField>
        
        <FormField label="বিষয় / Subject" error={errors.subject}>
          <Input 
            {...register('subject')}
            placeholder="বার্তার বিষয়"
            icon={<MessageSquare className="w-4 h-4" />}
          />
        </FormField>

        <FormField label="বার্তা / Message" error={errors.message}>
          <Textarea
            {...register('message')}
            rows={4}
            placeholder="আপনার বার্তা লিখুন"
          />
        </FormField>

        <Button
          type="submit"
          variant="gradient"
          size="lg"
          fullWidth
          disabled={isSubmitting}
          className="mt-4"
        >
          {isSubmitting ? 'প্রসেসিং...' : 'পাঠান / Send Message'}
        </Button>
      </form>
    </div>
  )
}
