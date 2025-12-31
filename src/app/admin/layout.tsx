import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Console | DIC Blood Bank',
  description: 'Manage blood requests, donors, and system content.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {children}
    </div>
  );
}
