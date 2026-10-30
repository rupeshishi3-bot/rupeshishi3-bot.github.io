import React, { useEffect, useState } from 'react';

interface NavbarProps {
  onOpenCommand: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommand }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-inner">
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="nav-logo"
        >
          <span className="logo-mark">RI</span>
          <span className="logo-text">Rupesh Bhagwan Ishi</span>
        </a>

        <div className="nav-links">
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, '#about')}
            className="nav-link"
          >
            About
          </a>
          <a
            href="#projects"
            onClick={(e) => handleNavClick(e, '#projects')}
            className="nav-link"
          >
            Projects (10)
          </a>
          <a
            href="#skills"
            onClick={(e) => handleNavClick(e, '#skills')}
            className="nav-link"
          >
            Capabilities
          </a>
          <a
            href="#timeline"
            onClick={(e) => handleNavClick(e, '#timeline')}
            className="nav-link"
          >
            Journey
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="nav-link"
          >
            Contact
          </a>
        </div>

        <div className="nav-actions">
          <button
            type="button"
            className="cmd-trigger"
            onClick={onOpenCommand}
            title="Command Palette (Ctrl+K)"
          >
            <span>Ctrl+K</span>
          </button>

          <a
            href="/resume.pdf"
            download="Rupesh-Ishi-Resume.pdf"
            className="nav-cta"
            title="Download authentic resume PDF"
          >
            Resume PDF
          </a>
        </div>

        <button
          type="button"
          className="hamburger"
          id="hamburger"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`} id="mobile-menu">
        <a href="#about" onClick={(e) => handleNavClick(e, '#about')}>
          About
        </a>
        <a href="#projects" onClick={(e) => handleNavClick(e, '#projects')}>
          All 10 Projects
        </a>
        <a href="#skills" onClick={(e) => handleNavClick(e, '#skills')}>
          Capabilities
        </a>
        <a href="#timeline" onClick={(e) => handleNavClick(e, '#timeline')}>
          Journey
        </a>
        <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>
          Contact
        </a>
        <a href="/resume.pdf" download="Rupesh-Ishi-Resume.pdf">
          Download Resume (PDF)
        </a>
      </div>
    </nav>
  );
};
