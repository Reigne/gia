export default function Showreel() {
  return (
    <section className="showreel" id="showreel">
      <div className="container">
        <div className="section-head section-head--center">
          <div>
            <div className="section-eyebrow">Showreel — 2025</div>
            <h2>A 60-second taste of <span className="serif">my work</span>.</h2>
          </div>
        </div>

        <div className="reel-stack">
          <div className="reel-frame">
            <div className="reel-placeholder" role="button" aria-label="Play showreel" tabIndex={0}>
              <div className="reel-play">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </div>
              <div className="reel-meta">
                <span className="reel-duration">01:08</span>
                <span className="reel-caption">2025 Editing Reel — YouTube, ads &amp; shorts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
