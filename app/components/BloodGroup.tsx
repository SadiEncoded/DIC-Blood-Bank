'use client';

import { motion } from 'framer-motion';

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export default function BloodGroups() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center mb-4 text-[#00234B]">
            Quick Search by Blood Group
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Find blood donors quickly by selecting a blood group. Our database updates in real-time.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {bloodGroups.map((group, idx) => (
            <motion.button
              key={group}
              className="relative group px-6 py-4 bg-white text-[#00234B] rounded-lg
                         border-2 border-gray-100 font-bold text-lg hover:border-[#D60A0A]/20
                         hover:bg-[#D60A0A]/5 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
            >
              <span className="relative z-10 flex items-center justify-center">
                {group}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#D60A0A]/10 to-transparent 
                             rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
