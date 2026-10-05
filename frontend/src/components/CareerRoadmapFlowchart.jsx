import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { careerFlowchartData } from '../data/careerFlowchartData';
import '../styles/careerFlowchart.css';

const CareerRoadmapFlowchart = ({
  selectedCareer = 'Software Developer',
  completedSkills = [],
  onToggleSkill,
  onOpenAiTutor,
}) => {
  const [activeModalNode, setActiveModalNode] = useState(null);
  const [activeCheckpoint, setActiveCheckpoint] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const roleData = careerFlowchartData[selectedCareer] || careerFlowchartData['Software Developer'];

  const handleNodeClick = (topic) => {
    setActiveModalNode(topic);
    setActiveCheckpoint(null);
  };

  const handleCheckpointClick = (cp) => {
    setActiveCheckpoint(cp);
    setActiveModalNode(null);
  };

  const closeModal = () => {
    setActiveModalNode(null);
    setActiveCheckpoint(null);
  };

  // Check if topic is completed
  const isTopicDone = (topicName) => {
    return completedSkills.some(
      (s) => s.toLowerCase() === topicName.toLowerCase() || s.toLowerCase().includes(topicName.toLowerCase())
    );
  };

  return (
    <div className="flowchart-wrapper animate-fade-in">
      {/* Top Header & Legend Bar */}
      <div className="flowchart-header-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <span style={{ fontSize: '2rem' }}>{roleData.icon}</span>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {roleData.title} Roadmap
              </h2>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  background: 'var(--accent-light)',
                  color: 'var(--accent)',
                  padding: '0.15rem 0.6rem',
                  borderRadius: '999px',
                  border: '1px solid var(--accent-border)',
                }}
              >
                {roleData.category}
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '0.2rem 0 0' }}>
              {roleData.description}
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flowchart-legend">
          <div className="legend-item">
            <span className="legend-box-topic" />
            <span>Key topics to learn</span>
          </div>
          <div className="legend-item">
            <span className="legend-box-checkpoint" />
            <span>Project ideas and suggestions</span>
          </div>
        </div>
      </div>

      {/* Interactive Canvas */}
      <div className="flowchart-canvas">
        {/* Floating Side Tools */}
        <div className="flowchart-side-tools">
          <button
            type="button"
            className="flowchart-tool-btn"
            title="Ask AI Career Tutor"
            onClick={() => onOpenAiTutor?.(selectedCareer)}
          >
            🤖
          </button>
          <button
            type="button"
            className="flowchart-tool-btn"
            title="Interactive Coding Hub"
            onClick={() => window.open('/coding-hub', '_self')}
          >
            💻
          </button>
          <button
            type="button"
            className="flowchart-tool-btn"
            title="Developer Documentation"
            onClick={() => window.open('/technical-hub', '_self')}
          >
            📚
          </button>
        </div>

        {/* Target Audience Banner (Top Center) */}
        {roleData.targetAudience && (
          <div className="flowchart-audience-banner">
            <p>{roleData.targetAudience}</p>
          </div>
        )}

        {/* Flowchart Row Stages */}
        <div className="flowchart-path-container">
          {roleData.rows.map((row, rowIdx) => {
            const isLastRow = rowIdx === roleData.rows.length - 1;
            const isEvenRow = rowIdx % 2 === 0;

            return (
              <div key={row.rowNumber || rowIdx} className="flowchart-row">
                {/* Yellow Topic Nodes Track */}
                <div className="flowchart-topic-track">
                  {row.topics.map((topic, topicIdx) => {
                    const isDone = isTopicDone(topic.name);
                    const isLastTopicInRow = topicIdx === row.topics.length - 1;

                    return (
                      <React.Fragment key={topic.id || topicIdx}>
                        <button
                          type="button"
                          className={`flowchart-topic-pill ${isDone ? 'is-completed' : ''}`}
                          onClick={() => handleNodeClick(topic)}
                          title="Click to view details & resources"
                        >
                          {isDone ? '✓ ' : ''}{topic.name}
                        </button>
                        {!isLastTopicInRow && <div className="flowchart-connector-line" />}
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Vertical Connectors & Checkpoint Nodes */}
                {row.checkpoints && row.checkpoints.length > 0 && (
                  <div className="flowchart-checkpoints-row">
                    {row.checkpoints.map((cp, cpIdx) => (
                      <div key={cp.id || cpIdx} className="flowchart-checkpoint-wrapper">
                        <div className="flowchart-vertical-dash" />
                        <button
                          type="button"
                          className="flowchart-checkpoint-pill"
                          onClick={() => handleCheckpointClick(cp)}
                        >
                          📌 {cp.title}
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Callout Advice Note */}
                {row.note && (
                  <div className="flowchart-callout-note">
                    <strong>💡 Advice: </strong> {row.note}
                  </div>
                )}

                {/* Pathway Snake Loop to Next Row */}
                {!isLastRow && (
                  <div
                    className={
                      isEvenRow ? 'flowchart-snake-connector' : 'flowchart-snake-connector-left'
                    }
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Floating AI Tutor Callout Pill */}
        <div
          className="flowchart-ai-tutor-pill"
          onClick={() => onOpenAiTutor?.(selectedCareer)}
        >
          <span>✨ AI Tutor</span>
          <span>Have a question about this roadmap? Click here</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TOPIC NODE DETAIL MODAL */}
      {/* ========================================================================= */}
      {activeModalNode && (
        <div className="flowchart-modal-overlay" onClick={closeModal}>
          <div className="flowchart-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="flowchart-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span
                  style={{
                    width: '18px',
                    height: '18px',
                    backgroundColor: '#fde047',
                    border: '2px solid #0f172a',
                    borderRadius: '4px',
                    display: 'inline-block',
                  }}
                />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  {activeModalNode.name}
                </h3>
              </div>
              <button type="button" className="flowchart-modal-close" onClick={closeModal}>
                ✕
              </button>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                Technology & Focus
              </div>
              <div style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--accent)', marginTop: '0.2rem' }}>
                {activeModalNode.tech || 'Core Engineering Fundamental'}
              </div>
            </div>

            <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Mastering <strong>{activeModalNode.name}</strong> builds the essential competencies required for industry {selectedCareer} roles. Follow the guided interactive documentation to reinforce your knowledge.
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className={`btn-secondary`}
                style={{
                  fontSize: '0.85rem',
                  padding: '0.55rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: isTopicDone(activeModalNode.name) ? 'var(--success-bg)' : 'var(--surface)',
                  color: isTopicDone(activeModalNode.name) ? 'var(--success)' : 'var(--text-primary)',
                  border: isTopicDone(activeModalNode.name) ? '1.5px solid var(--success)' : '1px solid var(--border)',
                }}
                onClick={() => {
                  onToggleSkill?.(activeModalNode.name);
                }}
              >
                {isTopicDone(activeModalNode.name) ? '✓ Mark as Incomplete' : '✓ Mark as Completed'}
              </button>

              {activeModalNode.docsUrl && (
                <Link
                  to={activeModalNode.docsUrl}
                  className="btn-primary"
                  style={{ fontSize: '0.85rem', padding: '0.55rem 1.25rem' }}
                  onClick={closeModal}
                >
                  Open Study Guide →
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CHECKPOINT DETAIL MODAL */}
      {/* ========================================================================= */}
      {activeCheckpoint && (
        <div className="flowchart-modal-overlay" onClick={closeModal}>
          <div className="flowchart-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="flowchart-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '1.2rem' }}>📌</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  {activeCheckpoint.title}
                </h3>
              </div>
              <button type="button" className="flowchart-modal-close" onClick={closeModal}>
                ✕
              </button>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                Project Deliverable
              </div>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.35rem', lineHeight: '1.6' }}>
                {activeCheckpoint.desc}
              </div>
            </div>

            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.82rem', color: '#166534', fontWeight: 600 }}>
                💡 Portfolio Tip: Push this deliverable to GitHub with clean commit history, unit tests, and architecture diagrams.
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button
                type="button"
                className="btn-secondary"
                style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                onClick={closeModal}
              >
                Close
              </button>
              <Link
                to="/coding-hub"
                className="btn-primary"
                style={{ fontSize: '0.85rem', padding: '0.5rem 1.15rem' }}
                onClick={closeModal}
              >
                Build in Coding Hub →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerRoadmapFlowchart;
