import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Footer from './components/Footer';
import DonorMap from './components/DonorMap';

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Hero />
      <Stats />
      <DonorMap />
      <Footer />
    </div>
  );
}
