import React, { useEffect, useRef, useState } from 'react';
import {
  Search,
  Sparkles,
  FolderGit2,
  Layers,
  User,
  Cpu,
  Mail,
  Download,
  ArrowUp,
  ExternalLink,
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEasterEgg: () => void;
}

interface CommandItem {
  icon: React.ReactNode;
  name: string;
  desc: string;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenEasterEgg,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    onClose();
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Rupesh-Ishi-Resume.pdf';
    link.click();
    onClose();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onClose();
  };

  const openGitHub = () => {
    window.open('https://github.com/rupeshishi3-bot', '_blank', 'noopener,noreferrer');
    onClose();
  };

  const commandItems: CommandItem[] = [
    {
      icon: <Sparkles size={16} />,
      name: 'Featured Projects',
      desc: 'Top 5 curated apps',
      action: () => scrollTo('#featured-projects'),
    },
    {
      icon: <Layers size={16} />,
      name: 'All 10 Projects',
      desc: 'Complete project directory',
      action: () => scrollTo('#all-projects'),
    },
    {
      icon: <User size={16} />,
      name: 'About & Philosophy',
      desc: 'AI-assisted builder approach',
      action: () => scrollTo('#about'),
    },
    {
      icon: <Cpu size={16} />,
      name: 'Verified Capabilities',
      desc: 'Skills & technical matrix',
      action: () => scrollTo('#skills'),
    },
    {
      icon: <Mail size={16} />,
      name: 'Contact Me',
      desc: 'Direct email & inquiry form',
      action: () => scrollTo('#contact'),
    },
    {
      icon: <Download size={16} />,
      name: 'Download Resume PDF',
      desc: 'Verified resume.pdf file',
      action: downloadResume,
    },
    {
      icon: <ExternalLink size={16} />,
      name: 'GitHub Profile',
      desc: 'rupeshishi3-bot repositories',
      action: openGitHub,
    },
    {
      icon: <ArrowUp size={16} />,
      name: 'Back to Top',
      desc: 'Scroll to hero view',
      action: scrollToTop,
    },
    {
      icon: <Sparkles size={16} className="text-purple-400" />,
      name: 'Easter Egg Secret',
      desc: 'Konami code vault',
      action: () => {
        onClose();
        onOpenEasterEgg();
      },
    },
  ];

  const filtered = commandItems.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      } else if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prev) => (filtered.length ? (prev + 1) % filtered.length : 0));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prev) =>
            filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0
          );
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (filtered[selectedIndex]) {
            filtered[selectedIndex].action();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="command-overlay"
      className="open"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div id="command-palette">
        <div className="cmd-header">
          <Search size={18} className="cmd-icon text-slate-400" />
          <input
            ref={inputRef}
            id="cmd-input"
            placeholder="Type a section name or action..."
            autoComplete="off"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <button type="button" className="cmd-close" onClick={onClose}>
            ESC
          </button>
        </div>

        <div className="cmd-results" id="cmd-results">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs font-mono text-slate-500">
              No matching section or action found.
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={idx}
                className={`cmd-item ${idx === selectedIndex ? 'active' : ''}`}
                onClick={item.action}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <span className="cmd-item-icon text-blue-400">{item.icon}</span>
                <span className="cmd-item-name">{item.name}</span>
                <span className="cmd-item-desc">{item.desc}</span>
              </div>
            ))
          )}
        </div>

        <div className="cmd-footer">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
};
