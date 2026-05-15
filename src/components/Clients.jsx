import { heroClients } from '../data/site';

export default function Clients() {
  return (
    <section className="clients">
      <div className="container">
        <div className="clients-label">Trusted by teams &amp; creators at</div>
        <div className="clients-row">
          {heroClients.map((c, i) => (
            <span key={c} style={{ display: 'contents' }}>
              <span>{c}</span>
              {i < heroClients.length - 1 && <span className="dot-sep">●</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
