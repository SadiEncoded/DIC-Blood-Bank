import { Container, Section } from '@/components/ui';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AuthErrorPage() {
  return (
    <Section className="bg-slate-50 min-h-screen flex items-center justify-center">
      <Container className="max-w-md w-full text-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center">
          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-6 text-rose-600">
            <AlertCircle size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Authentication Error</h1>
          <p className="text-slate-500 mb-6">There was an issue verifying your login information.</p>
          <Link href="/login" className="bg-rose-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-rose-700 transition">
            Try Again
          </Link>
        </div>
      </Container>
    </Section>
  );
}
