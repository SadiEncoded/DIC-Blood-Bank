import { ArticleFeed, LearnHero } from '@/features/learn';
import { Metadata } from 'next';

export const metadata: Metadata = {
  // Combined bilingual metadata for better SEO and accessibility
  title: 'রক্তদান সম্পর্কে জানুন | Learn About Blood Donation',
  description: 'রক্তদানের গুরুত্ব, স্বাস্থ্য উপকারিতা এবং আপনি কীভাবে জীবন বাঁচাতে ভূমিকা রাখতে পারেন তা জানুন। Discover the importance of blood donation and how you can save lives.',
  keywords: ['blood donation', 'রক্তদান', 'health benefits', 'save lives', 'সচেতনতা', 'awareness portal'],
};

export default function LearnPage() {
  return (
    <main className="min-h-screen selection:bg-rose-100 selection:text-rose-900 bg-white">
      {/* Main Awareness Hub 
          LearnHero: Top visual and category filter
      */}
      <LearnHero />
      
      <div className="py-16 md:py-24">
        {/* Article Feed: 
            The grid of awareness cards. 
            Clean background and wide spacing for a minimalist feel.
        */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 flex flex-col items-start">
            <span className="text-rose-600 font-bold text-[10px] uppercase tracking-[0.3em] mb-2">
              Resource Hub
            </span>
            <h2 className="text-3xl font-light text-slate-900 font-anek">
               সচেতনতামূলক প্রবন্ধসমূহ
            </h2>
          </div>
          
          <ArticleFeed layout="grid" />
        </div>
      </div>
    </main>
  );
}
