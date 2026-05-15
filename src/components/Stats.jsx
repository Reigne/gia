import { motion } from 'motion/react';
import { staggerContainer, fadeUp } from './Reveal';

const stats = [
  { num: '3+', label: 'Years editing' },
  { num: '20+', label: 'Brands & creators' },
  { num: '30+', label: 'YouTube channels' },
  { num: '∞', label: 'Hours in Premiere Pro' },
];

export default function Stats() {
  return (
    <section className="stats">
      <div className="container">
        <motion.div
          className="stats-grid"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {stats.map((s) => (
            <motion.div className="stat" key={s.label} variants={fadeUp}>
              <div className="stat-num"><span className="serif">{s.num}</span></div>
              <div className="stat-label">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
