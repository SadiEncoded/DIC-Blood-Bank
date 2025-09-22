import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import BloodGroups from './components/BloodGroup';
import Footer from './components/Footer';



export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Hero />
      <Stats />
      <BloodGroups />
      <Footer />
    </div>
  );
}
