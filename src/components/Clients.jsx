import { motion } from 'motion/react';
import { staggerContainer, fadeUp } from './revealVariants';
import Reveal from './Reveal';
import { heroClients } from '../data/site';

export default function Clients() {
  return (
    <section className="clients">
      <div className="container">
        <Reveal>
          <div className="clients-label">Trusted by teams &amp; creators at</div>
        </Reveal>

        <motion.div
          className="clients-row"
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {heroClients.map((c, i) => (
            <motion.span key={c} style={{ display: 'contents' }} variants={fadeUp}>
              <span>{c}</span>
              {i < heroClients.length - 1 && <span className="dot-sep">●</span>}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
