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
            <span className="footer-name">Rupesh Bhagwan Ishi</span>
            <span className="footer-tagline">AI Web Developer</span>
          </div>

          <div className="footer-nav">
            <a href="#about" onClick={(e) => scrollTo(e, '#about')}>
              About
            </a>
            <a href="#projects" onClick={(e) => scrollTo(e, '#projects')}>
              Projects
            </a>
            <a href="#services" onClick={(e) => scrollTo(e, '#services')}>
              Services
            </a>
            <a href="#contact" onClick={(e) => scrollTo(e, '#contact')}>
              Contact
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">© 2025 Rupesh Bhagwan Ishi. Built with obsession.</span>
          <span className="footer-version">v2.0.25</span>
        </div>
      </div>

      <div
        className="easter-egg-hint"
        title="Try the Konami Code! (or click me)"
        onClick={onOpenEasterEgg}
      >
        ✦
      </div>
    </footer>
  );
};
