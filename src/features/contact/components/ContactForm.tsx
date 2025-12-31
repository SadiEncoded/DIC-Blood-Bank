'use client'

import { Textarea } from '@/components/common/forms'
import { Button, FormField, Input } from '@/components/ui'
import { submitContactForm } from '@/features/forms/services'
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
    <div className="w-full max-w-2xl mx-auto rounded-2xl md:rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
      <h3 className="text-xl md:text-3xl font-heading-opt font-bold mb-6 text-slate-900 text-center md:text-left leading-tight relative z-10">
        বার্তা পাঠান <span className="text-slate-400 font-medium text-xs md:text-sm font-poppins block md:inline md:ml-2 mt-1 md:mt-0">/ Send Message</span>
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6 relative z-10">
        <FormField label="নাম / Name" error={errors.name} icon={<User className="w-4 h-4" />}>
          <Input 
            {...register('name')}
            placeholder="আপনার পূর্ণ নাম"
          />
        </FormField>
        
        <FormField label="ইমেইল / Email" error={errors.email} icon={<Mail className="w-4 h-4" />}>
          <Input 
            {...register('email')}
            placeholder="example@email.com" 
            type="email"
          />
        </FormField>
        
        <FormField label="বিষয় / Subject" error={errors.subject} icon={<MessageSquare className="w-4 h-4" />}>
          <Input 
            {...register('subject')}
            placeholder="বার্তার বিষয়" 
          />
        </FormField>

        <FormField label="বার্তা / Message" error={errors.message}>
          <Textarea
            {...register('message')}
            rows={4}
            placeholder="আপনার বার্তা লিখুন"
            className="min-h-[120px]"
          />
        </FormField>

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          disabled={isSubmitting}
          className="mt-6 md:mt-8 py-3 md:py-4 text-sm md:text-base"
        >
          {isSubmitting ? 'প্রসেসিং...' : 'পাঠান / Send Message'}
        </Button>
      </form>
    </div>
  )
}
