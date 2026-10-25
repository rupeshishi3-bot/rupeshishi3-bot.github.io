import React, { useEffect, useState } from 'react';
import { Loader } from './components/Loader';
import { Cursor } from './components/Cursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { AiIdentity } from './components/AiIdentity';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { TechStack } from './components/TechStack';
import { Services } from './components/Services';
import { Timeline } from './components/Timeline';
import { Testimonials } from './components/Testimonials';
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
    // Console art from original script
    console.log(
      `%c
██████╗ ██╗   ██╗██████╗ ███████╗███████╗██╗  ██╗
██╔══██╗██║   ██║██╔══██╗██╔════╝██╔════╝██║  ██║
██████╔╝██║   ██║██████╔╝█████╗  ███████╗███████║
██╔══██╗██║   ██║██╔═══╝ ██╔══╝  ╚════██║██╔══██║
██║  ██║╚██████╔╝██║     ███████╗███████║██║  ██║
╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚══════╝╚══════╝╚═╝  ╚═╝

  RUPESH ISHI — AI Web Developer & Digital Architect
  You found the console! You're clearly extraordinary.
  
  Try: Konami Code ↑↑↓↓←→←→BA for a surprise.
  Or: Press Ctrl+K to open the command palette.
`,
      'color: #a855f7; font-family: monospace; font-size: 11px;'
    );

    console.log(
      '%cBuilt with obsession. Designed with purpose.',
      'color: #3b82f6; font-size: 12px; font-weight: bold;'
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
        <Skills />
        <Projects />
        <TechStack />
        <Services />
        <Timeline />
        <Testimonials />
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
