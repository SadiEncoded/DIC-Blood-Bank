import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { createClient } from '@/lib/utils/supabase/server';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <>
      <Header user={user} />
      <div className="relative flex flex-col min-h-screen pt-20"> 
         {/* Added pt-20 to account for fixed header, though original request might have had it in children */}
         {/* Checking RootLayout, main had flex-1 flex flex-col. */}
        <main id="main-content" className="flex-1 flex flex-col" role="main">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
