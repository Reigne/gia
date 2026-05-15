import { useEffect, useRef } from 'react';

export default function CuteCursor() {
  const ref = useRef(null);

  useEffect(() => {
    if (!window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return;

    const cursor = ref.current;
    if (!cursor) return;

    document.documentElement.classList.add('has-custom-cursor');

    let currentX = -100;
    let currentY = -100;
    let targetX = -100;
    let targetY = -100;
    let raf = 0;

    const tick = () => {
      currentX += (targetX - currentX) * 0.34;
      currentY += (targetY - currentY) * 0.34;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      cursor.classList.add('is-visible');
    };
    const onLeave = () => cursor.classList.remove('is-visible');
    const onDown = () => cursor.classList.add('is-down');
    const onUp = () => cursor.classList.remove('is-down');

    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('pointerup', onUp);

    const items = document.querySelectorAll('a, button, summary, [role="button"]');
    const enterHandlers = [];
    const leaveHandlers = [];
    items.forEach((item) => {
      const onEnter = () => {
        cursor.classList.add('is-hover');
        if (item.matches('.work-card, .reel-placeholder')) {
          cursor.classList.add('is-play');
        }
      };
      const onLeaveItem = () => cursor.classList.remove('is-hover', 'is-play');
      item.addEventListener('pointerenter', onEnter);
      item.addEventListener('pointerleave', onLeaveItem);
      enterHandlers.push([item, onEnter]);
      leaveHandlers.push([item, onLeaveItem]);
    });

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('has-custom-cursor');
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerup', onUp);
      enterHandlers.forEach(([el, h]) => el.removeEventListener('pointerenter', h));
      leaveHandlers.forEach(([el, h]) => el.removeEventListener('pointerleave', h));
    };
  }, []);

  return (
    <div className="cute-cursor" aria-hidden="true" ref={ref}>
      <span className="cute-cursor-dot" />
      <span className="cute-cursor-sparkle" />
      <span className="cute-cursor-label">Play</span>
    </div>
  );
}
