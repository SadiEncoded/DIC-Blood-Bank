'use client';

import { LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminFloatingButton({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();

  // Don't show on admin pages (redundant) or if not admin
  if (!isAdmin || pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <Link
      href="/admin"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-zinc-900 text-white rounded-full shadow-lg hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all animate-in slide-in-from-bottom-10"
      title="Open Admin Console"
    >
      <LayoutDashboard size={20} />
      <span className="font-bold text-sm">Admin</span>
    </Link>
  );
}
