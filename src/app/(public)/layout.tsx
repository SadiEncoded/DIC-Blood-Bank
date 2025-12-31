import Header from "@/components/common/layout/Header";
import AdminFloatingButton from "@/features/admin/components/AdminFloatingButton";
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let isAdmin = false;
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    isAdmin = profile?.role === 'admin';
  }

  return (
    <>
      <Header user={user} />
      <div className="relative flex flex-col min-h-screen pt-28"> 
        <main id="main-content" className="flex-1 flex flex-col" role="main">
          {children}
        </main>
        <Footer />
      </div>
      <AdminFloatingButton isAdmin={isAdmin} />
    </>
  );
}
