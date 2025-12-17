// ============================================
// 📁 lib/theme.ts
// Centralized Theme Configuration for DIC Blood Bank
// ============================================

/**
 * DIC Blood Bank Theme
 * Based on Daffodil International College branding
 * Blue & Red color scheme for institutional healthcare design
 */

export const theme = {
  // Brand Colors
  colors: {
    // Primary - DIC Blue
    primary: {
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#3B82F6',  // Main blue
      600: '#2563EB',  // DIC blue
      700: '#1D4ED8',
      800: '#1E40AF',
      900: '#1E3A8A',
    },
    
    // Secondary - Medical Red
    red: {
      50: '#FEF2F2',
      100: '#FEE2E2',
      200: '#FECACA',
      300: '#FCA5A5',
      400: '#F87171',
      500: '#EF4444',
      600: '#E63946',  // Brand red
      700: '#DC2626',
      800: '#B91C1C',
      900: '#991B1B',
    },
    
    // Accent - Cyan
    cyan: {
      500: '#06B6D4',
      600: '#0891B2',
      700: '#0E7490',
    },
    
    // Neutrals
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    
    // Institutional
    institutional: {
      darkBlue: '#1D3557',  // Deep institutional blue
      cleanWhite: '#F1FAEE', // Off-white background
    },
    
    // Status Colors
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  
  // Gradient Definitions
  gradients: {
    // Primary gradients
    bluePrimary: 'from-blue-500 to-blue-600',
    blueSecondary: 'from-blue-600 to-cyan-600',
    redPrimary: 'from-red-500 to-rose-600',
    redSecondary: 'from-red-600 to-rose-700',
    
    // Hero gradients
    heroBackground: 'from-blue-600 via-blue-700 to-cyan-800',
    heroText: 'from-cyan-300 to-blue-200',
    
    // Background gradients
    lightBlue: 'from-blue-50 to-white',
    lightRed: 'from-rose-50 to-white',
    institutional: 'from-white/95 via-rose-50/90 to-blue-50/85',
    
    // Button gradients
    buttonPrimary: 'from-cyan-50 to-blue-50',
    buttonHover: 'from-rose-500 to-rose-600',
  },
  
  // Typography
  typography: {
    fontFamily: {
      sans: 'var(--font-inter)',
      heading: 'var(--font-poppins)',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
  },
  
  // Spacing
  spacing: {
    section: {
      sm: 'py-12',
      md: 'py-20',
      lg: 'py-24',
      xl: 'py-32',
    },
    container: 'max-w-7xl mx-auto px-6',
  },
  
  // Border Radius
  borderRadius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    full: '9999px',
  },
  
  // Shadows
  shadows: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
    colored: {
      blue: 'shadow-lg shadow-blue-200',
      red: 'shadow-lg shadow-rose-200',
      white: 'shadow-2xl hover:shadow-white/20',
    },
  },
  
  // Transitions
  transitions: {
    fast: 'transition-all duration-200',
    normal: 'transition-all duration-300',
    slow: 'transition-all duration-500',
  },
  
  // Component-specific tokens
  components: {
    card: {
      base: 'bg-white rounded-2xl p-8 shadow-sm border border-gray-100',
      hover: 'hover:shadow-xl hover:-translate-y-2 transition-all duration-300',
      glass: 'bg-white/10 backdrop-blur-md border border-white/20',
    },
    button: {
      primary: 'px-8 py-4 bg-white text-blue-700 rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/20 transition-all duration-300',
      secondary: 'px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300',
      cta: 'px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-rose-700 transition-colors shadow-lg',
    },
    icon: {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-8 h-8',
      xl: 'w-10 h-10',
    },
  },
} as const;

// Helper function to get gradient classes
export const getGradient = (name: keyof typeof theme.gradients) => {
  return `bg-gradient-to-br ${theme.gradients[name]}`;
};

// Helper function to get color
export const getColor = (color: string) => {
  return color;
};

// Export individual sections for easier imports
export const colors = theme.colors;
export const gradients = theme.gradients;
export const typography = theme.typography;
export const spacing = theme.spacing;
export const components = theme.components;

export default theme;
