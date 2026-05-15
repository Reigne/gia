export default function Footer() {
  return (
    <footer id="contact">
      <div className="container">
        <h2 className="footer-cta">
          Let&apos;s make your next video <span className="serif">unmissable</span>.
        </h2>

        <div className="footer-actions">
          <a href="mailto:geferlene@gmail.com" className="btn-primary">
            Send me a brief
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <a href="#" className="logo">Geferlene <span className="serif">Aznar</span></a>
            <p>Video editor based in Cebu, Philippines — working remotely with founders, agencies and creators worldwide.</p>
          </div>

          <div className="footer-col">
            <h4>Site</h4>
            <a href="#services">Services</a>
            <a href="#experience">Experience</a>
            <a href="#tools">Toolkit</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-col">
            <h4>Get in touch</h4>
            <a href="mailto:geferlene@gmail.com">geferlene@gmail.com</a>
            <a href="tel:+639272156953">+63 927 215 6953</a>
            <a href="https://gia-portfolio-six.vercel.app" target="_blank" rel="noopener noreferrer">Portfolio</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Geferlene Aznar. All rights reserved.</span>
          <span>Talisay City, Cebu, Philippines.</span>
        </div>
      </div>
    </footer>
  );
}
