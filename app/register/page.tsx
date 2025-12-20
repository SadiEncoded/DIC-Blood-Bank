import RegisterForm from './components/Form';
import { RegisterHero } from './components/Hero';

export default function RegistrationPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <RegisterHero />
      
      {/* This pulls the form up over the hero without double-rendering the hero */}
      <section className="relative -mt-24 md:-mt-32 pb-24 z-30">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <RegisterForm />
          
          <div className="mt-12 text-center text-slate-400 font-hind">
            ইতিমধ্যে নিবন্ধন করেছেন? 
            <a href="/donors" className="text-rose-600 font-bold ml-2 hover:underline inline-flex items-center gap-1 group">
              দাতা তালিকা দেখুন <span>→</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
