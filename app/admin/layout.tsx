import AdminSidebar from '@/components/admin/AdminSidebar';
import { createClient } from '@/lib/utils/supabase/server';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/signup');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="pl-64 min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
            {children}
        </div>
      </main>
    </div>
  );
}
