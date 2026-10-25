import React, { useEffect, useState } from 'react';
import { Sparkles, Trophy } from 'lucide-react';

interface EasterEggProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const KONAMI_CODE = [
  'arrowup',
  'arrowup',
  'arrowdown',
  'arrowdown',
  'arrowleft',
  'arrowright',
  'arrowleft',
  'arrowright',
  'b',
  'a',
];

export const EasterEgg: React.FC<EasterEggProps> = ({ isOpen, onClose, onOpen }) => {
  const [konamiIdx, setKonamiIdx] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === KONAMI_CODE[konamiIdx]) {
        const next = konamiIdx + 1;
        if (next === KONAMI_CODE.length) {
          onOpen();
          setKonamiIdx(0);
        } else {
          setKonamiIdx(next);
        }
      } else {
        setKonamiIdx(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiIdx, onOpen]);

  if (!isOpen) return null;

  return (
    <div
      id="easter-egg"
      className="easter-egg-overlay open"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="eg-inner">
        <div className="eg-icon text-purple-400 flex justify-center mb-4">
          <Trophy size={48} />
        </div>
        <h2 className="eg-title">You Found It!</h2>
        <p className="eg-text">
          Konami Code unlocked. You're the kind of person who explores beyond the surface. That's
          exactly the kind of person I love working with.
        </p>
        <p className="eg-secret flex items-center justify-center gap-1.5">
          <Sparkles size={14} className="text-cyan-400" />
          <span>Secret: This site was built in 72 hours of pure flow state.</span>
        </p>
        <button type="button" className="btn-primary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
