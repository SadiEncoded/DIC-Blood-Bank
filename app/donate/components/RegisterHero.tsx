'use client';

import { motion } from "framer-motion";
import { ClipboardList, Droplet, Scale } from "lucide-react";

export function RegisterHero() {
  const cards = [
    { icon: Droplet, title: "Safe & Screened", subtitle: "Strict donor screening for safety.", color: "text-blue-400" },
    { icon: Scale, title: "Minimum 50kg", subtitle: "Only healthy donors accepted.", color: "text-green-400" },
    { icon: ClipboardList, title: "Verified Contact", subtitle: "Phone & email verified for reliability.", color: "text-blue-400" }
  ];

  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/diccampus1.png')" }}>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-800/50 to-gray-900/40" />
      <div className="relative z-10 container mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12 w-full px-4">
        <div className="lg:w-1/2 flex flex-col text-center lg:text-left gap-4 sm:gap-6">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white drop-shadow-2xl leading-tight">
            Become a Blood Donor
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-white/95 drop-shadow-lg font-medium">
            Join our lifesaving community. Your donation can make a difference today!
          </p>
          <div className="flex justify-center lg:justify-start gap-4 mt-6">
            <a 
              href="#donor-form" 
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-2xl hover:bg-blue-700 transition-all duration-300 text-lg transform hover:scale-105"
            >
              Register Now
            </a>
          </div>
        </div>

        <div className="lg:w-1/2 flex flex-col gap-4 w-full">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="flex items-center gap-4 bg-white/20 backdrop-blur-lg p-4 sm:p-5 rounded-2xl shadow-xl border border-white/30 w-full"
            >
              <card.icon className={`w-7 h-7 ${card.color}`} />
              <div className="flex flex-col">
                <p className="text-white font-bold text-base sm:text-lg">{card.title}</p>
                <p className="text-white/90 text-sm sm:text-base font-medium">{card.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
