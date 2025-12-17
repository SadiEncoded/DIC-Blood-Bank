'use client';

import { motion, useInView } from 'framer-motion';
import { ArrowRight, Clock, Droplet, Shield, Users } from 'lucide-react';
import { useRef } from 'react';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const imageScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.8 }
  }
};

// Color theme configurations
const colorThemes = {
  rose: {
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    gradient: 'from-rose-400 via-rose-500 to-rose-600'
  },
  blue: {
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    gradient: 'from-blue-400 via-blue-500 to-blue-600'
  },
  purple: {
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    gradient: 'from-purple-400 via-purple-500 to-purple-600'
  }
};

// Reusable Info Card Component
function InfoCard({ title, items, colorTheme, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const theme = colorThemes[colorTheme];

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={fadeInUp}
      transition={{ delay }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col"
    >
      <div className="p-6 md:p-8 flex-1">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          {title}
        </h2>
        
        <ul className="space-y-4 mb-8">
          {items.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <li key={index} className="flex items-start gap-3">
                <div className={`mt-1 ${theme.iconBg} rounded-full p-1 flex-shrink-0`}>
                  <IconComponent 
                    className={`w-4 h-4 ${theme.iconColor} ${
                      item.icon === Droplet ? 'fill-current' : ''
                    }`} 
                  />
                </div>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  {item.text}
                </p>
              </li>
            );
          })}
        </ul>

        <button 
          className="group w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl"
          aria-label={`Read more about ${title}`}
        >
          Read More...
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      
      {/* Bottom gradient strip */}
      <div className={`h-2 bg-gradient-to-r ${theme.gradient}`} aria-hidden="true"></div>
    </motion.div>
  );
}

// Reusable Image Component
function DonationImage({ src, alt, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={imageScale}
      transition={{ delay }}
      className="relative rounded-2xl overflow-hidden shadow-2xl w-full h-full min-h-[350px] md:min-h-[400px] lg:min-h-[500px]"
    >
      <div className="absolute inset-0">
        <img 
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" aria-hidden="true"></div>
    </motion.div>
  );
}

// Main Component
export default function BloodDonationInfo() {
  // Card data configuration
  const whyDonateData = [
    {
      icon: Droplet,
      text: 'প্রথম এবর প্রধান কারণ, আপনার দানকৃত রক্ত একজন মানুষের জীবন বাঁচবে। রক্তদানের জন্য এর থেকে বড় কারণ আর কি হতে পারে!'
    },
    {
      icon: Shield,
      text: 'হৃদরোগ একলিপ্স আপনার নিজের প্রয়োজনে/ বিপদে জন্য কেউ এগিয়ে আসবে।'
    },
    {
      icon: Users,
      text: 'নিয়মিতভাবেদানে হার্টরোগ ও চাই অ্যাটাকের ঝুঁকি অনেক কম।'
    }
  ];

  const whoCanDonateData = [
    {
      icon: Clock,
      text: '১৮ বছর থেকে ৬০ বছরের যেকোনো সুস্থদেহের মানুষ রক্ত দান করতে পারবেন।'
    },
    {
      icon: Shield,
      text: 'শারীরিক এবং মানসিক ভাবে সুস্থ নিরোগ ব্যক্তি রক্ত দিতে পারবেন।'
    },
    {
      icon: Users,
      text: 'আপনার ওজন অন্তত ৫০ কিলোগ্রাম কিংবা তার বেশি হতে হবে।'
    },
    {
      icon: Droplet,
      text: 'চার (৪) মাস অন্তর অন্তর রক্তদান করা যায়।'
    }
  ];

  const misconceptionsData = [
    {
      icon: Shield,
      text: 'রক্ত দান করার সময় মোটেও ব্যথা লাগে না। শুধুমাত্র সূচ ফোটানোর সময় অল্প একটু অস্বস্তি লাগে।'
    },
    {
      icon: Droplet,
      text: 'রক্তদানের পর স্বাস্থ্য খারাপ হয়ে যাবে – এটি ভুল ধারণা। আসলে রক্তদান করলে হৃদরোগের ঝুঁকি কমে এবং দেহে মাত্রাতিরিক্ত আয়রন বা লৌহ সঞ্চয় প্রতিরোধ করে।'
    },
    {
      icon: Users,
      text: 'ডায়াবেটিসে আক্রান্ত ব্যক্তি রক্ত দিতে পারবে না – এটিও ভুল ধারণা। স্বাস্থ্য পরীক্ষায় যোগ্য বিবেচিত হলে…'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50" aria-labelledby="donation-info-heading">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Row: Card - Image - Card */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          <InfoCard 
            title="কেন রক্তদান করবেন?"
            items={whyDonateData}
            colorTheme="rose"
            delay={0}
          />
          
          <DonationImage
            src="https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=800&auto=format&fit=crop&q=80"
            alt="Blood donation process showing medical professional preparing donor's arm"
            delay={0.2}
          />
          
          <InfoCard 
            title="কারা রক্তদান করতে পারবেন?"
            items={whoCanDonateData}
            colorTheme="blue"
            delay={0.2}
          />
        </div>

        {/* Bottom Row: Image - Card */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <DonationImage
            src="https://diariofarma.com/wp-content/uploads/2022/12/202212-recurso-donacion-de-sangre-800x533.jpg"
            alt="Healthcare professional examining blood sample in laboratory"
            delay={0.3}
          />
          
          <InfoCard 
            title="কিছু ভুল ধারনা"
            items={misconceptionsData}
            colorTheme="purple"
            delay={0.4}
          />
        </div>

      </div>
    </section>
  );
}
