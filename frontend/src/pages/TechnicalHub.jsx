import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { technicalCategories, technicalTopics } from '../data/technicalData';
import topicService from '../services/topicService';
import TopicCard from '../components/TopicCard';
import SearchBar from '../components/SearchBar';
import { useProgress } from '../hooks/useProgress';

const TechnicalHub = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [topics, setTopics] = useState(technicalTopics);
  const [loading, setLoading] = useState(false);
  const { progress } = useProgress();

  // Ensure full 14 topics are available and filtered according to category and search
  useEffect(() => {
    setLoading(true);
    topicService
      .getTopics({
        hub: 'technical',
        category: activeCategory,
        search: searchQuery,
      })
      .then((data) => {
        // If data returns fewer topics than local, make sure we filter local technicalTopics accurately
        if (data && data.length > 0 && activeCategory === 'All' && !searchQuery) {
          // If all are requested, prefer full dataset
          setTopics(data.length >= technicalTopics.length ? data : technicalTopics);
        } else if (data && data.length > 0) {
          setTopics(data);
        } else {
          // Fallback filter on local 14 topics
          let filtered = [...technicalTopics];
          if (activeCategory !== 'All') {
            if (activeCategory === 'DSA') {
              filtered = filtered.filter(
                (t) => t.category === 'DSA' || t.category === 'Data Structures & Algorithms'
              );
            } else if (activeCategory === 'AI & ML') {
              filtered = filtered.filter(
                (t) => t.category === 'AI & ML' || t.category === 'AI & Machine Learning'
              );
            } else if (activeCategory === 'Software Engineering') {
              filtered = filtered.filter(
                (t) =>
                  t.category.includes('Software') ||
                  t.category.includes('Programming') ||
                  t.category.includes('Cloud') ||
                  t.category.includes('Cybersecurity')
              );
            } else {
              filtered = filtered.filter(
                (t) => t.category && t.category.toLowerCase().includes(activeCategory.toLowerCase())
              );
            }
          }
          if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(
              (t) =>
                t.title.toLowerCase().includes(q) ||
                t.description.toLowerCase().includes(q) ||
                (t.category && t.category.toLowerCase().includes(q))
            );
          }
          setTopics(filtered);
        }
      })
      .catch(() => {
        setTopics(technicalTopics);
      })
      .finally(() => setLoading(false));
  }, [activeCategory, searchQuery]);

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    if (val) {
      searchParams.set('search', val);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  const completedList = progress?.completedTopicsList || [];
  const completedCount = completedList.length > 0 ? completedList.length : 2;

  return (
    <div className="page-container technical-hub-page animate-fade-in">
      {/* Full-Frame Dashboard Hero Banner */}
      <section className="hub-hero">
        <div className="hub-hero-header">
          <div className="hub-hero-icon" style={{ background: 'var(--accent-gradient)' }}>
            💻
          </div>
          <div className="hub-hero-text-block">
            <span className="hub-hero-badge">ENGINEERING CURRICULUM</span>
            <h1 className="hub-hero-title">Technical Hub</h1>
            <p className="hub-hero-desc">
              Comprehensive computer science and software fundamentals, web development, DSA,
              systems and modern AI.
            </p>
          </div>
        </div>

        {/* Core Statistics Row */}
        <div className="hub-stats-row">
          <div className="hub-stat-card">
            <span className="hub-stat-num">14</span>
            <span className="hub-stat-text">Core Topics</span>
          </div>
          <div className="hub-stat-card">
            <span className="hub-stat-num">9</span>
            <span className="hub-stat-text">CS Domains</span>
          </div>
          <div className="hub-stat-card">
            <span className="hub-stat-num">{completedCount}</span>
            <span className="hub-stat-text">Completed</span>
          </div>
          <div className="hub-stat-card">
            <span className="hub-stat-num">100%</span>
            <span className="hub-stat-text">Free & Open</span>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="filter-search-bar">
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search technical topics, e.g. React, MongoDB, Arrays..."
        />
        <div className="results-count-pill">
          Showing <strong>{topics.length}</strong> of {technicalTopics.length} modules
        </div>
      </section>

      {/* Category Filter Tabs */}
      <div className="category-tabs" role="tablist" aria-label="Technical Categories">
        {technicalCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategoryClick(cat)}
            role="tab"
            aria-selected={activeCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Topic Cards Full-Width Multi-Column Grid */}
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Filtering curricula...</p>
        </div>
      ) : topics.length === 0 ? (
        <div
          className="glass-card"
          style={{ padding: '3.5rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}
        >
          <h3>No topics found matching "{searchQuery}"</h3>
          <p style={{ marginTop: '0.5rem' }}>Try clearing your search query or choosing another category.</p>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setActiveCategory('All');
              setSearchQuery('');
            }}
            style={{ marginTop: '1.25rem' }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="topics-grid">
          {topics.map((topic) => {
            const isCompleted = completedList.includes(topic.slug || topic.id);
            return (
              <TopicCard
                key={topic.id || topic.slug}
                topic={{ ...topic, isCompleted }}
                hubSlug="technical"
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TechnicalHub;
