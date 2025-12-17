'use client'
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Heart, Quote, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Story Card Component
interface Story {
  id: number;
  name: string;
  location: string;
  bloodType: string;
  donations: number;
  story: string;
}

// Story Card Component
function StoryCard({ story }: { story: Story }) {
  return (
    <motion.article
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col min-w-[300px] w-[320px] md:w-[350px] shrink-0 h-full border border-slate-100"
    >
      {/* Image Section - Smaller Height */}
      <div className="relative h-48 overflow-hidden bg-slate-100 flex items-center justify-center">
        {/* Generic Outline Pattern Background */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
        
        {/* Generic Avatar */}
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-sm z-10">
            <User className="w-10 h-10 text-slate-400" />
        </div>
        
        {/* Floating Quote Icon */}
        <div className="absolute top-3 right-3 bg-rose-500 rounded-full p-2 shadow-lg z-20">
          <Quote className="w-4 h-4 text-white fill-current" />
        </div>

        {/* Donor Badge */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-slate-100 shadow-sm z-20">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
          <span className="text-xs font-bold text-slate-700">{story.donations} Donations</span>
        </div>
      </div>

      {/* Content Section - Compact Padding */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Name & Location */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-slate-800 mb-0.5">
            {story.name}
          </h3>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
            {story.location} • <span className="text-rose-600 font-bold">{story.bloodType}</span>
          </p>
        </div>

        {/* Story Excerpt */}
        <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          "{story.story}"
        </p>

        {/* Read More Button - Subtle */}
        <button className="group/btn w-full bg-slate-50 hover:bg-rose-600 text-slate-700 hover:text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 text-sm">
          Read Full Story
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.article>
  );
}

// Main Component
export default function DonorStoriesSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-50px" });
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
        // Calculate scrollable width: scrollWidth - clientWidth
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  // Sample donor stories data
  const donorStories = [
    {
      id: 1,
      name: 'আহমেদ হাসান',
      location: 'ঢাকা',
      bloodType: 'B+',
      donations: 25,
      story: 'আমি প্রথমবার রক্ত দান করি যখন আমার বন্ধুর বাবার জরুরি প্রয়োজন ছিল। সেই অভিজ্ঞতা আমার জীবন বদলে দিয়েছে। এখন প্রতি তিন মাসে নিয়মিত রক্ত দান করি।'
    },
    {
      id: 2,
      name: 'Fatima Khanum',
      location: 'Chittagong',
      bloodType: 'O+',
      donations: 18,
      story: 'As a teacher, I believe donating blood is a civic duty. I encourage my students to participate. Every donation creates a new possibility for life.'
    },
    {
      id: 3,
      name: 'রাহুল দাস',
      location: 'সিলেট',
      bloodType: 'A+',
      donations: 32,
      story: 'আমার মা একবার দুর্ঘটনায় পড়েছিলেন। সেদিন যারা রক্ত দিয়েছিলেন, তাদের কাছে আমি চিরকৃতজ্ঞ। এখন আমি নিয়মিত রক্তদান করি অন্যদের সাহায্য করার জন্য।'
    },
    {
      id: 4,
      name: 'Sabina Akter',
      location: 'Rajshahi',
      bloodType: 'AB+',
      donations: 12,
      story: 'I was scared the first time, but realized how easy and important it is. Now I am a regular donor and advocate for the cause.'
    },
    {
      id: 5,
      name: 'কামাল উদ্দিন',
      location: 'খুলনা',
      bloodType: 'O-',
      donations: 40,
      story: 'O নেগেটিভ রক্তের দাতা হিসেবে আমি জানি আমার রক্ত সবচেয়ে বেশি প্রয়োজন হয়। গত ১০ বছরে ৪০ বার রক্ত দান করেছি এবং এটা আমার জীবনের সবচেয়ে গর্বের বিষয়।'
    },
    {
      id: 6,
      name: 'Dr. Nazma Begum',
      location: 'Barisal',
      bloodType: 'B-',
      donations: 15,
      story: 'Seeing patients recover because of blood donation inspires me every day. It is not just charity, it is a service to humanity.'
    }
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-rose-50 px-3 py-1 rounded-full mb-4 border border-rose-100">
              <Heart className="w-4 h-4 text-rose-600 fill-current" />
              <span className="text-rose-600 font-bold text-xs uppercase tracking-wider">
                Real Heroes
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Inspiring Stories
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Meet the everyday heroes making an extraordinary impact in our community.
            </p>
          </div>

          {/* Navigation Hints */}
          <div className="hidden md:flex gap-2">
            <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400">
                <ChevronLeft className="w-5 h-5" />
            </div>
            <div className="w-10 h-10 rounded-full bg-rose-600 flex items-center justify-center text-white shadow-lg shadow-rose-200">
                <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        </motion.div>

        {/* Slider Container */}
        <motion.div 
            ref={carouselRef} 
            className="cursor-grab active:cursor-grabbing"
            whileTap={{ cursor: "grabbing" }}
        >
            <motion.div 
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
                className="flex gap-6 pb-8"
            >
                {donorStories.map((story) => (
                    <StoryCard key={story.id} story={story} />
                ))}
            </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
