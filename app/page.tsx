import Hero from '@/components/home/Hero';
import Infos from '@/components/home/Infos';
import Process from '@/components/home/Process';
import Testimonials from '@/components/home/Testimonials';
import CTA from '@/components/home/CTA';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Infos />
      <Process />
      <Testimonials />
      <CTA />
    </div>
  );
}
