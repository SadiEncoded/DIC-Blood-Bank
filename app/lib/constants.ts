// app/lib/constants.ts

// Blood Types
export const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;
export const BLOOD_TYPES_WITH_ALL = ['All', ...BLOOD_TYPES] as const;

export type BloodType = typeof BLOOD_TYPES[number];

// Urgency Levels
export const URGENCY_LEVELS = {
  NORMAL: 'normal',
  URGENT: 'urgent',
  CRITICAL: 'critical',
} as const;

export type UrgencyLevel = typeof URGENCY_LEVELS[keyof typeof URGENCY_LEVELS];

// Regex Patterns
export const REGEX_PATTERNS = {
  BD_PHONE: /^(?:\+88)?01[3-9]\d{8}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

// Common CSS Classes
export const TEXTURE_OVERLAY = "absolute inset-0 opacity-[0.03] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none";

export const DARK_HEADER_BG = "relative w-full overflow-hidden bg-[#0a0f1a]";

export const DARK_HEADER_ATMOSPHERE = `
  <div class="absolute inset-0 pointer-events-none">
    <div class="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-[#0f172a] to-[#1e293b]" />
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(244,63,94,0.05)_0%,transparent_70%)]" />
    <div class="absolute inset-0 opacity-[0.1] mix-blend-soft-light bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
  </div>
`;

// Badge Colors
export const BADGE_COLORS = {
  Gold: 'bg-amber-100 text-amber-700 border-amber-200',
  Silver: 'bg-slate-100 text-slate-700 border-slate-200',
  Bronze: 'bg-rose-100 text-rose-700 border-rose-200',
} as const;

// Color Themes for Components
export const COLOR_THEMES = {
  rose: {
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    gradient: 'from-rose-400 via-rose-500 to-rose-600',
  },
  blue: {
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    gradient: 'from-blue-400 via-blue-500 to-blue-600',
  },
  purple: {
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    gradient: 'from-purple-400 via-purple-500 to-purple-600',
  },
} as const;

export type ColorThemeKey = keyof typeof COLOR_THEMES;
