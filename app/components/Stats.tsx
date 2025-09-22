'use client';

import { motion } from 'framer-motion';

interface StatProps {
  value: string | number;
  label: string;
}

const stats: StatProps[] = [
  { value: '500+', label: 'Registered Donors' },
  { value: '24/7', label: 'Emergency Support' },
  { value: '1000+', label: 'Lives Saved' },
  { value: '8', label: 'Blood Groups' },
];

export default function Stats() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6">

        {stats.map((stat, idx) => (
          <motion.div
  key={stat.label}
  className="text-center group cursor-pointer"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ y: -2, scale: 1.05 }}
  transition={{ duration: 0.8, delay: idx * 0.2, type: 'spring', stiffness: 400 }}
>
  <div className="text-3xl font-bold text-[#D60A0A]">
    {stat.value}
  </div>
  <div className="text-sm font-medium text-gray-600 mt-1">
    {stat.label}
  </div>
</motion.div>

        ))}

      </div>
    </section>
  );
}
