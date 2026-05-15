import { tools } from '../data/site';

export default function Tools() {
  return (
    <section className="tools" id="tools">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">Toolkit</div>
            <h2>The <span className="serif">software</span> I work in.</h2>
          </div>
          <p>From timeline-heavy Premiere edits to quick CapCut shorts and motion polish in After Effects.</p>
        </div>

        <div className="tools-grid">
          {tools.map((t) => <div className="tool" key={t}>{t}</div>)}
        </div>
      </div>
    </section>
  );
}
