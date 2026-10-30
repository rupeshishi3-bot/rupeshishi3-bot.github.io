import React from 'react';
import {
  Bot,
  Palette,
  Layers,
  Sparkles,
  Smartphone,
  Zap,
  ArrowUpRight,
} from 'lucide-react';

interface Service {
  num: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const services: Service[] = [
  {
    num: '01',
    icon: <Bot className="text-blue-400" size={32} />,
    title: 'AI-Integrated Web Apps',
    desc: 'Full-stack AI web applications with intelligent features, API integrations, and machine-learning-powered UX that learns and adapts.',
  },
  {
    num: '02',
    icon: <Palette className="text-purple-400" size={32} />,
    title: 'Premium UI/UX Design',
    desc: 'Cinematic, luxury interface design for startups and enterprises. Design systems that feel like they belong in a billion-dollar product.',
  },
  {
    num: '03',
    icon: <Layers className="text-cyan-400" size={32} />,
    title: 'SaaS Product Development',
    desc: 'End-to-end SaaS platforms with subscription systems, user dashboards, analytics, and AI-powered features built for scale.',
  },
  {
    num: '04',
    icon: <Sparkles className="text-fuchsia-400" size={32} />,
    title: 'AI Prompt Engineering',
    desc: 'Custom LLM workflows, prompt systems, and AI feature architectures that turn raw AI capability into polished product features.',
  },
  {
    num: '05',
    icon: <Smartphone className="text-emerald-400" size={32} />,
    title: 'PWA Development',
    desc: 'Progressive web apps with offline capabilities, push notifications, and native-app feel — without the App Store gatekeeping.',
  },
  {
    num: '06',
    icon: <Zap className="text-amber-400" size={32} />,
    title: 'Performance Optimization',
    desc: 'Transform sluggish websites into sub-second experiences. Core Web Vitals mastery, lazy loading, and intelligent caching strategies.',
  },
];

export const Services: React.FC = () => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--gx', `${x}px`);
    card.style.setProperty('--gy', `${y}px`);
  };

  return (
    <section id="services">
      <div className="section-container">
        <div className="section-header reveal visible">
          <div className="section-label">✦ Services</div>
          <h2 className="section-title">
            What I Build
            <br />
            <span className="gradient-text">for You</span>
          </h2>
        </div>

        <div className="services-grid">
          {services.map((svc, idx) => (
            <div
              key={idx}
              className="service-card reveal visible"
              onMouseMove={handleMouseMove}
            >
              <div className="svc-num">{svc.num}</div>
              <div className="svc-icon">{svc.icon}</div>
              <h3 className="svc-title">{svc.title}</h3>
              <p className="svc-desc">{svc.desc}</p>
              <div className="svc-arrow">
                <ArrowUpRight size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
