import Hero from '@/components/home/Hero';
import Infos from '@/components/home/Infos';
import Process from '@/components/home/Process';
import Testimonials from '@/components/home/Testimonials';
import Aboutus from '@/components/home/aboutus';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Infos />
      <Process />
      <Testimonials />
      <Aboutus />
    </div>
  );
}
