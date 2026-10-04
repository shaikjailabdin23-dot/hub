import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { developerTools, developerToolCategories } from '../data/developerToolsData';
import { devToolCommands, devToolCommandCategories } from '../data/devToolCommandsData';
import DeveloperToolCard from '../components/DeveloperToolCard';
import ToolDetailsModal from '../components/ToolDetailsModal';
import CommandCenter from '../components/CommandCenter';
import '../styles/commandCenter.css';

const DeveloperToolsPage = () => {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All Tools');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTool, setActiveTool] = useState(null);
  const [activeCommandTool, setActiveCommandTool] = useState(null);
  const [viewMode, setViewMode] = useState('commands'); // 'commands' or 'deepdive'

  // If URL has :toolId, try to match in both data sources
  useEffect(() => {
    if (toolId) {
      // Try command center tools first
      const cmdMatch = devToolCommands.find(
        (t) => t.id.toLowerCase() === toolId.toLowerCase()
      );
      if (cmdMatch) {
        setActiveCommandTool(cmdMatch);
        return;
      }
      // Fallback to deep-dive tools
      const deepMatch = developerTools.find(
        (t) => t.id.toLowerCase() === toolId.toLowerCase()
      );
      if (deepMatch) {
        setActiveTool(deepMatch);
      }
    } else {
      setActiveTool(null);
      setActiveCommandTool(null);
    }
  }, [toolId]);

  // Categories for Command Center view
  const commandCategories = devToolCommandCategories;

  // Compute category counts for command tools
  const cmdCategoryCounts = useMemo(() => {
    const counts = { 'All Tools': devToolCommands.length };
    commandCategories.forEach((cat) => {
      if (cat !== 'All Tools') {
        counts[cat] = devToolCommands.filter((t) => t.category === cat).length;
      }
    });
    return counts;
  }, []);

  // Deep search: also search within commands
  const filteredCommandTools = useMemo(() => {
    return devToolCommands.filter((tool) => {
      const matchesCategory =
        selectedCategory === 'All Tools' || tool.category === selectedCategory;

      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCategory;

      const matchesName = tool.name.toLowerCase().includes(q);
      const matchesCategory2 = tool.category.toLowerCase().includes(q);
      const matchesDesc = tool.description.toLowerCase().includes(q);
      const matchesCommands = tool.commands.some(
        (cmd) =>
          cmd.command.toLowerCase().includes(q) ||
          cmd.description.toLowerCase().includes(q)
      );
      const matchesShortcuts = (tool.shortcuts || []).some(
        (s) => s.key.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      );
      const matchesUsedFor = tool.usedFor.some((u) => u.toLowerCase().includes(q));

      return matchesCategory && (matchesName || matchesCategory2 || matchesDesc || matchesCommands || matchesShortcuts || matchesUsedFor);
    });
  }, [selectedCategory, searchQuery]);

  // Deep-dive filtered tools
  const deepDiveCategoryCounts = useMemo(() => {
    const counts = { 'All Tools': developerTools.length };
    developerToolCategories.forEach((cat) => {
      if (cat !== 'All Tools') {
        counts[cat] = developerTools.filter((t) => t.group === cat).length;
      }
    });
    return counts;
  }, []);

  const filteredDeepDiveTools = useMemo(() => {
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

  const handleOpenCommandTool = (tool) => {
    setActiveCommandTool(tool);
    navigate(`/developer-tools/${tool.id}`, { replace: false });
  };

  const handleCloseCommandTool = () => {
    setActiveCommandTool(null);
    navigate('/developer-tools', { replace: false });
  };

  const handleSelectCommandTool = (newTool) => {
    setActiveCommandTool(newTool);
    navigate(`/developer-tools/${newTool.id}`, { replace: true });
  };

  const handleOpenDeepDive = (tool) => {
    setActiveTool(tool);
    navigate(`/developer-tools/${tool.id}`, { replace: false });
  };

  const handleCloseDeepDive = () => {
    setActiveTool(null);
    navigate('/developer-tools', { replace: false });
  };

  const handleSelectDeepDiveTool = (newTool) => {
    setActiveTool(newTool);
    navigate(`/developer-tools/${newTool.id}`, { replace: true });
  };

  // Switch view and reset category
  const switchView = (mode) => {
    setViewMode(mode);
    setSelectedCategory('All Tools');
    setSearchQuery('');
  };

  const currentCategories = viewMode === 'commands' ? commandCategories : developerToolCategories;
  const currentCounts = viewMode === 'commands' ? cmdCategoryCounts : deepDiveCategoryCounts;
  const currentFilteredTools = viewMode === 'commands' ? filteredCommandTools : filteredDeepDiveTools;
  const totalTools = viewMode === 'commands' ? devToolCommands.length : developerTools.length;
  const totalCommands = devToolCommands.reduce((sum, t) => sum + t.commands.length, 0);
  const totalShortcuts = devToolCommands.reduce((sum, t) => sum + (t.shortcuts || []).length, 0);

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
          Developer Tools Command Center
        </span>
      </div>

      {/* Page Header Banner */}
      <div className="glass-card dev-page-hero">
        <div className="dev-hero-content">
          <div className="dev-hero-badge">
            <span>⌨️</span>
            <span>DEVELOPER TOOLS COMMAND CENTER</span>
          </div>
          <h1 className="dev-hero-title">Developer Tools & Commands</h1>
          <p className="dev-hero-desc">
            Master {devToolCommands.length} essential developer tools with {totalCommands} commands, {totalShortcuts} keyboard shortcuts, and practical examples used by modern engineering teams.
          </p>

          <div className="dev-hero-stats">
            <div className="dev-stat-pill">
              <strong>{devToolCommands.length}</strong> Tools
            </div>
            <div className="dev-stat-pill">
              <strong>{totalCommands}</strong> Commands
            </div>
            <div className="dev-stat-pill">
              <strong>{totalShortcuts}</strong> Shortcuts
            </div>
            <div className="dev-stat-pill">
              <strong>{devToolCommandCategories.length - 1}</strong> Categories
            </div>
          </div>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="glass-card" style={{ padding: '10px 16px', marginBottom: '0.75rem', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, marginRight: '4px' }}>VIEW:</span>
        <button
          type="button"
          className={`dev-category-pill ${viewMode === 'commands' ? 'active' : ''}`}
          onClick={() => switchView('commands')}
          style={{ fontSize: '0.78rem' }}
        >
          ⌨️ Command Center
        </button>
        <button
          type="button"
          className={`dev-category-pill ${viewMode === 'deepdive' ? 'active' : ''}`}
          onClick={() => switchView('deepdive')}
          style={{ fontSize: '0.78rem' }}
        >
          🔬 Deep Dive Architecture
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="dev-filter-container glass-card">
        {/* Category Pills */}
        <div className="dev-page-categories-bar">
          {currentCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`dev-category-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              <span>{cat}</span>
              <span className="dev-cat-badge">{currentCounts[cat] || 0}</span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="dev-page-search-row">
          <div className="dev-search-wrapper" style={{ width: '100%', maxWidth: '480px' }}>
            <span className="dev-search-icon">🔍</span>
            <input
              type="text"
              className="dev-search-input"
              placeholder={viewMode === 'commands' ? 'Search tools, commands, shortcuts...' : 'Search by tool name, runtime, category...'}
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
            Showing <strong>{currentFilteredTools.length}</strong> of {totalTools} tools
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      {viewMode === 'commands' ? (
        /* Command Center Grid */
        filteredCommandTools.length > 0 ? (
          <div className="cmd-page-grid">
            {filteredCommandTools.map((tool) => (
              <div
                key={tool.id}
                className="cmd-tool-card"
                onClick={() => handleOpenCommandTool(tool)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleOpenCommandTool(tool)}
              >
                <div className="cmd-card-top">
                  <div className="cmd-card-icon" style={{ background: tool.accentGradient }}>
                    <span>{tool.icon}</span>
                  </div>
                  <span className="cmd-card-cat">{tool.category}</span>
                </div>
                <h3 className="cmd-card-name">{tool.name}</h3>
                <p className="cmd-card-desc">{tool.description}</p>
                <div className="cmd-card-footer">
                  <span className="cmd-card-stat commands">{tool.commands.length} {tool.commandType || 'Commands'}</span>
                  {tool.shortcuts && tool.shortcuts.length > 0 && (
                    <span className="cmd-card-stat shortcuts">{tool.shortcuts.length} Shortcuts</span>
                  )}
                  <span className="cmd-card-stat">{tool.usedFor.length} Uses</span>
                </div>
              </div>
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
        )
      ) : (
        /* Deep Dive Grid (existing) */
        filteredDeepDiveTools.length > 0 ? (
          <div className="dev-tools-grid dev-tools-page-grid">
            {filteredDeepDiveTools.map((tool) => (
              <DeveloperToolCard
                key={tool.id}
                tool={tool}
                onLearnMore={handleOpenDeepDive}
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
        )
      )}

      {/* Command Center Modal */}
      {activeCommandTool && (
        <CommandCenter
          tool={activeCommandTool}
          onClose={handleCloseCommandTool}
          onSelectTool={handleSelectCommandTool}
        />
      )}

      {/* Full-Screen Immersive Tool Details Modal / Reader (existing deep-dive) */}
      {activeTool && (
        <ToolDetailsModal
          tool={activeTool}
          onClose={handleCloseDeepDive}
          onSelectTool={handleSelectDeepDiveTool}
        />
      )}
    </div>
  );
};

export default DeveloperToolsPage;
