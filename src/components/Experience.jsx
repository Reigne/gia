import { experience } from '../data/site';

export default function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">Experience</div>
            <h2>Brands I&apos;ve <span className="serif">edited</span> for.</h2>
          </div>
          <p>Three years across YouTube channel management, agency work and freelance projects in the US, AU and PH markets.</p>
        </div>

        <div className="experience-list">
          {experience.map((e) => (
            <div className="exp-item" key={e.role + e.company}>
              <div className="exp-period">{e.period}</div>
              <div className="exp-role">
                <h3>{e.role}</h3>
                <div className="exp-company">{e.company}</div>
                <p>{e.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
