import React, { useEffect, useRef, useState } from 'react';

export const AiIdentity: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [lineVisible, setLineVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLineVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (terminalRef.current) {
      observer.observe(terminalRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="ai-identity">
      <div className="section-container">
        <div className="ai-identity-inner reveal visible">
          <div className="ai-terminal" ref={terminalRef}>
            <div className="terminal-header">
              <span className="t-dot red"></span>
              <span className="t-dot yellow"></span>
              <span className="t-dot green"></span>
              <span className="t-title">rupesh_ishi.ai — terminal</span>
            </div>
            <div className="terminal-body" id="terminal-body">
              <div
                className="t-line"
                style={{
                  opacity: lineVisible ? 1 : 0,
                  transform: lineVisible ? 'none' : 'translateY(10px)',
                  transition: 'all 0.4s ease 0.1s',
                }}
              >
                <span className="t-prompt">$</span> whoami
              </div>
              <div
                className="t-line t-output"
                style={{
                  opacity: lineVisible ? 1 : 0,
                  transform: lineVisible ? 'none' : 'translateY(10px)',
                  transition: 'all 0.4s ease 0.3s',
                }}
              >
                Rupesh Bhagwan Ishi — AI Web Developer &amp; Digital Architect
              </div>
              <div
                className="t-line"
                style={{
                  opacity: lineVisible ? 1 : 0,
                  transform: lineVisible ? 'none' : 'translateY(10px)',
                  transition: 'all 0.4s ease 0.5s',
                }}
              >
                <span className="t-prompt">$</span> cat vision.txt
              </div>
              <div
                className="t-line t-output"
                style={{
                  opacity: lineVisible ? 1 : 0,
                  transform: lineVisible ? 'none' : 'translateY(10px)',
                  transition: 'all 0.4s ease 0.7s',
                }}
              >
                "The web of 2030 will be alive, intelligent, and personalized.
              </div>
              <div
                className="t-line t-output"
                style={{
                  opacity: lineVisible ? 1 : 0,
                  transform: lineVisible ? 'none' : 'translateY(10px)',
                  transition: 'all 0.4s ease 0.9s',
                }}
              >
                &nbsp;I am building that web today."
              </div>
              <div
                className="t-line"
                style={{
                  opacity: lineVisible ? 1 : 0,
                  transform: lineVisible ? 'none' : 'translateY(10px)',
                  transition: 'all 0.4s ease 1.1s',
                }}
              >
                <span className="t-prompt">$</span> ls skills/
              </div>
              <div
                className="t-line t-output"
                style={{
                  opacity: lineVisible ? 1 : 0,
                  transform: lineVisible ? 'none' : 'translateY(10px)',
                  transition: 'all 0.4s ease 1.3s',
                }}
              >
                AI_Engineering/ Frontend/ Design_Systems/ SaaS_Products/ PWA/
              </div>
              <div
                className="t-line"
                style={{
                  opacity: lineVisible ? 1 : 0,
                  transition: 'all 0.4s ease 1.5s',
                }}
              >
                <span className="t-prompt">$</span> <span className="t-cursor">█</span>
              </div>
            </div>
          </div>

          <div className="ai-manifesto">
            <div className="section-label">✦ Philosophy</div>
            <h2 className="section-title">
              AI is not a tool.
              <br />
              <span className="gradient-text">It's a language.</span>
            </h2>
            <p className="manifesto-text">
              I speak this language fluently. From prompt engineering architectures to
              AI-integrated web systems, I translate machine intelligence into human delight. My
              approach is simple: build products that make people feel like the future arrived
              early.
            </p>
            <div className="manifesto-pillars">
              <div className="pillar">
                <div className="pillar-num">01</div>
                <div className="pillar-text">AI-Native Architecture</div>
              </div>
              <div className="pillar">
                <div className="pillar-num">02</div>
                <div className="pillar-text">Cinematic UI Systems</div>
              </div>
              <div className="pillar">
                <div className="pillar-num">03</div>
                <div className="pillar-text">Product Thinking</div>
              </div>
              <div className="pillar">
                <div className="pillar-num">04</div>
                <div className="pillar-text">Infinite Iteration</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
