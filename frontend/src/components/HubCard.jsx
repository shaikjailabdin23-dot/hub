import React from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';

const getHubIconEmoji = (slug) => {
  switch (slug) {
    case 'technical':
      return '💻';
    case 'skills':
      return '✨';
    case 'coding':
      return '⚡';
    case 'career':
      return '🎯';
    case 'project':
      return '🚀';
    default:
      return '📚';
  }
};

const HubCard = ({ hub, progress = 0 }) => {
  const iconEmoji = getHubIconEmoji(hub.slug);
  const targetRoute = `/${hub.slug}-hub`;

  return (
    <div className="hub-card">
      <div className="hub-card-top">
        <div
          className="hub-card-icon"
          style={{
            background: hub.gradient || 'var(--accent-gradient)',
            boxShadow: `0 8px 20px ${hub.color ? hub.color + '44' : 'rgba(108, 99, 255, 0.4)'}`,
          }}
        >
          {iconEmoji}
        </div>
        <span className="hub-card-badge">{hub.category || 'Curriculum'}</span>
      </div>

      <h3 className="hub-card-title">{hub.name}</h3>
      <p className="hub-card-desc">{hub.description}</p>

      <div className="hub-card-stats">
        <span>{hub.topicsCount || 10}+ Topics</span>
        <span style={{ fontWeight: 700, color: hub.color || 'var(--accent-secondary)' }}>
          {progress}% Complete
        </span>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <ProgressBar
          value={progress}
          height="6px"
          gradient={hub.gradient || 'var(--accent-gradient)'}
        />
      </div>

      <Link to={targetRoute} className="hub-card-btn">
        Explore Hub <span>→</span>
      </Link>
    </div>
  );
};

export default HubCard;
