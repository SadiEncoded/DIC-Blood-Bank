'use client'

import ContactForm from './components/ContactForm'
import ContactHero from './components/ContactHero'
import ContactInfo from './components/ContactInfo'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-rose-500/30 selection:text-rose-900">
      
      <ContactHero />

      {/* Contact Info & Form Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-20 grid gap-12 md:grid-cols-2">
        <ContactInfo />
        <ContactForm />
      </section>

      {/* Footer Note */}
      <footer className="bg-slate-50 px-6 py-8 text-center">
        <p className="text-[0.75rem] text-slate-500 font-poppins">
          © {new Date().getFullYear()} Daffodil International College Blood Bank · Trusted · Institutional · Secure
        </p>
      </footer>
    </main>
  )
}
