"use client";

import { saveDonor } from "@/lib/saveDonor";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";

// Dynamically import Header and Footer components with SSR disabled to prevent hydration mismatch
const Header = dynamic(() => import("../components/Header"), { ssr: false });
const Footer = dynamic(() => import("../components/Footer"), { ssr: false });

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  bloodGroup: string;
  dob: string;
  gender: string;
  lastDonation: string;
  weight: string;
  notes: string;
}

const RegisterForm = () => {
  const [mounted, setMounted] = useState(false);
  const [errors, setErrors] = useState({
    age: "",
    weight: ""
  });

  useEffect(() => {
    // Simple initialization check
    if (!db) {
      console.error('Firebase not initialized');
      setSubmitStatus({
        type: 'error',
        message: 'Error connecting to the database. Please try again later.'
      });
    }
    setMounted(true);
  }, []);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    bloodGroup: "",
    dob: "",
    gender: "",
    lastDonation: "",
    weight: "",
    notes: "",
  });

  const totalFields = Object.keys(formData).length;
  const filledFields = Object.values(formData).filter((val) => val !== "").length;
  const progress = (filledFields / totalFields) * 100;

  const validateAge = (dob: string) => {
    if (!dob) return false;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      setErrors(prev => ({ ...prev, age: "You must be at least 18 years old to donate blood" }));
      return false;
    } else if (age > 65) {
      setErrors(prev => ({ ...prev, age: "Maximum age for blood donation is 65 years" }));
      return false;
    }
    
    setErrors(prev => ({ ...prev, age: "" }));
    return true;
  };

  const validateWeight = (weight: string) => {
    const weightNum = parseFloat(weight);
    if (isNaN(weightNum) || weightNum < 50) {
      setErrors(prev => ({ ...prev, weight: "Minimum weight requirement is 50 kg" }));
      return false;
    }
    setErrors(prev => ({ ...prev, weight: "" }));
    return true;
  };

  const validateForm = () => {
    const requiredFields = ['fullName', 'email', 'phone', 'bloodGroup', 'dob', 'gender', 'weight'] as const;
    const emptyFields = requiredFields.filter(field => !formData[field]);
    
    if (emptyFields.length > 0) {
      setSubmitStatus({
        type: 'error',
        message: `Please fill in all required fields: ${emptyFields.join(', ')}`
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submission started');
    
    if (!validateForm()) {
      console.log('Form validation failed - missing required fields');
      return;
    }

    const isAgeValid = validateAge(formData.dob);
    const isWeightValid = validateWeight(formData.weight);
    
    console.log('Validation results:', { isAgeValid, isWeightValid });
    if (!isAgeValid || !isWeightValid) {
      console.log('Age/Weight validation failed');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const result = await saveDonor(formData);
      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Registration successful! Thank you for registering as a blood donor.'
        });
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          address: "",
          bloodGroup: "",
          dob: "",
          gender: "",
          lastDonation: "",
          weight: "",
          notes: "",
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: 'Registration failed: ' + (result.error || 'Unknown error')
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Registration failed: ' + (error instanceof Error ? error.message : 'Unknown error')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Validate on change
    if (name === 'dob') {
      validateAge(value);
    } else if (name === 'weight') {
      validateWeight(value);
    }
  };

  // Only render content after client-side hydration is complete
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-[#0060AF] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow relative overflow-auto py-4">
        {/* Campus Background */}
        <div 
          className="fixed inset-0 w-full h-full -z-10"
          style={{
            backgroundImage: `url('/diccampus1.png')`,
            filter: 'brightness(0.5)',
            backgroundSize: '100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            imageRendering: 'crisp-edges'
          }}
        />
        
        {/* Gradient Overlay */}
        <div 
          className="fixed inset-0 bg-gradient-to-b from-[#000000]/60 to-[#1e1e1e]/60 -z-10 mix-blend-multiply"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-white/95 backdrop-blur-md shadow-xl rounded-2xl w-full max-w-3xl mx-auto my-4 p-6 sm:p-8">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  className={`h-full rounded-full ${
                    progress < 30
                      ? 'bg-red-500'
                      : progress < 70
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-400'
                      : 'bg-gradient-to-r from-green-500 to-emerald-400'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-center text-[#0060AF] mb-8">
              Become a Blood Donor
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              {/* Form sections remain the same... */}
              {/* Personal Info Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-[#065CDB] pl-3">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col">
                    <label htmlFor="fullName" className="mb-2 text-sm font-semibold text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="border-[1px] border-gray-300 rounded-xl p-4 w-full focus:outline-none focus:border-[#0060AF] transition-colors duration-200 shadow-sm bg-white text-gray-900"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="dob" className="mb-2 text-sm font-semibold text-gray-700">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="border-[1px] border-gray-300 rounded-xl p-4 w-full focus:outline-none focus:border-[#0060AF] transition-colors duration-200 shadow-sm bg-white text-gray-900"
                    />
                    {errors.age && (
                      <p className="mt-2 text-sm text-red-600 font-medium">{errors.age}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-[#0060AF] pl-3">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col">
                    <label htmlFor="email" className="mb-2 text-sm font-semibold text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border-[1px] border-gray-300 rounded-xl p-4 w-full focus:outline-none focus:border-[#0060AF] transition-colors duration-200 shadow-sm bg-white text-gray-900"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="phone" className="mb-2 text-sm font-semibold text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border-[1px] border-gray-300 rounded-xl p-4 w-full focus:outline-none focus:border-[#0060AF] transition-colors duration-200 shadow-sm bg-white text-gray-900"
                    />
                  </div>
                  <div className="flex flex-col md:col-span-2">
                    <label htmlFor="address" className="mb-2 text-sm font-semibold text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="border-[1px] border-gray-300 rounded-xl p-4 w-full focus:outline-none focus:border-[#0060AF] transition-colors duration-200 shadow-sm bg-white text-gray-900"
                    />
                  </div>
                </div>
              </div>

              {/* Medical Info */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-[#065CDB] pl-3">
                  Medical Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex flex-col">
                    <label htmlFor="bloodGroup" className="mb-2 text-sm font-semibold text-gray-700">
                      Blood Group
                    </label>
                    <select
                      id="bloodGroup"
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className="border-[1px] border-gray-300 rounded-xl p-4 w-full focus:outline-none focus:border-[#0060AF] transition-colors duration-200 shadow-sm bg-white text-gray-900"
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="lastDonation" className="mb-2 text-sm font-semibold text-gray-700">
                      Last Donation Date
                    </label>
                    <input
                      type="date"
                      id="lastDonation"
                      name="lastDonation"
                      value={formData.lastDonation}
                      onChange={handleChange}
                      className="border-[1px] border-gray-300 rounded-xl p-4 w-full focus:outline-none focus:border-[#0060AF] transition-colors duration-200 shadow-sm bg-white text-gray-900"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="gender" className="mb-2 text-sm font-semibold text-gray-700">
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="border-[1px] border-gray-300 rounded-xl p-4 w-full focus:outline-none focus:border-[#0060AF] transition-colors duration-200 shadow-sm bg-white text-gray-900"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div className="flex flex-col">
                    <label htmlFor="weight" className="mb-2 text-sm font-semibold text-gray-700">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      value={formData.weight}
                      min="50"
                      onChange={handleChange}
                      className="border-[1px] border-gray-300 rounded-xl p-4 w-full focus:outline-none focus:border-[#0060AF] transition-colors duration-200 shadow-sm bg-white text-gray-900"
                    />
                    {errors.weight && (
                      <p className="mt-2 text-sm text-red-600 font-medium">{errors.weight}</p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="notes" className="mb-2 text-sm font-semibold text-gray-700">
                      Additional Health Notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      className="border-[1px] border-gray-300 rounded-xl p-4 w-full focus:outline-none focus:border-[#0060AF] transition-colors duration-200 shadow-sm bg-white text-gray-900"
                    />
                  </div>
                </div>
              </div>

              {/* Privacy Notice */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-[#f1f8ff] to-[#e8f4ff] border-l-4 border-[#0060AF] rounded-xl p-6 shadow-md mt-8 mb-6 relative overflow-hidden"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2 bg-[#0060AF]/10 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0060AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#0060AF] mb-1">Privacy Notice</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Girls&apos; privacy will be strictly kept hidden. Donors can choose to remain anonymous, and only if they wish to donate, they can contact the needed person themselves.
                    </p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-[#0060AF]/5 rounded-full"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 -mr-12 -mb-12 bg-[#0060AF]/5 rounded-full"></div>
              </motion.div>

              {/* Submission Status */}
              {submitStatus.type && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-xl ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {submitStatus.message}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                className={`w-full py-5 rounded-xl font-bold shadow-lg tracking-wide text-lg flex items-center justify-center gap-2
                  ${isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#0060AF] hover:bg-[#065CDB] text-white'
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Registration'
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterForm;
