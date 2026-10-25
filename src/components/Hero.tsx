import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Download, Mail } from 'lucide-react';

const typedPhrases = [
  'AI-Assisted Website Builder & Digital Product Creator',
  '10 Functional Digital Products & Cloud Architectures',
  'Rapid Prototyping, Clean Code & Relentless Iteration',
  'Transforming Visionary Concepts into Working Web Software',
];

export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [typedText, setTypedText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Counter states
  const [projectsCount, setProjectsCount] = useState(0);
  const [passionCount, setPassionCount] = useState(0);

  // Typing animation
  useEffect(() => {
    const currentPhrase = typedPhrases[phraseIdx];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (charIdx < currentPhrase.length) {
        timeout = setTimeout(() => {
          setTypedText(currentPhrase.substring(0, charIdx + 1));
          setCharIdx((prev) => prev + 1);
        }, 55);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => {
          setTypedText(currentPhrase.substring(0, charIdx - 1));
          setCharIdx((prev) => prev - 1);
        }, 30);
      } else {
        setIsDeleting(false);
        setPhraseIdx((prev) => (prev + 1) % typedPhrases.length);
        timeout = setTimeout(() => {}, 350);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, phraseIdx]);

  // Counters animation
  useEffect(() => {
    const duration = 1800;
    const intervalTime = 16;
    const steps = duration / intervalTime;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = Math.min(1, step / steps);
      const eased = 1 - (1 - progress) * (1 - progress);

      setProjectsCount(Math.floor(eased * 10));
      setPassionCount(Math.floor(eased * 100));

      if (progress >= 1) {
        clearInterval(timer);
        setProjectsCount(10);
        setPassionCount(100);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Full original particle canvas system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let mx = -1000;
    let my = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      x: number = 0;
      y: number = 0;
      size: number = 1;
      speedX: number = 0;
      speedY: number = 0;
      opacity: number = 0.5;
      color: string = '#3b82f6';
      pulse: number = 0;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.5 ? '#3b82f6' : '#a855f7';
        this.pulse = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += 0.02;
        this.opacity = 0.1 + Math.sin(this.pulse) * 0.2;
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.max(0.05, Math.min(1, this.opacity));
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const particles: Particle[] = [];
    const count = Math.min(120, Math.floor((width * height) / 9000));
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = '#3b82f6';
            ctx.globalAlpha = (1 - dist / 110) * 0.09;
            ctx.lineWidth = 0.6;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle radial gradient overlay
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        width * 0.85
      );
      gradient.addColorStop(0, 'rgba(59,130,246,0.04)');
      gradient.addColorStop(0.5, 'rgba(168,85,247,0.025)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          p.x += dx * 0.0025;
          p.y += dy * 0.0025;
        }
        p.update();
        p.draw();
      });

      drawConnections();
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleMagneticMove = (e: React.MouseEvent<HTMLElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = '';
  };

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero">
      <canvas id="hero-canvas" ref={canvasRef}></canvas>
      <div className="hero-grid-overlay"></div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          Available for Selected Projects &amp; Roles
        </div>

        <h1 className="hero-title">
          <span className="line-wrap">
            <span className="hero-line" data-delay="0">
              Rupesh Bhagwan Ishi
            </span>
          </span>
          <span className="line-wrap">
            <span className="hero-line gradient-text" data-delay="150">
              AI-Assisted
            </span>
          </span>
          <span className="line-wrap">
            <span className="hero-line" data-delay="300">
              Product Creator
            </span>
          </span>
        </h1>

        <p className="hero-subtitle">
          <span id="typed-text">{typedText}</span>
          <span className="cursor-blink">|</span>
        </p>

        {/* 3 Prominent Verified Buttons */}
        <div className="hero-actions">
          <button
            type="button"
            onClick={() => scrollTo('#projects')}
            className="btn-primary magnetic"
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
          >
            <span>Explore 10 Projects</span>
            <ArrowRight size={16} />
          </button>

          <a
            href="/resume.pdf"
            download="Rupesh-Ishi-Resume.pdf"
            className="btn-secondary magnetic"
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            title="Download authentic resume PDF"
          >
            <Download size={16} />
            <span>Download Resume</span>
          </a>

          <button
            type="button"
            onClick={() => scrollTo('#contact')}
            className="btn-ghost magnetic"
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
          >
            <Mail size={16} />
            <span>Contact Me</span>
          </button>
        </div>

        {/* Real Stats */}
        <div className="hero-stats">
          <div className="stat-item">
            <div>
              <span className="stat-number">{projectsCount}</span>
              <span className="stat-plus">+</span>
            </div>
            <span className="stat-label">Projects Built</span>
          </div>

          <div className="stat-divider"></div>

          <div className="stat-item">
            <div>
              <span className="stat-number">100</span>
              <span className="stat-plus">%</span>
            </div>
            <span className="stat-label">Transparent Status</span>
          </div>

          <div className="stat-divider"></div>

          <div className="stat-item">
            <div>
              <span className="stat-number">{passionCount}</span>
              <span className="stat-plus">%</span>
            </div>
            <span className="stat-label">Iterative Engineering</span>
          </div>
        </div>
      </div>

      <div className="hero-floating-cards">
        <div className="float-card card-1">
          <div className="fc-icon">⚡</div>
          <div className="fc-text">AI Integration</div>
        </div>
        <div className="float-card card-2">
          <div className="fc-icon">🚀</div>
          <div className="fc-text">Fast Iteration</div>
        </div>
        <div className="float-card card-3">
          <div className="fc-icon">🌐</div>
          <div className="fc-text">Edge &amp; Cloud</div>
        </div>
      </div>

      <div className="scroll-indicator" onClick={() => scrollTo('#about')}>
        <div className="scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
};
