'use client';

import { motion } from 'framer-motion';
import { Calendar, Star } from 'lucide-react';
import Image from 'next/image';

const events = [
  {
    title: 'Grand Blood Drive 2024',
    date: 'Dec 25, 2024',
    location: 'DIC Campus Grounds',
    description: 'Join us for our biggest annual donation event. Free health checkups included!',
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80',
  },
  {
    title: 'Donor Awareness Seminar',
    date: 'Jan 10, 2025',
    location: 'College Auditorium',
    description: 'Learn about the science of blood donation and debunk common myths.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80',
  },
];

const topDonors = [
  { name: 'Sarah Rahman', donations: 12, type: 'O+' },
  { name: 'James Ahmed', donations: 10, type: 'A+' },
  { name: 'Nusrat Jahan', donations: 9, type: 'B-' },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Our Vibrant Community
          </motion.h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Celebrating the heroes who make miracles happen every day. Join our events and be part of the change.
          </p>
        </div>

        {/* Hero Image / Collage */}
        <div className="relative h-[400px] rounded-3xl overflow-hidden mb-24 shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1559757175-9e35f55ce7d4?auto=format&fit=crop&q=80"
            alt="Community volunteers"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 md:p-12">
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-2">Volunteer Spotlight</h2>
              <p className="text-lg opacity-90">Meet the dedicated team working behind the scenes.</p>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
            <a href="/events" className="text-rose-600 font-semibold hover:underline">View All</a>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {events.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-bold text-gray-900 shadow-sm">
                    {event.date}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <p className="text-gray-600 mb-6 line-clamp-2">
                    {event.description}
                  </p>
                  <button className="w-full py-3 border-2 border-slate-100 rounded-xl font-bold text-slate-600 hover:border-rose-600 hover:text-rose-600 hover:bg-rose-50 transition-all">
                    Register Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Leaderboard/Top Donors */}
        <section className="grid lg:grid-cols-12 gap-12">
          {/* Leaderboard */}
          <div className="lg:col-span-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Top Donors of the Month</h2>
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <div className="space-y-6">
                {topDonors.map((donor, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                        idx === 0 ? 'bg-yellow-400' : idx === 1 ? 'bg-gray-400' : 'bg-orange-400'
                      }`}>
                        #{idx + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{donor.name}</h4>
                        <p className="text-sm text-gray-500">{donor.donations} donations</p>
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-white rounded-xl text-rose-600 font-bold text-sm shadow-sm border border-rose-100">
                      {donor.type}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Impact CTA */}
          <div className="lg:col-span-4">
            <div className="bg-gradient-to-br from-gray-900 to-slate-800 rounded-3xl p-8 text-white h-full flex flex-col justify-center text-center">
              <Star className="w-12 h-12 text-yellow-400 mx-auto mb-6 fill-current" />
              <h3 className="text-2xl font-bold mb-4">Become a Legend</h3>
              <p className="text-gray-300 mb-8">
                Your consistent donations can earn you a spot on our Wall of Heroes and inspire others.
              </p>
              <a href="/donate" className="w-full py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-colors">
                Start Donating
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
