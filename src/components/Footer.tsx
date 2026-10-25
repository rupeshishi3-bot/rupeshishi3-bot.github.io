import React from 'react';

interface FooterProps {
  onOpenEasterEgg: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEasterEgg }) => {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="logo-mark">RI</span>
            <div>
              <div className="footer-name">Rupesh Bhagwan Ishi</div>
              <div className="footer-tagline">AI-Assisted Website Builder &amp; Digital Product Creator</div>
            </div>
          </div>

          <div className="footer-nav">
            <a href="#about" onClick={(e) => scrollTo(e, '#about')}>
              About
            </a>
            <a href="#projects" onClick={(e) => scrollTo(e, '#projects')}>
              10 Projects
            </a>
            <a href="#skills" onClick={(e) => scrollTo(e, '#skills')}>
              Capabilities
            </a>
            <a href="#timeline" onClick={(e) => scrollTo(e, '#timeline')}>
              Journey
            </a>
            <a href="#contact" onClick={(e) => scrollTo(e, '#contact')}>
              Contact
            </a>
            <a href="/resume.pdf" download="Rupesh-Ishi-Resume.pdf" style={{ color: 'var(--blue)' }}>
              Resume PDF
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">
            &copy; {new Date().getFullYear()} Rupesh Bhagwan Ishi. Built with modern React &amp; CSS architecture.
          </span>
          <span className="footer-version">v2.1.0</span>
        </div>
      </div>

      <div
        className="easter-egg-hint"
        title="Try the Konami Code!"
        onClick={onOpenEasterEgg}
      >
        ✦
      </div>
    </footer>
  );
};
