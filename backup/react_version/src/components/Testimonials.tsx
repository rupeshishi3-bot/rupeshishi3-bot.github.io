import React from 'react';

interface Testimonial {
  text: string;
  name: string;
  role: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    text: '"Rupesh delivered a UI that made our investors ask \'did a design agency build this?\'. No, it was one developer in 3 weeks. Absolutely extraordinary."',
    name: 'Arjun K.',
    role: 'Startup Founder',
    avatar: 'AK',
  },
  {
    text: '"The AI integration he built for our platform saved 40 hours of manual work per week. His engineering thinking is years ahead of typical developers."',
    name: 'Sarah M.',
    role: 'Product Manager',
    avatar: 'SM',
  },
  {
    text: '"I\'ve worked with many developers. Rupesh is the rare kind who thinks in systems, not just features. He understands the entire product, not just his code."',
    name: 'Ravi P.',
    role: 'Tech Lead',
    avatar: 'RP',
  },
];

export const Testimonials: React.FC = () => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-4px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    card.style.transition = 'none';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = '';
    card.style.transition = 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)';
  };

  return (
    <section id="testimonials">
      <div className="section-container">
        <div className="section-header reveal visible">
          <div className="section-label">✦ Testimonials</div>
          <h2 className="section-title">
            What Others <span className="gradient-text">Say</span>
          </h2>
        </div>

        <div className="testi-grid">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="testi-card reveal visible"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="testi-stars">★★★★★</div>
              <p className="testi-text">{item.text}</p>
              <div className="testi-author">
                <div className="testi-avatar">{item.avatar}</div>
                <div>
                  <div className="testi-name">{item.name}</div>
                  <div className="testi-role">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
