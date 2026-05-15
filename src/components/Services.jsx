import { motion } from 'motion/react';
import { staggerContainer, fadeUp } from './Reveal';
import Reveal from './Reveal';
import { services } from '../data/site';

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div>
              <div className="section-eyebrow">What I do</div>
              <h2>Editing <span className="serif">built</span> around what works.</h2>
            </div>
            <p>Three focused offerings — each shaped by years of editing for performance-driven YouTube channels and ad campaigns.</p>
          </div>
        </Reveal>

        <motion.div
          className="service-grid"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {services.map((s) => (
            <motion.div className="service" key={s.num} variants={fadeUp}>
              <div className="service-num">{s.num}</div>
              <div>
                <h3>{s.title[0]}<span className="serif">{s.title[1]}</span></h3>
                <p>{s.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
