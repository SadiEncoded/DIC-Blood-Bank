'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Donor {
  fullName: string;
  address: string;
  bloodGroup: string;
  dob: string;
  gender: string;
  phone: string;
  lastDonation?: string;
  badges?: string[];
  avatarUrl?: string;
}

interface DonorCardProps {
  donor: Donor;
  delay?: number;
  highlight?: boolean;
}

export default function DonorCard({ donor, delay, highlight }: DonorCardProps) {
  const avatarSrc = donor.avatarUrl
  ? donor.avatarUrl
  : donor.gender === 'female'
  ? '/female.png'
  : donor.gender === 'male'
  ? '/male.png'
  : '/default-avatar.png';


  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay || 0 }}
      className={`bg-white rounded-2xl flex flex-col p-4 shadow-md hover:shadow-lg ${
        highlight ? 'border-2 border-blue-500' : ''
      }`}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#0060AF] flex-shrink-0">
          <Image
            src={avatarSrc}
            alt={donor.fullName}
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#0060AF]">{donor.fullName}</h3>
          <p className="text-sm text-gray-500">{donor.address}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className="px-2 py-1 rounded-full bg-red-100 text-[#D60A0A] text-sm font-semibold">
          {donor.bloodGroup}
        </span>
        <span className="text-sm text-gray-600">
          {donor.dob ? new Date().getFullYear() - new Date(donor.dob).getFullYear() : 'N/A'} yrs /{' '}
          {donor.gender}
        </span>
      </div>

      {donor.lastDonation && (
        <p className="text-sm text-gray-500 mb-3">
          <span className="font-semibold">Last Donation:</span>{' '}
          {new Date(donor.lastDonation).toLocaleDateString()}
        </p>
      )}

      {donor.badges && donor.badges.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {donor.badges.map((badge, idx) => (
            <span key={idx} className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full">
              {badge}
            </span>
          ))}
        </div>
      )}

      <a
        href={`https://wa.me/${donor.phone}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-block w-full text-center px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 text-sm"
      >
        View Profile
      </a>
    </motion.div>
  );
}
