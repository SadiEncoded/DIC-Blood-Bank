'use client';

import { Droplet } from "lucide-react";
import Image from "next/image";

export function RegisterFormHeader() {
  return (
    <div className="text-center mb-8 lg:mb-10">
      <div className="flex justify-center mb-6">
        <Image src="/blood-bank-logo.png" width={128} height={128} alt="DIC Blood Bank Logo" className="object-contain" />
      </div>
      <h3 className="text-3xl sm:text-4xl font-black text-gray-900 flex items-center justify-center gap-3 mb-3">
        <Droplet className="w-8 h-8 text-blue-600" /> Donor Registration Form
      </h3>
      <p className="text-base sm:text-lg text-gray-700 font-medium">
        Join the <span className="font-black text-blue-600">DIC Blood Bank</span> - Together, we make lifesaving possible.
      </p>
    </div>
  );
}
