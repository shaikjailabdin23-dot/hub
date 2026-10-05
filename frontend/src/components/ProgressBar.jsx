import React from 'react';

const ProgressBar = ({
  value = 0,
  max = 100,
  height = '8px',
  color = 'var(--accent)',
  gradient = 'var(--accent-gradient)',
  showLabel = false,
  label = '',
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className={`progress-bar-wrapper ${className}`} style={{ width: '100%' }}>
      {showLabel && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.4rem',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
          }}
        >
          <span>{label}</span>
          <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{percentage}%</span>
        </div>
      )}
      <div
        className="progress-track-linear"
        style={{
          height,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
        }}
      >
        <div
          className="progress-fill-linear"
          style={{
            width: `${percentage}%`,
            height: '100%',
            background: gradient || color,
            borderRadius: 'var(--radius-full)',
            transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
