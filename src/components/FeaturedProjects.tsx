import React from 'react';
import { ExternalLink, Sparkles, CheckCircle, Clock } from 'lucide-react';
import { FEATURED_PROJECTS, ProjectItem } from '../data/projects';

export const FeaturedProjects: React.FC = () => {
  return (
    <section id="featured-projects" className="py-24 relative bg-[#050508]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-400 mb-2">
              <Sparkles size={13} />
              <span>Selected Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Featured Projects
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Hand-picked collection of active web applications and AI tools built with modern
            component architecture, live APIs, and user-centric design.
          </p>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {FEATURED_PROJECTS.map((project: ProjectItem, idx: number) => {
            const isLarge = idx === 0 || idx === 1;
            return (
              <div
                key={project.id}
                className={`group relative rounded-2xl bg-gradient-to-b from-slate-900/70 to-slate-950/90 border border-slate-800/80 hover:border-blue-500/50 p-7 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl ${
                  isLarge ? 'lg:col-span-6' : 'lg:col-span-4'
                }`}
              >
                {/* Ambient glow accent on card hover */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all pointer-events-none" />

                <div>
                  {/* Top Bar: Category & Status */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="text-xs font-mono text-slate-400 tracking-wider uppercase">
                      {project.category}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                        project.statusType === 'active'
                          ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50'
                          : 'bg-cyan-950/40 text-cyan-300 border-cyan-800/50'
                      }`}
                    >
                      {project.statusType === 'active' ? (
                        <CheckCircle size={10} className="text-emerald-400" />
                      ) : (
                        <Clock size={10} className="text-cyan-400" />
                      )}
                      <span>{project.status}</span>
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-white mb-2.5 group-hover:text-blue-300 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Highlight note */}
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/60 text-xs text-slate-300 mb-6 font-mono">
                    <span className="text-blue-400 mr-1.5 font-bold">Key Focus:</span>
                    {project.highlights}
                  </div>
                </div>

                {/* Footer: Tech Stack & Live Action Link */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-slate-800/50 text-slate-400 text-[11px] font-mono border border-slate-750"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-800/60 hover:bg-blue-600 text-slate-200 hover:text-white font-medium text-xs transition-all duration-200 border border-slate-700/60 hover:border-transparent group/btn"
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLink
                      size={14}
                      className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                    />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
