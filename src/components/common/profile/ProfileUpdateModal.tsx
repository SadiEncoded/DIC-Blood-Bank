'use client';

import { LocationSelect } from '@/components/common/form/LocationSelect';
import Portal from '@/components/common/Portal';
import { updateDonorProfileAction } from '@/features/donors/actions';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import { AnimatePresence, motion } from 'framer-motion';
import { Facebook, Save, User as UserIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface ProfileUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

interface ProfileData {
  full_name: string;
  age: number;
  last_donation: string;
  location: string;
  facebook_url: string;
}

export default function ProfileUpdateModal({ isOpen, onClose, user }: ProfileUpdateModalProps) {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState<ProfileData>({
    full_name: '',
    age: 18,
    last_donation: '',
    location: '',
    facebook_url: ''
  });

  const supabase = createClient();

  useEffect(() => {
    if (isOpen && user) {
      const fetchProfile = async () => {
        setFetching(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name, age, last_donation, location, facebook_url')
          .eq('id', user.id)
          .single();

        if (data) {
          setFormData({
            full_name: data.full_name || '',
            age: data.age || 18,
            last_donation: data.last_donation || '',
            location: data.location || '',
            facebook_url: data.facebook_url || ''
          });
        }
        setFetching(false);
      };

      fetchProfile();
    }
  }, [isOpen, user, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await updateDonorProfileAction({
        full_name: formData.full_name,
        age: Number(formData.age),
        last_donation: formData.last_donation || null,
        location: formData.location,
        facebook_url: formData.facebook_url || null
      });

      if (result.success) {
        toast.success('Profile updated successfully!');
        onClose();
      } else {
        toast.error(result.error?.message || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Centering Wrapper */}
            <div className="flex min-h-screen items-center justify-center p-4 relative pointer-events-none">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="w-full max-w-lg bg-white rounded-2xl shadow-xl pointer-events-auto overflow-hidden"
              >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
                <button 
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {fetching ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500" />
                  </div>
                ) : (
                  <>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">Full Name</label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input
                          type="text"
                          required
                          value={formData.full_name}
                          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Age</label>
                        <input
                          type="number"
                          min={18}
                          max={99}
                          required
                          value={formData.age}
                          onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-colors"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Last Donation</label>
                        <div className="relative">
                          {/* <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} /> */}
                          <input
                            type="date"
                            value={formData.last_donation}
                            onChange={(e) => setFormData({ ...formData, last_donation: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">Location</label>
                      <LocationSelect
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">Facebook Profile Link</label>
                      <div className="relative">
                        <Facebook className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input
                          type="url"
                          value={formData.facebook_url}
                          onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-colors"
                          placeholder="https://facebook.com/username"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                      <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Saving...' : (
                          <>
                            <Save size={18} />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-center text-gray-400">
                      Note: You can only update your profile once a week.
                    </p>
                  </>
                )}
              </form>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
