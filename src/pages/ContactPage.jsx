import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Reveal from '../components/Reveal';

const projectTypes = [
  'YouTube Long-form',
  'Social Media Ads',
  'Short-form / Reels',
  'Podcast Cutdowns',
  'UGC / Testimonial',
  'YouTube Channel Management',
  'Other',
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    type: '',
    deadline: '',
    length: '',
    reference: '',
    message: '',
  });
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTypeSelect = (type) => {
    setForm((prev) => ({ ...prev, type }));
    setFormError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.type) {
      setFormError('Choose a project type before sending.');
      return;
    }
    // Hook up to your backend / Formspree / EmailJS here
    setSent(true);
  };

  return (
    <main className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="container">
          <Reveal>
            <div className="section-eyebrow">Get in touch</div>
            <h1 className="contact-title">
              Let&apos;s plan your next <span className="serif">edit</span>.
            </h1>
            <p className="contact-sub">
              Tell me what you&apos;re making, where it&apos;s going, and when you need it. I&apos;ll
              reply within 24 hours with next steps.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Form + Info */}
      <section className="contact-body">
        <div className="container contact-grid">

          {/* Left — info */}
          <Reveal delay={0.05}>
            <div className="contact-info">
              <div className="contact-info-block">
                <div className="section-eyebrow">Email</div>
                <a href="mailto:geferlene@gmail.com" className="contact-link">
                  geferlene@gmail.com
                </a>
              </div>
              <div className="contact-info-block">
                <div className="section-eyebrow">Phone</div>
                <a href="tel:+639272156953" className="contact-link">
                  +63 927 215 6953
                </a>
              </div>
              <div className="contact-info-block">
                <div className="section-eyebrow">Based in</div>
                <span className="contact-link">Cebu, Philippines</span>
              </div>
              <div className="contact-info-block">
                <div className="section-eyebrow">Availability</div>
                <span className="contact-link contact-available">
                  <span className="badge-dot" />
                  Open for projects — May 2026
                </span>
              </div>

              <div className="contact-info-divider" />

              <div className="contact-info-block">
                <div className="section-eyebrow">Turnaround</div>
                <span className="contact-detail">24–48 hrs short-form · 3–5 days long-form</span>
              </div>
              <div className="contact-info-block">
                <div className="section-eyebrow">Revisions</div>
                <span className="contact-detail">2 rounds included, timestamped feedback</span>
              </div>
            </div>
          </Reveal>

          {/* Right — form */}
          <Reveal delay={0.12}>
            <div className="contact-form-card">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  className="contact-success"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="success-icon">🎬</div>
                  <h2>Brief received!</h2>
                  <p>
                    Thanks {form.name ? form.name.split(' ')[0] : 'for reaching out'} — I&apos;ll
                    review your brief and reply within 24 hours with next steps.
                  </p>
                  <button className="btn-primary" onClick={() => setSent(false)}>
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className="contact-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="name">Your name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Jane Smith"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="email">Email address</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="jane@company.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label>Project type</label>
                    <div className="type-pills">
                      {projectTypes.map((t) => (
                        <button
                          key={t}
                          type="button"
                          className={`type-pill${form.type === t ? ' selected' : ''}`}
                          aria-pressed={form.type === t}
                          onClick={() => handleTypeSelect(t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    {formError && <p className="form-error">{formError}</p>}
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="deadline">Deadline</label>
                      <input
                        id="deadline"
                        name="deadline"
                        type="text"
                        placeholder="June 12, flexible, or ASAP"
                        value={form.deadline}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="length">Video length / format</label>
                      <input
                        id="length"
                        name="length"
                        type="text"
                        placeholder="30s ad, 8-min YouTube, 5 reels"
                        value={form.length}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="reference">Reference link</label>
                    <input
                      id="reference"
                      name="reference"
                      type="text"
                      placeholder="A video, folder, channel, or style reference"
                      value={form.reference}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="message">Tell me about your project</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Share the goal, audience, footage status, platform, and anything you already know about the style."
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button type="submit" className="btn-primary">
                    Send brief
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
