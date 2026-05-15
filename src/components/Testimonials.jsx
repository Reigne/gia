import { testimonials } from '../data/site';

export default function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">Testimonials</div>
            <h2>What clients <span className="serif">say</span>.</h2>
          </div>
          <p>Kind words from the brands and creators I&apos;ve had the pleasure of working with.</p>
        </div>

        <div className="testi-grid">
          {testimonials.map((t) => (
            <div className="testi-card" key={t.name}>
              <div className="testi-stars">★★★★★</div>
              <p className="testi-quote">{t.quote}</p>
              <div className="testi-author">
                <div className="testi-avatar" data-tone={t.tone}>{t.initials}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
