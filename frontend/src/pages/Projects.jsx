import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import projectService from '../services/projectService';
import ProjectCard from '../components/ProjectCard';
import ProjectFullFrameModal from '../components/ProjectFullFrameModal';
import SearchBar from '../components/SearchBar';
import { projectCategories } from '../data/projectData';
import { useAuth } from '../hooks/useAuth';

const Projects = () => {
  const { user, isAdmin } = useAuth();
  const [searchParams] = useSearchParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Full-Frame Viewing & Editing State
  const [activeFullFrameProject, setActiveFullFrameProject] = useState(null);
  const [isFullFrameEditor, setIsFullFrameEditor] = useState(false);
  const [autoOpenFullFrame, setAutoOpenFullFrame] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    problemStatement: '',
    description: '',
    category: 'Web Projects',
    technologies: '',
    role: 'Lead Developer',
    githubUrl: '',
    demoUrl: '',
    image: '',
    status: 'Production Ready',
    challenges: '',
    solutions: '',
  });

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await projectService.getProjects();
      setProjects(data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (searchParams.get('action') === 'create' && isAdmin) {
      openCreateModal();
    }
  }, [searchParams, isAdmin]);

  const openCreateModal = () => {
    setEditingProjectId(null);
    setFormData({
      title: '',
      problemStatement: '',
      description: '',
      category: 'Web Projects',
      technologies: '',
      role: 'Lead Developer',
      githubUrl: '',
      demoUrl: '',
      image: '',
      status: 'Production Ready',
      challenges: '',
      solutions: '',
    });
    setIsFullFrameEditor(false);
    setIsModalOpen(true);
  };

  const openEditModal = (proj) => {
    setEditingProjectId(proj._id);
    setFormData({
      title: proj.title || '',
      problemStatement: proj.problemStatement || '',
      description: proj.description || '',
      category: proj.category || 'Web Projects',
      technologies: Array.isArray(proj.technologies) ? proj.technologies.join(', ') : '',
      role: proj.role || 'Lead Developer',
      githubUrl: proj.githubUrl || '',
      demoUrl: proj.demoUrl || '',
      image: proj.image || '',
      status: proj.status || 'Production Ready',
      challenges: proj.challenges || '',
      solutions: proj.solutions || '',
    });
    setIsFullFrameEditor(false);
    setIsModalOpen(true);
  };

  const handlePreviewCurrentFullFrame = () => {
    const previewProj = {
      ...formData,
      _id: editingProjectId || 'preview-temp-id',
      technologies: formData.technologies
        ? formData.technologies.split(',').map((t) => t.trim()).filter(Boolean)
        : ['React.js', 'Node.js'],
    };
    setActiveFullFrameProject(previewProj);
  };

  const handleDelete = async (id) => {
    if (!isAdmin) {
      alert('Access restricted: Only administrators can delete projects.');
      return;
    }
    if (window.confirm('Are you sure you want to permanently delete this project from the platform?')) {
      await projectService.deleteProject(id);
      setFeedbackMsg('Project removed successfully.');
      setTimeout(() => setFeedbackMsg(''), 4000);
      loadProjects();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
      alert('Access restricted: Only administrators can save projects.');
      return;
    }
    if (!formData.title || !formData.description) return;

    const payload = {
      ...formData,
      technologies: formData.technologies
        ? formData.technologies.split(',').map((t) => t.trim()).filter(Boolean)
        : ['JavaScript', 'React'],
    };

    let savedProject = null;
    if (editingProjectId) {
      savedProject = await projectService.updateProject(editingProjectId, payload);
      setFeedbackMsg('Project updated successfully! Changes are live in Project Hub.');
    } else {
      savedProject = await projectService.createProject(payload);
      setFeedbackMsg('New project saved and published! Now opening in Full Frame view 🚀');
    }

    setIsModalOpen(false);
    setIsFullFrameEditor(false);
    await loadProjects();

    // Whenever admin inserts or updates a project, open it directly in full frame if requested
    if (autoOpenFullFrame && savedProject) {
      setActiveFullFrameProject(savedProject);
    }

    setTimeout(() => setFeedbackMsg(''), 5000);
  };

  const filtered = projects.filter((p) => {
    const matchesCat = selectedCategory === 'All Categories' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.technologies && p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCat && matchesSearch;
  });

  if (!isAdmin) {
    return (
      <div className="projects-workspace-page animate-fade-in" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div
          className="glass-card"
          style={{
            maxWidth: '560px',
            margin: '0 auto',
            padding: '3rem 2rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
          }}
        >
          <div style={{ fontSize: '3.2rem', marginBottom: '1rem' }}>🔒</div>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
            Administrator Access Required
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.75rem' }}>
            The Project Management Console is reserved exclusively for Platform Administrators. Students have view-only access to published engineering projects in the Project Hub.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/project-hub" className="btn-primary" style={{ padding: '0.75rem 1.6rem' }}>
              Explore Project Hub 📁
            </Link>
            <Link to="/dashboard" className="btn-secondary" style={{ padding: '0.75rem 1.6rem' }}>
              Return to Dashboard 🏠
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="projects-workspace-page animate-fade-in" style={{ paddingBottom: '3rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', padding: '0.2rem 0.6rem', borderRadius: '999px', background: 'rgba(236, 72, 153, 0.15)', color: '#f472b6', fontWeight: 700, marginBottom: '0.5rem', border: '1px solid rgba(236, 72, 153, 0.3)' }}>
            🛡️ Platform Administrator Console
          </div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '0.25rem' }}>Project Management</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Add, update, deploy, and delete engineering capstone projects. All modifications automatically reflect in the Project Hub.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link to="/project-hub" className="btn-secondary">
            View Live in Project Hub 👁️
          </Link>
          <button type="button" className="btn-primary" onClick={openCreateModal}>
            + Add New Project 🚀
          </button>
        </div>
      </div>

      {feedbackMsg && (
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            color: '#34d399',
            padding: '0.85rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>✨ {feedbackMsg}</span>
          <button
            type="button"
            onClick={() => setFeedbackMsg('')}
            style={{ background: 'transparent', border: 'none', color: '#34d399', cursor: 'pointer', fontSize: '1rem' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Search and Filters */}
      <section className="filter-search-bar">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search projects by name, role, or technology..."
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          {projectCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </section>

      {/* Projects Grid */}
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div
          className="glass-card"
          style={{
            padding: '3.5rem 2rem',
            textAlign: 'center',
            borderRadius: 'var(--radius-lg)',
            border: '1px dashed var(--border)',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '0.6rem' }}>No Projects Stored Yet</h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
            As an Administrator, you can add new production-ready capstone projects now. Once saved, they will be visible to all students in the Project Hub.
          </p>
          <button type="button" className="btn-primary" onClick={openCreateModal}>
            + Add New Project 🚀
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card" style={{ padding: '3.5rem', textAlign: 'center' }}>
          <h3>No projects found in this view</h3>
          <p style={{ color: 'var(--text-secondary)', margin: '1rem 0' }}>
            Try adjusting your search query or selected category.
          </p>
        </div>
      ) : (
        <div className="topics-grid">
          {filtered.map((proj) => (
            <ProjectCard
              key={proj._id}
              project={proj}
              onEdit={openEditModal}
              onDelete={handleDelete}
              canEdit={true}
              onOpenFullFrame={(p) => setActiveFullFrameProject(p)}
            />
          ))}
        </div>
      )}

      {/* Project Create/Edit Modal with Full Frame Support */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: isFullFrameEditor ? '98vw' : '680px',
              width: isFullFrameEditor ? '98vw' : '100%',
              height: isFullFrameEditor ? '94vh' : 'auto',
              maxHeight: isFullFrameEditor ? '94vh' : '90vh',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <h2 style={{ fontSize: '1.35rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>{editingProjectId ? '✏️ Edit Project' : '🚀 Add & Insert New Project'}</span>
                </h2>
                {isFullFrameEditor && (
                  <span style={{ fontSize: '0.72rem', background: 'rgba(108, 99, 255, 0.2)', color: '#c4b5fd', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(108, 99, 255, 0.3)' }}>
                    Full Frame Workspace
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handlePreviewCurrentFullFrame}
                  style={{
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    borderColor: 'var(--accent)',
                    color: '#c4b5fd',
                  }}
                  title="Test & Preview this project in Full Frame Viewer now"
                >
                  <span>⛶ Preview Full Frame</span>
                </button>

                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => setIsFullFrameEditor((prev) => !prev)}
                  title={isFullFrameEditor ? 'Switch to Standard Dialog' : 'Expand Editor to Full Frame'}
                  style={{ fontSize: '1rem', color: isFullFrameEditor ? 'var(--accent)' : 'inherit' }}
                >
                  {isFullFrameEditor ? '🗗' : '⛶'}
                </button>

                <button type="button" className="icon-btn" onClick={() => setIsModalOpen(false)} title="Close">
                  ✕
                </button>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                minHeight: 0,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: isFullFrameEditor ? '1.1fr 1fr' : '1fr',
                  gap: '1.5rem',
                  flex: 1,
                  overflowY: 'auto',
                  padding: '1.25rem 0',
                }}
              >
                {/* Form Fields Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem', fontWeight: 600 }}>
                      Project Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Distributed Task Queue & Realtime Stream Engine"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem', fontWeight: 600 }}>
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        style={{ width: '100%' }}
                      >
                        {projectCategories.filter((c) => c !== 'All Categories').map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem', fontWeight: 600 }}>
                        Developer Role
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Lead Architect, Full Stack Developer"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem', fontWeight: 600 }}>
                      Problem Statement
                    </label>
                    <textarea
                      rows="2"
                      placeholder="What real-world engineering challenge or business problem does this solve?"
                      value={formData.problemStatement}
                      onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem', fontWeight: 600 }}>
                      Project Description *
                    </label>
                    <textarea
                      rows="3"
                      required
                      placeholder="Comprehensive description of the architecture, key components, database design, and features..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem', fontWeight: 600 }}>
                      Technologies Used (comma separated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. React.js, Node.js, Express, MongoDB, Redis, Docker, Tailwind"
                      value={formData.technologies}
                      onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem', fontWeight: 600 }}>
                        Project Image URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/... or image link"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem', fontWeight: 600 }}>
                        Project Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        style={{ width: '100%' }}
                      >
                        <option value="Production Ready">Production Ready</option>
                        <option value="Completed">Completed</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Beta">Beta</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem', fontWeight: 600 }}>
                        GitHub Link
                      </label>
                      <input
                        type="url"
                        placeholder="https://github.com/organization/repository"
                        value={formData.githubUrl}
                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem', fontWeight: 600 }}>
                        Live Demo Link (Opens in Full Frame)
                      </label>
                      <input
                        type="url"
                        placeholder="https://project.production.app"
                        value={formData.demoUrl}
                        onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Side Column in Full-Frame Editor Mode: Real-time Live Frame Preview */}
                {isFullFrameEditor && (
                  <div
                    style={{
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                      height: '100%',
                    }}
                  >
                    <div
                      style={{
                        padding: '0.75rem 1rem',
                        background: 'rgba(255, 255, 255, 0.04)',
                        borderBottom: '1px solid var(--border)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8' }}>
                        🌐 Live Full Frame Stage Preview
                      </span>
                      {formData.demoUrl && (
                        <button
                          type="button"
                          className="btn-secondary"
                          onClick={handlePreviewCurrentFullFrame}
                          style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                        >
                          Launch ⛶
                        </button>
                      )}
                    </div>

                    <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                      {formData.demoUrl ? (
                        <iframe
                          src={formData.demoUrl}
                          title="Preview Frame"
                          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                          style={{ width: '100%', height: '100%', border: 'none', background: '#fff' }}
                        />
                      ) : (
                        <div
                          style={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem',
                            textAlign: 'center',
                          }}
                        >
                          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🖥️</div>
                          <h4 style={{ color: '#0f172a', margin: '0 0 0.4rem', fontWeight: 800, fontSize: '1.1rem' }}>
                            {formData.title || 'Untitled Project'}
                          </h4>
                          <p style={{ color: '#475569', fontSize: '0.86rem', maxWidth: '340px', lineHeight: '1.55' }}>
                            Add a <strong style={{ color: '#0f172a' }}>Live Demo Link</strong> above to stream the project in this full frame stage. Or click <strong style={{ color: '#2563eb' }}>Preview Full Frame</strong> to test the standalone interactive viewer.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div
                className="modal-footer"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  borderTop: '1px solid var(--border)',
                  paddingTop: '1rem',
                  marginTop: '0.5rem',
                }}
              >
                <label
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    userSelect: 'none',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={autoOpenFullFrame}
                    onChange={(e) => setAutoOpenFullFrame(e.target.checked)}
                    style={{ accentColor: 'var(--accent)', cursor: 'pointer', width: '16px', height: '16px' }}
                  />
                  <span>⛶ Open project in Full Frame immediately after inserting</span>
                </label>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="button" className="btn-secondary" onClick={handlePreviewCurrentFullFrame}>
                    ⛶ Preview Frame
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingProjectId ? 'Save Changes' : 'Save & Publish Project 🚀'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Standalone Interactive Full-Frame Project Viewer */}
      {activeFullFrameProject && (
        <ProjectFullFrameModal
          project={activeFullFrameProject}
          onClose={() => setActiveFullFrameProject(null)}
        />
      )}
    </div>
  );
};

export default Projects;
