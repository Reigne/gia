import { useState } from 'react';
import Reveal from './Reveal';

const VIDEO_ID = 'jdRKfbjGmW4';

export default function Showreel() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="showreel" id="showreel">
      <div className="container">
        <Reveal>
          <div className="showreel-header">
            <div className="section-eyebrow">Showreel &mdash; 2025</div>
            <h2>A 60-second taste of <span className="serif">my work</span>.</h2>
            <p className="showreel-sub">YouTube long-form &middot; social ads &middot; short-form reels</p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="showreel-card">
            <div className="reel-frame">
              {playing ? (
                <iframe
                  className="reel-video"
                  src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1`}
                  title="2025 Editing Reel"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div
                  className="reel-placeholder"
                  role="button"
                  aria-label="Play showreel"
                  tabIndex={0}
                  onClick={() => setPlaying(true)}
                  onKeyDown={(e) => e.key === 'Enter' && setPlaying(true)}
                  style={{
                    backgroundImage: `url(https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="reel-vignette" />

                  <div className="reel-play">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>

                  <div className="reel-meta">
                    <span className="reel-caption">2025 Editing Reel</span>
                    <span className="reel-duration">01:08 &mdash; YouTube, ads &amp; shorts</span>
                  </div>

                  <div className="reel-badge">
                    <span className="reel-badge-dot" />
                    Watch reel
                  </div>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
