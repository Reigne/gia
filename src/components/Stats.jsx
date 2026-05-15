const stats = [
  { num: '3+', label: 'Years editing' },
  { num: '20+', label: 'Brands & creators' },
  { num: '30+', label: 'YouTube channels' },
  { num: '∞', label: 'Hours in Premiere Pro' },
];

export default function Stats() {
  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat-num"><span className="serif">{s.num}</span></div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
