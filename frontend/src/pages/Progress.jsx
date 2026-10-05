import React from 'react';
import { useProgress } from '../hooks/useProgress';
import { useAuth } from '../hooks/useAuth';
import ProgressBar from '../components/ProgressBar';

const Progress = () => {
  const { user } = useAuth();
  const { progress } = useProgress();

  const overallPct = progress?.overallPercentage || 68;
  const hubStats = progress?.hubStats || {};

  return (
    <div className="progress-page progress-dashboard animate-fade-in">
      {/* Top Banner with Circular Gauge */}
      <section className="progress-hero-banner">
        <div style={{ flex: '1 1 420px', maxWidth: '580px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: '#dbeafe',
              border: '1px solid #bfdbfe',
              borderRadius: '999px',
              padding: '0.25rem 0.8rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#1d4ed8',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '0.75rem',
            }}
          >
            <span>📊</span> Academic Milestone & Resource Tracker
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 0.65rem', color: 'var(--text-primary)' }}>
            {user?.name || 'Student'}’s Analytics & Budget
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.6, margin: 0 }}>
            Track your mastery across all engineering hubs, allocate weekly study time budgets, and monitor developer resources in real-time.
          </p>
        </div>

        {/* Pure CSS Conic Gradient Circular Progress */}
        <div className="circular-gauge-container">
          <div
            className="circular-progress"
            style={{
              background: `conic-gradient(var(--accent) 0% ${overallPct}%, #e2e8f0 ${overallPct}% 100%)`,
            }}
          >
            <div className="circular-progress-inner">
              <span className="circular-progress-val">{overallPct}%</span>
              <span className="circular-progress-sub">Total Completion</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Progress Statistics Cards */}
      <section className="progress-stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-topics">📚</div>
          <div className="stat-info">
            <span className="stat-val">{progress?.completedTopicsCount || 24}</span>
            <span className="stat-label">Topics Completed</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-quizzes">🎯</div>
          <div className="stat-info">
            <span className="stat-val">{progress?.completedQuizzesCount || 18}</span>
            <span className="stat-label">Quizzes Passed</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: '#eff6ff', color: 'var(--accent)' }}>
            📊
          </div>
          <div className="stat-info">
            <span className="stat-val">{progress?.avgQuizScore || 84}%</span>
            <span className="stat-label">Average Quiz Score</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-streak">🔥</div>
          <div className="stat-info">
            <span className="stat-val">{progress?.streak || 7} Days</span>
            <span className="stat-label">Learning Streak</span>
          </div>
        </div>
      </section>

      {/* Hub by Hub Breakdown Progress Grid */}
      <section>
        <div className="section-header" style={{ marginBottom: '1.25rem' }}>
          <div>
            <h2 className="section-title" style={{ fontSize: '1.45rem', fontWeight: 800, margin: '0 0 0.25rem', color: 'var(--text-primary)' }}>
              Curriculum Progress by Hub
            </h2>
            <p className="section-subtitle" style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>
              Real-time completion metrics across each specialized engineering domain.
            </p>
          </div>
        </div>

        <div className="hub-progress-grid">
          <div className="hub-progress-card">
            <div className="hub-progress-card-header">
              <span className="hub-progress-name">💻 Technical Hub</span>
              <span className="hub-progress-pct">{hubStats.technical?.percentage || 67}%</span>
            </div>
            <ProgressBar value={hubStats.technical?.percentage || 67} height="8px" gradient="var(--accent-gradient)" />
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {hubStats.technical?.completed || 6} of {hubStats.technical?.total || 9} modules completed
            </div>
          </div>

          <div className="hub-progress-card">
            <div className="hub-progress-card-header">
              <span className="hub-progress-name">✨ Skills Hub</span>
              <span className="hub-progress-pct" style={{ color: '#0284c7' }}>
                {hubStats.skills?.percentage || 63}%
              </span>
            </div>
            <ProgressBar value={hubStats.skills?.percentage || 63} height="8px" gradient="linear-gradient(135deg, #0284c7 0%, #0369a1 100%)" />
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {hubStats.skills?.completed || 5} of {hubStats.skills?.total || 8} competencies developed
            </div>
          </div>

          <div className="hub-progress-card">
            <div className="hub-progress-card-header">
              <span className="hub-progress-name">⚡ Coding Hub</span>
              <span className="hub-progress-pct" style={{ color: '#16a34a' }}>
                {hubStats.coding?.percentage || 71}%
              </span>
            </div>
            <ProgressBar value={hubStats.coding?.percentage || 71} height="8px" gradient="linear-gradient(135deg, #16a34a 0%, #15803d 100%)" />
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {hubStats.coding?.completed || 10} of {hubStats.coding?.total || 14} algorithms mastered
            </div>
          </div>

          <div className="hub-progress-card">
            <div className="hub-progress-card-header">
              <span className="hub-progress-name">🎯 Career Hub</span>
              <span className="hub-progress-pct" style={{ color: '#d97706' }}>
                {hubStats.career?.percentage || 80}%
              </span>
            </div>
            <ProgressBar value={hubStats.career?.percentage || 80} height="8px" gradient="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" />
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {hubStats.career?.completed || 4} of {hubStats.career?.total || 5} placement milestones
            </div>
          </div>

          <div className="hub-progress-card">
            <div className="hub-progress-card-header">
              <span className="hub-progress-name">🚀 Project Hub</span>
              <span className="hub-progress-pct" style={{ color: '#9333ea' }}>
                {hubStats.project?.percentage || 60}%
              </span>
            </div>
            <ProgressBar value={hubStats.project?.percentage || 60} height="8px" gradient="linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)" />
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {hubStats.project?.completed || 3} of {hubStats.project?.total || 5} capstones published
            </div>
          </div>
        </div>
      </section>

      {/* Student Engineering & Learning Resource Budget */}
      <section>
        <div className="section-header" style={{ marginBottom: '1.25rem' }}>
          <div>
            <h2 className="section-title" style={{ fontSize: '1.45rem', fontWeight: 800, margin: '0 0 0.25rem', color: 'var(--text-primary)' }}>
              Student Resource & Learning Budget
            </h2>
            <p className="section-subtitle" style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>
              Manage your weekly study time allocations, developer cloud sandbox, and AI API quotas.
            </p>
          </div>
        </div>

        <div className="budget-grid">
          <div className="budget-card">
            <div className="budget-card-header">
              <span className="budget-card-title">⏱️ Study Time Budget</span>
              <span className="budget-badge budget-badge-blue">On Track</span>
            </div>
            <div className="budget-metric-value">
              24.0 <span className="budget-metric-sub">/ 30.0 hrs target</span>
            </div>
            <ProgressBar value={80} height="8px" gradient="var(--accent-gradient)" />
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              6.0 study hours remaining for this week
            </div>
          </div>

          <div className="budget-card">
            <div className="budget-card-header">
              <span className="budget-card-title">☁️ Cloud Sandbox</span>
              <span className="budget-badge budget-badge-green">85% Left</span>
            </div>
            <div className="budget-metric-value">
              $42.50 <span className="budget-metric-sub">/ $50.00 credits</span>
            </div>
            <ProgressBar value={85} height="8px" gradient="linear-gradient(135deg, #16a34a 0%, #15803d 100%)" />
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Active on Railway & Render student tier
            </div>
          </div>

          <div className="budget-card">
            <div className="budget-card-header">
              <span className="budget-card-title">🤖 AI Assistant Tokens</span>
              <span className="budget-badge budget-badge-purple">74% Left</span>
            </div>
            <div className="budget-metric-value">
              185k <span className="budget-metric-sub">/ 250k monthly</span>
            </div>
            <ProgressBar value={74} height="8px" gradient="linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)" />
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Educational code assistance & tutoring
            </div>
          </div>

          <div className="budget-card">
            <div className="budget-card-header">
              <span className="budget-card-title">🚀 Portfolio Capstones</span>
              <span className="budget-badge budget-badge-pink">3 of 4 Done</span>
            </div>
            <div className="budget-metric-value">
              75% <span className="budget-metric-sub">target completed</span>
            </div>
            <ProgressBar value={75} height="8px" gradient="linear-gradient(135deg, #ec4899 0%, #db2777 100%)" />
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              1 capstone left to complete placement portfolio
            </div>
          </div>
        </div>
      </section>

      {/* Activity Timeline */}
      <section className="activity-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
            📅 Recent Activity Timeline
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600 }}>
            Live Student Stream
          </span>
        </div>

        <div className="timeline-list">
          <div className="timeline-item">
            <div className="timeline-dot" />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                Completed Quiz: React Fundamentals
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                Score: <strong style={{ color: '#16a34a' }}>100% (4/4 correct)</strong> • 2 hours ago
              </div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot" />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                Solved Algorithmic Challenge: Two Sum (Hash Map)
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                Coding Hub • Completed in 14 minutes • Yesterday
              </div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot" />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                Updated Job Application: Stripe (Interview Scheduled)
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                Career Hub • Technical Screen milestone • 2 days ago
              </div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot" />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                Studied Lesson: Operating Systems: Concurrency & Threads
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                Technical Hub • 45 minutes study session • 3 days ago
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Progress;
