import React, { useEffect, useRef, useState } from 'react';
import {
  Code,
  Palette,
  FileCode,
  LayoutTemplate,
  Figma,
  Sparkles,
  Cpu,
  Flame,
  GitBranch,
  Gauge,
  AppWindow,
  Smartphone,
  Workflow,
  Zap,
  Database,
  CheckCircle2,
} from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
}

const skillsData: Skill[] = [
  { name: 'HTML5', level: 95, icon: <Code size={20} className="text-orange-400" /> },
  { name: 'CSS3 / SCSS', level: 92, icon: <Palette size={20} className="text-blue-400" /> },
  { name: 'JavaScript', level: 88, icon: <FileCode size={20} className="text-yellow-400" /> },
  { name: 'Responsive Design', level: 90, icon: <LayoutTemplate size={20} className="text-cyan-400" /> },
  { name: 'UI/UX Design', level: 85, icon: <Figma size={20} className="text-pink-400" /> },
  { name: 'AI Prompt Engineering', level: 93, icon: <Sparkles size={20} className="text-purple-400" /> },
  { name: 'Frontend Architecture', level: 87, icon: <Cpu size={20} className="text-indigo-400" /> },
  { name: 'Firebase', level: 80, icon: <Flame size={20} className="text-amber-500" /> },
  { name: 'GitHub', level: 90, icon: <GitBranch size={20} className="text-slate-300" /> },
  { name: 'SEO & Performance', level: 82, icon: <Gauge size={20} className="text-emerald-400" /> },
  { name: 'SaaS UI Systems', level: 88, icon: <AppWindow size={20} className="text-violet-400" /> },
  { name: 'PWA Development', level: 85, icon: <Smartphone size={20} className="text-teal-400" /> },
  { name: 'AI Workflow Design', level: 91, icon: <Workflow size={20} className="text-fuchsia-400" /> },
  { name: 'Web Performance', level: 84, icon: <Zap size={20} className="text-amber-400" /> },
  { name: 'LocalStorage Systems', level: 86, icon: <Database size={20} className="text-sky-400" /> },
  { name: 'Productivity Systems', level: 89, icon: <CheckCircle2 size={20} className="text-rose-400" /> },
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
          <div className="section-label">✦ Skills Matrix</div>
          <h2 className="section-title">
            Capabilities &amp;
            <br />
            <span className="gradient-text">Expertise</span>
          </h2>
        </div>

        <div className="skills-grid reveal visible">
          {skillsData.map((skill, idx) => (
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
