import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../hooks/useProgress';
import { developerTools } from '../data/developerToolsData';
import DeveloperToolsMegaMenu from './DeveloperToolsMegaMenu';

const Navbar = ({ onToggleSidebar }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { progress } = useProgress();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [devToolsOpen, setDevToolsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Listen for custom open-developer-tools and state change events
  useEffect(() => {
    const handleOpenDevTools = () => setDevToolsOpen(true);
    const handleStateChange = (e) => setDevToolsOpen(Boolean(e.detail?.isOpen));
    window.addEventListener('open-developer-tools', handleOpenDevTools);
    window.addEventListener('dev-tools-state-change', handleStateChange);
    return () => {
      window.removeEventListener('open-developer-tools', handleOpenDevTools);
      window.removeEventListener('dev-tools-state-change', handleStateChange);
    };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/technical-hub?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate('/login');
  };

  const initialLetter = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          {/* Left: Mobile Drawer Button & Search Bar */}
          <div className="navbar-left">
            <button
              type="button"
              className="hamburger-btn"
              onClick={onToggleSidebar}
              aria-label="Toggle navigation drawer"
              title="Open Sidebar Navigation"
            >
              <span className="hamburger-icon">☰</span>
            </button>

            <form onSubmit={handleSearchSubmit} className="navbar-search-form">
              <span className="navbar-search-icon">🔍</span>
              <input
                type="text"
                className="navbar-search-input"
                placeholder="Search curricula, algorithms, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          {/* Center: Developer Tools Mega-Menu Trigger */}
          <div className="navbar-center">
            <button
              type="button"
              className={`nav-dev-tools-btn ${devToolsOpen ? 'active' : ''}`}
              onClick={() => setDevToolsOpen((prev) => !prev)}
              aria-expanded={devToolsOpen}
              aria-label="Toggle Developer Tools Menu"
              title={`Developer Tools: ${developerTools.length} Essential Technologies`}
            >
              <span className="dev-tools-icon">🛠️</span>
              <span className="dev-tools-label">Developer Tools</span>
              <span className="dev-tools-badge">{developerTools.length}</span>
              <span className="dev-tools-arrow">{devToolsOpen ? '▲' : '▼'}</span>
            </button>
          </div>

          {/* Right: Streak & Profile / Authentication */}
          <div className="navbar-right">
          <div className="streak-pill" title="Daily Learning Streak">
            <span>🔥</span>
            <span className="streak-count">{progress?.streak || 7} Days</span>
          </div>

          {isAuthenticated ? (
            <div
              className="user-profile-menu"
              ref={dropdownRef}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              title="User Profile Menu"
            >
              <div className="user-avatar-circle">{initialLetter}</div>
              <span className="user-name-snippet">{user?.name || 'Student'}</span>
              <span className="dropdown-arrow">▼</span>

              {dropdownOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <div className="dropdown-header-name">{user?.name}</div>
                    <div className="dropdown-header-email">{user?.email}</div>
                    {user?.branch && (
                      <div className="dropdown-header-tag">
                        {user.branch} • Year {user.year || 3}
                      </div>
                    )}
                  </div>

                  {user?.role === 'admin' && (
                    <Link
                      to="/admin/dashboard"
                      className="dropdown-item"
                      style={{ color: '#f472b6', fontWeight: 700 }}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <span>🛡️</span> Admin Dashboard
                    </Link>
                  )}

                  <Link
                    to="/dashboard"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span>📊</span> Dashboard
                  </Link>
                  <Link
                    to="/progress"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span>📈</span> Analytics & Budget
                  </Link>

                  <hr className="dropdown-divider" />

                  <button
                    type="button"
                    className="dropdown-item logout"
                    onClick={handleLogout}
                  >
                    <span>🚪</span> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="navbar-auth-buttons">
              <Link to="/login" className="btn-secondary nav-btn-compact">
                Sign In
              </Link>
              <Link to="/register" className="btn-primary nav-btn-compact">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>

    {/* Developer Tools Mega-Menu */}
    <DeveloperToolsMegaMenu
      isOpen={devToolsOpen}
      onClose={() => setDevToolsOpen(false)}
    />
  </>
);
};

export default Navbar;
