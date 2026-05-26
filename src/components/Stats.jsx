import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { FiAperture, FiBox, FiChevronLeft, FiChevronRight, FiClock, FiCloud, FiCommand, FiCpu, FiTarget, FiTrendingUp, FiUsers, FiVideo, FiZap } from 'react-icons/fi';
import { fadeUp, staggerContainer } from './revealVariants';

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

  return (
    <span ref={ref}>
      {count}
      {suffix && <span className="stat-suffix">{suffix}</span>}
    </span>
  );
}

const milestones = [
  { label: 'Now',  role: 'Global Standards', emoji: '🌍', detail: 'Delivering top-tier viral edits for leading creators globally.' },
  { label: '2025', role: 'Premium Directing', emoji: '🎬', detail: 'Led visual storytelling, motion design, and color-grading.' },
  { label: '2024', role: '50M+ Views',        emoji: '🔥', detail: 'Scaled high-performance channels with retention-focused editing.' },
  { label: '2023', role: 'Full-time Launch',  emoji: '🚀', detail: 'Began editing full-time, building a custom studio pipeline.' },
];

export default function Stats() {
  const [activeYearIndex, setActiveYearIndex] = useState(0);
  const prevMilestone = () => setActiveYearIndex(i => (i - 1 + milestones.length) % milestones.length);
  const nextMilestone = () => setActiveYearIndex(i => (i + 1) % milestones.length);

  return (
    <section className="stats stats--bento">
      <div className="container">
        <motion.div
          className="stats-grid stats-bento-grid"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.article
            className="stat-card stat-card--years"
            variants={fadeUp}
          >
            <div className="stat-card-head">
              <span className="stat-kicker">Experience</span>
              <FiClock className="stat-icon" aria-hidden="true" />
            </div>

            <div className="years-top">
              <div className="stat-num"><CountUp to={3} suffix="+" /></div>
              <div className="years-top-text">
                <div className="stat-label">Years Editing</div>
                <div className="stat-detail">Full-time since 2023</div>
              </div>
            </div>

            <div className="milestone-stack" aria-label="Career milestones">
              {milestones.map((m, i) => {
                const stackDepth = (i - activeYearIndex + milestones.length) % milestones.length;
                return (
                  <button
                    key={m.label}
                    type="button"
                    aria-pressed={activeYearIndex === i}
                    className={`milestone-card${activeYearIndex === i ? ' is-active' : ''}`}
                    style={{ '--stack-index': stackDepth }}
                    onClick={() => setActiveYearIndex(i)}
                  >
                    <div className="milestone-card-label">{m.label}</div>
                    <div className="milestone-card-body">
                      <span className="milestone-card-emoji" aria-hidden="true">{m.emoji}</span>
                      <div>
                        <div className="milestone-card-role">{m.role}</div>
                        <div className="milestone-card-detail">{m.detail}</div>
                      </div>
                    </div>
                  </button>
                );
              })}

            </div>

            <div className="milestone-nav">
              <button type="button" className="milestone-nav-btn" onClick={prevMilestone} aria-label="Previous milestone">
                <FiChevronLeft size={13} />
              </button>

              <div className="milestone-dots">
                {milestones.map((m, i) => (
                  <button
                    key={m.label}
                    type="button"
                    className={`milestone-dot${activeYearIndex === i ? ' is-active' : ''}`}
                    onClick={() => setActiveYearIndex(i)}
                    aria-label={m.label}
                  />
                ))}
              </div>

              <button type="button" className="milestone-nav-btn" onClick={nextMilestone} aria-label="Next milestone">
                <FiChevronRight size={13} />
              </button>
            </div>
          </motion.article>

          <motion.article className="stat-card stat-card--brands" variants={fadeUp}>
            <div className="brands-header-group">
              <div className="stat-card-head" style={{ marginBottom: '12px' }}>
                <span className="stat-kicker">Collaboration</span>
                <FiUsers className="stat-icon" aria-hidden="true" />
              </div>
              <div className="stat-num" style={{ marginTop: 0 }}>
                <CountUp to={20} suffix="+" />
              </div>
              <div className="stat-label" style={{ marginTop: '4px' }}>Brands &amp; creators</div>
              <div className="stat-detail" style={{ marginTop: '2px' }}>Across 5+ industries</div>
            </div>

            <div className="brands-grid-shell" aria-hidden="true">
              <div className="brands-grid">


                {/* Row 2 */}
                <div className="brands-cell brands-cell--edge" />
                <div className="brands-cell" />
                <div className="brands-cell" />
                <div className="brands-cell" />
                <div className="brands-cell" />
                <div className="brands-cell" />
                <div className="brands-cell brands-cell--edge" />

                {/* Row 3 */}
                <div className="brands-cell brands-cell--edge" />
                <div className="brands-cell" />
                <div className="brands-cell" />
                <div className="brands-cell" />
                <div className="brands-cell" />
                <div className="brands-cell" />
                <div className="brands-cell brands-cell--edge" />

                {/* Row 4 (Logos) */}
                <div className="brands-cell brands-cell--edge" />
                <div className="brands-cell" />
                <div className="brands-cell brands-cell--logo">
                  <div className="monkey-logo-container" style={{ width: '100%', height: '100%', borderRadius: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #FFE853 0%, #FFD016 100%)' }}>
                    <FiAperture className="brand-icon" style={{ color: '#1C1C1C' }} />
                  </div>
                </div>
                <div className="brands-cell" />
                <div className="brands-cell brands-cell--logo">
                  <div className="stripey-logo-container" style={{ width: '100%', height: '100%', borderRadius: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #E6E8EB 0%, #CDD1D6 100%)' }}>
                    <FiCommand className="brand-icon" style={{ color: '#2D3139' }} />
                  </div>
                </div>
                <div className="brands-cell" />
                <div className="brands-cell brands-cell--edge" />

                {/* Row 5 (Logos) */}
                <div className="brands-cell brands-cell--edge" />
                <div className="brands-cell brands-cell--logo">
                  <FiCpu className="brand-icon" style={{ color: '#10a37f' }} />
                </div>
                <div className="brands-cell" />
                <div className="brands-cell brands-cell--logo">
                  <FiTarget className="brand-icon" style={{ color: '#1F4B2C' }} />
                </div>
                <div className="brands-cell" />
                <div className="brands-cell brands-cell--logo">
                  <FiZap className="brand-icon" style={{ color: '#E05C36' }} />
                </div>
                <div className="brands-cell brands-cell--edge" />

                {/* Row 6 (Logos) */}
                <div className="brands-cell brands-cell--edge" />
                <div className="brands-cell" />
                <div className="brands-cell brands-cell--logo">
                  <FiBox className="brand-icon" style={{ color: '#000000' }} />
                </div>
                <div className="brands-cell" />
                <div className="brands-cell brands-cell--logo">
                  <div className="whale-logo-container" style={{ width: '100%', height: '100%', borderRadius: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #4292F4 0%, #135ED1 100%)' }}>
                    <FiCloud className="brand-icon" style={{ color: '#FFFFFF' }} />
                  </div>
                </div>
                <div className="brands-cell" />
                <div className="brands-cell brands-cell--edge" />

                {/* Row 7 */}
                <div className="brands-cell brands-cell--edge" />
                <div className="brands-cell" />
                <div className="brands-cell" />
                <div className="brands-cell" />
                <div className="brands-cell" />
                <div className="brands-cell" />
                <div className="brands-cell brands-cell--edge" />

                {/* Row 8 */}
                <div className="brands-cell brands-cell--edge" />
                <div className="brands-cell" />
                <div className="brands-cell" />
                <div className="brands-cell" />
                <div className="brands-cell" />
                <div className="brands-cell" />
                <div className="brands-cell brands-cell--edge" />
              </div>
            </div>
          </motion.article>

          <motion.article className="stat-card stat-card--videos" variants={fadeUp}>
            <div className="stat-video-bg" aria-hidden="true" />
            <div className="stat-card-head">
              <span className="stat-kicker">Output</span>
              <FiVideo className="stat-icon" aria-hidden="true" />
            </div>

            <div className="vid-text">
              <div className="stat-num">
                <CountUp to={500} suffix="+" />
              </div>
              <div className="stat-label">Videos Delivered</div>
              <div className="stat-detail">And still counting</div>
            </div>

            <div className="vid-folder" aria-hidden="true">
              <div className="vid-folder-img vid-folder-img--1">
                <span className="vid-img-type vid-img-type--yt">YT</span>
                <span className="vid-img-tag">4K</span>
              </div>
              <div className="vid-folder-img vid-folder-img--2">
                <span className="vid-img-type vid-img-type--ads">ADS</span>
                <span className="vid-img-tag">.mp4</span>
              </div>
              <div className="vid-folder-img vid-folder-img--3">
                <span className="vid-img-type vid-img-type--ugc">UGC</span>
                <span className="vid-img-tag">●REC</span>
              </div>
              <div className="vid-folder-img vid-folder-img--4">
                <span className="vid-img-type vid-img-type--fx">FX</span>
                <span className="vid-img-tag">v12</span>
              </div>
              <div className="vid-folder-body">
                <div className="vid-folder-tab">
                  <span className="vid-folder-badge">500+</span>
                </div>
              </div>
              <div className="vid-folder-front">
                <span className="vid-folder-label">✦ EDITS</span>
              </div>
            </div>

            <div className="vid-folder-hint" aria-hidden="true">
              <span>hover me</span>
              <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
                <path d="M1 13 C4 13, 7 2, 18 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
                <path d="M15 1 L18 4 L14 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <div className="vid-filmstrip" aria-hidden="true">
              {Array.from({ length: 14 }).map((_, i) => <span key={i} />)}
            </div>
          </motion.article>

          <motion.article className="stat-card stat-card--channels" variants={fadeUp}>
            <div className="stat-card-head">
              <span className="stat-kicker">Scale</span>
              <FiTrendingUp className="stat-icon" aria-hidden="true" />
            </div>

            <div className="channels-meta">
              <div className="stat-num"><CountUp to={30} suffix="+" /></div>
              <div>
                <div className="stat-label">YouTube Channels</div>
                <div className="stat-detail">Managed end to end</div>
              </div>
            </div>

            <div className="channels-chart" aria-hidden="true">
              <svg
                viewBox="0 0 400 100"
                preserveAspectRatio="none"
                className="channels-svg"
              >
                <defs>
                  <linearGradient id="channels-fill-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-line, #1F4B2C)" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="var(--chart-line, #1F4B2C)" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <line x1="0" y1="25" x2="400" y2="25" className="channels-grid-line" />
                <line x1="0" y1="50" x2="400" y2="50" className="channels-grid-line" />
                <line x1="0" y1="75" x2="400" y2="75" className="channels-grid-line" />

                <motion.path
                  d="M 0,92 C 40,90 60,88 80,85 S 120,80 140,78 S 178,66 200,62 S 248,46 270,42 S 304,28 330,24 S 368,10 400,8 L 400,100 L 0,100 Z"
                  fill="url(#channels-fill-grad)"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                />

                <motion.path
                  d="M 0,92 C 40,90 60,88 80,85 S 120,80 140,78 S 178,66 200,62 S 248,46 270,42 S 304,28 330,24 S 368,10 400,8"
                  fill="none"
                  stroke="var(--chart-line, #1F4B2C)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: 0.2, ease: 'easeInOut' }}
                />

                <motion.circle
                  cx="400" cy="8" r="4"
                  fill="var(--chart-line, #1F4B2C)"
                  style={{ transformOrigin: '400px 8px' }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 1.6 }}
                />
              </svg>

              <div className="channels-x-axis">
                <span>2023</span>
                <span>2024</span>
                <span>2025</span>
                <span>Now</span>
              </div>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
