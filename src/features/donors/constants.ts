// app/lib/config/constants.ts is now the source of truth for BLOOD_TYPES

export const URGENCY_LEVELS = [
  { value: 'normal', label: 'Normal' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'critical', label: 'Critical' },
] as const;

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

import { BadgeCheck, ClipboardList, HeartHandshake, Users } from 'lucide-react';

export const WORKFLOW_STEPS = [
  {
    id: 1,
    label: 'Request',
    subLabel: 'Data Intake',
    icon: ClipboardList,
  },
  {
    id: 2,
    label: 'Verification',
    subLabel: 'Pending Approval',
    icon: BadgeCheck,
  },
  {
    id: 3,
    label: 'Matching',
    subLabel: 'Finding Donors',
    icon: Users,
  },
  {
    id: 4,
    label: 'Finalized',
    subLabel: 'Connect & Complete',
    icon: HeartHandshake,
  },
] as const;
