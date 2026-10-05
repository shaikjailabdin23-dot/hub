import React from 'react';

const ProjectCard = ({ project, onEdit, onDelete, canEdit = false, onOpenFullFrame }) => {
  return (
    <div className="project-card">
      {project.image && (
        <div
          style={{
            width: '100%',
            height: '140px',
            overflow: 'hidden',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '0.85rem',
            background: 'rgba(0, 0, 0, 0.3)',
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.parentElement.style.display = 'none';
            }}
          />
        </div>
      )}

      <div className="project-card-header">
        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="badge badge-accent">{project.category || 'Web Projects'}</span>
          {project.status && (
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '0.12rem 0.5rem',
                borderRadius: '999px',
                background:
                  project.status === 'Production Ready'
                    ? 'rgba(16, 185, 129, 0.15)'
                    : project.status === 'Completed'
                    ? 'rgba(59, 130, 246, 0.15)'
                    : 'rgba(245, 158, 11, 0.15)',
                color:
                  project.status === 'Production Ready'
                    ? '#34d399'
                    : project.status === 'Completed'
                    ? '#60a5fa'
                    : '#fbbf24',
                border:
                  project.status === 'Production Ready'
                    ? '1px solid rgba(16, 185, 129, 0.3)'
                    : project.status === 'Completed'
                    ? '1px solid rgba(59, 130, 246, 0.3)'
                    : '1px solid rgba(245, 158, 11, 0.3)',
              }}
            >
              {project.status === 'Production Ready' ? '🟢 ' : project.status === 'Completed' ? '✓ ' : '⚡ '}
              {project.status}
            </span>
          )}
        </div>

        {canEdit && (
          <div className="project-crud-actions">
            {onEdit && (
              <button
                type="button"
                className="icon-btn"
                onClick={() => onEdit(project)}
                title="Edit Project Details"
                aria-label="Edit Project"
              >
                ✏️
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                className="icon-btn delete"
                onClick={() => onDelete(project._id)}
                title="Delete Project from Platform"
                aria-label="Delete Project"
              >
                🗑️
              </button>
            )}
          </div>
        )}
      </div>

      <h3 className="project-card-title">{project.title}</h3>

      {project.problemStatement && (
        <div
          className="project-problem-snippet"
          style={{
            background: '#fdf2f8',
            borderLeft: '3px solid #db2777',
            padding: '0.65rem 0.85rem',
            borderRadius: '0 8px 8px 0',
            marginBottom: '0.85rem',
            fontSize: '0.85rem',
            lineHeight: '1.5',
            color: '#1e293b',
          }}
        >
          <span style={{ color: '#be185d', fontWeight: 700, display: 'inline-block', marginRight: '0.35rem' }}>
            🎯 Problem Statement:
          </span>
          {project.problemStatement}
        </div>
      )}

      <p className="project-card-desc">{project.description}</p>

      {project.technologies && project.technologies.length > 0 && (
        <div className="project-tech-tags">
          {project.technologies.map((tech, index) => (
            <span key={index} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="project-card-actions">
        <div className="project-links" style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {onOpenFullFrame && (
            <button
              type="button"
              className="project-link-btn"
              onClick={() => onOpenFullFrame(project)}
              style={{
                borderColor: '#bfdbfe',
                color: '#1d4ed8',
                background: '#eff6ff',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                cursor: 'pointer',
              }}
              title="Open Project in Full Frame Interactive Viewer"
            >
              <span>Full Frame</span>
              <span style={{ fontSize: '0.9rem' }}>⛶</span>
            </button>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-btn"
              style={{
                borderColor: '#bbf7d0',
                color: '#15803d',
                background: '#f0fdf4',
                fontWeight: 700,
              }}
              title="Open Live Deployment in New Tab"
            >
              <span>Live Demo</span> 🚀
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-btn"
              style={{
                borderColor: 'var(--border-strong)',
                color: 'var(--text-primary)',
                background: '#ffffff',
                fontWeight: 600,
              }}
              title="Open GitHub Repository"
            >
              <span>GitHub</span> ↗
            </a>
          )}
        </div>

        {project.role && (
          <span
            style={{
              fontSize: '0.78rem',
              color: '#c4b5fd',
              background: 'rgba(139, 92, 246, 0.15)',
              padding: '0.25rem 0.6rem',
              borderRadius: '999px',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              fontWeight: 600,
            }}
          >
            Role: {project.role}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
