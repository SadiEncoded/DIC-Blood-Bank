'use client';

import { FOUNDATION_STORY, FOUNDERS, TeamMember } from '@/lib/data/about';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import Image from 'next/image';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function FounderSlider() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[11px] font-black tracking-[0.4em] text-rose-500 uppercase block mb-4">
              Legacy of Phoenix&apos;24
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-poppins tracking-tighter">
              প্রতিষ্ঠা ও বিকাশের গল্প
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="hidden md:block h-px flex-grow mx-12 bg-slate-200"
          />
          
          <div className="text-slate-400 text-sm font-anek-bangla italic">
            Building for a safer Chandpur.
          </div>
        </div>

        {/* Foundation Text */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mb-20"
        >
          <p className="text-lg md:text-xl text-slate-600 font-hind leading-relaxed">
            {FOUNDATION_STORY.content}
          </p>
        </motion.div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: '.custom-pagination' }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2, spaceBetween: 50 },
          }}
          className="pb-20"
        >
          {FOUNDERS.map((member: TeamMember, index: number) => (
            <SwiperSlide key={index}>
              <div className="group flex flex-col md:flex-row gap-8 items-center md:items-start p-2">
                {/* Compact Profile Image */}
                <div className="flex-shrink-0">
                  <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border border-slate-100 grayscale group-hover:grayscale-0 transition-all duration-700">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Content Side */}
                <div className={`relative pt-4 md:pt-0 border-t md:border-t-0 md:border-l-2 border-primary md:pl-8 transition-colors duration-500 text-center md:text-left`}>
                  <Quote size={20} className="text-slate-200 mb-4 mx-auto md:mx-0" />
                  
                  <p className="text-slate-600 font-hind text-base md:text-lg leading-relaxed mb-6 italic">
                    {member.quote}
                  </p>

                  <div>
                    <h4 className="text-lg font-bold text-slate-900 font-poppins leading-none">
                      {member.name}
                    </h4>
                    <p className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase mt-2">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination Style */}
        <div className="custom-pagination flex justify-center gap-2 mt-4" />
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #e2e8f0;
          opacity: 1;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 4px;
          background: #f43f5e;
        }
      `}</style>
    </section>
  );
}
