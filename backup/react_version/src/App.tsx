import React, { useEffect, useState } from 'react';
import { Loader } from './components/Loader';
import { Cursor } from './components/Cursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { AiIdentity } from './components/AiIdentity';
import { ProjectsSection } from './components/ProjectsSection';
import { TechStack } from './components/TechStack';
import { Skills } from './components/Skills';
import { Timeline } from './components/Timeline';
import { Vision } from './components/Vision';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { EasterEgg } from './components/EasterEgg';
import { FloatingActions } from './components/FloatingActions';

export const App: React.FC = () => {
  const [commandOpen, setCommandOpen] = useState(false);
  const [easterEggOpen, setEasterEggOpen] = useState(false);

  useEffect(() => {
    // Console log badge
    console.log(
      `%c
██████╗ ██╗   ██╗██████╗ ███████╗███████╗██╗  ██╗
██╔══██╗██║   ██║██╔══██╗██╔════╝██╔════╝██║  ██║
██████╔╝██║   ██║██████╔╝█████╗  ███████╗███████║
██╔══██╗██║   ██║██╔═══╝ ██╔══╝  ╚════██║██╔══██║
██║  ██║╚██████╔╝██║     ███████╗███████║██║  ██║
╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚══════╝╚══════╝╚═╝  ╚═╝

  RUPESH ISHI — AI-Assisted Website Builder & Digital Product Creator
  GitHub: https://github.com/rupeshishi3-bot
  Portfolio: https://rupeshishi3-bot.github.io/
  
  Try: Konami Code ↑↑↓↓←→←→BA for a secret overlay.
  Or: Press Ctrl+K / Cmd+K to launch the command palette.
`,
      'color: #a855f7; font-family: monospace; font-size: 11px;'
    );

    // Global keyboard listener for Ctrl+K / Cmd+K
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Loader />
      <Cursor />

      <Navbar onOpenCommand={() => setCommandOpen(true)} />

      <main>
        <Hero />
        <About />
        <AiIdentity />
        <ProjectsSection />
        <TechStack />
        <Skills />
        <Timeline />
        <Vision />
        <Contact />
      </main>

      <Footer onOpenEasterEgg={() => setEasterEggOpen(true)} />

      <CommandPalette
        isOpen={commandOpen}
        onClose={() => setCommandOpen(false)}
        onOpenEasterEgg={() => setEasterEggOpen(true)}
      />

      <EasterEgg
        isOpen={easterEggOpen}
        onOpen={() => setEasterEggOpen(true)}
        onClose={() => setEasterEggOpen(false)}
      />

      <FloatingActions onOpenCommand={() => setCommandOpen(true)} />
    </>
  );
};

export default App;
