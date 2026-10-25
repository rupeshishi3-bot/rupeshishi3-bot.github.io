import React from 'react';
import { Download } from 'lucide-react';

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
              <span className="gradient-text">A Digital Product Creator.</span>
            </h2>
            <p className="about-bio">
              I'm <strong>Rupesh Bhagwan Ishi</strong> — an AI-Assisted Website Builder and Digital
              Product Creator. I build at the intersection of modern frontend architectures,
              artificial intelligence workflows, and human-centered design. Rather than relying on
              slow manual boilerplate or ungrounded AI generation, I engineer working software with
              speed, precision, and purpose.
            </p>
            <p className="about-bio">
              My work centers on <strong>building digital products, AI-assisted workflows,
              experimentation, and iterative improvement</strong>. I believe the future of software
              belongs to builders who orchestrate intelligent tools to deliver complete,
              responsive, and robust web applications.
            </p>

            <div className="about-tags">
              <span className="tag">AI-Assisted Workflows</span>
              <span className="tag">Digital Product Builder</span>
              <span className="tag">Systems Architecture</span>
              <span className="tag">Edge &amp; Cloud Services</span>
              <span className="tag">Iterative Engineering</span>
            </div>

            <div className="about-links">
              <a href="#contact" onClick={scrollToContact} className="btn-primary">
                Start a Project
              </a>
              <a
                href="/resume.pdf"
                download="Rupesh-Ishi-Resume.pdf"
                className="resume-btn"
                id="resume-btn"
                title="Download authentic resume PDF"
              >
                <Download size={15} style={{ display: 'inline', marginRight: '6px' }} />
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
                  Open to Work &amp; Collaborations
                </div>
              </div>

              <div className="about-info-cards">
                <div className="info-card">
                  <div className="info-icon">🤖</div>
                  <div>
                    <div className="info-title">AI-Assisted Workflows</div>
                    <div className="info-sub">Prompt Architecture &amp; Tooling</div>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">🚀</div>
                  <div>
                    <div className="info-title">Digital Product Builder</div>
                    <div className="info-sub">SaaS Platforms &amp; Web Utilities</div>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">✨</div>
                  <div>
                    <div className="info-title">UI Architect</div>
                    <div className="info-sub">Cinematic &amp; Accessible Interfaces</div>
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
