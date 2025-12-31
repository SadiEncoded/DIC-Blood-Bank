'use client';

import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import Image from 'next/image';

interface PostCardProps {
  post: {
    id: string;
    title?: string;
    content: string;
    image_url?: string;
    created_at: string;
  };
  index: number;
}

export default function PostCard({ post, index }: PostCardProps) {
  const date = new Date(post.created_at);

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
        ease: 'easeOut',
      }}
      viewport={{ once: true }}
      className="
        group overflow-hidden rounded-3xl bg-white
        shadow-[0_8px_30px_rgb(0,0,0,0.04)]
        transition-all duration-300
        hover:-translate-y-[2px]
        hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)]
      "
    >
      {/* Header */}
      <header className="flex items-center gap-3 md:gap-4 px-4 sm:px-6 pt-4 md:pt-5 pb-3 md:pb-4">
        <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <User size={16} className="md:w-5 md:h-5" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-slate-900">
              DIC Blood Bank
            </h3>
            <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-rose-700">
              Official
            </span>
          </div>

          <time
            dateTime={post.created_at}
            className="block text-xs text-slate-400"
          >
            {formattedDate} · {formattedTime}
          </time>
        </div>
      </header>

      {/* Image (if exists) */}
      {post.image_url && (
        <div className="relative w-full bg-slate-100">
          <div className="aspect-[16/9] overflow-hidden">
            <Image
              src={post.image_url}
              alt={post.title || 'Official announcement image'}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 900px"
              priority={index === 0}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="px-4 sm:px-6 py-4 md:py-5">
        {post.title && (
          <h4 className="mb-2 text-base md:text-lg lg:text-xl font-semibold leading-snug text-slate-900 font-anek">
            {post.title}
          </h4>
        )}

        <p className="text-[13px] md:text-[15px] leading-relaxed text-slate-600 line-clamp-4 md:line-clamp-5 whitespace-pre-wrap">
          {post.content}
        </p>
      </div>
    </motion.article>
  );
}
