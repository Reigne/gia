const items = [
  'Premiere Pro', 'After Effects', 'YouTube Long-form', 'Social Ads',
  'CapCut', 'UGC Videos', 'Talking Head', 'Podcast Cuts',
  'Photoshop', 'Channel Management', 'Short-form Reels', 'Canva',
];

export default function MarqueeStrip() {
  const repeated = [...items, ...items];

  return (
    <div className="marquee-section">
      <div className="marquee-track">
        <div className="marquee-inner">
          {repeated.map((item, i) => (
            <span className="marquee-item" key={i}>
              {item}
              <span className="marquee-dot">●</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
