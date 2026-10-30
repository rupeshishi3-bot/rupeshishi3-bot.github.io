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
                Rupesh Bhagwan Ishi — AI-Assisted Website Builder &amp; Digital Product Creator
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
                "The web belongs to builders who turn ideas into software with speed and intention.
              </div>
              <div
                className="t-line t-output"
                style={{
                  opacity: lineVisible ? 1 : 0,
                  transform: lineVisible ? 'none' : 'translateY(10px)',
                  transition: 'all 0.4s ease 0.9s',
                }}
              >
                &nbsp;Real products. Honest code. Relentless iteration."
              </div>
              <div
                className="t-line"
                style={{
                  opacity: lineVisible ? 1 : 0,
                  transform: lineVisible ? 'none' : 'translateY(10px)',
                  transition: 'all 0.4s ease 1.1s',
                }}
              >
                <span className="t-prompt">$</span> ls projects/
              </div>
              <div
                className="t-line t-output"
                style={{
                  opacity: lineVisible ? 1 : 0,
                  transform: lineVisible ? 'none' : 'translateY(10px)',
                  transition: 'all 0.4s ease 1.3s',
                }}
              >
                PrintWise/ ATMOS/ ATS_X-Ray/ DocReady/ ProjectFlows/ 60Sec_News/ StackRadar/ ProofStack/ NEXUS/ Typing_Website/
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
              AI is not a substitute.
              <br />
              <span className="gradient-text">It's a force multiplier.</span>
            </h2>
            <p className="manifesto-text">
              I speak this language fluently. From structured prompt engineering to AI-integrated
              web systems, I translate machine intelligence into functional digital experiences.
              My approach is simple: build products that solve real problems, iterate transparently,
              and make technology feel effortless.
            </p>
            <div className="manifesto-pillars">
              <div className="pillar">
                <div className="pillar-num">01</div>
                <div className="pillar-text">AI-Assisted Workflows</div>
              </div>
              <div className="pillar">
                <div className="pillar-num">02</div>
                <div className="pillar-text">Cinematic UI Systems</div>
              </div>
              <div className="pillar">
                <div className="pillar-num">03</div>
                <div className="pillar-text">Digital Product Thinking</div>
              </div>
              <div className="pillar">
                <div className="pillar-num">04</div>
                <div className="pillar-text">Continuous Iteration</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
