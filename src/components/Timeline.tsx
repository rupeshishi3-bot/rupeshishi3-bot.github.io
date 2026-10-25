import React from 'react';

interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
  active?: boolean;
}

const events: TimelineEvent[] = [
  {
    year: '2020',
    title: 'The Origin',
    desc: 'Wrote my first HTML and CSS lines. Fell in love with the power of code turning ideas into visible, interactive human experiences.',
  },
  {
    year: '2022',
    title: 'JavaScript & Systems Architecture',
    desc: 'Deepened mastery of modern JavaScript, responsive CSS layouts, and component-driven development across multiple client projects.',
  },
  {
    year: '2024',
    title: 'AI Awakening & Edge Computing',
    desc: 'Began architecting AI-assisted workflows, prompt engineering systems, and deploying serverless functions with Cloudflare Workers.',
  },
  {
    year: '2025-26',
    title: 'Digital Product Creator',
    desc: 'Architecting 10 digital products including PrintWise, ATMOS, ATS X-Ray, DocReady, and ProjectFlows. Building at the frontier of AI + Web.',
    active: true,
  },
];

export const Timeline: React.FC = () => {
  return (
    <section id="timeline">
      <div className="section-container">
        <div className="section-header reveal visible">
          <div className="section-label">✦ Journey</div>
          <h2 className="section-title">
            The Path to <span className="gradient-text">Mastery</span>
          </h2>
        </div>

        <div className="timeline-list">
          {events.map((ev, idx) => (
            <div key={idx} className="tl-item reveal visible">
              <div className={`tl-dot ${ev.active ? 'active' : ''}`}></div>
              <div className="tl-year">{ev.year}</div>
              <div className="tl-content">
                <h3>{ev.title}</h3>
                <p>{ev.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
