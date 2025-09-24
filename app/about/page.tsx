'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Twitter, Linkedin, Github } from 'lucide-react';

export default function AboutPage() {
  const socialLinks = [
    { icon: Mail, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: Github, href: '#' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0052D4] to-[#4364F7] text-white py-32 text-center overflow-hidden">
        {/* Floating Shapes */}
        <motion.div
          className="absolute -top-20 -left-20 w-56 h-56 bg-white/10 rounded-full blur-3xl"
          animate={{ y: [0, 20, 0], x: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 w-72 h-72 bg-white/5 rounded-full blur-3xl"
          animate={{ y: [0, -20, 0], x: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut' }}
        />

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-bold mb-4 relative z-10"
        >
          About Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-lg md:text-xl max-w-3xl mx-auto relative z-10"
        >
          Dedicated to saving lives through community blood donation and awareness.
        </motion.p>

        {/* Decorative Line */}
        <motion.div
          className="absolute top-1/2 left-0 w-full h-1 bg-white/20"
          animate={{ scaleX: [0, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-[#00234B]">Our Mission</h2>
            <p className="text-gray-700 text-lg">
              Build a strong network of voluntary blood donors, educate the community,
              and ensure timely support for patients in need.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-[#00234B]">Our Vision</h2>
            <p className="text-gray-700 text-lg">
              A world where no one suffers due to lack of blood. Making donation simple,
              safe, and accessible to all.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How We Operate */}
      <section className="bg-gray-100 py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-3xl font-bold mb-12 text-[#00234B]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            How We Operate
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '📝', title: 'Register', desc: 'Create a donor profile to be part of our lifesaving network.' },
              { icon: '📍', title: 'Locate Donors', desc: 'Find donors quickly when someone is in urgent need.' },
              { icon: '❤️', title: 'Save Lives', desc: 'Coordinate donations to help patients and make a difference.' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <div className="text-red-600 text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Creator Section */}
      <section className="py-24 px-6 bg-[#001F3B] text-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-3xl font-bold mb-12 text-yellow-400"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Meet the Creator
          </motion.h2>
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: '0px 15px 25px rgba(255,215,0,0.3)' }}
            className="inline-flex items-center gap-4 cursor-pointer transition-shadow duration-300 bg-white/5 p-4 rounded-xl mx-auto"
          >
            <Image
              src="/sadi.png"
              alt="Mahmudul Hasan Sadi"
              width={90}
              height={90}
              className="rounded-full border-2 border-yellow-400"
            />
            <div className="text-left">
              <p className="font-semibold text-lg">Mahmudul Hasan Sadi</p>
              <p className="text-gray-300 text-sm">Frontend Developer</p>
              <div className="flex gap-3 mt-2 justify-start">
                {socialLinks.map((link, idx) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={idx}
                      href={link.href}
                      target="_blank"
                      whileHover={{ scale: 1.2, color: '#FFD700', transition: { duration: 0.3 } }}
                      className="text-gray-300"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
