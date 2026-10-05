import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import hubService from '../services/hubService';
import HubCard from '../components/HubCard';

const Home = () => {
  const [hubs, setHubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    hubService.getHubs().then((data) => {
      setHubs(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="home-page animate-fade-in" style={{ paddingBottom: '3rem' }}>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #eff6ff 100%)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--accent-border)',
          padding: '4.5rem 2rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '3rem',
          boxShadow: '0 12px 32px -4px rgba(37, 99, 235, 0.08)',
        }}
      >
        <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div
            className="hero-badge animate-pulse-glow"
            style={{ display: 'inline-flex', marginBottom: '1.25rem' }}
          >
            🚀 The Next-Gen Educational Platform for Engineers
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
              marginBottom: '1.25rem',
              letterSpacing: '-1px',
              lineHeight: 1.15,
              color: 'var(--text-primary)',
            }}
          >
            Master Engineering, Coding & Career{' '}
            <span
              style={{
                background: 'var(--accent-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              In One Unified Hub.
            </span>
          </h1>

          <p
            style={{
              fontSize: '1.15rem',
              color: 'var(--text-secondary)',
              maxWidth: '700px',
              margin: '0 auto 2.25rem',
              lineHeight: 1.6,
            }}
          >
            Stop juggling fragmented courses. Hub Learning connects Computer Science fundamentals,
            algorithmic coding, soft skills, full-stack projects, and job tracking into a single cohesive experience.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '1.25rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link to="/register" className="btn-primary" style={{ padding: '0.85rem 2.2rem', fontSize: '1.05rem' }}>
              Start Learning Free <span>→</span>
            </Link>
            <Link to="/technical-hub" className="btn-secondary" style={{ padding: '0.85rem 2rem', fontSize: '1.05rem' }}>
              Explore Curricula 📚
            </Link>
          </div>
        </div>
      </section>

      {/* Platform Highlight Metrics */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '3.5rem',
        }}
      >
        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-topics">💻</div>
          <div className="stat-info">
            <span className="stat-val">5 Hubs</span>
            <span className="stat-label">Full Spectrum Curriculum</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-quizzes">🎯</div>
          <div className="stat-info">
            <span className="stat-val">50+ Topics</span>
            <span className="stat-label">With Code & Real Examples</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-streak">⚡</div>
          <div className="stat-info">
            <span className="stat-val">Interactive Quizzes</span>
            <span className="stat-label">Instant Feedback & Review</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-projects">🚀</div>
          <div className="stat-info">
            <span className="stat-val">Full Projects</span>
            <span className="stat-label">Portfolio Ready Showcase</span>
          </div>
        </div>
      </section>

      {/* The Five Hubs Showcase */}
      <section style={{ marginBottom: '4rem' }}>
        <div className="section-header" style={{ textAlign: 'center', flexDirection: 'column', marginBottom: '2.25rem' }}>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            Explore The Five Pillars of Engineering Mastery
          </h2>
          <p style={{ maxWidth: '650px', margin: '0 auto', color: 'var(--text-secondary)' }}>
            Each hub is deeply crafted with structured learning paths, practical exercises, and measurable benchmarks.
          </p>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading Curricula Hubs...</p>
          </div>
        ) : (
          <div className="hubs-grid">
            {hubs.map((hub) => (
              <HubCard key={hub._id || hub.slug} hub={hub} progress={0} />
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Hub Learning Platform Section */}
      <section
        style={{
          background: '#ffffff',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '3.5rem 2.5rem',
          marginBottom: '4rem',
          boxShadow: 'var(--card-shadow)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            Designed For College Students
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Everything you need to transform from a classroom beginner into an industry-ready software engineer.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>🧠</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>First-Principles Theory</h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              No cryptic textbook jargon. Every concept features real-world analogies, beginner-friendly explanations, and practical code snippets.
            </p>
          </div>

          <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>⚡</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Algorithms & DSA Drill</h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              Solve curated problems across Arrays, Sliding Window, Trees, and DP with hints, optimal solutions, and reusable code templates.
            </p>
          </div>

          <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>💼</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Career & Placement Suite</h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              Build an ATS-optimized resume, track applications with an interactive Kanban-style table, and ace technical and behavioral interviews.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section
        style={{
          background: 'linear-gradient(135deg, #2563eb 0%, #0284c7 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '3.5rem 2rem',
          textAlign: 'center',
          color: '#ffffff',
          boxShadow: '0 12px 30px rgba(37, 99, 235, 0.3)',
        }}
      >
        <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem', color: '#ffffff' }}>
          Ready to Elevate Your Engineering Journey?
        </h2>
        <p style={{ maxWidth: '600px', margin: '0 auto 2rem', color: 'rgba(255, 255, 255, 0.92)', fontSize: '1.05rem' }}>
          Join students from colleges and universities mastering software development, problem solving, and career skills today.
        </p>
        <Link
          to="/register"
          className="btn-secondary"
          style={{
            padding: '0.85rem 2.5rem',
            fontSize: '1.05rem',
            background: '#ffffff',
            color: 'var(--accent)',
            fontWeight: 700,
            border: 'none',
          }}
        >
          Create Free Student Account 🚀
        </Link>
      </section>
    </div>
  );
};

export default Home;
