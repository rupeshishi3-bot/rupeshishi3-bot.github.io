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
    desc: 'Wrote my first HTML file. Fell completely in love with the idea that code becomes something humans see, feel, and use.',
  },
  {
    year: '2021',
    title: 'CSS Mastery',
    desc: 'Went deep on CSS animations, layouts, and design systems. Realized that design and code are the same thing just different languages.',
  },
  {
    year: '2022',
    title: 'JavaScript Era',
    desc: 'Unlocked the full power of JavaScript. Built my first interactive apps, APIs, and browser-based tools. Shipped 10+ projects.',
  },
  {
    year: '2023',
    title: 'AI Awakening',
    desc: 'Discovered the transformative power of AI. Became obsessed with prompt engineering, AI APIs, and building intelligent web systems.',
  },
  {
    year: '2024-25',
    title: 'ToolVerse & Beyond',
    desc: 'Launched ToolVerse AI, multiple SaaS products, and this portfolio. Now building at the frontier of AI + Web technology.',
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
