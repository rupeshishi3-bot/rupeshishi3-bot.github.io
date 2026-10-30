import React, { useEffect, useState } from 'react';
import { ArrowUp, Terminal } from 'lucide-react';

interface FloatingActionsProps {
  onOpenCommand: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenCommand }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <div className="floating-actions">
      <button
        type="button"
        className="fa-btn"
        onClick={scrollToTop}
        title="Back to top"
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </button>
      <button
        type="button"
        className="fa-btn"
        onClick={onOpenCommand}
        title="Command Palette (Ctrl+K)"
        aria-label="Open Command Palette"
      >
        <Terminal size={17} />
      </button>
    </div>
  );
};
