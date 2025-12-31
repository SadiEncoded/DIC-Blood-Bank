'use client';
import { CONTACT_INFO } from '@/assets/data/contact/content';
import { motion } from "framer-motion";
import { AlertCircle, Phone } from 'lucide-react';

export default function TickerTape() {
  const { emergency } = CONTACT_INFO.phones;
  
  // Content array
  const tickerSections = [
    { text: "Emergency Blood Request Portal", icon: <AlertCircle size={12} /> },
    ...emergency.map(e => ({ 
      text: `${e.name}: ${e.phone}`, 
      icon: <Phone size={10} /> 
    })),
    { text: "Community Driven • 100% Verified", icon: null }
  ];

  return (
    <div className="w-full bg-rose-600 py-2 sm:py-2.5 overflow-hidden whitespace-nowrap shadow-inner border-b border-rose-700/50">
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="inline-flex items-center"
      >
        {/* Render twice for a mathematically perfect loop */}
        {[1, 2].map((group) => (
          <div key={group} className="flex items-center">
            {tickerSections.map((s, idx) => (
              <span key={idx} className="inline-flex items-center text-white text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.15em] sm:tracking-[0.2em] mx-6 sm:mx-12">
                {s.icon && <span className="mr-1.5 sm:mr-2 opacity-90">{s.icon}</span>}
                <span className="hidden xs:inline sm:inline">{s.text}</span>
                <span className="inline xs:hidden sm:hidden">{s.text.split(':')[0]}</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
