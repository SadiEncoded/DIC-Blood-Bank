// registration-page.tsx
import { SIGNUP_PAGE_CONTENT } from '@/lib/data/signup';
import SignUpForm from './components/SignUpForm';
import { SignUpHero } from './components/SignUpHero';

export default function RegistrationPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      
      {/* Hero Section */}
      <SignUpHero />

      {/* Form Section */}
      <section className="relative pt-6 pb-24">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <SignUpForm />

          {/* Footer CTA */}
          <div className="mt-12 text-center text-slate-400 font-hind">
            {SIGNUP_PAGE_CONTENT.footer.text}
            <a
              href="/donors"
              className="text-rose-600 font-bold ml-2 hover:underline inline-flex items-center gap-1 group"
            >
              {SIGNUP_PAGE_CONTENT.footer.cta} <span>→</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
