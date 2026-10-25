import React from 'react';

export const TechStack: React.FC = () => {
  return (
    <section id="techstack">
      <div className="section-container">
        <div className="section-header reveal visible">
          <div className="section-label">✦ Tech Stack</div>
          <h2 className="section-title">
            The Arsenal I <span className="gradient-text">Command</span>
          </h2>
        </div>

        <div className="tech-orbit reveal visible">
          <div className="tech-center">
            <div className="tech-core">
              <span>STACK</span>
            </div>
          </div>
          <div className="tech-rings">
            <div className="tech-ring ring-1">
              <div className="tech-node" style={{ '--a': '0deg' } as React.CSSProperties}>HTML5</div>
              <div className="tech-node" style={{ '--a': '72deg' } as React.CSSProperties}>CSS3</div>
              <div className="tech-node" style={{ '--a': '144deg' } as React.CSSProperties}>JS</div>
              <div className="tech-node" style={{ '--a': '216deg' } as React.CSSProperties}>Git</div>
              <div className="tech-node" style={{ '--a': '288deg' } as React.CSSProperties}>PWA</div>
            </div>
            <div className="tech-ring ring-2">
              <div className="tech-node" style={{ '--a': '36deg' } as React.CSSProperties}>Firebase</div>
              <div className="tech-node" style={{ '--a': '108deg' } as React.CSSProperties}>AI APIs</div>
              <div className="tech-node" style={{ '--a': '180deg' } as React.CSSProperties}>GSAP</div>
              <div className="tech-node" style={{ '--a': '252deg' } as React.CSSProperties}>Figma</div>
              <div className="tech-node" style={{ '--a': '324deg' } as React.CSSProperties}>SEO</div>
            </div>
          </div>
        </div>

        <div className="tech-list reveal visible">
          <div className="tech-item">
            <span className="tech-color" style={{ background: '#E44D26' }}></span>HTML5
          </div>
          <div className="tech-item">
            <span className="tech-color" style={{ background: '#1572B6' }}></span>CSS3
          </div>
          <div className="tech-item">
            <span className="tech-color" style={{ background: '#F7DF1E' }}></span>JavaScript
          </div>
          <div className="tech-item">
            <span className="tech-color" style={{ background: '#FF9900' }}></span>Firebase
          </div>
          <div className="tech-item">
            <span className="tech-color" style={{ background: '#88EC79' }}></span>GSAP
          </div>
          <div className="tech-item">
            <span className="tech-color" style={{ background: '#A855F7' }}></span>AI APIs
          </div>
          <div className="tech-item">
            <span className="tech-color" style={{ background: '#F24E1E' }}></span>Figma
          </div>
          <div className="tech-item">
            <span className="tech-color" style={{ background: '#cbd5e1' }}></span>GitHub
          </div>
        </div>
      </div>
    </section>
  );
};
