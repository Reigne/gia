import { motion } from 'motion/react';
import { staggerContainer, fadeUp } from './revealVariants';
import Reveal from './Reveal';
import { tools } from '../data/site';

export default function Tools() {
  return (
    <section className="tools" id="tools">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div>
              <div className="section-eyebrow">Toolkit</div>
              <h2>The <span className="serif">software</span> I work in.</h2>
            </div>
            <p>From timeline-heavy Premiere edits to quick CapCut shorts and motion polish in After Effects.</p>
          </div>
        </Reveal>

        <motion.div
          className="tools-grid"
          variants={staggerContainer(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {tools.map((t) => (
            <motion.div className="tool" key={t} variants={fadeUp}>{t}</motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
