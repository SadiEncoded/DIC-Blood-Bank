'use client';

import { HERO_CONTENT } from '@/assets/data/home/Home-Content';
import { Hero } from '@/components/ui';
import { ArrowRight, Search, UserPlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface HomeStat {
  label: string;
  value: string;
  tone: 'rose' | 'blue' | 'emerald';
}

export default function HomeHero({ stats }: { stats?: HomeStat[] }) {
  const { badge, title, description, cta } = HERO_CONTENT;

  return (
    <Hero
      badge={badge}
      title={title}
      description={description}
      stats={stats?.map(s => ({
        ...s,
        tone: (s.tone === 'rose' || s.tone === 'blue' || s.tone === 'emerald') ? s.tone : undefined
      }))}
      layout="split"
      image={
        <div className="relative w-full h-[250px] md:h-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-rose-500/20 rounded-full blur-[60px] md:blur-[80px]" />
          <Image 
            src="/herorightsideimg.svg" 
            alt="Life Saving" 
            fill 
            className="object-contain drop-shadow-2xl scale-75 md:scale-100"
            priority
          />
        </div>
      }
    >
      <Link href="/signup" className="group relative px-5 md:px-8 py-2.5 md:py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl md:rounded-2xl font-bold shadow-xl shadow-rose-900/20 transition-all hover:scale-[1.02] active:scale-[0.98] text-center flex items-center justify-center gap-2 text-[13px] md:text-base">
        <UserPlus className="w-4 h-4 md:w-5 md:h-5" />
        {cta.donor}
        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
      </Link>
      
      <Link href="/donors" className="group px-5 md:px-8 py-2.5 md:py-4 bg-white/5 backdrop-blur-md border border-white/10 text-slate-200 rounded-xl md:rounded-2xl font-bold hover:bg-white/10 transition-all text-center flex items-center justify-center gap-2 text-[13px] md:text-base">
        <Search className="w-4 h-4 md:w-5 md:h-5" />
        {cta.find}
      </Link>
    </Hero>
  );
}
