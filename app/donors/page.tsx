'use client';

import { motion } from 'framer-motion';
import { Droplet, Filter, MapPin, Phone, Search } from 'lucide-react';
import { useState } from 'react';

// Mock donor data
const mockDonors = [
  { id: 1, name: 'Ahmed Hassan', bloodType: 'A+', location: 'Chandpur Sadar', phone: '+880 1712-345678', lastDonation: '2 months ago', available: true },
  { id: 2, name: 'Fatima Rahman', bloodType: 'O-', location: 'Matlab', phone: '+880 1823-456789', lastDonation: '4 months ago', available: true },
  { id: 3, name: 'Karim Ahmed', bloodType: 'B+', location: 'Hajiganj', phone: '+880 1934-567890', lastDonation: '1 month ago', available: false },
  { id: 4, name: 'Nusrat Jahan', bloodType: 'AB+', location: 'Chandpur Sadar', phone: '+880 1645-678901', lastDonation: '5 months ago', available: true },
  { id: 5, name: 'Rahim Uddin', bloodType: 'O+', location: 'Kachua', phone: '+880 1756-789012', lastDonation: '3 months ago', available: true },
  { id: 6, name: 'Sadia Islam', bloodType: 'A-', location: 'Faridganj', phone: '+880 1867-890123', lastDonation: '6 months ago', available: true },
];

const bloodTypes = ['All', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function DonorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBloodType, setSelectedBloodType] = useState('All');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const filteredDonors = mockDonors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         donor.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBloodType = selectedBloodType === 'All' || donor.bloodType === selectedBloodType;
    const matchesAvailability = !showAvailableOnly || donor.available;
    
    return matchesSearch && matchesBloodType && matchesAvailability;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Blood Donors</h1>
          <p className="text-gray-600 text-lg">Search our database of registered donors ready to help.</p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>

            {/* Blood Type Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {bloodTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedBloodType(type)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                    selectedBloodType === type
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Available Only Toggle */}
          <label className="flex items-center gap-2 cursor-pointer w-fit">
            <input
              type="checkbox"
              checked={showAvailableOnly}
              onChange={(e) => setShowAvailableOnly(e.target.checked)}
              className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
            />
            <span className="text-sm text-gray-700 font-medium">Show available donors only</span>
          </label>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            Found <span className="font-bold text-gray-900">{filteredDonors.length}</span> donor{filteredDonors.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Donors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonors.map((donor, index) => (
            <motion.div
              key={donor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{donor.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{donor.location}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center border-2 border-rose-200">
                    <span className="font-bold text-rose-600 text-lg">{donor.bloodType}</span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Droplet className="w-4 h-4 text-rose-500" />
                  <span>Last donation: {donor.lastDonation}</span>
                </div>
              </div>

              {/* Status & Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  donor.available 
                    ? 'bg-emerald-50 text-emerald-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {donor.available ? 'Available' : 'Unavailable'}
                </span>
                
                {donor.available && (
                  <a
                    href={`tel:${donor.phone}`}
                    className="px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-medium hover:bg-rose-700 transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Contact
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDonors.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No donors found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
