import React, { useState } from 'react';
import { skillCategories, skillsList } from '../data/skillsData';
import ProgressBar from '../components/ProgressBar';
import SearchBar from '../components/SearchBar';

const SkillsHub = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(null);

  const filteredSkills = skillsList.filter((s) => {
    const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="skills-hub-page animate-fade-in">
      {/* Hero Banner */}
      <section className="hub-hero">
        <div className="hub-hero-header">
          <div className="hub-hero-icon" style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #0284c7 100%)' }}>
            ✨
          </div>
          <div>
            <h1 className="hub-hero-title">Skills Hub</h1>
            <p className="hub-hero-desc">
              Bridge the gap between raw coding logic and career success. Master high-impact soft skills,
              first-principles thinking, executive time management, and professional workplace communication.
            </p>
          </div>
        </div>

        <div className="hub-stats-row">
          <div className="hub-stat-card">
            <span className="hub-stat-num">{skillsList.length}</span>
            <span className="hub-stat-text">Core Skills</span>
          </div>
          <div className="hub-stat-card">
            <span className="hub-stat-num">{skillCategories.length - 1}</span>
            <span className="hub-stat-text">Skill Domains</span>
          </div>
          <div className="hub-stat-card">
            <span className="hub-stat-num">3-Tier</span>
            <span className="hub-stat-text">Proficiency Paths</span>
          </div>
          <div className="hub-stat-card">
            <span className="hub-stat-num">Daily</span>
            <span className="hub-stat-text">Habit Drills</span>
          </div>
        </div>
      </section>

      {/* Filter and Search */}
      <section className="filter-search-bar">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search skills, e.g. Communication, Problem Solving, Resume..."
        />
        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filteredSkills.length}</strong> competencies
        </div>
      </section>

      {/* Category Tabs */}
      <div className="category-tabs" role="tablist">
        {skillCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="topics-grid">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className="glass-card"
            style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span className="badge badge-accent">{skill.category}</span>
              <span className="badge badge-intermediate">{skill.level}</span>
            </div>

            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              {skill.title}
            </h3>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', flexGrow: 1 }}>
              {skill.description}
            </p>

            <div style={{ marginBottom: '1.25rem' }}>
              <ProgressBar
                value={skill.progress}
                height="6px"
                gradient="linear-gradient(135deg, #00d4ff 0%, #0284c7 100%)"
                showLabel={true}
                label="Mastery Level"
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                className="btn-primary"
                onClick={() => setSelectedSkill(skill)}
                style={{ flex: 1, padding: '0.65rem' }}
              >
                View Skill Guide 📖
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <div className="modal-overlay" onClick={() => setSelectedSkill(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="badge badge-accent" style={{ marginBottom: '0.5rem' }}>
                  {selectedSkill.category}
                </span>
                <h2 style={{ fontSize: '1.6rem' }}>{selectedSkill.title}</h2>
              </div>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setSelectedSkill(null)}
                style={{ fontSize: '1.3rem' }}
              >
                ✕
              </button>
            </div>

            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h4 style={{ color: 'var(--accent)', marginBottom: '0.4rem' }}>
                  💡 Why Is It Important?
                </h4>
                <p style={{ fontSize: '0.95rem' }}>{selectedSkill.importance}</p>
              </div>

              <div>
                <h4 style={{ color: 'var(--accent)', marginBottom: '0.4rem' }}>
                  🏢 Where Is It Used In The Industry?
                </h4>
                <p style={{ fontSize: '0.95rem' }}>{selectedSkill.whereUsed}</p>
              </div>

              <div
                style={{
                  background: '#fffbeb',
                  border: '1px solid #fef3c7',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                }}
              >
                <h4 style={{ color: '#b45309', marginBottom: '0.4rem' }}>
                  🌱 Beginner Explanation
                </h4>
                <p style={{ fontSize: '0.95rem', color: '#78350f' }}>{selectedSkill.beginnerExplanation}</p>
              </div>

              <div>
                <h4 style={{ color: 'var(--accent)', marginBottom: '0.4rem' }}>
                  🛠️ Development Method
                </h4>
                <p style={{ fontSize: '0.95rem' }}>{selectedSkill.developmentMethod}</p>
              </div>

              <div>
                <h4 style={{ color: 'var(--accent)', marginBottom: '0.4rem' }}>
                  🎯 Practical Exercises
                </h4>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                  {selectedSkill.practicalExercises?.map((ex, idx) => (
                    <li key={idx} style={{ marginBottom: '0.4rem' }}>
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 style={{ color: 'var(--accent)', marginBottom: '0.4rem' }}>
                  📅 Daily Habit Drill
                </h4>
                <p style={{ fontSize: '0.95rem' }}>{selectedSkill.dailyPractice}</p>
              </div>

              <div
                style={{
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                }}
              >
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  📊 Proficiency Progression
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <div><strong style={{ color: 'var(--text-primary)' }}>Beginner:</strong> {selectedSkill.levels?.beginner}</div>
                  <div><strong style={{ color: 'var(--text-primary)' }}>Intermediate:</strong> {selectedSkill.levels?.intermediate}</div>
                  <div><strong style={{ color: 'var(--text-primary)' }}>Advanced:</strong> {selectedSkill.levels?.advanced}</div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setSelectedSkill(null)}
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsHub;
