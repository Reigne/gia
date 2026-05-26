import { motion } from 'motion/react';
import { staggerContainer, fadeUp } from './revealVariants';
import Reveal from './Reveal';
import { faqs } from '../data/site';

export default function Faq() {
  return (
    <section className="faq" id="faq">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div>
              <div className="section-eyebrow">FAQ</div>
              <h2>Common <span className="serif">questions</span>.</h2>
            </div>
            <p>Anything else? Just email me — I reply within 24 hours.</p>
          </div>
        </Reveal>

        <motion.div
          className="faq-list"
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {faqs.map((f) => (
            <motion.details
              className="faq-item"
              key={f.q}
              variants={fadeUp}
              {...(f.open ? { open: true } : {})}
            >
              <summary className="faq-q">{f.q}</summary>
              <p className="faq-a">{f.a}</p>
            </motion.details>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
