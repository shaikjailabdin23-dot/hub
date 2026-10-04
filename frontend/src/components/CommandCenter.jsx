import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { devToolCommands } from '../data/devToolCommandsData';

const CommandCenter = ({ tool, onClose, onSelectTool }) => {
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('commands');
  const scrollRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTo({ top: 0 });
    setSearchQuery('');
    setActiveTab('commands');
    setCopiedIdx(null);
  }, [tool.id]);

  // Keyboard nav
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.altKey && e.key === 'ArrowLeft') navigateTool(-1);
      if (e.altKey && e.key === 'ArrowRight') navigateTool(1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  const allTools = devToolCommands;
  const currentIdx = allTools.findIndex(t => t.id === tool.id);

  const navigateTool = (dir) => {
    const newIdx = (currentIdx + dir + allTools.length) % allTools.length;
    onSelectTool(allTools[newIdx]);
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  // Filter commands based on search
  const filteredCommands = tool.commands.filter(cmd =>
    !searchQuery ||
    cmd.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cmd.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (cmd.example && cmd.example.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredShortcuts = (tool.shortcuts || []).filter(s =>
    !searchQuery ||
    s.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs = [
    { id: 'commands', label: tool.commandType || 'Commands', icon: '⌨️', count: tool.commands.length },
    ...(tool.shortcuts && tool.shortcuts.length > 0 ? [{ id: 'shortcuts', label: 'Shortcuts', icon: '⚡', count: tool.shortcuts.length }] : []),
    { id: 'about', label: 'About', icon: '📖', count: null },
    { id: 'tips', label: 'Beginner Tips', icon: '💡', count: (tool.beginnerTips || []).length },
  ];

  return createPortal(
    <div className="cmd-center-overlay" onClick={onClose}>
      <div className="cmd-center-container animate-scale-up" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <header className="cmd-center-header">
          <div className="cmd-header-left">
            <div className="cmd-tool-icon" style={{ background: tool.accentGradient }}>
              <span>{tool.icon}</span>
            </div>
            <div className="cmd-header-info">
              <span className="cmd-category-badge">{tool.category}</span>
              <h2 className="cmd-tool-name">{tool.name}</h2>
            </div>
          </div>
          <div className="cmd-header-actions">
            <button className="cmd-nav-btn" onClick={() => navigateTool(-1)} title="Previous tool (Alt+←)">
              ‹ Prev
            </button>
            <span className="cmd-counter">{currentIdx + 1} / {allTools.length}</span>
            <button className="cmd-nav-btn" onClick={() => navigateTool(1)} title="Next tool (Alt+→)">
              Next ›
            </button>
            {tool.websiteUrl && (
              <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer" className="cmd-docs-btn" title="Official Docs">
                Docs ↗
              </a>
            )}
            <button className="cmd-close-btn" onClick={onClose} title="Close (Esc)">✕</button>
          </div>
        </header>

        {/* Tabs */}
        <div className="cmd-tabs-bar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`cmd-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="cmd-tab-icon">{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.count !== null && <span className="cmd-tab-count">{tab.count}</span>}
            </button>
          ))}
        </div>

        {/* Search (for commands and shortcuts tabs) */}
        {(activeTab === 'commands' || activeTab === 'shortcuts') && (
          <div className="cmd-search-bar">
            <span className="cmd-search-icon">🔍</span>
            <input
              type="text"
              placeholder={`Search ${tool.commandType || 'commands'}...`}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="cmd-search-input"
            />
            {searchQuery && (
              <button className="cmd-search-clear" onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="cmd-center-body" ref={scrollRef}>
          {/* Commands Tab */}
          {activeTab === 'commands' && (
            <div className="cmd-commands-list">
              {filteredCommands.length > 0 ? filteredCommands.map((cmd, idx) => (
                <div key={idx} className="cmd-command-block">
                  <div className="cmd-command-row">
                    <div className="cmd-command-text">
                      <code className="cmd-code">{cmd.command}</code>
                    </div>
                    <button
                      className={`cmd-copy-btn ${copiedIdx === 'cmd-' + idx ? 'copied' : ''}`}
                      onClick={() => handleCopy(cmd.command, 'cmd-' + idx)}
                      title="Copy command"
                    >
                      {copiedIdx === 'cmd-' + idx ? '✓ Copied!' : 'Copy'}
                    </button>
                  </div>
                  <p className="cmd-command-desc">{cmd.description}</p>
                  {cmd.example && (
                    <div className="cmd-example-row">
                      <span className="cmd-example-label">Example:</span>
                      <code className="cmd-example-code">{cmd.example}</code>
                      <button
                        className={`cmd-copy-btn cmd-copy-sm ${copiedIdx === 'ex-' + idx ? 'copied' : ''}`}
                        onClick={() => handleCopy(cmd.example, 'ex-' + idx)}
                        title="Copy example"
                      >
                        {copiedIdx === 'ex-' + idx ? '✓' : '📋'}
                      </button>
                    </div>
                  )}
                </div>
              )) : (
                <div className="cmd-empty">
                  <span>🔍</span>
                  <p>No commands match "{searchQuery}"</p>
                </div>
              )}
            </div>
          )}

          {/* Shortcuts Tab */}
          {activeTab === 'shortcuts' && (
            <div className="cmd-shortcuts-list">
              {filteredShortcuts.length > 0 ? (
                <div className="cmd-shortcuts-grid">
                  {filteredShortcuts.map((s, idx) => (
                    <div key={idx} className="cmd-shortcut-item">
                      <kbd className="cmd-kbd">{s.key}</kbd>
                      <span className="cmd-shortcut-desc">{s.description}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="cmd-empty">
                  <span>⚡</span>
                  <p>No shortcuts match "{searchQuery}"</p>
                </div>
              )}
            </div>
          )}

          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="cmd-about-section">
              <div className="cmd-about-card">
                <h3 className="cmd-about-heading">What is {tool.name}?</h3>
                <p className="cmd-about-text">{tool.description}</p>
              </div>
              <div className="cmd-about-card">
                <h3 className="cmd-about-heading">What is it used for?</h3>
                <ul className="cmd-usedfor-list">
                  {tool.usedFor.map((use, idx) => (
                    <li key={idx} className="cmd-usedfor-item">
                      <span className="cmd-check">✓</span>
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="cmd-about-card cmd-audience-card">
                <h3 className="cmd-about-heading">Useful For</h3>
                <div className="cmd-audience-tags">
                  <span className="cmd-audience-tag">✓ Beginners</span>
                  <span className="cmd-audience-tag">✓ Students</span>
                  <span className="cmd-audience-tag">✓ Developers</span>
                  <span className="cmd-audience-tag">✓ Projects</span>
                </div>
              </div>
            </div>
          )}

          {/* Beginner Tips Tab */}
          {activeTab === 'tips' && (
            <div className="cmd-tips-section">
              {(tool.beginnerTips || []).map((tip, idx) => (
                <div key={idx} className="cmd-tip-card">
                  <span className="cmd-tip-number">{idx + 1}</span>
                  <p className="cmd-tip-text">{tip}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="cmd-center-footer">
          <div className="cmd-footer-info">
            <span className="cmd-footer-badge">{tool.commands.length} {tool.commandType || 'Commands'}</span>
            {tool.shortcuts && tool.shortcuts.length > 0 && (
              <span className="cmd-footer-badge">{tool.shortcuts.length} Shortcuts</span>
            )}
            <span className="cmd-footer-badge">{tool.usedFor.length} Use Cases</span>
          </div>
          <div className="cmd-footer-hint">
            Press <kbd>Esc</kbd> to close · <kbd>Alt</kbd>+<kbd>←→</kbd> to navigate
          </div>
        </footer>
      </div>
    </div>,
    document.body
  );
};

export default CommandCenter;
