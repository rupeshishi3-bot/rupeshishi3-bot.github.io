import React from 'react';
import { Bot, Rocket, Layout, Download } from 'lucide-react';

export const About: React.FC = () => {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about">
      <div className="section-container">
        <div className="about-layout">
          <div className="about-left reveal visible">
            <div className="section-label">✦ About Me</div>
            <h2 className="section-title">
              Not Just a Developer.
              <br />
              <span className="gradient-text">A Digital Architect.</span>
            </h2>
            <p className="about-bio">
              I'm <strong>Rupesh Bhagwan Ishi</strong> — an AI Web Developer who builds at the
              intersection of artificial intelligence, design systems, and human experience. I
              don't just write code; I architect intelligent digital ecosystems that think, adapt,
              and inspire.
            </p>
            <p className="about-bio">
              My work exists at a rare crossroads: where cinematic design meets machine
              intelligence. Every pixel I place carries intention. Every line of code I write
              carries purpose. I believe the next decade of the web will be defined by AI-native
              experiences — and I'm here to build them.
            </p>

            <div className="about-tags">
              <span className="tag">AI-First Thinking</span>
              <span className="tag">Systems Design</span>
              <span className="tag">Product Vision</span>
              <span className="tag">UI Architect</span>
              <span className="tag">Builder</span>
            </div>

            <div className="about-links">
              <a href="#contact" onClick={scrollToContact} className="btn-primary">
                Start a Project
              </a>
              <a
                href="/resume.pdf"
                download="Rupesh-Ishi-Resume.pdf"
                className="resume-btn flex items-center gap-2"
                id="resume-btn"
              >
                <Download size={16} />
                Download Resume
              </a>
            </div>
          </div>

          <div className="about-right reveal visible">
            <div className="about-card-wrapper">
              <div className="about-avatar-card">
                <div className="avatar-glow"></div>
                <div className="avatar-ring">
                  <div className="avatar-inner">
                    <div className="avatar-initials">RI</div>
                  </div>
                </div>
                <div className="avatar-status">
                  <span className="status-dot"></span>
                  Open to work
                </div>
              </div>

              <div className="about-info-cards">
                <div className="info-card">
                  <div className="info-icon text-blue-400">
                    <Bot size={22} />
                  </div>
                  <div>
                    <div className="info-title">AI Developer</div>
                    <div className="info-sub">Machine Intelligence</div>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon text-purple-400">
                    <Rocket size={22} />
                  </div>
                  <div>
                    <div className="info-title">Product Builder</div>
                    <div className="info-sub">SaaS & Platforms</div>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon text-cyan-400">
                    <Layout size={22} />
                  </div>
                  <div>
                    <div className="info-title">UI Architect</div>
                    <div className="info-sub">Premium Experiences</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
