import Nav from './components/Nav';
import Hero from './components/Hero';
import Showreel from './components/Showreel';
import Stats from './components/Stats';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import Work from './components/Work';
import Experience from './components/Experience';
import Testimonials from './components/Testimonials';
import Clients from './components/Clients';
import Tools from './components/Tools';
import Faq from './components/Faq';
import Footer from './components/Footer';
import CuteCursor from './components/CuteCursor';
import useSmoothScroll from './hooks/useSmoothScroll';

export default function App() {
  useSmoothScroll();

  return (
    <>
      <Nav />
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
        <Tools />
        <Faq />
      </main>
      <Footer />
      <CuteCursor />
    </>
  );
}
