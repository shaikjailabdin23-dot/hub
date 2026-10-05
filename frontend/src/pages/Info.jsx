import React from 'react';

const Info = () => {
  return (
    <div className="info-page animate-fade-in" style={{ paddingBottom: '3rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem' }}>
        <span className="badge badge-accent" style={{ marginBottom: '0.75rem' }}>
          Platform Specifications
        </span>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '0.75rem' }}>Architecture & Documentation</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Detailed engineering documentation for the HUB Learning Website, its 5 specialized hubs,
          and production-grade full-stack architecture.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {/* Core Pillars */}
        <section className="glass-card" style={{ padding: '2.5rem' }}>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '1.25rem' }}>🎯 The Five Specialized Hubs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            <div style={{ padding: '1rem', borderLeft: '3px solid var(--accent)' }}>
              <h4>💻 Technical Hub</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                9 CS categories covering Fundamentals, Web Dev, DSA, Databases, Computer Networks, OS, Cybersecurity, Cloud, and AI.
              </p>
            </div>

            <div style={{ padding: '1rem', borderLeft: '3px solid #00d4ff' }}>
              <h4>✨ Skills Hub</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                Comprehensive mastery tracks for Communication, Problem Solving, Time Management, and Professional Leadership.
              </p>
            </div>

            <div style={{ padding: '1rem', borderLeft: '3px solid #10b981' }}>
              <h4>⚡ Coding Hub</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                14 DSA topics with live problem viewer, difficulty tags, hints, optimal code solutions, and code library templates.
              </p>
            </div>

            <div style={{ padding: '1rem', borderLeft: '3px solid #f59e0b' }}>
              <h4>🎯 Career Hub</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                Interactive job/internship application tracker, ATS resume blueprint, and 4 specialized interview tracks.
              </p>
            </div>

            <div style={{ padding: '1rem', borderLeft: '3px solid #ec4899' }}>
              <h4>🚀 Project Hub</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                Real-world capstone portfolio with problem statements, tech tags, and full CRUD project management.
              </p>
            </div>
          </div>
        </section>

        {/* Tech Stack Matrix */}
        <section className="glass-card" style={{ padding: '2.5rem' }}>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '1.25rem' }}>🛠️ Engineering Stack & Design Constraints</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div>
              <h4 style={{ color: 'var(--accent-secondary)', marginBottom: '0.75rem' }}>Frontend Architecture</h4>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                <li><strong>Framework:</strong> React 18 with Vite</li>
                <li><strong>Routing:</strong> React Router DOM v6 with protected routes</li>
                <li><strong>Styling:</strong> 100% Pure Professional CSS3 (CSS Grid, Flexbox, Glassmorphism, CSS Custom Properties). <strong>Zero Tailwind CSS</strong> or UI frameworks.</li>
                <li><strong>State Management:</strong> React Context API (AuthContext, ProgressContext)</li>
                <li><strong>Networking:</strong> Axios HTTP client with automatic JWT bearer interceptor</li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: 'var(--accent-secondary)', marginBottom: '0.75rem' }}>Backend Architecture</h4>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                <li><strong>Runtime & Server:</strong> Node.js with Express.js REST API</li>
                <li><strong>Database:</strong> MongoDB with Mongoose ODM Schemas</li>
                <li><strong>Authentication:</strong> JSON Web Tokens (JWT) + bcryptjs salted password hashing</li>
                <li><strong>Security:</strong> CORS configured, environment variables via dotenv</li>
                <li><strong>API Architecture:</strong> Controllers, Routes, Seed scripts, and Middleware</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Info;
