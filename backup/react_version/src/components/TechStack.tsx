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
              <div className="tech-node" style={{ '--a': '0deg' } as React.CSSProperties}>React 18</div>
              <div className="tech-node" style={{ '--a': '72deg' } as React.CSSProperties}>TypeScript</div>
              <div className="tech-node" style={{ '--a': '144deg' } as React.CSSProperties}>Three.js</div>
              <div className="tech-node" style={{ '--a': '216deg' } as React.CSSProperties}>Git</div>
              <div className="tech-node" style={{ '--a': '288deg' } as React.CSSProperties}>Tailwind</div>
            </div>
            <div className="tech-ring ring-2">
              <div className="tech-node" style={{ '--a': '36deg' } as React.CSSProperties}>Cloudflare</div>
              <div className="tech-node" style={{ '--a': '108deg' } as React.CSSProperties}>Firebase</div>
              <div className="tech-node" style={{ '--a': '180deg' } as React.CSSProperties}>AI APIs</div>
              <div className="tech-node" style={{ '--a': '252deg' } as React.CSSProperties}>Vite</div>
              <div className="tech-node" style={{ '--a': '324deg' } as React.CSSProperties}>Cloud Run</div>
            </div>
          </div>
        </div>

        <div className="tech-list reveal visible">
          <div className="tech-item">
            <span className="tech-color" style={{ background: '#61DAFB' }}></span>React 18
          </div>
          <div className="tech-item">
            <span className="tech-color" style={{ background: '#3178C6' }}></span>TypeScript
          </div>
          <div className="tech-item">
            <span className="tech-color" style={{ background: '#F7DF1E' }}></span>JavaScript
          </div>
          <div className="tech-item">
            <span className="tech-color" style={{ background: '#000000' }}></span>Three.js / WebGL
          </div>
          <div className="tech-item">
            <span className="tech-color" style={{ background: '#F38020' }}></span>Cloudflare Workers
          </div>
          <div className="tech-item">
            <span className="tech-color" style={{ background: '#FF9900' }}></span>Firebase
          </div>
          <div className="tech-item">
            <span className="tech-color" style={{ background: '#A855F7' }}></span>AI Prompt Engineering
          </div>
          <div className="tech-item">
            <span className="tech-color" style={{ background: '#38BDF8' }}></span>Tailwind CSS
          </div>
          <div className="tech-item">
            <span className="tech-color" style={{ background: '#cbd5e1' }}></span>GitHub Actions
          </div>
        </div>
      </div>
    </section>
  );
};
