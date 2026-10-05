import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../hooks/useProgress';
import { developerTools } from '../data/developerToolsData';

const navLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
  { name: 'Technical Skills', path: '/technical-hub', icon: '🖥️' },
  { name: 'Coding', path: '/coding-hub', icon: '💻' },
  { name: 'Developer Tools', path: '/developer-tools', icon: '🛠️', badge: String(developerTools.length) },
  { name: 'Project Hub', path: '/project-hub', icon: '📁' },
  { name: 'Career', path: '/career-hub', icon: '🎯' },
  { name: 'Analytics & Budget', path: '/progress', icon: '📊' },
  { name: 'Help Center', path: '/help', icon: '❓' },
  { name: 'Platform Info', path: '/info', icon: 'ℹ️' },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { progress } = useProgress();
  const location = useLocation();
  const [devToolsActive, setDevToolsActive] = React.useState(false);

  React.useEffect(() => {
    const handleStateChange = (e) => {
      setDevToolsActive(Boolean(e.detail?.isOpen));
    };
    window.addEventListener('dev-tools-state-change', handleStateChange);
    return () => window.removeEventListener('dev-tools-state-change', handleStateChange);
  }, []);

  const isItemActive = (item, isNavActive) => {
    if (isNavActive) return true;
    if (item.path === '/developer-tools') {
      return (
        devToolsActive ||
        location.pathname === '/developer-tools' ||
        location.pathname.startsWith('/developer-tools/') ||
        location.pathname.startsWith('/tools')
      );
    }
    if (item.path === '/technical-hub') {
      return (
        location.pathname === '/technical-hub' ||
        location.pathname === '/skills-hub' ||
        location.pathname.startsWith('/technical') ||
        location.pathname.startsWith('/topic') ||
        location.pathname.startsWith('/quiz')
      );
    }
    return false;
  };

  const handleLinkClick = () => {
    if (window.innerWidth <= 768 && onClose) {
      onClose();
    }
  };

  const initialLetter = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`sidebar ${isOpen ? 'mobile-open' : ''}`}
        aria-label="Main Platform Navigation"
      >
        {/* Top: Logo & Website Brand */}
        <div className="sidebar-header">
          <Link to="/" className="sidebar-brand" onClick={handleLinkClick}>
            <div className="sidebar-logo-icon">
              <svg width="30" height="30" viewBox="0 0 100 100" fill="none">
                <defs>
                  <linearGradient id="sideHubGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6c63ff" />
                    <stop offset="100%" stopColor="#00d4ff" />
                  </linearGradient>
                </defs>
                <rect width="100" height="100" rx="24" fill="url(#sideHubGrad)" />
                <path d="M30 25h12v20h16V25h12v50H58V55H42v20H30V25z" fill="white" />
              </svg>
            </div>
            <div className="sidebar-brand-text">
              <span className="sidebar-brand-title">HUB LEARNING</span>
              <span className="sidebar-brand-sub">ENGINEERING PLATFORM</span>
            </div>
          </Link>

          <button
            type="button"
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Close navigation drawer"
          >
            ✕
          </button>
        </div>

        {/* Center: Navigation Menu Items */}
        <nav className="sidebar-nav">
          <div className="sidebar-section-title">Main Navigation</div>

          <ul className="sidebar-menu-list">
            {navLinks.map((item) => (
              <li key={item.name} className="sidebar-menu-item">
                {item.isAction ? (
                  <button
                    type="button"
                    className={`sidebar-link ${devToolsActive ? 'active' : ''}`}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      font: 'inherit',
                    }}
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('open-developer-tools'));
                      handleLinkClick();
                    }}
                  >
                    <span className="sidebar-icon">{item.icon}</span>
                    <span className="sidebar-label">{item.name}</span>
                    {item.badge && (
                      <span
                        style={{
                          marginLeft: 'auto',
                          fontSize: '0.72rem',
                          padding: '0.12rem 0.5rem',
                          borderRadius: '999px',
                          background: 'rgba(108, 99, 255, 0.25)',
                          color: '#c4b5fd',
                          fontWeight: 700,
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `sidebar-link ${isItemActive(item, isActive) ? 'active' : ''}`}
                    onClick={handleLinkClick}
                  >
                    <span className="sidebar-icon">{item.icon}</span>
                    <span className="sidebar-label">{item.name}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom: User Profile Section */}
        <div className="sidebar-footer">
          {isAuthenticated ? (
            <div className="sidebar-profile-card">
              <div className="sidebar-user-row">
                <div className="sidebar-user-avatar" style={user?.role === 'admin' ? { background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)' } : {}}>
                  {user?.role === 'admin' ? '🛡️' : initialLetter}
                </div>
                <div className="sidebar-user-details">
                  <div className="sidebar-user-name">{user?.name || (user?.role === 'admin' ? 'Administrator' : 'Student')}</div>
                  <div className="sidebar-user-role" style={user?.role === 'admin' ? { color: '#f472b6', fontWeight: 600 } : {}}>
                    {user?.role === 'admin' ? 'Platform Administrator' : (user?.branch || 'Engineering Student')}
                  </div>
                </div>
                <div className="sidebar-streak-tag" title={user?.role === 'admin' ? 'Admin Full Access' : 'Learning Streak'}>
                  {user?.role === 'admin' ? '👑 Admin' : `🔥 ${progress?.streak || 7}d`}
                </div>
              </div>
              {isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="sidebar-link"
                  style={{
                    background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.25) 0%, rgba(139, 92, 246, 0.25) 100%)',
                    border: '1px solid rgba(236, 72, 153, 0.4)',
                    color: '#f472b6',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    padding: '0.45rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                  onClick={handleLinkClick}
                >
                  <span>🛡️</span>
                  <span>Admin Dashboard</span>
                  <span style={{ marginLeft: 'auto', fontSize: '0.65rem', background: '#ec4899', color: '#fff', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>LIVE</span>
                </Link>
              )}
              <button
                type="button"
                className="sidebar-logout-btn"
                onClick={() => {
                  logout();
                  handleLinkClick();
                }}
              >
                <span>🚪</span> Sign Out
              </button>
            </div>
          ) : (
            <div className="sidebar-auth-prompt">
              <div className="sidebar-auth-text">Sign in to track progress</div>
              <div className="sidebar-auth-buttons">
                <Link to="/login" className="btn-secondary sidebar-auth-btn" onClick={handleLinkClick}>
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary sidebar-auth-btn" onClick={handleLinkClick}>
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
