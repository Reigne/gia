import { useEffect, useRef, useState } from 'react';
import { navLinks } from '../data/site';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('');
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

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace('#', ''));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#" className="logo" aria-label="Gia Studio home">
          <img src="/logo2.png" alt="Gia" className="logo-image" />
          <span className="logo-text">Gia</span>
        </a>
        <nav className="nav-links">
          {navLinks.map((l) => {
            const id = l.href.replace('#', '');
            return (
              <a
                key={l.href}
                href={l.href}
                className={activeId === id ? 'active' : ''}
              >
                {l.label}
              </a>
            );
          })}
        </nav>
        <a href="#contact" className="nav-cta">Book a call</a>
      </div>
    </header>
  );
}
