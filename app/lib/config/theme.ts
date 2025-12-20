/**
 * DIC Blood Bank Design Tokens
 */

export const theme = {
  // Brand Colors
  colors: {
    primary: "hsl(var(--primary))",
    secondary: "hsl(var(--secondary))",
    background: "hsl(var(--background))",
    foreground: "hsl(var(--foreground))",
    card: "hsl(var(--card))",
    muted: "hsl(var(--muted))",
    accent: "hsl(var(--accent))",
    border: "hsl(var(--border))",
    input: "hsl(var(--input))",
    ring: "hsl(var(--ring))",
  },
  
  // Layout & Spacing
  layout: {
    container: {
      px: 'px-4 md:px-6 lg:px-8',
      maxWidth: 'max-w-7xl',
    },
    section: {
      py: 'py-12 md:py-24',
      gap: 'gap-8 md:gap-16',
    },
  },

  // Typography
  typography: {
    fonts: {
      sans: 'var(--font-inter)',
      heading: 'var(--font-poppins)',
      bengali: 'var(--font-anek-bangla)',
      hindi: 'var(--font-hind)',
    },
  },

  // Elevation & Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    institutional: '0 25px 50px -12px rgba(244, 63, 94, 0.08)',
  },

  // Component Defaults
  radius: {
    default: '0.75rem', 
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    full: '9999px',
  },

  // Motion Tokens (Framer Motion)
  animations: {
    transitions: {
      spring: { type: "spring", stiffness: 300, damping: 30 },
      smooth: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
      stagger: (delay = 0.1) => ({
        transition: { staggerChildren: delay }
      }),
    },
    variants: {
      fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      },
      fadeInUp: {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
      },
      scaleIn: {
        initial: { opacity: 0, scale: 0.95 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
      }
    }
  }
} as const;

export default theme;
