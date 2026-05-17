import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '../data/site';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('');
  const tickingRef = useRef(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const update = () => {
      const hero = document.querySelector('.hero, .contact-hero');
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
  }, [location.pathname]);

  useEffect(() => {
    if (!isHome) return;
    const ids = navLinks
      .filter((l) => l.href.startsWith('#'))
      .map((l) => l.href.replace('#', ''));
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
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
  }, [isHome]);

  const isContactPage = location.pathname === '/contact';

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link to="/" className="logo" aria-label="Gia Studio home">
          <img src="/logo2.png" alt="Gia" className="logo-image" />
          <span className="logo-text">Gia</span>
        </Link>
        <nav className="nav-links">
          {navLinks.map((l) => {
            const id = l.href.replace('#', '');
            const isActive = isHome ? activeId === id : false;
            if (l.href === '/contact') {
              return (
                <Link
                  key={l.href}
                  to="/contact"
                  className={isContactPage ? 'active' : ''}
                >
                  {l.label}
                </Link>
              );
            }
            return (
              <a
                key={l.href}
                href={isHome ? l.href : `/${l.href}`}
                className={isActive ? 'active' : ''}
              >
                {l.label}
              </a>
            );
          })}
        </nav>
        <Link to="/contact" className="nav-cta">Send a brief</Link>
      </div>
    </header>
  );
}
