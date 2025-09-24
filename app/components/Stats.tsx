'use client';

import { motion } from 'framer-motion';
import CountUp from 'react-countup';

interface StatProps {
  value: number | string;
  label: string;
}

// Placeholder stats
const placeholderStats: StatProps[] = [
  { value: 45, label: 'Registered Donors' },
  { value: 3, label: 'Emergency Support' },
  { value: 12, label: 'Lives Saved' },
  { value: 8, label: 'Blood Groups' },
];

export default function CorporateStatsResponsive() {
  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };
  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };

  return (
    <section className="relative bg-gray-50 py-12 sm:py-16 overflow-hidden">
      
      {/* Subtle animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-gray-100 to-gray-200 animate-[pulse_12s_ease-in-out_infinite] -z-10" />

      <motion.div
        className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-6"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {placeholderStats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            className="relative bg-gradient-to-br from-white via-gray-100 to-white/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300"
            variants={fadeUp}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, delay: idx * 0.15, type: 'spring', stiffness: 400 }}
          >
            {/* Numeric Display */}
            <div className="text-3xl sm:text-5xl md:text-6xl font-mono font-extrabold text-blue-700 drop-shadow-sm">
              {typeof stat.value === 'number' ? (
                <CountUp end={stat.value} duration={2} separator="," />
              ) : (
                stat.value
              )}
            </div>

            {/* Label */}
            <div className="text-sm sm:text-lg md:text-xl font-semibold text-gray-700 mt-2 sm:mt-3 tracking-wide">
              {stat.label}
            </div>

            {/* Corporate accent line */}
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full mt-3 sm:mt-4 opacity-80" />

            {/* Optional subtle border glow */}
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-blue-200/30 pointer-events-none shadow-[0_0_20px_rgba(0,123,255,0.1)]" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
