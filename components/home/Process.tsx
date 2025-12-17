'use client'
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Search, UserPlus } from 'lucide-react';
import { useRef } from 'react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const fadeInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8 }
  }
};

export default function CallToActionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      {/* Main CTA Section - Light Background */}
      <section 
        ref={ref}
        className="relative py-20 md:py-28 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              variants={{
                animate: {
                  transition: { staggerChildren: 0.15 }
                }
              }}
              className="z-10"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              >
                রক্তদানে এগিয়ে আসুন
              </motion.h2>
              
              <motion.div 
                variants={fadeInUp}
                className="space-y-4 mb-8 text-gray-700 leading-relaxed"
              >
                <p className="text-base md:text-lg">
                  রক্তদান কোনো কঠিন কাজ নয়, বরং এর মাধ্যমে আপনি সহজেই অন্য একজন মানুষের জীবন বাঁচাতে পারেন। কিন্তু দুর্ভাগ্যজনকভাবে, প্রতিবছর বহু মানুষ জরুরি মুহূর্তে প্রয়োজনীয় রক্তের অভাবে মারা যায়। আপনার সামান্য পরিমাণ রক্তদানের মাধ্যমে একটি জীবন বাঁচানো সম্ভব।
                </p>
                <p className="text-base md:text-lg">
                  আমাদের সিস্টেমের মাধ্যমে রক্তদাতাদের তথ্য সংরক্ষণ করে আমরা জরুরি মুহূর্তে দ্রুত রক্তদাতা খুঁজে পেতে সাহায্য করি। যারা রক্তদানে ইচ্ছুক তারা রেজিস্ট্রেশন করে রক্তদাতা হিসেবে যুক্ত হতে পারেন। জরুরি প্রয়োজনে রক্তদাতাদের সহজেই খুঁজে পাওয়া যায়।
                </p>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button className="group bg-rose-600 hover:bg-rose-700 text-white font-semibold px-8 py-4 rounded-lg flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl">
                  <UserPlus className="w-5 h-5" />
                  রক্তদাতা হন
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button className="group bg-gray-900 hover:bg-black text-white font-semibold px-8 py-4 rounded-lg flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl">
                  <Search className="w-5 h-5" />
                  রক্তদাতা খুঁজুন
                </button>
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              variants={fadeInRight}
              className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-1/2 h-[400px] lg:h-[600px]"
            >
              <div className="relative w-full h-full rounded-lg lg:rounded-none overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1615461065929-4f8ffed6ca40?w=800&auto=format&fit=crop&q=80"
                  alt="Person with blood drop on arm showing blood donation"
                  className="w-full h-full object-cover object-center lg:object-left"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-gray-50/80 lg:to-gray-100/80"></div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Bottom Banner - Dark Background */}
      <section className="relative py-8 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-purple-600"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-6 relative z-10"
        >
          <p className="text-center text-lg md:text-xl lg:text-2xl font-light italic">
            "আপনার এক ফোঁটা রক্ত, বাঁচাতে পারে একটি প্রাণ"
          </p>
        </motion.div>
      </section>
    </>
  );
}
