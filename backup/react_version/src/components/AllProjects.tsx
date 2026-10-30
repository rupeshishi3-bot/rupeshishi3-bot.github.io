import React, { useState } from 'react';
import { ExternalLink, Layers, Wrench, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ALL_PROJECTS, ProjectItem } from '../data/projects';

export const AllProjects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Web Apps', 'Developer Tools', 'AI Utilities'];

  const filteredProjects =
    activeCategory === 'All'
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => p.category === activeCategory);

  const getStatusBadge = (project: ProjectItem) => {
    switch (project.statusType) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-950/60 text-emerald-300 border border-emerald-800/60">
            <CheckCircle2 size={11} className="text-emerald-400" />
            {project.status}
          </span>
        );
      case 'maintenance':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-950/60 text-amber-300 border border-amber-800/60">
            <Wrench size={11} className="text-amber-400" />
            {project.status}
          </span>
        );
      case 'rebuilding':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-950/60 text-purple-300 border border-purple-800/60">
            <RefreshCw size={11} className="text-purple-400" />
            {project.status}
          </span>
        );
      case 'partially-built':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-orange-950/60 text-orange-300 border border-orange-800/60">
            <AlertCircle size={11} className="text-orange-400" />
            {project.status}
          </span>
        );
      case 'verifying':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-950/60 text-blue-300 border border-blue-800/60">
            <Layers size={11} className="text-blue-400" />
            {project.status}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section id="all-projects" className="py-24 relative bg-[#080b14] border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header with Title and Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-purple-400 mb-2">
              Complete Directory · 10 Builds
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              All Projects &amp; Experiments
            </h2>
          </div>

          {/* Category Filter Controls */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {cat}
                {cat === 'All' && ` (${ALL_PROJECTS.length})`}
              </button>
            ))}
          </div>
        </div>

        {/* 10 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project: ProjectItem) => (
            <div
              key={project.id}
              className="rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1"
            >
              <div>
                {/* Header row: category and transparent status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    {project.category}
                  </span>
                  {getStatusBadge(project)}
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Real note / highlight */}
                <div className="text-[11px] font-mono text-slate-400 mb-4 bg-slate-950/40 p-2.5 rounded border border-slate-850">
                  <span className="text-slate-200">Note: </span>
                  {project.highlights}
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-1 mb-5">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded bg-slate-800/70 text-slate-400 text-[10px] font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {project.isLive ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full px-3.5 py-2 rounded-lg bg-blue-600/15 hover:bg-blue-600 text-blue-300 hover:text-white font-medium text-xs transition-colors border border-blue-500/30 hover:border-transparent group"
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLink
                      size={13}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </a>
                ) : (
                  <div className="flex items-center justify-between w-full px-3.5 py-2 rounded-lg bg-slate-950/70 text-slate-400 font-mono text-xs border border-slate-800">
                    <span className="text-[11px]">{project.status} (In Progress)</span>
                    <a
                      href={`https://github.com/rupeshishi3-bot`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline flex items-center gap-1 text-[11px]"
                      title="Inspect project repositories"
                    >
                      <span>GitHub</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
