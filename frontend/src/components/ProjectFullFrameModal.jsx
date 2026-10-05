import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const ProjectFullFrameModal = ({ project, onClose }) => {
  const [deviceView, setDeviceView] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [isLoading, setIsLoading] = useState(true);
  const [showInfoDrawer, setShowInfoDrawer] = useState(false);
  const [iframeKey, setIframeKey] = useState(Date.now());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const handleCopyUrl = () => {
    if (project.demoUrl) {
      navigator.clipboard.writeText(project.demoUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey(Date.now());
  };

  // Determine container width based on device preview mode
  const getFrameWidth = () => {
    if (deviceView === 'mobile') return '380px';
    if (deviceView === 'tablet') return '768px';
    return '100%';
  };

  return createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        background: '#090d16',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'fadeIn 0.2s ease-out',
        fontFamily: 'var(--font-main, sans-serif)',
      }}
    >
      {/* Top Full-Frame Control Header Bar */}
      <header
        style={{
          height: '62px',
          minHeight: '62px',
          background: '#0f172a',
          borderBottom: '1px solid #1e293b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.25rem',
          gap: '1rem',
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        {/* Left: Project Brand & Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', minWidth: 0 }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #2563eb 0%, #0284c7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              color: '#ffffff',
              flexShrink: 0,
              boxShadow: '0 2px 10px rgba(37, 99, 235, 0.35)',
            }}
          >
            🚀
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '380px',
                  letterSpacing: '-0.2px',
                }}
              >
                {project.title}
              </h2>
              {project.status && (
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.15rem 0.55rem',
                    borderRadius: '999px',
                    background: 'rgba(34, 197, 94, 0.2)',
                    color: '#4ade80',
                    border: '1px solid rgba(74, 222, 128, 0.35)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {project.status}
                </span>
              )}
            </div>
            <div
              style={{
                fontSize: '0.8rem',
                color: '#94a3b8',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginTop: '0.1rem',
              }}
            >
              <strong style={{ color: '#cbd5e1' }}>{project.category}</strong> • Role:{' '}
              <span style={{ color: '#e2e8f0' }}>{project.role || 'Lead Developer'}</span>
            </div>
          </div>
        </div>

        {/* Center: Device View Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: '#1e293b',
            padding: '0.25rem 0.35rem',
            borderRadius: '8px',
            border: '1px solid #334155',
          }}
        >
          <button
            type="button"
            onClick={() => setDeviceView('desktop')}
            style={{
              background: deviceView === 'desktop' ? '#2563eb' : 'transparent',
              color: '#ffffff',
              border: 'none',
              padding: '0.38rem 0.85rem',
              borderRadius: '6px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.15s ease',
              boxShadow: deviceView === 'desktop' ? '0 2px 8px rgba(37, 99, 235, 0.4)' : 'none',
            }}
            title="Desktop 100% Full Width"
          >
            <span>🖥️</span> Desktop
          </button>

          <button
            type="button"
            onClick={() => setDeviceView('tablet')}
            style={{
              background: deviceView === 'tablet' ? '#2563eb' : 'transparent',
              color: deviceView === 'tablet' ? '#ffffff' : '#cbd5e1',
              border: 'none',
              padding: '0.38rem 0.85rem',
              borderRadius: '6px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.15s ease',
              boxShadow: deviceView === 'tablet' ? '0 2px 8px rgba(37, 99, 235, 0.4)' : 'none',
            }}
            title="Tablet View (768px)"
          >
            <span>💻</span> Tablet
          </button>

          <button
            type="button"
            onClick={() => setDeviceView('mobile')}
            style={{
              background: deviceView === 'mobile' ? '#2563eb' : 'transparent',
              color: deviceView === 'mobile' ? '#ffffff' : '#cbd5e1',
              border: 'none',
              padding: '0.38rem 0.85rem',
              borderRadius: '6px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.15s ease',
              boxShadow: deviceView === 'mobile' ? '0 2px 8px rgba(37, 99, 235, 0.4)' : 'none',
            }}
            title="Mobile View (380px)"
          >
            <span>📱</span> Mobile
          </button>
        </div>

        {/* Right: Actions (Reload, External link, Info, Close) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          {project.demoUrl && (
            <>
              <button
                type="button"
                onClick={handleReload}
                title="Reload Frame"
                style={{
                  background: '#1e293b',
                  color: '#e2e8f0',
                  border: '1px solid #334155',
                  padding: '0.4rem 0.65rem',
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                }}
              >
                🔄
              </button>
              <button
                type="button"
                onClick={handleCopyUrl}
                title="Copy Live Project Link"
                style={{
                  background: '#1e293b',
                  color: '#e2e8f0',
                  border: '1px solid #334155',
                  padding: '0.4rem 0.65rem',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                }}
              >
                {copied ? '✓' : '📋'}
              </button>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '0.45rem 0.85rem',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  background: 'rgba(16, 185, 129, 0.2)',
                  borderColor: 'rgba(52, 211, 153, 0.4)',
                  color: '#4ade80',
                  borderRadius: '6px',
                  border: '1px solid rgba(74, 222, 128, 0.35)',
                  textDecoration: 'none',
                }}
                title="Open directly in new browser tab"
              >
                <span>New Tab</span>
                <span>↗</span>
              </a>
            </>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.45rem 0.85rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: '#1e293b',
                color: '#f8fafc',
                borderRadius: '6px',
                border: '1px solid #334155',
                textDecoration: 'none',
              }}
              title="Open GitHub Repository"
            >
              <span>GitHub</span>
              <span>↗</span>
            </a>
          )}

          <button
            type="button"
            onClick={() => setShowInfoDrawer((prev) => !prev)}
            style={{
              padding: '0.45rem 0.85rem',
              fontSize: '0.82rem',
              fontWeight: 700,
              background: showInfoDrawer ? '#2563eb' : '#1e293b',
              color: '#ffffff',
              borderRadius: '6px',
              border: showInfoDrawer ? '1px solid #3b82f6' : '1px solid #334155',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
            title="Toggle Project Details & Problem Statement"
          >
            <span>ℹ️</span> Details
          </button>

          <button
            type="button"
            onClick={onClose}
            title="Close Full Frame (Esc)"
            style={{
              background: 'rgba(239, 68, 68, 0.2)',
              color: '#fca5a5',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              borderRadius: '6px',
              padding: '0.4rem 0.75rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              marginLeft: '0.25rem',
            }}
          >
            ✕
          </button>
        </div>
      </header>

      {/* Main Full-Frame Stage Area */}
      <div
        style={{
          flex: 1,
          height: 'calc(100vh - 62px)',
          width: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: '#040b14',
        }}
      >
        {/* Frame Workspace */}
        <div
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: deviceView === 'desktop' ? '0' : '1.5rem',
            background:
              deviceView === 'desktop'
                ? '#040b14'
                : 'radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.12) 0%, transparent 60%), #030811',
            transition: 'all 0.3s ease',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {project.demoUrl ? (
            <div
              style={{
                width: getFrameWidth(),
                height: deviceView === 'desktop' ? '100%' : 'calc(100% - 1rem)',
                maxWidth: '100%',
                maxHeight: '100%',
                background: '#ffffff',
                boxShadow: deviceView === 'desktop' ? 'none' : '0 10px 40px rgba(0, 0, 0, 0.85)',
                borderRadius: deviceView === 'desktop' ? '0' : '12px',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                border: deviceView === 'desktop' ? 'none' : '2px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              {/* Device Mockup Top Bar for Tablet & Mobile */}
              {deviceView !== 'desktop' && (
                <div
                  style={{
                    height: '26px',
                    background: '#1e293b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 10px',
                    borderBottom: '1px solid #334155',
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: '45px',
                      height: '4px',
                      borderRadius: '999px',
                      background: '#64748b',
                    }}
                  />
                </div>
              )}

              {/* Iframe Loading Overlay */}
              {isLoading && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(15, 23, 42, 0.96)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 5,
                    gap: '1rem',
                  }}
                >
                  <div className="spinner" style={{ width: '40px', height: '40px' }} />
                  <p style={{ color: '#ffffff', fontSize: '0.98rem', margin: 0, fontWeight: 700 }}>
                    Connecting to live project at{' '}
                    <span style={{ color: '#38bdf8' }}>
                      {(() => {
                        try {
                          return new URL(project.demoUrl).hostname;
                        } catch {
                          return project.demoUrl;
                        }
                      })()}
                    </span>
                    ...
                  </p>
                  <span style={{ fontSize: '0.84rem', color: '#94a3b8' }}>
                    Loading full frame web environment
                  </span>
                </div>
              )}

              {/* Interactive Live Project IFrame */}
              <iframe
                key={iframeKey}
                src={project.demoUrl}
                title={project.title}
                onLoad={() => setIsLoading(false)}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  flex: 1,
                  display: 'block',
                  background: '#ffffff',
                }}
              />
            </div>
          ) : (
            /* Fallback if project does not have a live demo URL configured */
            <div
              style={{
                maxWidth: '620px',
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '16px',
                padding: '2.5rem',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
              }}
            >
              <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🌐</div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
                No Live Demo URL Configured
              </h3>
              <p
                style={{
                  color: '#cbd5e1',
                  fontSize: '0.94rem',
                  lineHeight: '1.65',
                  marginBottom: '1.75rem',
                }}
              >
                This project does not currently have a live demo URL assigned. An administrator can edit
                this project and provide a production deployment link (e.g. Vercel, Netlify, Render, or
                custom domain) to preview in this full frame environment.
              </p>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'var(--accent-gradient, #2563eb)',
                    color: '#ffffff',
                    padding: '0.75rem 1.6rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  Explore GitHub Source Repository →
                </a>
              )}
            </div>
          )}
        </div>

        {/* Slide-out Project Details Drawer */}
        {showInfoDrawer && (
          <aside
            style={{
              width: '400px',
              maxWidth: '90vw',
              background: '#0f172a',
              borderLeft: '1px solid #1e293b',
              padding: '1.75rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              animation: 'slideInRight 0.25s ease-out',
              zIndex: 20,
              boxShadow: '-8px 0 30px rgba(0, 0, 0, 0.6)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #1e293b',
                paddingBottom: '0.85rem',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
                Project Architecture
              </h3>
              <button
                type="button"
                onClick={() => setShowInfoDrawer(false)}
                style={{
                  background: '#1e293b',
                  color: '#94a3b8',
                  border: '1px solid #334155',
                  borderRadius: '6px',
                  padding: '0.25rem 0.55rem',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                ✕
              </button>
            </div>

            {project.problemStatement && (
              <div>
                <span
                  style={{
                    fontSize: '0.78rem',
                    color: '#f472b6',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  🎯 Problem Statement
                </span>
                <p
                  style={{
                    color: '#e2e8f0',
                    fontSize: '0.88rem',
                    lineHeight: '1.6',
                    marginTop: '0.4rem',
                    background: 'rgba(244, 114, 182, 0.08)',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    borderLeft: '3px solid #f472b6',
                  }}
                >
                  {project.problemStatement}
                </p>
              </div>
            )}

            <div>
              <span
                style={{
                  fontSize: '0.78rem',
                  color: '#38bdf8',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                📝 Overview & Description
              </span>
              <p
                style={{
                  color: '#e2e8f0',
                  fontSize: '0.88rem',
                  lineHeight: '1.6',
                  marginTop: '0.4rem',
                }}
              >
                {project.description}
              </p>
            </div>

            <div>
              <span
                style={{
                  fontSize: '0.78rem',
                  color: '#a78bfa',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                💻 Technologies Applied
              </span>
              <div
                style={{
                  display: 'flex',
                  gap: '0.4rem',
                  flexWrap: 'wrap',
                  marginTop: '0.5rem',
                }}
              >
                {project.technologies?.map((tech, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px',
                      background: '#1e293b',
                      color: '#c7d2fe',
                      border: '1px solid #3730a3',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.features && project.features.length > 0 && (
              <div>
                <span
                  style={{
                    fontSize: '0.78rem',
                    color: '#4ade80',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  ✨ Key Features
                </span>
                <ul
                  style={{
                    margin: '0.4rem 0 0',
                    paddingLeft: '1.25rem',
                    color: '#e2e8f0',
                    fontSize: '0.86rem',
                    lineHeight: '1.6',
                  }}
                >
                  {project.features.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.challenges && (
              <div>
                <span
                  style={{
                    fontSize: '0.78rem',
                    color: '#fbbf24',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  ⚡ Engineering Challenges & Solutions
                </span>
                <p
                  style={{
                    color: '#e2e8f0',
                    fontSize: '0.86rem',
                    lineHeight: '1.6',
                    marginTop: '0.4rem',
                    background: 'rgba(251, 191, 36, 0.08)',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    borderLeft: '3px solid #fbbf24',
                  }}
                >
                  {project.challenges}
                </p>
              </div>
            )}

            <div
              style={{
                marginTop: 'auto',
                borderTop: '1px solid #1e293b',
                paddingTop: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
              }}
            >
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textAlign: 'center',
                    fontSize: '0.88rem',
                    padding: '0.65rem',
                    background: 'var(--accent-gradient, #2563eb)',
                    color: '#ffffff',
                    fontWeight: 700,
                    borderRadius: '8px',
                    textDecoration: 'none',
                  }}
                >
                  Launch Live Full App 🚀
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textAlign: 'center',
                    fontSize: '0.88rem',
                    padding: '0.65rem',
                    background: '#1e293b',
                    color: '#f8fafc',
                    fontWeight: 600,
                    borderRadius: '8px',
                    border: '1px solid #334155',
                    textDecoration: 'none',
                  }}
                >
                  View GitHub Source
                </a>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ProjectFullFrameModal;
