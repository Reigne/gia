import { heroClients } from '../data/site';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="badge">
          <span className="dot" />
          Available for new clients — May 2026
        </div>

        <h1>
          Editing <span className="serif">stories</span> that capture views and{' '}
          <span className="serif">convert</span> attention.
        </h1>

        <p className="hero-sub">
          I&apos;m Gia — a video editor with 3+ years of experience crafting YouTube content,
          social media ads and short-form videos that grow channels and drive results.
        </p>

        <div className="hero-actions">
          <a href="#contact" className="btn-primary">
            Work with me
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
          <span className="hero-meta">
            Trusted by <strong>20+</strong> brands &amp; creators
          </span>
        </div>
      </div>

      <div className="hero-clients">
        <span className="hero-clients-label">Worked with</span>
        <div className="hero-clients-row">
          {heroClients.map((c, i) => (
            <span key={c} style={{ display: 'contents' }}>
              <span>{c}</span>
              {i < heroClients.length - 1 && <span className="hc-sep">●</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
