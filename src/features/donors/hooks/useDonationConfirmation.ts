'use client';

import { confirmDonation } from '@/features/donors/services';
import { useState } from 'react';
import { toast } from 'sonner';

export function useDonationConfirmation(initialCount: number = 0) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [donationCount, setDonationCount] = useState(initialCount);

  const confirm = async (donorId: string, donorName: string) => {
    setIsConfirming(true);
    try {
      const result = await confirmDonation(donorId);
      if (result.success) {
        setIsConfirmed(true);
        setDonationCount(result.newCount);
        toast.success("Donation confirmed!", {
          description: `Thank you for updating ${donorName}'s records.`
        });
      } else {
        toast.error("Update failed", { description: result.error });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsConfirming(false);
    }
  };

  return {
    isConfirmed,
    isConfirming,
    donationCount,
    confirm
  };
}
