import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { fadeUp, staggerContainer } from './Reveal';

const stats = [
  { num: 3,   suffix: '+', label: 'Years editing',     detail: 'Full-time since 2023' },
  { num: 20,  suffix: '+', label: 'Brands & creators', detail: 'Across 5+ industries' },
  { num: 500, suffix: '+', label: 'Videos delivered',  detail: 'And still counting',  featured: true },
  { num: 30,  suffix: '+', label: 'YouTube channels',  detail: 'Managed end to end',  wide: true },
];

function CountUp({ to, suffix, duration = 1.6 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * to));
      if (progress < 1) frame = requestAnimationFrame(tick);
      else setCount(to);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Stats() {
  return (
    <section className="stats">
      <div className="container">
        <motion.div
          className="stats-grid"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {stats.map((s) => (
            <motion.div
              className={`stat${s.featured ? ' stat--featured' : ''}${s.wide ? ' stat--wide' : ''}`}
              key={s.label}
              variants={fadeUp}
            >
              <div className="stat-num">
                <CountUp to={s.num} suffix={s.suffix} />
              </div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-detail">{s.detail}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
