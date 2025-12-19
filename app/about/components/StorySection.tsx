'use client';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import Image from 'next/image';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const founders = [
  {
    name: "Mahmudul Hasan Sadi",
    role: "Web Developer",
    text: "DIC Blood Bank-এর ডিজিটাল প্ল্যাটফর্ম গড়ে তোলা এক রোমাঞ্চকর যাত্রা ছিল। Phoenix'24-এর এই উদ্যোগে প্রযুক্তিকে মানবিকতার সাথে যুক্ত করতে পেরে আমি গর্বিত।",
    image: "/FoundingTeam/Sadi(Web-Developer).jpg",
    color: "border-rose-500"
  },
  {
    name: "Mahin Binta Matin",
    role: "UI/UX Designer",
    text: "একটি সুন্দর ও সহজ ইন্টারফেসই পারে জীবন রক্ষার কাজকে সহজ করতে। আমরা চেয়েছি প্রতিটি ইউজার যেন স্বাচ্ছন্দ্যে রক্তদাতার খোঁজ পান।",
    image: "/FoundingTeam/Mahin.jpg",
    color: "border-blue-500"
  },
  {
    name: "Prottasha Chakraborty",
    role: "Data Analyst",
    text: "সঠিক সময়ে সঠিক রক্তদাতার তথ্য নিশ্চিত করাই আমার মূল লক্ষ্য ছিল। চাঁদপুর জেলার মানুষের জন্য একটি নির্ভরযোগ্য ডেটা ব্যাংক তৈরি করাই আমাদের সার্থকতা।",
    image: "/FoundingTeam/Prottasha.jpg",
    color: "border-emerald-500"
  },
  {
    name: "Barsha Rahman",
    role: "Content Creator",
    text: "সচেতনতা তৈরির মাধ্যমেই আমরা এই উদ্যোগকে মানুষের কাছাকাছি নিয়ে যেতে পেরেছি। কন্টেন্ট তৈরির প্রতিটি মুহূর্ত ছিল মানবিক দায়িত্ববোধে পরিপূর্ণ।",
    image: "/FoundingTeam/Barsha.jpg",
    color: "border-amber-500"
  },
  {
    name: "Prantik Chakrabarty",
    role: "Contact Admin",
    text: "জরুরি মুহূর্তে যোগাযোগ সমন্বয় এবং রক্তদাতার উপস্থিতি নিশ্চিত করাই আমার দায়িত্ব। আমরা বিশ্বাস করি সময়মতো চেষ্টা জীবন বাঁচাতে পারে।",
    image: "/FoundingTeam/Prantik.png",
    color: "border-slate-800"
  },
  {
    name: "Hasin Sheikh",
    role: "Contact Admin",
    text: "মানুষের বিপদে পাশে দাঁড়ানো এবং মাঠপর্যায়ে সমন্বয় করা আমাদের টিমের অন্যতম শক্তি। আমরা প্রতিটি সফল রক্তদানকে জীবন বাঁচানোর বিজয় হিসেবে দেখি।",
    image: "/FoundingTeam/Hasin.jpeg",
    color: "border-slate-800"
  },
  {
    name: "Sabrina Sultana",
    role: "Social Media Manager",
    text: "সামাজিক যোগাযোগ মাধ্যমে মানুষের এই উদ্যোগে সম্পৃক্ত করা এবং মুমূর্ষু রোগীর সাহায্য এগিয়ে আসার আহ্বানেই আমাদের সফলতা নিহিত।",
    image: "/FoundingTeam/Sabrina.png",
    color: "border-slate-800"
  }
];

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
            DIC Blood Bank প্রতিষ্ঠিত হয় <span className="text-rose-600 font-bold">২০ ডিসেম্বর ২০২৪</span> তারিখে। প্রাথমিকভাবে এটি Daffodil International College, বাবুরহাট ক্যাম্পাসের CSE ডিপার্টমেন্টের ২য় ব্যাচ (Phoenix&apos;24)-এর মধ্যে সীমাবদ্ধ ছিল। পরবর্তীতে প্রতিষ্ঠাতা দলের উদ্যোগ ও পরিকল্পনার মাধ্যমে এটি একটি বৃহৎ পরিসরে সম্প্রসারিত হয়—যেখানে চাঁদপুর জেলার সকল রক্তদাতা ও রক্তগ্রহীতা একটি নিরাপদ, বিশ্বাসযোগ্য এবং সংগঠিত প্ল্যাটফর্মে যুক্ত হওয়ার সুযোগ পান।
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
          {founders.map((member, index) => (
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
                <div className={`relative pt-4 md:pt-0 border-t md:border-t-0 md:border-l-2 ${member.color} md:pl-8 transition-colors duration-500 text-center md:text-left`}>
                  <Quote size={20} className="text-slate-200 mb-4 mx-auto md:mx-0" />
                  
                  <p className="text-slate-600 font-hind text-base md:text-lg leading-relaxed mb-6 italic">
                    {member.text}
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
