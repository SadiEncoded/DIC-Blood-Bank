import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { BloodRequestFormValues, bloodRequestSchema } from '../types';

export function useRequestForm() {
  return useForm<BloodRequestFormValues>({
    resolver: zodResolver(bloodRequestSchema),
    defaultValues: {
      unitsNeeded: 1,
      urgency: 'normal',
      patientName: '',
      bloodType: undefined,
      hospital: '',
      requiredBy: '',
      contactName: '',
      contactPhone: '',
      reason: '',
    },
    mode: 'onBlur',
  });
}
