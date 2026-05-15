import { useEffect, useRef, useState } from 'react';
import { navLinks } from '../data/site';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const tickingRef = useRef(false);

  useEffect(() => {
    const update = () => {
      const hero = document.querySelector('.hero');
      const switchPoint = hero ? hero.offsetHeight - 96 : 80;
      setScrolled(window.scrollY > switchPoint);
      tickingRef.current = false;
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#" className="logo" aria-label="Gia Studio home">
          <img src="/assets/logo2.png" alt="Gia" className="logo-image" />
          <span className="logo-text">Gia</span>
        </a>
        <nav className="nav-links">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>
        <a href="#contact" className="nav-cta">Book a call</a>
      </div>
    </header>
  );
}
