import React, { useState } from 'react';
import { ExternalLink, CheckCircle, Wrench, RefreshCw, AlertCircle, Layers } from 'lucide-react';
import { ALL_PROJECTS, ProjectItem } from '../data/projects';

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filterTabs = [
    { label: 'All Projects', value: 'All', count: 10 },
    { label: 'Featured', value: 'Featured', count: 5 },
    { label: 'Web Apps', value: 'Web Apps', count: 4 },
    { label: 'Developer Tools', value: 'Developer Tools', count: 3 },
    { label: 'AI Utilities', value: 'AI Utilities', count: 3 },
  ];

  const filteredProjects = ALL_PROJECTS.filter((p) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Featured') return p.featured;
    return p.category === activeFilter;
  });

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

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'active':
        return <CheckCircle size={10} />;
      case 'maintenance':
        return <Wrench size={10} />;
      case 'rebuilding':
        return <RefreshCw size={10} />;
      case 'partially-built':
        return <AlertCircle size={10} />;
      default:
        return <Layers size={10} />;
    }
  };

  return (
    <section id="projects">
      <div className="section-container">
        <div className="section-header reveal visible">
          <div className="section-label">✦ Featured Work &amp; Portfolio</div>
          <h2 className="section-title">
            10 Authentic Projects That
            <br />
            <span className="gradient-text">Define Tomorrow</span>
          </h2>
          <p style={{ color: 'var(--text-sub)', maxWidth: '620px', margin: '0.75rem auto 0', fontSize: '0.95rem' }}>
            A curated directory of live web applications, Cloudflare edge tools, document engines,
            and experimental AI systems. Every project features transparent development status and live links.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="filter-tabs">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              className={`filter-btn ${activeFilter === tab.value ? 'active' : ''}`}
              onClick={() => setActiveFilter(tab.value)}
            >
              <span>{tab.label}</span>
              <span style={{ opacity: 0.7, marginLeft: '4px', fontSize: '0.72rem' }}>
                ({tab.count})
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid using original CSS classes */}
        <div className="projects-grid">
          {filteredProjects.map((project: ProjectItem, idx: number) => {
            const isFeatured = project.featured && (idx === 0 || idx === 1);
            const numStr = String(idx + 1).padStart(2, '0');

            return (
              <div
                key={project.id}
                className={`project-card ${isFeatured ? 'featured' : ''} reveal visible`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="project-glow"></div>

                <div className="project-header">
                  <div className="project-badge">{project.category}</div>
                  <div className={`status-tag ${project.statusType}`}>
                    {getStatusIcon(project.statusType)}
                    <span>{project.status}</span>
                  </div>
                </div>

                <div className="project-num">{numStr}</div>
                <h3 className="project-title">{project.name}</h3>
                <p className="project-desc">{project.description}</p>

                <div className="project-note">
                  <strong>Key Focus:</strong> {project.highlights}
                </div>

                <div className="project-tags">
                  {project.tech.map((t, tIdx) => (
                    <span key={tIdx}>{t}</span>
                  ))}
                </div>

                <div className="project-footer" style={{ marginTop: '1rem', width: '100%' }}>
                  {project.isLive ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="proj-link-cta"
                    >
                      <span>Launch Live Demo</span>
                      <ExternalLink size={14} />
                    </a>
                  ) : (
                    <div className="proj-link-disabled">
                      <span>{project.status}</span>
                      <a
                        href="https://github.com/rupeshishi3-bot"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Inspect repository on GitHub"
                      >
                        GitHub ↗
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
