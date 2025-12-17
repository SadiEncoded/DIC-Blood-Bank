'use client';

import { motion } from 'framer-motion';
import { Award, Heart, Shield, Users } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative px-6 mb-24">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 border border-rose-100 mb-6"
          >
            <Heart className="w-4 h-4 text-rose-600 fill-current" />
            <span className="text-sm font-medium text-rose-900">Our Mission</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Saving Lives, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-rose-500">
              One Drop at a Time
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            We are a student-led initiative from Daffodil International College, dedicated to connecting blood donors with those in critical need across the Chandpur region.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-20 mb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Donors Registered', value: '500+', icon: Users },
              { label: 'Lives Impacted', value: '1,200+', icon: Heart },
              { label: 'Successful Drives', value: '25+', icon: Award },
              { label: 'Years Active', value: '3+', icon: Shield },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-sm text-center"
                >
                  <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-rose-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80"
              alt="Medical team working together"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
              <p>
                Founded in 2023 by a group of passionate students, DIC Blood Bank started with a simple observation: finding blood donors in emergencies was too difficult, often relying on chaotic social media posts.
              </p>
              <p>
                We decided to change that. By leveraging technology and community spirit, we built a centralized platform that makes blood donation efficient, transparent, and accessible to everyone in Chandpur.
              </p>
              <p>
                Today, we have grown into a robust network of students, teachers, and local volunteers, all united by a single goal: ensuring no life is lost due to a lack of blood.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team/Contact CTA */}
      <section className="bg-rose-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Want to join our mission?</h2>
          <p className="text-rose-100 text-xl mb-10 leading-relaxed">
            Whether you want to become a donor, volunteer your time, or partner with us for a blood drive, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/donate" 
              className="px-8 py-4 bg-white text-rose-900 font-bold rounded-xl hover:bg-rose-50 transition-colors shadow-lg"
            >
              Become a Volunteer
            </a>
            <a 
              href="/contact" 
              className="px-8 py-4 bg-rose-800 text-white font-bold rounded-xl hover:bg-rose-700 transition-colors border border-rose-700"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
