import { aboutTags } from '../data/site';

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-photo">
            <div className="about-img-wrap">
              <img src="/assets/images/gia.png" alt="Geferlene Aznar" />
            </div>
            <div className="about-location">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              Cebu, Philippines
            </div>
          </div>

          <div className="about-content">
            <div className="section-eyebrow">About me</div>
            <h2>The editor <span className="serif">behind</span> the cut.</h2>
            <p className="about-bio">
              I&apos;m Geferlene — most people call me Gia. I&apos;ve spent the last 3+ years
              cutting videos for YouTube channels, ad campaigns and social media brands across
              the US, Australia and the Philippines.
            </p>
            <p className="about-bio">
              I started with a BS in Psychology, which honestly helps more than you&apos;d think —
              understanding what keeps people watching is half the job. The other half is just
              caring enough to get every cut right.
            </p>
            <p className="about-bio">
              When I&apos;m not in Premiere Pro, I&apos;m researching trends, studying what makes
              great content perform, and figuring out how to make the next edit better than the last.
            </p>

            <div className="about-tags">
              {aboutTags.map((t) => <span key={t}>{t}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
