import React, { useState, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { developerTools, developerToolCategories } from '../data/developerToolsData';
import DeveloperToolCard from './DeveloperToolCard';
import ToolDetailsModal from './ToolDetailsModal';

const DeveloperToolsMegaMenu = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('All Tools');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeToolDetails, setActiveToolDetails] = useState(null);
  const menuContainerRef = useRef(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !activeToolDetails) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, activeToolDetails]);

  // Manage state when open
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('dev-tools-state-change', { detail: { isOpen } }));
    return () => {
      window.dispatchEvent(new CustomEvent('dev-tools-state-change', { detail: { isOpen: false } }));
    };
  }, [isOpen]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts = { 'All Tools': developerTools.length };
    developerToolCategories.forEach((cat) => {
      if (cat !== 'All Tools') {
        counts[cat] = developerTools.filter((t) => t.group === cat).length;
      }
    });
    return counts;
  }, []);

  // Filter tools based on category and search query
  const filteredTools = useMemo(() => {
    return developerTools.filter((tool) => {
      const matchesCategory =
        selectedCategory === 'All Tools' || tool.group === selectedCategory;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q) ||
        tool.group.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Backdrop overlay */}
      <div className="dev-megamenu-backdrop" onClick={onClose} aria-hidden="true" />

      {/* Main Mega Menu Container */}
      <div
        className="dev-megamenu-panel animate-slide-down"
        ref={menuContainerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Developer Tools Hub"
      >
        {/* Top Header Bar */}
        <div className="dev-megamenu-header">
          <div className="dev-header-left">
            <div className="dev-header-icon-badge">
              <span>🛠️</span>
            </div>
            <div>
              <div className="dev-header-pill">STUDENT DEVELOPER TOOLKIT</div>
              <h2 className="dev-header-title">Developer Tools Hub</h2>
              <p className="dev-header-subtitle">
                Discover the {developerTools.length} essential tools, runtimes, frameworks, and AI assistants used by modern software engineers.
              </p>
            </div>
          </div>

          <div className="dev-header-actions">
            {/* Search Input */}
            <div className="dev-search-wrapper">
              <span className="dev-search-icon">🔍</span>
              <input
                type="text"
                className="dev-search-input"
                placeholder="Search tools (e.g. React, Docker, VS Code, Git)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  className="dev-search-clear"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Close Mega Menu Button */}
            <button
              type="button"
              className="dev-megamenu-close-btn"
              onClick={onClose}
              title="Close Developer Tools (Esc)"
              aria-label="Close Developer Tools"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="dev-categories-bar" role="tablist">
          {developerToolCategories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={selectedCategory === category}
              className={`dev-category-pill ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              <span>{category}</span>
              <span className="dev-category-count">{categoryCounts[category] || 0}</span>
            </button>
          ))}
        </div>

        {/* Active Filter & Count Status */}
        <div className="dev-results-meta">
          <span>
            Showing <strong>{filteredTools.length}</strong> of {developerTools.length} developer tools
            {selectedCategory !== 'All Tools' && (
              <span className="dev-active-filter-indicator">
                {' '}in <em>{selectedCategory}</em>
              </span>
            )}
            {searchQuery && (
              <span className="dev-active-filter-indicator">
                {' '}matching "<strong>{searchQuery}</strong>"
              </span>
            )}
          </span>

          {(selectedCategory !== 'All Tools' || searchQuery) && (
            <button
              type="button"
              className="dev-reset-filter-btn"
              onClick={() => {
                setSelectedCategory('All Tools');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Tools Content Grid */}
        <div className="dev-tools-scroll-area">
          {filteredTools.length === 0 ? (
            <div className="dev-empty-state">
              <div className="dev-empty-icon">🔍</div>
              <h3>No Developer Tools Found</h3>
              <p>
                No tools matched your search "{searchQuery}" in category "{selectedCategory}".
              </p>
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Tools');
                }}
              >
                Clear Search & View All Tools
              </button>
            </div>
          ) : (
            <div className="dev-tools-grid">
              {filteredTools.map((tool) => (
                <DeveloperToolCard
                  key={tool.id}
                  tool={tool}
                  onLearnMore={(t) => setActiveToolDetails(t)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer Toolkit Tip Bar */}
        <div className="dev-megamenu-footer">
          <div className="dev-footer-info">
            <span className="dev-footer-emoji">💡</span>
            <span>
              <strong>Student Roadmaps:</strong> Master Git + VS Code first, build with HTML/CSS/JS, then explore React & Node.js with MongoDB!
            </span>
          </div>
          <div className="dev-footer-badge">{developerTools.length} Tools Loaded • Fully Responsive</div>
        </div>
      </div>

      {/* Tool Details Modal */}
      {activeToolDetails && (
        <ToolDetailsModal
          tool={activeToolDetails}
          onClose={() => setActiveToolDetails(null)}
          onSelectTool={(newTool) => setActiveToolDetails(newTool)}
        />
      )}
    </>,
    document.body
  );
};

export default DeveloperToolsMegaMenu;
