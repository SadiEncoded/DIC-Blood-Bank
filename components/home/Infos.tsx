'use client';

import { fadeInUp, imageScale } from '@/app/lib/animations';
import { INFO_SECTIONS } from '@/app/lib/data/homepage';
import { ColorThemeKey } from '@/app/lib/types';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Droplet } from 'lucide-react';
import { useRef } from 'react';
import { Container, Section } from '../ui';

const COLOR_THEMES: Record<ColorThemeKey, { iconBg: string; iconColor: string; gradient: string }> = {
  rose: {
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    gradient: 'from-rose-400 via-rose-500 to-rose-600',
  },
  blue: {
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    gradient: 'from-blue-400 via-blue-500 to-blue-600',
  },
  purple: {
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    gradient: 'from-purple-400 via-purple-500 to-purple-600',
  },
};

// Reusable Info Card Component
interface InfoCardProps {
  title: string;
  items: { icon: any; text: string }[];
  colorTheme: 'rose' | 'blue' | 'purple';
  delay?: number;
}

function InfoCard({ title, items, colorTheme, delay = 0 }: InfoCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const theme = COLOR_THEMES[colorTheme];

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={fadeInUp}
      transition={{ delay }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col"
    >
      <div className="p-3 md:p-6 flex-1">
        <h2 className="text-fluid-card font-heading-opt text-gray-900 mb-4 md:mb-6 font-poppins">
          {title}
        </h2>
        
        <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
          {items.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <li key={index} className="flex items-start gap-3">
                <div className={`mt-1 ${theme.iconBg} rounded-full p-1 flex-shrink-0`}>
                  <IconComponent 
                    className={`w-3.5 h-3.5 md:w-4 md:h-4 ${theme.iconColor} ${
                      IconComponent === Droplet ? 'fill-current' : ''
                    }`} 
                  />
                </div>
                <p className="text-gray-700 leading-relaxed text-xs md:text-base">
                  {item.text}
                </p>
              </li>
            );
          })}
        </ul>

        <button 
          className="group w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 px-4 md:py-3 md:px-6 rounded-full flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl text-xs md:text-base"
          aria-label={`Read more about ${title}`}
        >
          Read More...
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      
      {/* Bottom gradient strip */}
      <div className={`h-2 bg-gradient-to-r ${theme.gradient}`} aria-hidden="true"></div>
    </motion.div>
  );
}

// Reusable Image Component
interface DonationImageProps {
  src: string;
  alt: string;
  delay?: number;
}

function DonationImage({ src, alt, delay = 0 }: DonationImageProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={imageScale}
      transition={{ delay }}
      className="relative rounded-2xl overflow-hidden shadow-2xl w-full h-full min-h-[250px] md:min-h-[400px] lg:min-h-[500px]"
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
  if (!INFO_SECTIONS || INFO_SECTIONS.length < 3) return null;

  const [section1, section2, section3] = INFO_SECTIONS;
  
  if (!section1 || !section2 || !section3) return null;

  return (
    <Section variant="slate" aria-labelledby="donation-info-heading">
      <Container>

        {/* Top Row: Card - Image - Card */}
        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-8">
          <InfoCard 
            title={section1.title}
            items={section1.items}
            colorTheme={section1.colorTheme as ColorThemeKey}
            delay={0}
          />
          
          <DonationImage
            src="https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=800&auto=format&fit=crop&q=80"
            alt="Blood donation process showing medical professional preparing donor's arm"
            delay={0.2}
          />
          
          <InfoCard 
            title={section2.title}
            items={section2.items}
            colorTheme={section2.colorTheme as ColorThemeKey}
            delay={0.2}
          />
        </div>

        {/* Bottom Row: Image - Card */}
        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 gap-4 md:gap-8">
          <DonationImage
            src="https://diariofarma.com/wp-content/uploads/2022/12/202212-recurso-donacion-de-sangre-800x533.jpg"
            alt="Healthcare professional examining blood sample in laboratory"
            delay={0.3}
          />
          
          <InfoCard 
            title={section3.title}
            items={section3.items}
            colorTheme={section3.colorTheme as ColorThemeKey}
            delay={0.4}
          />
        </div>

      </Container>
    </Section>
  );
}
