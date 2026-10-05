import React from 'react';
import { Link } from 'react-router-dom';

const TopicCard = ({ topic, hubSlug = 'technical' }) => {
  const diffClass =
    topic.difficulty === 'Beginner'
      ? 'badge-beginner'
      : topic.difficulty === 'Intermediate'
      ? 'badge-intermediate'
      : 'badge-advanced';

  return (
    <div className="topic-card">
      <div className="topic-card-header">
        <span className={`badge ${diffClass}`}>{topic.difficulty || 'All Levels'}</span>
        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
          ⏱️ {topic.estimatedTime || '20 mins'}
        </span>
      </div>

      <h4 className="topic-card-title">{topic.title}</h4>
      <p className="topic-card-desc">{topic.description}</p>

      <div className="topic-card-footer">
        <span style={{ color: 'var(--accent-secondary)', fontSize: '0.84rem', fontWeight: 600 }}>
          {topic.category}
        </span>
        <Link
          to={`/topic/${topic.slug || topic.id}`}
          className="btn-primary"
          style={{
            padding: '0.45rem 1rem',
            fontSize: '0.84rem',
            borderRadius: 'var(--radius-sm)',
            textDecoration: 'none',
          }}
          aria-label={`Start lesson on ${topic.title}`}
        >
          {topic.isCompleted ? '✓ Review Lesson' : 'Start Lesson →'}
        </Link>
      </div>
    </div>
  );
};

export default TopicCard;
