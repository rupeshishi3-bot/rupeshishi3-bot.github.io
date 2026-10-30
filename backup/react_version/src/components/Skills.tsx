import React, { useEffect, useRef, useState } from 'react';

interface SkillItem {
  name: string;
  level: number;
  icon: string;
}

const SKILLS_DATA: SkillItem[] = [
  { name: 'React 18 & Hooks', level: 92, icon: '⚛️' },
  { name: 'TypeScript', level: 88, icon: '🔷' },
  { name: 'JavaScript (ESNext)', level: 90, icon: '⚡' },
  { name: 'Three.js & WebGL', level: 84, icon: '🌌' },
  { name: 'HTML5 Semantic Web', level: 95, icon: '🌐' },
  { name: 'CSS3 / Modern SCSS', level: 92, icon: '🎨' },
  { name: 'Tailwind CSS', level: 90, icon: '🌊' },
  { name: 'Cloudflare Workers', level: 86, icon: '☁️' },
  { name: 'Firebase Firestore', level: 85, icon: '🔥' },
  { name: 'AI Prompt Engineering', level: 92, icon: '🤖' },
  { name: 'AI API Integration', level: 88, icon: '🧠' },
  { name: 'Git & GitHub Workflows', level: 90, icon: '🐙' },
  { name: 'Responsive Mobile UI', level: 90, icon: '📱' },
  { name: 'Document & PDF Parsing', level: 86, icon: '📄' },
  { name: 'LocalStorage & Offline', level: 88, icon: '💾' },
  { name: 'Web Performance & SEO', level: 85, icon: '🚀' },
];

export const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimated(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={containerRef}>
      <div className="section-container">
        <div className="section-header reveal visible">
          <div className="section-label">✦ Capabilities Matrix</div>
          <h2 className="section-title">
            Capabilities &amp;
            <br />
            <span className="gradient-text">Verified Expertise</span>
          </h2>
        </div>

        <div className="skills-grid reveal visible">
          {SKILLS_DATA.map((skill, idx) => (
            <div
              key={idx}
              className={`skill-card ${animated ? 'animated' : ''}`}
              data-level={skill.level}
            >
              <div className="skill-icon">{skill.icon}</div>
              <div className="skill-name">{skill.name}</div>
              <div className="skill-bar">
                <div
                  className="skill-fill"
                  style={{
                    width: animated ? `${skill.level}%` : '0%',
                  }}
                ></div>
              </div>
              <div className="skill-pct">{skill.level}%</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
