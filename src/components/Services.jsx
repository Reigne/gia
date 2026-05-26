import { useState } from 'react';
import { motion } from 'motion/react';
import { FiBarChart2, FiCheckCircle, FiSmartphone, FiYoutube } from 'react-icons/fi';
import { staggerContainer, fadeUp } from './revealVariants';
import Reveal from './Reveal';
import { services } from '../data/site';

const serviceVisuals = [
  {
    icon: FiYoutube,
    label: 'Retention timeline',
    metric: '8-15m',
    chips: ['Hook', 'B-roll', 'Pacing'],
  },
  {
    icon: FiBarChart2,
    label: 'Campaign system',
    metric: 'A/B',
    chips: ['UGC', 'Variants', 'CTR'],
  },
  {
    icon: FiSmartphone,
    label: 'Vertical engine',
    metric: '9:16',
    chips: ['Hooks', 'Captions', 'Loops'],
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex];
  const visual = serviceVisuals[activeIndex];
  const VisualIcon = visual.icon;

  return (
    <section className="services" id="services">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div>
              <div className="section-eyebrow">What I do</div>
              <h2>Editing <span className="serif">built</span> around what works.</h2>
            </div>
            <p>Three focused offerings - each shaped by years of editing for performance-driven YouTube channels and ad campaigns.</p>
          </div>
        </Reveal>

        <motion.div
          className="services-console"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div className="services-nav" variants={fadeUp}>
            {services.map((service, index) => {
              const isActive = activeIndex === index;

              return (
                <button
                  className={`service-nav-item${isActive ? ' is-active' : ''}`}
                  key={service.num}
                  type="button"
                  aria-expanded={isActive}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className="service-nav-num">{String(index + 1).padStart(2, '0')}</span>
                  <span className="service-nav-copy">
                    <span className="service-nav-title">
                      {service.title[0]}<span className="serif">{service.title[1]}</span>
                    </span>
                    <span className="service-nav-body">{service.body}</span>
                  </span>
                </button>
              );
            })}
          </motion.div>

          <motion.div
            className="service-visual-card"
            key={activeIndex}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <div className="service-visual-top">
              <span>{visual.label}</span>
              <VisualIcon aria-hidden="true" />
            </div>

            <div className="service-visual-main">
              <div className="service-mini-card service-mini-card--hero">
                <span className="service-visual-metric">{visual.metric}</span>
                <h3>{activeService.title[0]}<span className="serif">{activeService.title[1]}</span></h3>
                <p>{activeService.body}</p>
              </div>
            </div>

            <div className="service-chip-row">
              {visual.chips.map((chip) => (
                <span key={chip}>
                  <FiCheckCircle aria-hidden="true" />
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
