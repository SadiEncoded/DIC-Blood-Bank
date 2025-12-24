'use client';

import { EnrichedDonorStory } from '@/lib/types/donorStory';
import { motion } from 'framer-motion';
import { Heart, Quote } from 'lucide-react';

interface DonorStoriesSectionProps {
  initialStories?: EnrichedDonorStory[];
}

export default function DonorStoriesSection({ initialStories = [] }: DonorStoriesSectionProps) {
  // Use featured stories or first 2
  const featured = initialStories.filter(s => s.is_featured);
  const stories = (featured.length > 0 ? featured : initialStories).slice(0, 2);

  if (stories.length === 0) return null;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-full text-sm font-bold mb-6"
          >
            <Heart size={16} fill="currentColor" /> REAL IMPACT
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-poppins"
          >
            Stories of <span className="text-rose-600">Hope & Healing</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 max-w-2xl mx-auto font-hind"
          >
            Every drop of blood tells a story. Here are just a few of the many lives touched by the generosity of our donors.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-50 rounded-[3rem] p-10 relative"
            >
              <Quote
                className="absolute top-10 right-10 text-rose-200"
                size={60}
              />
              <div className="relative z-10">
                <p className="text-xl text-slate-700 font-hind leading-relaxed mb-8 italic">
                  "{story.content.substring(0, 200)}..."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-rose-600 font-bold shadow-sm">
                    {story.donor_name?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 font-poppins">
                      {story.donor_name}
                    </h4>
                    <p className="text-sm text-slate-400 font-hind">
                        {story.blood_type} Donor • {story.donations || 0} Donations
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
