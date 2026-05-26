import { Routes, Route, useLocation } from 'react-router-dom';
import CuteCursor from './components/CuteCursor';
import Nav from './components/Nav';
import Footer from './components/Footer';
import PageIntro from './components/PageIntro';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import useSmoothScroll from './hooks/useSmoothScroll';

export default function App() {
  useSmoothScroll();
  const { pathname } = useLocation();

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer minimal={pathname === '/contact'} />
      <CuteCursor />
      <PageIntro />
    </>
  );
}
