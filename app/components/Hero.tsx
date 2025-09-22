'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-[500px] md:h-[550px] overflow-hidden">

      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <Image
          src="/campuspic.jpg"
          alt="DIC Campus Building"
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
      </motion.div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00234B]/95 via-[#00234B]/85 to-[#00234B]/95" />

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-6 max-w-4xl mx-auto">
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-white leading-tight"
          >
            Donate Blood, Save Lives
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            A community-driven blood bank initiative by Daffodil International College,
            committed to serving the people of Chandpur region.
          </motion.p>

          {/* Main Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/donors"
              className="group bg-[#D60A0A] hover:bg-[#B30000] px-6 py-3 text-white font-medium rounded-lg inline-flex items-center justify-center min-w-[180px] transform transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Search Donors
            </Link>

            <Link
              href="/register"
              className="group bg-emerald-600 hover:bg-emerald-700 px-6 py-3 text-white font-medium rounded-lg inline-flex items-center justify-center min-w-[180px] transform transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Register as Donor
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
