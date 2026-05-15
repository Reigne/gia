import { faqs } from '../data/site';

export default function Faq() {
  return (
    <section className="faq" id="faq">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">FAQ</div>
            <h2>Common <span className="serif">questions</span>.</h2>
          </div>
          <p>Anything else? Just email me — I reply within 24 hours.</p>
        </div>

        <div className="faq-list">
          {faqs.map((f) => (
            <details className="faq-item" key={f.q} {...(f.open ? { open: true } : {})}>
              <summary className="faq-q">{f.q}</summary>
              <p className="faq-a">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
