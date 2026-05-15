import { services } from '../data/site';

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">What I do</div>
            <h2>Editing <span className="serif">built</span> around what works.</h2>
          </div>
          <p>Three focused offerings — each shaped by years of editing for performance-driven YouTube channels and ad campaigns.</p>
        </div>

        <div className="service-grid">
          {services.map((s) => (
            <div className="service" key={s.num}>
              <div className="service-num">{s.num}</div>
              <div>
                <h3>{s.title[0]}<span className="serif">{s.title[1]}</span></h3>
                <p>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
