import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { submitContactForm } from '../firebase';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [project, setProject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: boolean } = {};
    if (!name.trim()) newErrors.name = true;
    if (!email.trim()) newErrors.email = true;
    if (!message.trim()) newErrors.message = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 600);
      return;
    }

    setLoading(true);
    try {
      await submitContactForm({
        name: name.trim(),
        email: email.trim(),
        project: project.trim(),
        message: message.trim(),
      });
      setSubmitted(true);
      setName('');
      setEmail('');
      setProject('');
      setMessage('');
      setTimeout(() => setSubmitted(false), 7000);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact">
      <div className="section-container">
        <div className="section-header reveal visible">
          <div className="section-label">✦ Contact</div>
          <h2 className="section-title">
            Let's Build
            <br />
            <span className="gradient-text">Something Legendary</span>
          </h2>
        </div>

        <div className="contact-layout">
          <div className="contact-left reveal visible">
            <p className="contact-intro">
              Have a vision? A product idea? A problem that needs an AI-powered solution? I want to
              hear it. Let's turn your ambition into a product that defines an era.
            </p>

            <div className="contact-socials">
              <a
                href="https://github.com/rupeshishi3-bot"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                title="GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                title="LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                title="X / Twitter"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.722-8.845L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                X / Twitter
              </a>

              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                title="Discord"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.113 18.1.136 18.11a19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" />
                </svg>
                Discord
              </a>

              <a
                href="https://dev.to"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                title="Dev.to"
              >
                Dev.to
              </a>

              <a
                href="https://codepen.io"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                title="CodePen"
              >
                CodePen
              </a>
            </div>
          </div>

          <div className="contact-right reveal visible">
            <form className="contact-form-wrapper" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Your Name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ animation: errors.name ? 'shake 0.3s ease' : undefined }}
                />
                <div className="form-line"></div>
              </div>

              <div className="form-group">
                <input
                  type="email"
                  className="form-input"
                  placeholder="Your Email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ animation: errors.email ? 'shake 0.3s ease' : undefined }}
                />
                <div className="form-line"></div>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Project Type"
                  id="project"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                />
                <div className="form-line"></div>
              </div>

              <div className="form-group">
                <textarea
                  className="form-input form-textarea"
                  placeholder="Tell me about your vision..."
                  id="contact-msg"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ animation: errors.message ? 'shake 0.3s ease' : undefined }}
                ></textarea>
                <div className="form-line"></div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary form-submit flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              {submitted && (
                <div
                  className="form-success flex items-center justify-center gap-2"
                  id="form-success"
                  style={{ display: 'flex' }}
                >
                  <CheckCircle2 size={18} className="text-cyan-400" />
                  <span>Message received. I'll be in touch within 24 hours.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
