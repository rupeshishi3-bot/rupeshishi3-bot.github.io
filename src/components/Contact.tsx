import React, { useState } from 'react';
import { submitContactForm } from '../firebase';
import { ArrowRight, Check, Copy } from 'lucide-react';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [project, setProject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const directEmail = 'ishibhagwan@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(directEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

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
      setTimeout(() => setSubmitted(false), 8000);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
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
            <span className="gradient-text">Something Real</span>
          </h2>
        </div>

        <div className="contact-layout">
          <div className="contact-left reveal visible">
            <p className="contact-intro">
              Have a product concept, an MVP that needs building, or an AI-integrated web system
              to architect? Send a direct message or connect via GitHub and direct email.
            </p>

            <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--surface)', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius)' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--blue)', marginBottom: '0.35rem' }}>
                DIRECT CONTACT EMAIL
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                <a href={`mailto:${directEmail}`} style={{ fontSize: '0.9rem', color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>
                  {directEmail}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="social-btn"
                  style={{ cursor: 'pointer', padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                  title="Copy email to clipboard"
                >
                  {copied ? <Check size={12} style={{ color: 'var(--cyan)' }} /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="contact-socials">
              <a
                href="https://github.com/rupeshishi3-bot"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                title="GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub Profile
              </a>
              <a
                href={`mailto:${directEmail}`}
                className="social-btn"
                title="Direct Email"
              >
                <span>Email Rupesh</span>
              </a>
            </div>
          </div>

          <div className="contact-right reveal visible">
            <form className="contact-form-wrapper" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Your Name *"
                  id="contact-name"
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
                  placeholder="Your Email *"
                  id="contact-email"
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
                  placeholder="Project Concept / Type (Optional)"
                  id="contact-project"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                />
                <div className="form-line"></div>
              </div>

              <div className="form-group">
                <textarea
                  className="form-input form-textarea"
                  placeholder="Tell me about your project or vision... *"
                  id="contact-msg"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ animation: errors.message ? 'shake 0.3s ease' : undefined }}
                ></textarea>
                <div className="form-line"></div>
              </div>

              <button type="submit" className="btn-primary form-submit">
                <span>Send Message</span>
                <ArrowRight size={16} />
              </button>

              {submitted && (
                <div className="form-success" style={{ display: 'block' }}>
                  <span>✓</span> Message received and archived. I'll be in touch within 24 hours.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
