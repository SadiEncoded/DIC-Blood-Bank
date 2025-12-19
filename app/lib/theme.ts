// ============================================
// 📁 lib/theme.ts
// Centralized Theme Configuration for DIC Blood Bank
// Matches "Search Donor" & "Home" aesthetic
// ============================================

export const theme = {
  // Brand Colors - Rose & Slate Dominant
  colors: {
    // Primary - Blood Red / Rose
    primary: {
      50: '#fff1f2',  // rose-50
      100: '#ffe4e6', // rose-100
      200: '#fecdd3', // rose-200
      300: '#fda4af', // rose-300
      400: '#fb7185', // rose-400
      500: '#f43f5e', // rose-500 (Brand Primary)
      600: '#e11d48', // rose-600 (Hover/Active)
      700: '#be123c', // rose-700
      800: '#9f1239', // rose-800
      900: '#881337', // rose-900
      950: '#4c0519', // rose-950
    },

    // Secondary - Institutional Slate
    slate: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a', // Dark Backgrounds
      950: '#020617', // Hero Backgrounds
    },

    // UI/UX Functional Colors
    background: {
      main: '#ffffff',
      secondary: '#f8fafc', // slate-50
      dark: '#0f172a',      // slate-900
      hero: '#020617',      // slate-950
    },

    text: {
      heading: '#0f172a',   // slate-900
      body: '#475569',      // slate-600
      muted: '#94a3b8',     // slate-400
      light: '#e2e8f0',     // slate-200 (on dark bg)
    },
    
    // Status
    success: '#10b981', // emerald-500
    warning: '#f59e0b', // amber-500
    error: '#ef4444',   // red-500
  },
  
  // Gradients matching Home/Hero
  gradients: {
    hero: 'from-slate-950 via-[#0f172a] to-rose-950/40',
    primary: 'from-rose-500 to-rose-600',
    subtle: 'from-rose-50 to-white',
    darkOverlay: 'from-black/40 to-transparent',
    text: 'from-rose-400 via-red-500 to-rose-400', // Typewriter effect
  },
  
  // Responsive / Dense Typography
  typography: {
    fontFamily: {
      sans: 'var(--font-inter)',
      heading: 'var(--font-poppins)',
      bengali: 'var(--font-anek-bangla)',
    },
    // Using landing page optimized scale
    fontSize: {
      xxs: '0.625rem',   // 10px (Badges, small details, mobile indicators)
      xs: '0.6875rem',   // 11px (Muted mobile text)
      sm: '0.8125rem',   // 13px (Dense mobile UI)
      base: '1rem',      // 16px (Standard)
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.375rem', // 22px (Landing Page Heading - Mobile)
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
      '7xl': '4.5rem',   // 72px
    },
  },
  
  // Layout & Component Density Tokens
  layout: {
    container: {
      px: 'px-4 md:px-6 lg:px-8',
      maxWidth: 'max-w-7xl',
    },
    section: {
      py: 'py-10 md:py-24', // Standard mobile vs desktop spacing
      gap: 'gap-8 md:gap-16',
    },
  },

  // Components Configuration
  components: {
    button: {
      dense: 'px-3 py-2.5 text-[10px] md:text-base md:px-8 md:py-4', // Hero/Call To Action style
      standard: 'px-5 py-3 text-sm md:text-base md:px-8 md:py-4',
      rounded: 'rounded-xl md:rounded-2xl',
    },
    card: {
      padding: 'p-3 md:p-6 lg:p-8',
      rounded: 'rounded-xl md:rounded-2xl',
      border: 'border border-slate-100',
      shadow: 'shadow-md hover:shadow-xl transition-all',
    }
  },
} as const;

export default theme;
