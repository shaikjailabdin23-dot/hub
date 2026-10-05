import React, { useState } from 'react';
import { dsaTopics, codingProblems, codeLibrary } from '../data/codingData';
import SearchBar from '../components/SearchBar';
import CodingWorkspace from '../components/CodingWorkspace';

const CodingHub = () => {
  const [activeTab, setActiveTab] = useState('problems'); // 'problems' or 'library'
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProblem, setActiveProblem] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const [solvedList, setSolvedList] = useState(() => {
    try {
      const saved = localStorage.getItem('hub_solved_coding_problems');
      return saved ? JSON.parse(saved) : ['two-sum'];
    } catch {
      return ['two-sum'];
    }
  });

  const handleProblemCompleted = (problemId) => {
    setSolvedList((prev) => {
      if (!prev.includes(problemId)) {
        const next = [...prev, problemId];
        localStorage.setItem('hub_solved_coding_problems', JSON.stringify(next));
        return next;
      }
      return prev;
    });
  };

  // Filter problems
  const filteredProblems = codingProblems.filter((p) => {
    const matchesTopic =
      selectedTopic === 'All Topics' ||
      p.topic.toLowerCase() === selectedTopic.toLowerCase() ||
      (selectedTopic === 'Hash Table' && (p.topic === 'Hash Table' || p.topic === 'Arrays'));

    const matchesDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;

    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.topic.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q);

    return matchesTopic && matchesDiff && matchesSearch;
  });

  const handleOpenProblem = (p) => {
    setActiveProblem(p);
  };

  const handleCopyCode = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // If a problem is currently selected, display the full Coding Workspace!
  if (activeProblem) {
    return (
      <div className="page-container coding-hub-page animate-fade-in" style={{ padding: '1rem 1.5rem' }}>
        <CodingWorkspace
          problem={activeProblem}
          onBack={() => setActiveProblem(null)}
          onComplete={handleProblemCompleted}
        />
      </div>
    );
  }

  return (
    <div className="page-container coding-hub-page animate-fade-in">
      {/* Hero Banner */}
      <section className="hub-hero">
        <div className="hub-hero-header">
          <div
            className="hub-hero-icon"
            style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
          >
            ⚡
          </div>
          <div>
            <h1 className="hub-hero-title">Coding & DSA Hub</h1>
            <p className="hub-hero-desc">
              Master algorithmic problem solving for top tech company interviews. Practice curated Data Structures
              and Algorithms across Arrays, Strings, Trees, Graphs, Dynamic Programming, and more.
            </p>
          </div>
        </div>

        <div className="hub-stats-row">
          <div className="hub-stat-card">
            <span className="hub-stat-num">{codingProblems.length}</span>
            <span className="hub-stat-text">Interview Problems</span>
          </div>
          <div className="hub-stat-card">
            <span className="hub-stat-num">{dsaTopics.length - 1}</span>
            <span className="hub-stat-text">DSA Domains</span>
          </div>
          <div className="hub-stat-card">
            <span className="hub-stat-num">{solvedList.length}</span>
            <span className="hub-stat-text">Solved by You</span>
          </div>
          <div className="hub-stat-card">
            <span className="hub-stat-num">4 Languages</span>
            <span className="hub-stat-text">JS, Python, C++, Java</span>
          </div>
        </div>
      </section>

      {/* Main Tab Switcher (Problems vs Code Library) */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1.75rem',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '0.85rem',
        }}
      >
        <button
          type="button"
          className={activeTab === 'problems' ? 'btn-primary' : 'btn-secondary'}
          onClick={() => setActiveTab('problems')}
        >
          🧩 Practice Problems ({codingProblems.length})
        </button>
        <button
          type="button"
          className={activeTab === 'library' ? 'btn-primary' : 'btn-secondary'}
          onClick={() => setActiveTab('library')}
        >
          📖 Code Library & Templates
        </button>
      </div>

      {activeTab === 'problems' ? (
        <>
          {/* Controls Bar */}
          <section className="filter-search-bar">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search problems by name or concept (e.g. Two Sum, Palindrome, Search)..."
            />

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', minWidth: '150px' }}
                aria-label="Filter by Difficulty"
              >
                <option value="All">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </section>

          {/* DSA Topic Filter Tabs */}
          <div className="category-tabs" role="tablist" aria-label="DSA Topic Filters">
            {dsaTopics.map((topic) => (
              <button
                key={topic}
                type="button"
                className={`category-tab ${selectedTopic === topic ? 'active' : ''}`}
                onClick={() => setSelectedTopic(topic)}
                role="tab"
                aria-selected={selectedTopic === topic}
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Results Counter */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            <span>
              Showing <strong>{filteredProblems.length}</strong> of {codingProblems.length} problems
              {selectedTopic !== 'All Topics' && ` in ${selectedTopic}`}
            </span>
            {(selectedTopic !== 'All Topics' || selectedDifficulty !== 'All' || searchQuery) && (
              <button
                type="button"
                className="btn-secondary"
                style={{ padding: '0.25rem 0.65rem', fontSize: '0.78rem' }}
                onClick={() => {
                  setSelectedTopic('All Topics');
                  setSelectedDifficulty('All');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Problems List */}
          {filteredProblems.length === 0 ? (
            <div className="glass-card" style={{ padding: '3.5rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔍</div>
              <h3>No problems found matching your criteria</h3>
              <p style={{ marginTop: '0.5rem' }}>Try clearing your search query or selecting "All Topics".</p>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setSelectedTopic('All Topics');
                  setSelectedDifficulty('All');
                  setSearchQuery('');
                }}
                style={{ marginTop: '1.25rem' }}
              >
                View All Problems
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {filteredProblems.map((prob) => {
                const diffClass =
                  prob.difficulty === 'Easy'
                    ? 'badge-beginner'
                    : prob.difficulty === 'Medium'
                    ? 'badge-intermediate'
                    : 'badge-advanced';

                const isSolved = solvedList.includes(prob.id) || solvedList.includes(prob.slug);

                return (
                  <div key={prob.id} className="problem-row">
                    <div className="problem-left">
                      <span style={{ fontSize: '1.3rem' }}>⚡</span>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <span className="problem-title">{prob.title}</span>
                          {isSolved && (
                            <span style={{ fontSize: '0.75rem', color: '#16a34a', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '0.15rem 0.55rem', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
                              ✓ Solved
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                          {prob.topic} • Acceptance: {prob.acceptance}
                        </div>
                      </div>
                    </div>

                    <div className="problem-meta">
                      <span className={`badge ${diffClass}`}>{prob.difficulty}</span>
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={() => handleOpenProblem(prob)}
                        style={{ padding: '0.45rem 1.1rem', fontSize: '0.85rem' }}
                      >
                        Solve Problem →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : (
        /* Code Library & Templates Section */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div>
            <h3 style={{ marginBottom: '1rem', color: 'var(--accent-secondary)' }}>
              ⚡ Core Algorithm Implementations
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {codeLibrary.algorithms.map((item, idx) => (
                <div key={idx} className="glass-card" style={{ padding: '1.5rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.75rem',
                    }}
                  >
                    <h4 style={{ fontSize: '1.1rem', margin: 0 }}>{item.title}</h4>
                    <span className="badge badge-accent">{item.category}</span>
                  </div>
                  <pre className="code-snippet-box">{item.code}</pre>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => handleCopyCode(item.code)}
                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.85rem' }}
                  >
                    {copiedCode ? '✓ Copied!' : 'Copy Algorithm Snippet 📋'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom: '1rem', color: 'var(--accent-secondary)' }}>
              🛠️ High-Frequency Interview Templates
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {codeLibrary.templates.map((item, idx) => (
                <div key={idx} className="glass-card" style={{ padding: '1.5rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.75rem',
                    }}
                  >
                    <h4 style={{ fontSize: '1.1rem', margin: 0 }}>{item.title}</h4>
                    <span className="badge badge-intermediate">{item.category}</span>
                  </div>
                  <pre className="code-snippet-box">{item.code}</pre>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => handleCopyCode(item.code)}
                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.85rem' }}
                  >
                    {copiedCode ? '✓ Copied!' : 'Copy Template Snippet 📋'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodingHub;
