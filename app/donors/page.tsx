"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Donor {
  name: string;
  bloodGroup: string;
  phone: string;
  age: string;
  gender: string;
  lastDonation: string;
  city: string;
}

export default function Donors() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState({
    bloodGroup: "",
    searchQuery: "",
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycby3KkU_WeB6Y0OZKKUAnYEsKjI91UKhelDcztCRbFVTWwlmy29_Rr1WDjUvsheTTgrlzg/exec");
      if (!response.ok) throw new Error("Failed to fetch donors");
      
      const data = await response.json();
      // Assuming the data is an array of arrays, convert it to array of objects
      const formattedData = data.slice(1).map((row: (string | null)[]) => ({
        name: row[0] || "",
        bloodGroup: row[1] || "",
        phone: row[2] || "",
        age: row[3] || "",
        gender: row[4] || "",
        lastDonation: row[5] || "",
        city: row[6] || "Chandpur"
      }));
      
      setDonors(formattedData);
    } catch {
      setError("Failed to load donors. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const filteredDonors = donors.filter((donor) => {
    const matchesBloodGroup = filter.bloodGroup ? donor.bloodGroup === filter.bloodGroup : true;
    const matchesSearch = filter.searchQuery
      ? donor.name.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        donor.city.toLowerCase().includes(filter.searchQuery.toLowerCase())
      : true;
    return matchesBloodGroup && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-[#00234B] mb-4">Find Blood Donors</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Search through our database of registered blood donors. Connect with donors 
            and help save lives.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or city..."
              value={filter.searchQuery}
              onChange={(e) => setFilter(prev => ({ ...prev, searchQuery: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D60A0A] focus:border-transparent"
            />
            <svg
              className="absolute right-3 top-3.5 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <select
            value={filter.bloodGroup}
            onChange={(e) => setFilter(prev => ({ ...prev, bloodGroup: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D60A0A] focus:border-transparent"
          >
            <option value="">All Blood Groups</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#D60A0A] border-t-transparent"></div>
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-red-600 py-12"
          >
            {error}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#00234B]">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-white">Name</th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-white">Blood Group</th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-white">Age/Gender</th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-white">Last Donation</th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-white">City</th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-white">Contact</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDonors.map((donor, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donor.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 text-sm font-medium bg-red-100 text-[#D60A0A] rounded-full">
                          {donor.bloodGroup}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {donor.age} / {donor.gender}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {donor.lastDonation ? new Date(donor.lastDonation).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.city}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={`https://wa.me/${donor.phone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          Contact
                        </motion.a>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredDonors.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No donors found matching your criteria.
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
