import Hero from '../components/Hero';
import Showreel from '../components/Showreel';
import Stats from '../components/Stats';
import About from '../components/About';
import Services from '../components/Services';
import Process from '../components/Process';
import Work from '../components/Work';
import Experience from '../components/Experience';
import Testimonials from '../components/Testimonials';
import Clients from '../components/Clients';
import MarqueeStrip from '../components/MarqueeStrip';
import Tools from '../components/Tools';
import Faq from '../components/Faq';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Showreel />
      <Stats />
      <About />
      <Services />
      <Process />
      <Work />
      <Experience />
      <Testimonials />
      <Clients />
      <MarqueeStrip />
      <Tools />
      <Faq />
    </main>
  );
}
