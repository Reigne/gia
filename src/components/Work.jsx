import { motion } from 'motion/react';
import { staggerContainer, fadeUp } from './Reveal';
import Reveal from './Reveal';
import { workItems } from '../data/site';

export default function Work() {
  return (
    <section className="work" id="work">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div>
              <div className="section-eyebrow">Selected work</div>
              <h2>Recent <span className="serif">edits</span>.</h2>
            </div>
            <p>A handful of projects across YouTube long-form, social ads and short-form content. Click through to watch the full edit.</p>
          </div>
        </Reveal>

        <motion.div
          className="work-grid"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {workItems.map((w) => (
            <motion.a
              key={w.tag + w.title[1]}
              href="#"
              className="work-card"
              data-tone={w.tone}
              variants={fadeUp}
            >
              <div className="work-thumb">
                <span className="work-play">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </div>
              <div className="work-meta">
                <div className="work-tag">{w.tag}</div>
                <h3>{w.title[0]}<span className="serif">{w.title[1]}</span></h3>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
