'use client';
import { Container, Section } from '@/components/ui';
import { fadeInUpAlt as fadeInUp, slideInRightAlt as slideInRight } from '@/lib/animations';
import { PROCESS_CONTENT } from '@/lib/data/Home-Content';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Search, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

export default function CallToActionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      {/* Main CTA Section */}
      <Section 
        ref={ref}
        variant="slate"
        className="!py-10 md:!py-28" 
      >
        <Container>

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
                className="text-fluid-section font-heading-opt text-gray-900 mb-6 leading-tight font-poppins"
              >
                {PROCESS_CONTENT.title}
              </motion.h2>
              
              <motion.div 
                variants={fadeInUp}
                className="space-y-3 mb-6 md:mb-8 text-gray-700 leading-relaxed"
              >
                <p className="text-sm md:text-lg">
                  {PROCESS_CONTENT.description1}
                </p>
                <p className="text-sm md:text-lg">
                  {PROCESS_CONTENT.description2}
                </p>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                className="grid grid-cols-2 gap-2 sm:flex sm:flex-row"
              >
                <Link href="/signup" className="group bg-rose-600 hover:bg-rose-700 text-white font-semibold px-3 py-2.5 sm:px-8 sm:py-4 rounded-lg flex items-center justify-center gap-1.5 sm:gap-3 transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl text-xs sm:text-base">
                  <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                  {PROCESS_CONTENT.cta.becomeDonor}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link href="/donors" className="group bg-gray-900 hover:bg-black text-white font-semibold px-3 py-2.5 sm:px-8 sm:py-4 rounded-lg flex items-center justify-center gap-1.5 sm:gap-3 transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl text-xs sm:text-base">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                  {PROCESS_CONTENT.cta.findDonor}
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              variants={slideInRight}
              className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-1/2 h-[300px] md:h-[400px] lg:h-[600px]"
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
        </Container>
      </Section>


      {/* Bottom Banner */}
      <Section variant="dark" className="!py-6 md:!py-8">
        <Container>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-purple-600"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <p className="text-center text-sm md:text-xl lg:text-2xl font-light italic text-white">
            "{PROCESS_CONTENT.banner}"
          </p>
        </motion.div>
        </Container>
      </Section>

    </>
  );
}
