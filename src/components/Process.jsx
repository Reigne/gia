import { useEffect, useRef, useState } from 'react';
import { processSteps } from '../data/site';

export default function Process() {
  const stepsRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!stepsRef.current || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(stepsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="process" id="process">
      <div className="container">
        <div className="section-head section-head--center">
          <div>
            <div className="section-eyebrow">How I work</div>
            <h2>From brief to <span className="serif">final cut</span> — here&apos;s the flow.</h2>
          </div>
        </div>

        <div className={`process-steps${visible ? ' visible' : ''}`} ref={stepsRef}>
          <svg className="process-track-svg" viewBox="0 0 800 64" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="trackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#91EAAF" />
                <stop offset="55%" stopColor="#C3E956" />
                <stop offset="100%" stopColor="#4D7111" />
              </linearGradient>
            </defs>
            <path
              className="track-wave"
              d="M 100,32 Q 200,4 300,32 Q 400,60 500,32 Q 600,4 700,32"
              stroke="url(#trackGrad)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1"
            />
          </svg>

          {processSteps.map((step) => (
            <div className="process-step" key={step.title}>
              <div className="process-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
