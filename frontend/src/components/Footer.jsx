import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer
      style={{
        background: '#ffffff',
        borderTop: '1px solid var(--border)',
        padding: '3rem 2.5rem 1.5rem',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
              <defs>
                <linearGradient id="footHubGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
              </defs>
              <rect width="100" height="100" rx="24" fill="url(#footHubGrad)" />
              <path d="M30 25h12v20h16V25h12v50H58V55H42v20H30V25z" fill="white" />
            </svg>
            <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>HUB LEARNING</h4>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            The premier all-in-one educational and engineering acceleration platform designed specifically for college students and future software leaders.
          </p>
        </div>

        <div>
          <h5 style={{ color: 'var(--text-primary)', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.8px', fontWeight: 700 }}>
            The Five Hubs
          </h5>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
            <li><Link to="/technical-hub" style={{ color: 'var(--text-secondary)' }}>Technical Hub (CS)</Link></li>
            <li><Link to="/skills-hub" style={{ color: 'var(--text-secondary)' }}>Skills Hub (Growth)</Link></li>
            <li><Link to="/coding-hub" style={{ color: 'var(--text-secondary)' }}>Coding Hub (DSA)</Link></li>
            <li><Link to="/career-hub" style={{ color: 'var(--text-secondary)' }}>Career Hub (Placements)</Link></li>
            <li><Link to="/project-hub" style={{ color: 'var(--text-secondary)' }}>Project Hub (Showcase)</Link></li>
          </ul>
        </div>

        <div>
          <h5 style={{ color: 'var(--text-primary)', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.8px', fontWeight: 700 }}>
            Resources
          </h5>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
            <li><Link to="/projects" style={{ color: 'var(--text-secondary)' }}>Project Repository</Link></li>
            <li><Link to="/progress" style={{ color: 'var(--text-secondary)' }}>Student Analytics</Link></li>
            <li><Link to="/community" style={{ color: 'var(--text-secondary)' }}>Peer Discussions</Link></li>
            <li><Link to="/help" style={{ color: 'var(--text-secondary)' }}>Help & FAQs</Link></li>
            <li><Link to="/info" style={{ color: 'var(--text-secondary)' }}>Platform Architecture</Link></li>
          </ul>
        </div>

        <div>
          <h5 style={{ color: 'var(--text-primary)', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.8px', fontWeight: 700 }}>
            Tech Stack
          </h5>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            React 18 • Node.js • Express • MongoDB • JWT Auth • Pure CSS3 (Grid & Flexbox) • Zero Tailwind.
          </p>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
            <span className="badge badge-accent">Production Ready</span>
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '1.5rem',
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
        }}
      >
        <div>© 2026 HUB Learning Website. All rights reserved. Built for engineering excellence.</div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link to="/info" style={{ color: 'var(--text-muted)' }}>Documentation</Link>
          <Link to="/help" style={{ color: 'var(--text-muted)' }}>Privacy & Terms</Link>
          <Link to="/community" style={{ color: 'var(--text-muted)' }}>Feedback</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
