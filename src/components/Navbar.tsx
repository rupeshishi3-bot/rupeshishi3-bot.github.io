import React, { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';

interface NavbarProps {
  onOpenCommand: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommand }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scroll hue update
      const scrollPct = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
      const hue = Math.floor(220 + scrollPct * 60);
      document.documentElement.style.setProperty('--scroll-hue', hue.toString());
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
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
        <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="nav-logo">
          <span className="logo-mark">RI</span>
          <span className="logo-text">Rupesh Bhagwan Ishi</span>
        </a>

        <div className="nav-links">
          {[
            { label: 'About', href: '#about', id: 'about' },
            { label: 'Skills', href: '#skills', id: 'skills' },
            { label: 'Projects', href: '#projects', id: 'projects' },
            { label: 'Services', href: '#services', id: 'services' },
            { label: 'Contact', href: '#contact', id: 'contact' },
          ].map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="nav-link"
              style={{
                color: activeSection === link.id ? '#3b82f6' : undefined,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <button
            type="button"
            className="cmd-trigger flex items-center gap-1.5"
            onClick={onOpenCommand}
            title="Command Palette (Ctrl+K)"
          >
            <Terminal size={13} className="inline mr-1" />
            <span>sections</span>
          </button>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="nav-cta"
          >
            Hire Me
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
        {[
          { label: 'About', href: '#about' },
          { label: 'Skills', href: '#skills' },
          { label: 'Projects', href: '#projects' },
          { label: 'Services', href: '#services' },
          { label: 'Contact', href: '#contact' },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
};
