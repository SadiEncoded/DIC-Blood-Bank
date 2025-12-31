import { Anek_Bangla, Hind_Siliguri } from 'next/font/google';

// Anek Bangla (Headers (h1–h6) → font-anekBangla)
export const anekBangla = Anek_Bangla({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-anek-bangla',
});

// Hind Siliguri (Body Text → font-hind)
export const hind = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hind',
});
