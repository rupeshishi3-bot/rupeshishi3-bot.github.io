import React, { useEffect, useRef } from 'react';

export const Vision: React.FC = () => {
  const visionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = visionRef.current;
    if (!section) return;

    const interval = setInterval(() => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
          position: absolute;
          width: 4px; height: 4px;
          border-radius: 50%;
          background: ${Math.random() > 0.5 ? '#3b82f6' : '#a855f7'};
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          pointer-events: none;
          z-index: 1;
          animation: sparkle-anim 1.5s ease forwards;
        `;
        section.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1500);
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="vision" ref={visionRef}>
      <div className="section-container">
        <div className="vision-inner reveal visible">
          <div className="vision-label">✦ Vision 2030</div>
          <h2 className="vision-title">
            The Web Will Be
            <br />
            <span className="gradient-text">Alive.</span>
            <span className="gradient-text-2"> Intelligent.</span>
            <span> Personal.</span>
          </h2>
          <p className="vision-sub">
            I'm not waiting for that future to happen by chance. I'm building it through active digital
            products, one interface, one algorithm, one experience at a time.
          </p>
          <div className="vision-cta">
            <a href="#contact" onClick={scrollToContact} className="btn-primary large">
              Build the Future With Me
            </a>
          </div>
        </div>
        <div className="vision-grid-bg"></div>
      </div>
    </section>
  );
};
