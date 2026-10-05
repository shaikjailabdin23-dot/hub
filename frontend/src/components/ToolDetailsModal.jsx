import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { developerTools } from '../data/developerToolsData';

const SECTIONS = [
  { id: 'overview', label: 'Overview', icon: '📖' },
  { id: 'internals', label: 'Architecture & Internals', icon: '🔬' },
  { id: 'rules', label: 'Core Rules & Configs', icon: '📋' },
  { id: 'features', label: 'Key Capabilities', icon: '⭐' },
  { id: 'casestudy', label: 'Case Study', icon: '🌍' },
  { id: 'pitfalls', label: 'Pitfalls & Anti-Patterns', icon: '⚠️' },
  { id: 'codewalkthrough', label: 'Code & Commands', icon: '💻' },
  { id: 'protip', label: 'Engineering Pro Tip', icon: '💡' },
  { id: 'interview', label: 'Interview Q&A', icon: '📝' },
];

const ToolDetailsModal = ({ tool, onClose, onSelectTool }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [revealedAnswers, setRevealedAnswers] = useState({});
  const [activeSection, setActiveSection] = useState('overview');
  const [isFullscreen, setIsFullscreen] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!tool) return null;

  const currentIndex = developerTools.findIndex((t) => t.id === tool.id);
  const prevTool =
    currentIndex > 0 ? developerTools[currentIndex - 1] : developerTools[developerTools.length - 1];
  const nextTool =
    currentIndex < developerTools.length - 1 ? developerTools[currentIndex + 1] : developerTools[0];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && e.altKey && onSelectTool) onSelectTool(prevTool);
      if (e.key === 'ArrowRight' && e.altKey && onSelectTool) onSelectTool(nextTool);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onSelectTool, prevTool, nextTool]);

  // Reset scroll on tool change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setActiveSection('overview');
  }, [tool.id]);

  const handleCopy = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const toggleAnswer = (idx) => {
    setRevealedAnswers((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const el = document.getElementById(`dev-sec-${sectionId}`);
    if (el && scrollContainerRef.current) {
      const topPos = el.offsetTop - 20;
      scrollContainerRef.current.scrollTo({ top: topPos, behavior: 'smooth' });
    }
  };

  const details = tool.details || {};

  return createPortal(
    <div
      className={`dev-modal-overlay ${isFullscreen ? 'dev-fullscreen-active' : ''}`}
      onClick={onClose}
    >
      <div
        className={`dev-modal-container ${isFullscreen ? 'dev-modal-fullscreen' : ''} animate-scale-up`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${tool.name} Technical Deep-Dive`}
      >
        {/* Top Sticky Header */}
        <header className="dev-modal-header">
          <div className="dev-modal-title-row">
            <div
              className="dev-modal-icon-badge"
              style={{ background: tool.accentGradient || 'var(--accent-gradient)' }}
            >
              <span>{tool.iconText}</span>
            </div>
            <div>
              <div className="dev-modal-meta">
                <span className="dev-tool-category-badge">{tool.category}</span>
                <span className="dev-tool-group-tag">• {tool.group}</span>
                <span className="dev-tool-counter-badge">
                  Tool {currentIndex + 1} of {developerTools.length}
                </span>
              </div>
              <h2 className="dev-modal-name">{tool.name}</h2>
            </div>
          </div>

          <div className="dev-modal-header-actions">
            {/* Prev / Next Quick Controls */}
            {onSelectTool && (
              <div className="dev-header-nav-group">
                <button
                  type="button"
                  className="dev-header-nav-btn"
                  onClick={() => onSelectTool(prevTool)}
                  title={`Previous Tool: ${prevTool.name} (Alt+Left)`}
                  aria-label="Previous tool"
                >
                  ‹ {prevTool.name}
                </button>
                <button
                  type="button"
                  className="dev-header-nav-btn"
                  onClick={() => onSelectTool(nextTool)}
                  title={`Next Tool: ${nextTool.name} (Alt+Right)`}
                  aria-label="Next tool"
                >
                  {nextTool.name} ›
                </button>
              </div>
            )}

            {/* Official Website */}
            <a
              href={tool.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="dev-header-external-btn"
              title={`Visit official ${tool.name} website`}
            >
              <span>Official Docs</span>
              <span>↗</span>
            </a>

            {/* Fullscreen Toggle */}
            <button
              type="button"
              className="dev-header-action-btn"
              onClick={() => setIsFullscreen((prev) => !prev)}
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              aria-label="Toggle Fullscreen"
            >
              {isFullscreen ? '🗗' : '⛶'}
            </button>

            {/* Close Button */}
            <button
              type="button"
              className="dev-modal-close-btn"
              onClick={onClose}
              aria-label="Close modal"
              title="Close (Esc)"
            >
              ✕
            </button>
          </div>
        </header>

        {/* Modal Main Content (TOC Sidebar + Deep Content Area) */}
        <div className="dev-modal-workspace">
          {/* Left Table of Contents Quick-Nav (Desktop) */}
          <aside className="dev-toc-sidebar" aria-label="Table of Contents">
            <div className="dev-toc-header">
              <span>TABLE OF CONTENTS</span>
            </div>
            <nav className="dev-toc-nav">
              {SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  className={`dev-toc-item ${activeSection === sec.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(sec.id)}
                >
                  <span className="dev-toc-icon">{sec.icon}</span>
                  <span className="dev-toc-label">{sec.label}</span>
                </button>
              ))}
            </nav>

            <div className="dev-toc-footer">
              <div className="dev-toc-footer-card">
                <span className="dev-toc-footer-title">💡 Pro Tip</span>
                <p>Use <kbd>Alt</kbd> + <kbd>→</kbd> to cycle between developer tools quickly.</p>
              </div>
            </div>
          </aside>

          {/* Main Scrollable Reading Pane */}
          <main className="dev-modal-body" ref={scrollContainerRef}>
            {/* Quick Mobile TOC Pills */}
            <div className="dev-mobile-toc-bar">
              {SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  className={`dev-mobile-toc-pill ${activeSection === sec.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(sec.id)}
                >
                  <span>{sec.icon}</span>
                  <span>{sec.label}</span>
                </button>
              ))}
            </div>

            {/* 1. Overview */}
            <section id="dev-sec-overview" className="dev-modal-section dev-section-card">
              <div className="dev-section-header">
                <span className="dev-sec-badge">01</span>
                <h3 className="dev-section-title">📖 What Is It & Core Industry Role</h3>
              </div>
              <p className="dev-modal-desc">
                {details.whatIsIt || details.overview || tool.description}
              </p>
            </section>

            {/* 2. Architecture & Internals */}
            {details.underTheHood && (
              <section id="dev-sec-internals" className="dev-modal-section dev-section-card dev-internals-card">
                <div className="dev-section-header">
                  <span className="dev-sec-badge accent">02</span>
                  <h3 className="dev-section-title" style={{ color: 'var(--accent)' }}>
                    🔬 Under-the-Hood Architecture & Engine Mechanics
                  </h3>
                </div>
                <div className="dev-code-internals-box">
                  {details.underTheHood}
                </div>
              </section>
            )}

            {/* 3. Core Rules & Configs */}
            {details.coreRulesAndWorkflows && (
              <section id="dev-sec-rules" className="dev-modal-section dev-section-card dev-rules-card">
                <div className="dev-section-header">
                  <span className="dev-sec-badge blue">03</span>
                  <h3 className="dev-section-title" style={{ color: '#1d4ed8' }}>
                    📋 Core Rules, Configuration Standards & Team Workflows
                  </h3>
                </div>
                <div className="dev-rules-box">
                  {details.coreRulesAndWorkflows}
                </div>
              </section>
            )}

            {/* 4. Key Capabilities */}
            {details.keyFeatures && details.keyFeatures.length > 0 && (
              <section id="dev-sec-features" className="dev-modal-section dev-section-card">
                <div className="dev-section-header">
                  <span className="dev-sec-badge green">04</span>
                  <h3 className="dev-section-title">⭐ Key Technical Capabilities & Primitives</h3>
                </div>
                <ul className="dev-features-list">
                  {details.keyFeatures.map((feature, idx) => (
                    <li key={idx} className="dev-feature-item">
                      <span className="dev-feature-bullet">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* 5. Real-World Case Study */}
            {details.realWorldCaseStudy && (
              <section id="dev-sec-casestudy" className="dev-modal-section dev-section-card dev-case-card">
                <div className="dev-section-header">
                  <span className="dev-sec-badge purple">05</span>
                  <h3 className="dev-section-title">🌍 Real-World Scale & Production Case Study</h3>
                </div>
                <p className="dev-modal-desc">
                  {details.realWorldCaseStudy}
                </p>
              </section>
            )}

            {/* 6. Pitfalls & Anti-Patterns */}
            {details.commonPitfalls && details.commonPitfalls.length > 0 && (
              <section id="dev-sec-pitfalls" className="dev-modal-section dev-section-card dev-pitfalls-card">
                <div className="dev-section-header">
                  <span className="dev-sec-badge red">06</span>
                  <h3 className="dev-section-title" style={{ color: '#b91c1c' }}>
                    ⚠️ Common Pitfalls & Anti-Patterns in Production
                  </h3>
                </div>
                <ul className="dev-pitfalls-list">
                  {details.commonPitfalls.map((pitfall, idx) => (
                    <li key={idx} className="dev-pitfall-item">
                      <span className="dev-pitfall-cross">✗</span>
                      <span>{pitfall}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* 7. Code & Commands Walkthrough */}
            {(details.codeWalkthrough || details.gettingStarted) && (
              <section id="dev-sec-codewalkthrough" className="dev-modal-section dev-section-card">
                <div className="dev-section-header" style={{ justifyContent: 'space-between', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span className="dev-sec-badge code">07</span>
                    <h3 className="dev-section-title">
                      💻 {details.codeWalkthrough?.title || 'Production Code & CLI Configuration'}
                    </h3>
                  </div>
                  {details.codeWalkthrough?.code && (
                    <button
                      type="button"
                      className="btn-secondary dev-copy-btn"
                      onClick={() => handleCopy(details.codeWalkthrough.code)}
                    >
                      {copiedCode ? '✓ Copied to Clipboard' : '📋 Copy Code'}
                    </button>
                  )}
                </div>

                {details.codeWalkthrough ? (
                  <>
                    <pre className="code-snippet-box dev-main-code-block">
                      {details.codeWalkthrough.code}
                    </pre>
                    {details.codeWalkthrough.explanation && (
                      <div className="dev-code-explanation-box">
                        <strong>Architecture Explanation: </strong>
                        <span>{details.codeWalkthrough.explanation}</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="dev-code-box">
                    <code>{details.gettingStarted}</code>
                  </div>
                )}
              </section>
            )}

            {/* 8. Student Pro Tip */}
            {details.studentTip && (
              <section id="dev-sec-protip" className="dev-student-tip-box">
                <div className="dev-tip-icon">💡</div>
                <div>
                  <div className="dev-tip-title">Senior Engineer Pro Tip</div>
                  <p className="dev-tip-content">{details.studentTip}</p>
                </div>
              </section>
            )}

            {/* 9. Interview Questions */}
            {details.interviewQuestions && details.interviewQuestions.length > 0 && (
              <section id="dev-sec-interview" className="dev-modal-section dev-section-card">
                <div className="dev-section-header">
                  <span className="dev-sec-badge amber">09</span>
                  <h3 className="dev-section-title">📝 Senior Software Engineering Interview Questions</h3>
                </div>
                <div className="dev-interview-stack">
                  {details.interviewQuestions.map((q, idx) => (
                    <div key={idx} className="dev-interview-card">
                      <div className="dev-interview-question-header">
                        <span className="dev-q-badge">Q{idx + 1}</span>
                        <h4 className="dev-q-text">{q.question}</h4>
                      </div>

                      {q.hint && (
                        <div className="dev-interview-hint">
                          <strong>Hint: </strong> {q.hint}
                        </div>
                      )}

                      <div className="dev-interview-action-row">
                        <button
                          type="button"
                          className="dev-reveal-btn"
                          onClick={() => toggleAnswer(idx)}
                        >
                          {revealedAnswers[idx] ? '▲ Hide Answer' : '▼ Reveal Answer & Explanation'}
                        </button>
                      </div>

                      {revealedAnswers[idx] && (
                        <div className="dev-interview-answer-pane animate-fade-in">
                          <div className="dev-answer-header">Key Architectural Explanation:</div>
                          <p className="dev-answer-text">{q.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Bottom Next/Previous Navigation Bar */}
            <div className="dev-modal-bottom-nav">
              {onSelectTool && (
                <>
                  <button
                    type="button"
                    className="dev-bottom-nav-card prev"
                    onClick={() => onSelectTool(prevTool)}
                  >
                    <span className="dev-nav-direction">← PREVIOUS TOOL</span>
                    <span className="dev-nav-toolname">{prevTool.iconText} {prevTool.name}</span>
                  </button>

                  <button
                    type="button"
                    className="dev-bottom-nav-card next"
                    onClick={() => onSelectTool(nextTool)}
                  >
                    <span className="dev-nav-direction">NEXT TOOL →</span>
                    <span className="dev-nav-toolname">{nextTool.iconText} {nextTool.name}</span>
                  </button>
                </>
              )}
            </div>
          </main>
        </div>

        {/* Modal Footer */}
        <footer className="dev-modal-footer">
          <div className="dev-footer-meta">
            <span>Viewing <strong>{tool.name}</strong></span>
            <span>•</span>
            <span>Category: <strong>{tool.category}</strong></span>
          </div>
          <div className="dev-footer-buttons">
            <a
              href={tool.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Open Official Tool ↗
            </a>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Done Reading
            </button>
          </div>
        </footer>
      </div>
    </div>,
    document.body
  );
};

export default ToolDetailsModal;
