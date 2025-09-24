'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-[500px] md:h-[600px] w-full overflow-hidden">

      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <Image
          src="/diccampus1.png"
          alt="DIC Campus Building"
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
      </motion.div>

      {/* Overlay Gradient with subtle blur */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00234B]/70 via-[#00234B]/50 to-[#00234B]/90 " />

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-6 max-w-4xl mx-auto">

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl md:text-5xl font-extrabold mb-4 text-white leading-tight drop-shadow-lg"
          >
            Donate Blood, Save Lives
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow"
          >
            Join our community-driven blood bank initiative at Daffodil International College,
            making a life-saving difference in the Chandpur region.
          </motion.p>

          {/* Main Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-5 justify-center"
          >
            <Link
              href="/donors"
              className="group bg-[#D60A0A] hover:bg-[#B30000] px-8 py-4 text-white font-semibold rounded-xl inline-flex items-center justify-center min-w-[180px] transform transition-all duration-200 hover:scale-105 shadow-2xl hover:shadow-2xl/50"
            >
              Search Donors
            </Link>

            <Link
              href="/register"
              className="group bg-emerald-600 hover:bg-emerald-700 px-8 py-4 text-white font-semibold rounded-xl inline-flex items-center justify-center min-w-[180px] transform transition-all duration-200 hover:scale-105 shadow-2xl hover:shadow-2xl/50"
            >
              Register as Donor
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
