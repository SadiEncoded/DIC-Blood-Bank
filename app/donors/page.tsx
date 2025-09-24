'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Search } from 'lucide-react';
import Image from 'next/image';
import DonorCard from '../components/DonorCard';

const Header = dynamic(() => import('../components/Header'), { ssr: false });
const Footer = dynamic(() => import('../components/Footer'), { ssr: false });

interface Donor {
  id: string;
  fullName: string;
  bloodGroup: string;
  phone: string;
  dob: string;
  gender: string;
  lastDonation: string;
  address: string;
  weight: string;
  notes: string;
  status: string;
  badges?: string[];
  avatarUrl?: string;
}

export default function Donors() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const q = query(collection(db, 'donors'), where('status', '==', 'active'));
        const snapshot = await getDocs(q);
        const donorList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Donor[];
        setDonors(donorList);
      } catch (err) {
        console.error(err);
        setError('Failed to load donors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchDonors();
  }, []);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const filteredDonors = donors.filter(donor => {
    const matchesGroup = selectedGroup ? donor.bloodGroup?.toUpperCase() === selectedGroup.toUpperCase() : true;
    const matchesSearch = searchTerm
      ? donor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesGroup && matchesSearch;
  });

  const clearAllFilters = () => {
    setSelectedGroup(null);
    setSearchTerm('');
  };

  const topDonor = donors.length > 0 ? donors[0] : null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <section className="py-16 bg-gradient-to-b from-[#f0f8ff] to-white relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 px-4">

          {/* Top Donor */}
<aside className="lg:col-span-1">
  <h2 className="text-xl font-bold text-[#00234B] mb-4">Top Donor</h2>
  {topDonor ? (
    <div className="w-full max-w-xs mx-auto"> {/* fixed width to match search results */}
      <DonorCard donor={topDonor} highlight /> {/* highlight now only adds border/shadow */}
    </div>
  ) : (
    <p className="text-gray-400">No top donor available.</p>
  )}
</aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Search Section */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#00234B] mb-2">
                Find Blood Donors
              </h1>
              <p className="text-gray-600 text-lg mb-6">
                Find Blood by Blood Type, Location or Name. Always respect donors for their contribution.
              </p>

              <div className="bg-white shadow-md rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by Blood Type, Location, or Name..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="flex-grow outline-none px-2 py-2 rounded-md text-gray-700"
                  />
                  <button
                    onClick={() => setShowFilters(true)}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    All Filters
                  </button>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  {bloodGroups.map(group => (
                    <button
                      key={group}
                      onClick={() => setSelectedGroup(selectedGroup === group ? null : group)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        selectedGroup === group
                          ? 'bg-[#D60A0A] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {group}
                    </button>
                  ))}
                  {(selectedGroup || searchTerm) && (
                    <button
                      onClick={clearAllFilters}
                      className="px-4 py-2 rounded-full bg-gray-200 text-gray-600 text-sm"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Filters */}
            {showFilters && (
              <div className="bg-white shadow-lg rounded-2xl p-6 max-w-lg mx-auto mb-6">
                <h3 className="text-lg font-bold mb-3">Additional Filters</h3>
                <p className="text-sm text-gray-500 mb-4">Coming soon: filter by last donation, age range, availability, etc.</p>
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
                >
                  Close
                </button>
              </div>
            )}

            {/* Donor Results */}
            {loading ? (
              <p className="text-center text-gray-400">Loading donors...</p>
            ) : error ? (
              <p className="text-center text-red-400">{error}</p>
            ) : searchTerm || selectedGroup ? (
              filteredDonors.length === 0 ? (
                <p className="text-center text-gray-400">No donors found.</p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDonors.map((donor, i) => (
                    <DonorCard key={donor.id} donor={donor} delay={i * 0.05} />
                  ))}
                </div>
              )
            ) : (
              <div className="text-center text-gray-500 mt-20">
                <Image
                  src="/bldpic.jpg"
                  alt="Donate blood"
                  width={288}
                  height={288}
                  className="mx-auto mb-8 opacity-30"
                />
                <h3 className="text-2xl font-semibold mb-3">Search for donors to see results</h3>
                <p className="text-gray-600">Use filters or search by name/location to find donors.</p>
              </div>
            )}
          </main>
        </div>
      </section>

      <Footer />
    </div>
  );
}
