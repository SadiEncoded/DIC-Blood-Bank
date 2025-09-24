'use client';

import { motion } from 'framer-motion';

export default function CinematicHeroBackground() {
  // Particle positions
  const particles = Array.from({ length: 12 }, (_, i) => ({
    top: `${Math.random() * 80 + 10}%`,
    left: `${Math.random() * 90 + 5}%`,
    size: `${Math.random() * 4 + 2}px`,
    delay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">

      {/* Campus Background */}
      <motion.div
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 30, repeat: Infinity, repeatType: 'mirror', ease: 'linear' }}
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/diccampus1.png')`,
          filter: 'brightness(0.8) contrast(1.1)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          imageRendering: 'auto',
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40" />

      {/* Floating Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute bg-red-500 rounded-full"
          style={{ width: p.size, height: p.size, top: p.top, left: p.left, opacity: 0.6 }}
          animate={{ y: [0, -15, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}

    </div>
  );
}
