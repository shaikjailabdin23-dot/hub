import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import topicService from '../services/topicService';
import { useProgress } from '../hooks/useProgress';

const Topic = () => {
  const { topicSlug } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAnswer, setShowAnswer] = useState({});
  const [copiedCode, setCopiedCode] = useState(false);

  const { progress, markTopicComplete } = useProgress();

  useEffect(() => {
    setLoading(true);
    setError(null);
    topicService
      .getTopicById(topicSlug)
      .then((data) => {
        setTopic(data);
      })
      .catch((err) => {
        setError('Topic not found or failed to load.');
      })
      .finally(() => setLoading(false));
  }, [topicSlug]);

  const isCompleted = progress?.completedTopicsList?.includes(topicSlug);

  const handleMarkComplete = async () => {
    await markTopicComplete(topicSlug, topic?.hubSlug || 'technical');
  };

  const handleCopyCode = (codeStr) => {
    navigator.clipboard.writeText(codeStr);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const toggleAnswer = (idx) => {
    setShowAnswer((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading topic lesson...</p>
      </div>
    );
  }

  if (error || !topic) {
    return (
      <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
        <h2>Topic Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', margin: '1rem 0' }}>
          We couldn't locate the curriculum module for "{topicSlug}".
        </p>
        <Link to="/technical-hub" className="btn-primary">
          Back to Technical Hub
        </Link>
      </div>
    );
  }

  const diffClass =
    topic.difficulty === 'Beginner'
      ? 'badge-beginner'
      : topic.difficulty === 'Intermediate'
      ? 'badge-intermediate'
      : 'badge-advanced';

  return (
    <div className="page-container topic-reader-page animate-fade-in">
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.88rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
        <Link to="/dashboard">Dashboard</Link>
        <span>/</span>
        <Link to="/technical-hub">Technical Hub</Link>
        <span>/</span>
        <span style={{ color: 'var(--text-primary)' }}>{topic.title}</span>
      </div>

      <div className="topic-page-layout">
        {/* Main Lesson Content */}
        <div className="topic-reader-main">
          {/* Header Card */}
          <div className="glass-card topic-header-card">
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span className={`badge ${diffClass}`}>{topic.difficulty || 'Intermediate'}</span>
              <span className="badge badge-accent">{topic.category}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                ⏱️ {topic.estimatedTime || '20 mins'}
              </span>
            </div>

            <h1 className="topic-header-title">{topic.title}</h1>
            <p className="topic-header-desc">
              {topic.description}
            </p>
          </div>

          {/* Section 1: What Is It & Core Definition */}
          <div className="topic-section-card">
            <h3>📖 1. What Is It & Core Definition</h3>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.75, color: 'var(--text-primary)' }}>
              {topic.whatIsIt || topic.description}
            </p>
          </div>

          {/* Section 2: Under-the-Hood Mechanics & Internal Architecture */}
          {topic.deepDive && (
            <div
              className="topic-section-card"
              style={{
                background: '#f8fafc',
                border: '1px solid #bfdbfe',
                borderLeft: '4px solid var(--accent)',
              }}
            >
              <h3 style={{ color: 'var(--accent)' }}>🔬 2. Under-the-Hood Mechanics & Architecture</h3>
              <div style={{ fontSize: '0.96rem', lineHeight: 1.75, color: 'var(--text-primary)', whiteSpace: 'pre-line' }}>
                {topic.deepDive}
              </div>
            </div>
          )}

          {/* Section 3: Memory Allocation & Lifecycle */}
          {topic.memoryAllocation && (
            <div
              className="topic-section-card"
              style={{
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
              }}
            >
              <h3 style={{ color: '#1d4ed8' }}>🧠 3. How Memory Allocates & Executes</h3>
              <div style={{ fontSize: '0.96rem', lineHeight: 1.75, color: '#1e293b', whiteSpace: 'pre-line' }}>
                {topic.memoryAllocation}
              </div>
            </div>
          )}

          {/* Section 4: Types, Classifications & Governing Rules */}
          {topic.typesAndRules && (
            <div className="topic-section-card">
              <h3>📋 4. Types, Classifications & Governing Rules</h3>
              {typeof topic.typesAndRules === 'string' ? (
                <div style={{ fontSize: '0.96rem', lineHeight: 1.75, color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>
                  {topic.typesAndRules}
                </div>
              ) : Array.isArray(topic.typesAndRules) ? (
                <ul style={{ paddingLeft: '1.5rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                  {topic.typesAndRules.map((rule, idx) => (
                    <li key={idx} style={{ marginBottom: '0.5rem' }}>
                      {rule}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          )}

          {/* Section 5: Simple Everyday Analogy */}
          <div
            className="topic-section-card"
            style={{
              background: '#fffbeb',
              border: '1px solid #fef3c7',
            }}
          >
            <h3 style={{ color: '#b45309' }}>💡 5. Simple Everyday Analogy</h3>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.75, color: '#78350f' }}>
              {topic.simpleExplanation || 'Think of this concept like a standard recipe in a kitchen.'}
            </p>
          </div>

          {/* Section 6: Why Learn It? */}
          <div className="topic-section-card">
            <h3>🎯 6. Why Master This in Engineering?</h3>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.75, color: 'var(--text-primary)' }}>
              {topic.whyLearnIt || 'Understanding this concept provides essential engineering foundation.'}
            </p>
          </div>

          {/* Section 7: Real-World Applications & Industry Use */}
          <div className="topic-section-card">
            <h3>🌍 7. Real-World Applications & Industry Use</h3>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Production Case Study: </strong>
              <span style={{ color: 'var(--text-secondary)' }}>{topic.realWorldExample}</span>
            </div>
            <div>
              <strong>Where Used at Scale: </strong>
              <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{topic.whereUsed}</span>
            </div>
          </div>

          {/* Section 8: Key Points & Advantages */}
          <div className="topic-section-card">
            <h3>⭐ 8. Key Architectural Principles & Advantages</h3>
            {topic.keyPoints && topic.keyPoints.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Core Concepts:
                </h4>
                <ul style={{ paddingLeft: '1.5rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                  {topic.keyPoints.map((pt, idx) => (
                    <li key={idx}>{pt}</li>
                  ))}
                </ul>
              </div>
            )}

            {topic.advantages && topic.advantages.length > 0 && (
              <div>
                <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Key Advantages:
                </h4>
                <ul style={{ paddingLeft: '1.5rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                  {topic.advantages.map((adv, idx) => (
                    <li key={idx}>{adv}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Section 9: Common Pitfalls & Anti-Patterns */}
          {topic.commonMistakes && topic.commonMistakes.length > 0 && (
            <div
              className="topic-section-card"
              style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
              }}
            >
              <h3 style={{ color: '#b91c1c' }}>⚠️ 9. Common Pitfalls & Anti-Patterns</h3>
              <ul style={{ paddingLeft: '1.5rem', lineHeight: 1.8, color: '#991b1b' }}>
                {topic.commonMistakes.map((mistake, idx) => (
                  <li key={idx} style={{ marginBottom: '0.4rem' }}>
                    {mistake}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Section 10: Code Example */}
          {topic.codeExample && (
            <div className="topic-section-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 style={{ margin: 0 }}>💻 10. Implementation & Code Walkthrough</h3>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => handleCopyCode(topic.codeExample.code)}
                  style={{ padding: '0.35rem 0.8rem', fontSize: '0.82rem' }}
                >
                  {copiedCode ? '✓ Copied' : 'Copy Code'}
                </button>
              </div>

              <pre className="code-snippet-box">{topic.codeExample.code}</pre>
              <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', marginTop: '0.85rem', lineHeight: 1.6 }}>
                <strong>Explanation: </strong> {topic.codeExample.explanation}
              </p>
            </div>
          )}

          {/* Section 11: Practice Questions */}
          {topic.practiceQuestions && topic.practiceQuestions.length > 0 && (
            <div className="topic-section-card">
              <h3>📝 11. Practice & Interview Questions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {topic.practiceQuestions.map((pq, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#ffffff',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.25rem',
                      boxShadow: 'var(--card-shadow)',
                    }}
                  >
                    <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                      Q{idx + 1}: {pq.question}
                    </div>
                    {pq.hint && (
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                        💡 Hint: {pq.hint}
                      </div>
                    )}
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => toggleAnswer(idx)}
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.82rem' }}
                    >
                      {showAnswer[idx] ? 'Hide Answer' : 'Reveal Answer'}
                    </button>
                    {showAnswer[idx] && (
                      <div
                        style={{
                          marginTop: '0.75rem',
                          padding: '0.75rem 1rem',
                          background: '#f0fdf4',
                          borderLeft: '3px solid var(--success)',
                          fontSize: '0.92rem',
                          color: '#166534',
                          borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                          lineHeight: 1.6,
                        }}
                      >
                        {pq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky Action Sidebar */}
        <aside>
          <div className="topic-sidebar-widget">
            <h4 style={{ fontSize: '1.1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              Lesson Progress
            </h4>

            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                Status:
              </div>
              {isCompleted ? (
                <div style={{ color: 'var(--success)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  ✓ Completed Lesson
                </div>
              ) : (
                <div style={{ color: '#d97706', fontWeight: 600 }}>In Progress</div>
              )}
            </div>

            <button
              type="button"
              className={isCompleted ? 'btn-secondary' : 'btn-primary'}
              onClick={handleMarkComplete}
              style={{ width: '100%' }}
            >
              {isCompleted ? '✓ Marked as Completed' : 'Mark as Complete ✓'}
            </button>

            <Link
              to={`/quiz/${topic.slug || topicSlug}`}
              className="btn-primary"
              style={{
                width: '100%',
                background: 'var(--accent-gradient)',
              }}
            >
              Take Topic Quiz ⚡
            </Link>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />

            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>
                Related Curricula:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {topic.relatedTopics?.map((rel, idx) => (
                  <Link
                    key={idx}
                    to={`/topic/${rel}`}
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--accent-secondary)',
                      padding: '0.25rem 0',
                    }}
                  >
                    • {rel.replace(/-/g, ' ')}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Topic;
