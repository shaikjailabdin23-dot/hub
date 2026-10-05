import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { developerTools, developerToolCategories } from '../data/developerToolsData';
import DeveloperToolCard from '../components/DeveloperToolCard';
import ToolDetailsModal from '../components/ToolDetailsModal';

const DeveloperToolsPage = () => {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All Tools');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTool, setActiveTool] = useState(null);

  // If URL has :toolId, set it as active tool
  useEffect(() => {
    if (toolId) {
      const matched = developerTools.find(
        (t) => t.id.toLowerCase() === toolId.toLowerCase()
      );
      if (matched) {
        setActiveTool(matched);
      }
    } else {
      setActiveTool(null);
    }
  }, [toolId]);

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

  const handleOpenToolDetails = (tool) => {
    setActiveTool(tool);
    navigate(`/developer-tools/${tool.id}`, { replace: false });
  };

  const handleCloseToolDetails = () => {
    setActiveTool(null);
    navigate('/developer-tools', { replace: false });
  };

  const handleSelectTool = (newTool) => {
    setActiveTool(newTool);
    navigate(`/developer-tools/${newTool.id}`, { replace: true });
  };

  return (
    <div className="page-container dev-tools-page animate-fade-in">
      {/* Breadcrumb Navigation */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
          marginBottom: '0.85rem',
          fontSize: '0.88rem',
          color: 'var(--text-muted)',
          flexWrap: 'wrap',
        }}
      >
        <Link to="/dashboard">Dashboard</Link>
        <span>/</span>
        <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
          Developer Tools Toolkit
        </span>
      </div>

      {/* Page Header Banner */}
      <div className="glass-card dev-page-hero">
        <div className="dev-hero-content">
          <div className="dev-hero-badge">
            <span>🛠️</span>
            <span>PRODUCTION ENGINEERING ECOSYSTEM</span>
          </div>
          <h1 className="dev-hero-title">Developer Tools & Environments</h1>
          <p className="dev-hero-desc">
            Master the {developerTools.length} critical developer tools, runtimes, container engines, cloud platforms, and AI assistants used by modern engineering teams at Google, Meta, Amazon, and Microsoft.
          </p>

          <div className="dev-hero-stats">
            <div className="dev-stat-pill">
              <strong>{developerTools.length}</strong> Industry Tools
            </div>
            <div className="dev-stat-pill">
              <strong>{developerToolCategories.length - 1}</strong> Core Categories
            </div>
            <div className="dev-stat-pill">
              <strong>100%</strong> Deep CS Architecture & Interview Q&A
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="dev-filter-container glass-card">
        {/* Category Pills */}
        <div className="dev-page-categories-bar">
          {developerToolCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`dev-category-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              <span>{cat}</span>
              <span className="dev-cat-badge">{categoryCounts[cat] || 0}</span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="dev-page-search-row">
          <div className="dev-search-wrapper" style={{ width: '100%', maxWidth: '420px' }}>
            <span className="dev-search-icon">🔍</span>
            <input
              type="text"
              className="dev-search-input"
              placeholder="Search by tool name, runtime, category, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="dev-search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="dev-results-counter">
            Showing <strong>{filteredTools.length}</strong> of {developerTools.length} tools
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="dev-tools-grid dev-tools-page-grid">
          {filteredTools.map((tool) => (
            <DeveloperToolCard
              key={tool.id}
              tool={tool}
              onLearnMore={handleOpenToolDetails}
            />
          ))}
        </div>
      ) : (
        <div className="dev-empty-state glass-card">
          <div className="dev-empty-icon">🔍</div>
          <h3>No developer tools found</h3>
          <p>We couldn't find any tool matching "{searchQuery}" in "{selectedCategory}".</p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Tools');
            }}
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Full-Screen Immersive Tool Details Modal / Reader */}
      {activeTool && (
        <ToolDetailsModal
          tool={activeTool}
          onClose={handleCloseToolDetails}
          onSelectTool={handleSelectTool}
        />
      )}
    </div>
  );
};

export default DeveloperToolsPage;
