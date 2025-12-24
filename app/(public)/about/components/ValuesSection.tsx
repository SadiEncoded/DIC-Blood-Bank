'use client';
import { motion } from 'framer-motion';
import { Heart, HeartHandshake, ShieldCheck, Users } from 'lucide-react';
import { Container, Section } from '@/components/ui';

const values = [
  {
    icon: <Heart size={20} strokeWidth={2} />,
    title: 'Humanity & Life Saving',
    bangla: 'মানবিকতা ও জীবনরক্ষা',
    desc: 'মানবিকতা ও জীবনসেবার মহান সংকল্প নিয়ে আমরা কাজ করি। আমাদের স্বপ্ন চাঁদপুর জেলাকে রক্ত সংকদমমুক্ত একটি আদর্শ এলাকা হিসেবে গড়ে তোলা।',
    color: 'text-rose-600',
    circle: 'bg-rose-50',
    accent: 'bg-rose-500'
  },
  {
    icon: <ShieldCheck size={20} strokeWidth={2} />,
    title: 'Transparency & Security',
    bangla: 'স্বচ্ছতা ও নিরাপত্তা',
    desc: 'প্রতিটি রক্তদান এবং তথ্যের সঠিকতা নিশ্চিত করা আমাদের অন্যতম লক্ষ্য। নিরাপত্তা ও বিশ্বাসের ভিত্তিতে আমরা রক্তগ্রহীতা ও রক্তদাতাকে একত্রিত করি।',
    color: 'text-blue-600',
    circle: 'bg-blue-50',
    accent: 'bg-blue-500'
  },
  {
    icon: <Users size={20} strokeWidth={2} />,
    title: 'Student-led Social Impact',
    bangla: 'শিক্ষার্থী-নেতৃত্বাধীন সামাজিক প্রভাব',
    desc: 'প্রযুক্তি, ডিজাইন এবং মানবিক মূল্যবোধ যে সমাজ পরিবর্তন করতে পারে তার জীবন্ত প্রমাণ এই শিক্ষার্থী পরিচালিত প্ল্যাটফর্ম।',
    color: 'text-emerald-600',
    circle: 'bg-emerald-50',
    accent: 'bg-emerald-500'
  },
  {
    icon: <HeartHandshake size={20} strokeWidth={2} />,
    title: 'Fast Service & Accessibility',
    bangla: 'দ্রুত সেবা ও সহজ প্রবেশাধিকার',
    desc: 'সময়মতো রক্তপ্রাপ্তি নিশ্চিত করা এবং প্রতিটি রক্তদানকে সহজবোধ্য করাই আমাদের সার্থকতা। আপনার এক ব্যাগ রক্ত জীবন বাঁচাতে পারে।',
    color: 'text-violet-600',
    circle: 'bg-violet-50',
    accent: 'bg-violet-500'
  }
];

export default function ValuesSection() {
  return (
    <Section>
      <Container>

        <div className="flex flex-col lg:flex-row gap-0">
          
          {/* Left: Sticky Manifesto (Fixed height on desktop) */}
          <div className="lg:w-5/12 py-32 lg:h-[100vh] lg:sticky lg:top-0 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[10px] font-bold tracking-[0.5em] text-rose-600 uppercase block mb-6">
                Our Foundation
              </span>

              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-poppins tracking-tighter leading-tight mb-8"> 
                মূল্যবোধ ও <span className="text-slate-400 font-light italic underline decoration-slate-200 underline-offset-8">নীতিমালা</span>
              </h2>

              <p className="text-slate-500 font-hind text-lg leading-relaxed max-w-sm">
                মানবিকতা, নৈতিকতা এবং সামাজিক দায়িত্ব—এই নীতিগুলোর উপর দাঁড়িয়ে 
                DIC Blood Bank প্রতিটি সিদ্ধান্ত গ্রহণ করে।
              </p>
              
              {/* Visual Indicator */}
              <div className="mt-12 flex items-center gap-4 group">
                 <div className="h-px w-12 bg-slate-200 group-hover:w-20 transition-all duration-500" />
                 <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Scroll to explore</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Scrollable Values List */}
          <div className="lg:w-7/12 py-12 lg:py-32">
            <div className="space-y-4">
              {values.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="group relative p-8 md:p-12 rounded-[2.5rem] transition-all duration-500 hover:bg-slate-50 border border-transparent hover:border-slate-100"
                >
                  {/* Vertical Accent Bar */}
                  <div 
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-0 group-hover:h-2/3 ${item.accent} rounded-r-full transition-all duration-500 opacity-0 group-hover:opacity-100`}
                  />

                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Index + Icon */}
                    <div className="flex items-center gap-6 shrink-0">
                      <span className="text-xs font-mono font-bold text-slate-300 group-hover:text-slate-900 transition-colors">
                        0{index + 1}
                      </span>
                      <div className={`p-4 rounded-2xl ${item.circle} ${item.color} shadow-sm group-hover:scale-110 transition-all duration-500`}>
                        {item.icon}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1">
                      <div className="flex flex-col mb-4">
                        <h3 className="text-2xl font-bold text-slate-900 font-poppins tracking-tight">
                          {item.title}
                        </h3>
                        <span className="text-[13px] font-bold text-rose-500/80 font-hind uppercase tracking-[0.1em] mt-1">
                          {item.bangla}
                        </span>
                      </div>
                      
                      <p className="text-slate-600 font-hind text-lg leading-[1.8] max-w-xl">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* End of List Marker */}
            <div className="mt-20 flex justify-center lg:justify-start lg:pl-12">
               <div className="h-1.5 w-1.5 rounded-full bg-slate-200" />
               <div className="mx-2 h-1.5 w-1.5 rounded-full bg-slate-200 opacity-50" />
               <div className="h-1.5 w-1.5 rounded-full bg-slate-200 opacity-25" />
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
}
