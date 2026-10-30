import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';

interface Project {
  num: string;
  badge: string;
  title: string;
  desc: string;
  tags: string[];
  featured?: boolean;
  stats?: string[];
  link?: string;
}

const projects: Project[] = [
  {
    num: '01',
    badge: 'Featured',
    title: 'ToolVerse AI',
    desc: 'A multi-dimensional AI tools ecosystem — 50+ intelligent utilities living inside one premium platform. From text transformers to image AI and code generators, ToolVerse is the future of productivity software.',
    tags: ['AI Integration', 'SaaS Platform', '50+ Tools'],
    featured: true,
    stats: ['50+ Tools', 'PWA Ready'],
  },
  {
    num: '02',
    badge: 'AI',
    title: 'AI Tools Platform',
    desc: "A curated intelligence marketplace for developers and creators. Discover, test, and integrate the world's most powerful AI APIs through a stunning unified interface.",
    tags: ['API Gateway', 'AI Catalog', 'Developer Tool'],
  },
  {
    num: '03',
    badge: 'Web',
    title: 'Futuristic Portfolio',
    desc: "This very website — an engineering marvel built with modern React, TypeScript, and Vite. A cinematic demonstration of what's possible when design and code merge at the highest level.",
    tags: ['Cinematic UI', 'Animations', 'Performance'],
  },
  {
    num: '04',
    badge: 'SaaS',
    title: 'Productivity System',
    desc: 'An offline-first AI-powered productivity engine. Task intelligence, focus modes, habit systems, and AI coaching — all running client-side with zero latency.',
    tags: ['AI Coach', 'Offline-First', 'LocalStorage'],
  },
  {
    num: '05',
    badge: 'Utility',
    title: 'Multi-Tool Platform',
    desc: 'A Swiss army knife for the modern web — converters, generators, analyzers, and formatters in one lightning-fast platform. 30+ tools. Zero dependencies. Pure power.',
    tags: ['30+ Utilities', 'Zero Backend', 'Instant'],
  },
];

export const Projects: React.FC = () => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    card.style.transition = 'none';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = '';
    card.style.transition = 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)';
  };

  return (
    <section id="projects">
      <div className="section-container">
        <div className="section-header reveal visible">
          <div className="section-label">✦ Featured Work</div>
          <h2 className="section-title">
            Projects That
            <br />
            <span className="gradient-text">Define Tomorrow</span>
          </h2>
        </div>

        <div className="projects-grid">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className={`project-card ${project.featured ? 'featured' : ''} reveal visible`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="project-glow"></div>
              <div className="project-header">
                <div className="project-badge flex items-center gap-1">
                  {project.featured && <Sparkles size={11} className="text-purple-400" />}
                  <span>{project.badge}</span>
                </div>
                <div className="project-links">
                  <div className="proj-link" title="Explore Project">
                    <ExternalLink size={14} />
                  </div>
                </div>
              </div>

              <div className="project-num">{project.num}</div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.desc}</p>

              <div className="project-tags">
                {project.tags.map((tag, tIdx) => (
                  <span key={tIdx}>{tag}</span>
                ))}
              </div>

              {project.stats && (
                <div className="project-footer">
                  {project.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="proj-stat">
                      {stat}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
