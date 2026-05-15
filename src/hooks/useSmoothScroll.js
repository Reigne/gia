import { useEffect } from 'react';

export default function useSmoothScroll() {
  useEffect(() => {
    const reduceMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const onClick = (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute('href');
      const target = id === '#' ? document.body : document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      const offset = id === '#' ? 0 : 96;
      const top =
        id === '#' ? 0 : target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}
