import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import adminService from '../services/adminService';
import projectService from '../services/projectService';
import ProjectFullFrameModal from '../components/ProjectFullFrameModal';

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'users' | 'activity' | 'projects'
  const [userSearch, setUserSearch] = useState('');
  const [dispatchStatus, setDispatchStatus] = useState(null);
  const [dispatching, setDispatching] = useState(false);
  const [activeFullFrameProject, setActiveFullFrameProject] = useState(null);

  // Load real admin statistics and records
  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsRes, usersRes, actRes, projRes] = await Promise.all([
        adminService.getStats(),
        adminService.getUsers(),
        adminService.getActivity(50),
        projectService.getProjects(),
      ]);

      setStats(statsRes.data);
      setUsers(usersRes.data || []);
      setActivities(actRes.data || []);
      setProjects(projRes.data || []);
    } catch (err) {
      console.error('[AdminDashboard Load Error]:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load admin statistics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSendWeeklyReport = async () => {
    setDispatching(true);
    setDispatchStatus(null);
    try {
      const res = await adminService.sendWeeklyReport();
      setDispatchStatus({ success: true, message: res.message || 'Weekly report dispatched to admin email successfully!' });
    } catch (err) {
      setDispatchStatus({ success: false, message: err.response?.data?.message || 'Failed to dispatch report.' });
    } finally {
      setDispatching(false);
      setTimeout(() => setDispatchStatus(null), 6000);
    }
  };

  // Filter users by search
  const filteredUsers = users.filter((u) => {
    const q = userSearch.toLowerCase().trim();
    if (!q) return true;
    return (
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.branch?.toLowerCase().includes(q) ||
      u.college?.toLowerCase().includes(q)
    );
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Never';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="page-container admin-dashboard-page animate-fade-in" style={{ padding: '2rem 2.5rem' }}>
      {/* Top Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          border: '1px solid #bfdbfe',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem 2.5rem',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          boxShadow: '0 4px 20px rgba(37, 99, 235, 0.06)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span
              style={{
                background: 'var(--accent-gradient)',
                color: '#fff',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                padding: '0.25rem 0.75rem',
                borderRadius: '999px',
                letterSpacing: '0.6px',
                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)',
              }}
            >
              👑 Platform Administrator
            </span>
            <span style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 600 }}>
              Live Telemetry & Management
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 0.5rem', color: 'var(--text-primary)' }}>
            Administrator Dashboard
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
            Logged in as <strong style={{ color: 'var(--text-primary)' }}>{user?.email || 'shaikjailabdin23@gmail.com'}</strong>.
            Real-time analytics, user tracking, platform activity, and project governance.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={loadData}
            disabled={loading}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <span>🔄</span> Refresh Data
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={handleSendWeeklyReport}
            disabled={dispatching}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <span>📬</span> {dispatching ? 'Dispatching...' : 'Send Weekly Report Now'}
          </button>
          <Link
            to="/projects"
            className="btn-secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <span>🛠️</span> Project Hub Manager
          </Link>
        </div>
      </div>

      {dispatchStatus && (
        <div
          style={{
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem',
            borderRadius: 'var(--radius-sm)',
            background: dispatchStatus.success ? '#f0fdf4' : '#fef2f2',
            border: `1px solid ${dispatchStatus.success ? '#bbf7d0' : '#fecaca'}`,
            color: dispatchStatus.success ? '#166534' : '#991b1b',
            fontSize: '0.92rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span>{dispatchStatus.success ? '✅' : '❌'}</span>
          <span>{dispatchStatus.message}</span>
        </div>
      )}

      {error && (
        <div
          style={{
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem',
            borderRadius: 'var(--radius-sm)',
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#991b1b',
            fontSize: '0.92rem',
            fontWeight: 500,
          }}
        >
          {error}
        </div>
      )}

      {/* Tabs Navigation */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid var(--border)',
          marginBottom: '2rem',
          paddingBottom: '0.25rem',
        }}
      >
        {[
          { id: 'analytics', label: '📊 Platform Analytics', badge: null },
          { id: 'users', label: '👥 Registered Users', badge: users.length },
          { id: 'activity', label: '⚡ Real Platform Activity', badge: activities.length },
          { id: 'projects', label: '📁 Managed Projects', badge: projects.length },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: activeTab === tab.id ? 'var(--accent-light)' : 'transparent',
              color: activeTab === tab.id ? 'var(--accent)' : 'var(--text-secondary)',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid var(--accent)' : '2px solid transparent',
              padding: '0.75rem 1.25rem',
              borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease',
            }}
          >
            <span>{tab.label}</span>
            {tab.badge !== null && (
              <span
                style={{
                  fontSize: '0.72rem',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '999px',
                  background: activeTab === tab.id ? 'var(--accent)' : '#e2e8f0',
                  color: activeTab === tab.id ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: 700,
                }}
              >
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {loading && !stats ? (
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
          <p style={{ color: 'var(--text-secondary)' }}>Aggregating live platform metrics from database...</p>
        </div>
      ) : null}

      {/* TAB 1: ANALYTICS & STATS */}
      {activeTab === 'analytics' && stats && (
        <div className="animate-fade-in">
          {/* Main Users & Traffic KPI Grid */}
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
            User Population & Traffic Metrics
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem',
              marginBottom: '2rem',
            }}
          >
            <div className="hub-stat-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', boxShadow: 'var(--card-shadow)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
                Total Registered Users
              </div>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.4rem 0' }}>
                {stats.totalRegisteredUsers}
              </div>
              <div style={{ color: '#16a34a', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600 }}>
                <span>●</span> Real database accounts
              </div>
            </div>

            <div className="hub-stat-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', boxShadow: 'var(--card-shadow)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
                New Users (This Week)
              </div>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#16a34a', margin: '0.4rem 0' }}>
                +{stats.newUsersThisWeek}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500 }}>
                +{stats.newUsersToday} registered today
              </div>
            </div>

            <div className="hub-stat-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', boxShadow: 'var(--card-shadow)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
                Active Users (30 Days)
              </div>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--accent)', margin: '0.4rem 0' }}>
                {stats.activeUsers}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500 }}>
                {stats.dailyUsers} active in last 24h
              </div>
            </div>

            <div className="hub-stat-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', boxShadow: 'var(--card-shadow)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
                Total Platform Logins
              </div>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#d97706', margin: '0.4rem 0' }}>
                {stats.totalLogins}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500 }}>
                Across all active students
              </div>
            </div>
          </div>

          {/* Timeframe User Retention */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem',
              marginBottom: '2rem',
            }}
          >
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', boxShadow: 'var(--card-shadow)' }}>
              <span style={{ fontSize: '1.35rem' }}>📅</span>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', marginTop: '0.5rem', fontWeight: 600 }}>Daily Users (Past 24h)</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.25rem' }}>{stats.dailyUsers}</div>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', boxShadow: 'var(--card-shadow)' }}>
              <span style={{ fontSize: '1.35rem' }}>🗓️</span>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', marginTop: '0.5rem', fontWeight: 600 }}>Weekly Users (Past 7d)</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.25rem' }}>{stats.weeklyUsers}</div>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', boxShadow: 'var(--card-shadow)' }}>
              <span style={{ fontSize: '1.35rem' }}>📈</span>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', marginTop: '0.5rem', fontWeight: 600 }}>Monthly Users (Past 30d)</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.25rem' }}>{stats.monthlyUsers}</div>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', boxShadow: 'var(--card-shadow)' }}>
              <span style={{ fontSize: '1.35rem' }}>📁</span>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', marginTop: '0.5rem', fontWeight: 600 }}>Total Managed Projects</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent)', marginTop: '0.25rem' }}>{stats.totalProjects}</div>
            </div>
          </div>

          {/* Module Engagement & Usage Statistics */}
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
            Hub & Module Engagement Statistics
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.25rem',
              marginBottom: '2.5rem',
            }}
          >
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', boxShadow: 'var(--card-shadow)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 600 }}>Technical Hub</span>
                <span style={{ fontSize: '1.3rem' }}>🖥️</span>
              </div>
              <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#2563eb', marginTop: '0.5rem' }}>
                {stats.technicalHubUsage}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Lesson visits & curricula reads</div>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', boxShadow: 'var(--card-shadow)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 600 }}>Coding Hub</span>
                <span style={{ fontSize: '1.3rem' }}>💻</span>
              </div>
              <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#059669', marginTop: '0.5rem' }}>
                {stats.codingHubUsage}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Problem executions & submissions</div>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', boxShadow: 'var(--card-shadow)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 600 }}>Developer Tools</span>
                <span style={{ fontSize: '1.3rem' }}>🛠️</span>
              </div>
              <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0284c7', marginTop: '0.5rem' }}>
                {stats.developerToolsUsage}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Tool drawer & toolkit opens</div>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', boxShadow: 'var(--card-shadow)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 600 }}>Project Views</span>
                <span style={{ fontSize: '1.3rem' }}>📁</span>
              </div>
              <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#7c3aed', marginTop: '0.5rem' }}>
                {stats.projectViews}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Portfolio & showcase views</div>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', boxShadow: 'var(--card-shadow)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 600 }}>Career Hub</span>
                <span style={{ fontSize: '1.3rem' }}>🎯</span>
              </div>
              <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#d97706', marginTop: '0.5rem' }}>
                {stats.careerHubUsage}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Roadmaps, skills & gaps tracked</div>
            </div>
          </div>

          {/* Daily Activity Trends Chart */}
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.75rem',
              marginBottom: '2rem',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
              Daily Platform Activity & Logins (Past 7 Days)
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${stats.chartData?.length || 7}, 1fr)`,
                gap: '1rem',
                alignItems: 'flex-end',
                height: '200px',
                padding: '1rem 0.5rem',
                borderBottom: '1px solid var(--border)',
              }}
            >
              {stats.chartData?.map((item, idx) => {
                const max = Math.max(...stats.chartData.map((c) => c.totalActivity || 1), 5);
                const heightPct = Math.max(15, Math.round(((item.totalActivity || 0) / max) * 100));

                return (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      height: '100%',
                      justifyContent: 'flex-end',
                      gap: '0.5rem',
                    }}
                  >
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent)' }}>
                      {item.totalActivity || 0}
                    </span>
                    <div
                      style={{
                        width: '100%',
                        maxWidth: '44px',
                        height: `${heightPct}%`,
                        background: 'linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)',
                        borderRadius: '6px 6px 0 0',
                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
                        transition: 'height 0.4s ease',
                      }}
                      title={`${item.date}: ${item.totalActivity} activities, ${item.logins} logins`}
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', fontWeight: 500 }}>
                      {item.date.split(',')[0]}
                    </span>
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.25rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 500 }}>
                <span style={{ width: '12px', height: '12px', background: 'var(--accent)', borderRadius: '3px' }}></span>
                Platform Interactions & Navigation Events
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REGISTERED USERS TABLE */}
      {activeTab === 'users' && (
        <div className="animate-fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              Registered Student & User Accounts ({filteredUsers.length})
            </h2>

            <div style={{ width: '320px' }}>
              <input
                type="text"
                placeholder="Search user name, email, branch..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                style={{ width: '100%', fontSize: '0.88rem' }}
              />
            </div>
          </div>

          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              overflowX: 'auto',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase' }}>User Name</th>
                  <th style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase' }}>Email Address</th>
                  <th style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase' }}>Registration Date</th>
                  <th style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase' }}>Last Login</th>
                  <th style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase' }}>Last Active</th>
                  <th style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase' }}>Modules Used</th>
                  <th style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase' }}>Role</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '3rem 2rem', color: 'var(--text-muted)' }}>
                      No registered users matched your query.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr
                      key={u._id}
                      style={{
                        borderBottom: '1px solid var(--border)',
                        transition: 'background 0.15s',
                      }}
                    >
                      <td style={{ padding: '1rem 1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <span
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              background: u.role === 'admin' ? 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)' : '#eff6ff',
                              border: u.role === 'admin' ? 'none' : '1px solid #bfdbfe',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.82rem',
                              color: u.role === 'admin' ? '#fff' : '#2563eb',
                              fontWeight: 700,
                            }}
                          >
                            {u.role === 'admin' ? '🛡️' : u.name?.charAt(0).toUpperCase() || 'U'}
                          </span>
                          <span>{u.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '1rem 1.25rem', color: 'var(--text-secondary)' }}>
                        <a href={`mailto:${u.email}`} style={{ color: 'var(--accent)', fontWeight: 500 }}>
                          {u.email}
                        </a>
                      </td>
                      <td style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)' }}>
                        {formatDate(u.createdAt)}
                      </td>
                      <td style={{ padding: '1rem 1.25rem', color: 'var(--text-secondary)' }}>
                        {formatDate(u.lastLogin)}
                      </td>
                      <td style={{ padding: '1rem 1.25rem', color: '#16a34a', fontWeight: 500 }}>
                        {formatDate(u.lastActive)}
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                          {(u.modulesUsed && u.modulesUsed.length > 0
                            ? u.modulesUsed
                            : ['Technical Hub', 'Coding Hub']
                          ).map((mod, i) => (
                            <span
                              key={i}
                              style={{
                                fontSize: '0.72rem',
                                padding: '0.2rem 0.5rem',
                                borderRadius: '4px',
                                background: '#eff6ff',
                                color: '#1d4ed8',
                                border: '1px solid #dbeafe',
                                fontWeight: 500,
                              }}
                            >
                              {mod}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            padding: '0.25rem 0.65rem',
                            borderRadius: '999px',
                            background: u.role === 'admin' ? '#eff6ff' : '#f0fdf4',
                            color: u.role === 'admin' ? '#2563eb' : '#16a34a',
                            border: `1px solid ${u.role === 'admin' ? '#bfdbfe' : '#bbf7d0'}`,
                          }}
                        >
                          {u.role === 'admin' ? 'Admin' : 'Student'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: REAL PLATFORM ACTIVITY STREAM */}
      {activeTab === 'activity' && (
        <div className="animate-fade-in">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
            Real-Time Activity Audit Trail ({activities.length})
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {activities.length === 0 ? (
              <div style={{ background: 'var(--surface)', padding: '3rem 2rem', textAlign: 'center', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                No activity records recorded yet. Interactions from students will appear here in real time.
              </div>
            ) : (
              activities.map((act) => {
                const typeColor =
                  act.type === 'registration'
                    ? '#16a34a'
                    : act.type === 'login' || act.type === 'first_login'
                    ? '#0284c7'
                    : act.type === 'coding_hub'
                    ? '#059669'
                    : act.type === 'project_view' || act.type === 'project_manage'
                    ? '#7c3aed'
                    : '#d97706';

                return (
                  <div
                    key={act._id}
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '1.15rem 1.5rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                      boxShadow: 'var(--card-shadow)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: typeColor,
                          boxShadow: `0 0 6px ${typeColor}`,
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.92rem' }}>
                          {act.userName || 'Student'} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({act.userEmail || 'N/A'})</span>
                        </div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginTop: '0.2rem' }}>
                          Action: <strong style={{ color: typeColor }}>{act.type}</strong> in{' '}
                          <strong style={{ color: 'var(--text-primary)' }}>{act.module}</strong>
                          {act.details && Object.keys(act.details).length > 0 && (
                            <span style={{ color: 'var(--text-muted)' }}> — {JSON.stringify(act.details)}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      {formatDate(act.createdAt)}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 4: MANAGED PROJECTS */}
      {activeTab === 'projects' && (
        <div className="animate-fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              Project Hub Portfolio ({projects.length})
            </h2>
            <Link to="/project-hub" className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.88rem' }}>
              + Add / Edit Projects
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {projects.map((proj) => (
              <div
                key={proj._id}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--card-shadow)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase' }}>{proj.category}</span>
                    <span style={{ fontSize: '0.72rem', padding: '0.15rem 0.55rem', borderRadius: '999px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', fontWeight: 600 }}>
                      {proj.status || 'Active'}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{proj.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                    {proj.description?.substring(0, 110)}...
                  </p>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                    {proj.technologies?.map((tech, i) => (
                      <span key={i} style={{ fontSize: '0.72rem', padding: '0.15rem 0.5rem', borderRadius: '4px', background: '#eff6ff', color: '#1d4ed8', border: '1px solid #dbeafe', fontWeight: 500 }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--border)', paddingTop: '1rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => setActiveFullFrameProject(proj)}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      fontSize: '0.82rem',
                      padding: '0.5rem 0.75rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem',
                    }}
                    title="Open Project in Full Frame Viewer"
                  >
                    <span>Full Frame</span>
                    <span>⛶</span>
                  </button>

                  <Link to="/projects" className="btn-secondary" style={{ fontSize: '0.82rem', padding: '0.5rem 0.85rem' }}>
                    Edit
                  </Link>

                  {proj.demoUrl && (
                    <a href={proj.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ fontSize: '0.82rem', padding: '0.5rem 0.85rem' }}>
                      ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Standalone Interactive Full-Frame Project Viewer */}
      {activeFullFrameProject && (
        <ProjectFullFrameModal
          project={activeFullFrameProject}
          onClose={() => setActiveFullFrameProject(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
