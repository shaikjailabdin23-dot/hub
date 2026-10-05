import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { projectCategories } from '../data/projectData';
import projectService from '../services/projectService';
import ProjectCard from '../components/ProjectCard';
import ProjectFullFrameModal from '../components/ProjectFullFrameModal';
import SearchBar from '../components/SearchBar';
import { useAuth } from '../hooks/useAuth';

const ProjectHub = () => {
  const { user, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertNotice, setAlertNotice] = useState(
    location.state?.accessDenied
      ? '🔒 Access Restricted: The Project Management workspace is reserved for Administrators only. You can view all published projects below.'
      : ''
  );

  // Full-Frame Viewing & Editing State
  const [activeFullFrameProject, setActiveFullFrameProject] = useState(null);
  const [isFullFrameEditor, setIsFullFrameEditor] = useState(false);
  const [autoOpenFullFrame, setAutoOpenFullFrame] = useState(true);

  // Admin In-Hub Create/Edit Modal State
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
  });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await projectService.getProjects({
        category: activeCategory,
      });
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [activeCategory]);

  const openCreateModal = () => {
    if (!isAdmin) return;
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
    });
    setIsFullFrameEditor(false);
    setIsModalOpen(true);
  };

  const openEditModal = (proj) => {
    if (!isAdmin) return;
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
    });
    setIsFullFrameEditor(false);
    setIsModalOpen(true);
  };

  const handlePreviewCurrentFullFrame = () => {
    const previewProj = {
      ...formData,
      _id: editingProjectId || 'hub-preview-temp-id',
      technologies: formData.technologies
        ? formData.technologies.split(',').map((t) => t.trim()).filter(Boolean)
        : ['React.js', 'Node.js'],
    };
    setActiveFullFrameProject(previewProj);
  };

  const handleDelete = async (id) => {
    if (!isAdmin) return;
    if (window.confirm('Are you sure you want to delete this project as Administrator?')) {
      await projectService.deleteProject(id);
      fetchProjects();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
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
    } else {
      savedProject = await projectService.createProject(payload);
    }

    setIsModalOpen(false);
    setIsFullFrameEditor(false);
    await fetchProjects();

    // Whenever admin inserts or updates a project, open it directly in full frame if requested
    if (autoOpenFullFrame && savedProject) {
      setActiveFullFrameProject(savedProject);
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.technologies && p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesSearch;
  });

  return (
    <div className="project-hub-page animate-fade-in">
      {/* Access Restriction Banner if redirected */}
      {alertNotice && (
        <div
          style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#991b1b',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.92rem',
            fontWeight: 500,
          }}
        >
          <span>{alertNotice}</span>
          <button
            type="button"
            onClick={() => setAlertNotice('')}
            style={{ background: 'transparent', border: 'none', color: '#991b1b', cursor: 'pointer', fontSize: '1.1rem' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Hero Banner */}
      <section className="hub-hero">
        <div className="hub-hero-header">
          <div className="hub-hero-icon" style={{ background: 'var(--accent-gradient)' }}>
            🚀
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h1 className="hub-hero-title">Project Hub</h1>
                <p className="hub-hero-desc">
                  Theory without implementation is quickly forgotten. Explore, architect, and showcase production-grade
                  capstone projects with clear problem statements, modern tech stacks, and live GitHub repositories.
                </p>
              </div>

              {/* Admin Quick Action in Header */}
              {isAdmin && (
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={openCreateModal}
                    style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}
                  >
                    + Add New Project 🚀
                  </button>
                  <Link
                    to="/projects"
                    className="btn-secondary"
                    style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}
                  >
                    Manage Console 📋
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="hub-stats-row">
          <div className="hub-stat-card">
            <span className="hub-stat-num">{projects.length}</span>
            <span className="hub-stat-text">Showcase Projects</span>
          </div>
          <div className="hub-stat-card">
            <span className="hub-stat-num">{projectCategories.length - 1}</span>
            <span className="hub-stat-text">Domains</span>
          </div>
          <div className="hub-stat-card">
            <span className="hub-stat-num">Full CRUD</span>
            <span className="hub-stat-text">Portfolio System</span>
          </div>
          <div className="hub-stat-card">
            <span className="hub-stat-num">Production</span>
            <span className="hub-stat-text">Ready Deployments</span>
          </div>
        </div>
      </section>

      {/* Action CTA Bar */}
      <div
        className="continue-learning-section"
        style={{
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          border: '1px solid #bfdbfe',
          boxShadow: 'var(--card-shadow)',
        }}
      >
        <div className="continue-left">
          <div className="continue-icon" style={{ background: '#dbeafe', color: 'var(--accent)' }}>
            {isAdmin ? '🛡️' : '📁'}
          </div>
          <div>
            <div className="continue-title" style={{ color: 'var(--accent)' }}>
              {isAdmin
                ? 'Admin Project Management Console'
                : 'Explore Production-Ready Capstone Projects'}
            </div>
            <div className="continue-subtitle" style={{ color: 'var(--text-secondary)' }}>
              {isAdmin
                ? 'You have administrative permissions to create, edit, or delete showcase projects. New projects publish live instantly.'
                : 'Inspect detailed system architectures, problem statements, verified GitHub repositories, and live demo deployments.'}
            </div>
          </div>
        </div>

        {isAdmin ? (
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-primary"
              onClick={openCreateModal}
              style={{ padding: '0.65rem 1.4rem' }}
            >
              + Add New Project 🚀
            </button>
            <Link to="/projects" className="btn-secondary" style={{ padding: '0.65rem 1.4rem' }}>
              Project Management 📋
            </Link>
          </div>
        ) : (
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              const grid = document.querySelector('.topics-grid');
              if (grid) grid.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{ padding: '0.65rem 1.4rem' }}
          >
            Browse Projects ↓
          </button>
        )}
      </div>

      {/* Filter and Search */}
      <section className="filter-search-bar">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by project name, tech stack (React, Node, Python, Docker)..."
        />
        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filteredProjects.length}</strong> featured projects
        </div>
      </section>

      {/* Category Tabs */}
      <div className="category-tabs" role="tablist">
        {projectCategories.map((cat) => (
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
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '0.6rem', color: 'var(--text-primary)' }}>
            {isAdmin ? 'Project Hub is Ready for Your Projects' : 'No Projects Published Yet'}
          </h3>
          <p
            style={{
              color: 'var(--text-secondary)',
              maxWidth: '540px',
              margin: '0 auto 1.5rem',
              lineHeight: 1.6,
            }}
          >
            {isAdmin
              ? 'This space is reserved for production capstone projects. Add your first project using the admin controls above.'
              : 'Engineering capstones and web platforms are added and verified by Platform Administrators. Please check back soon!'}
          </p>
          {isAdmin && (
            <button
              type="button"
              className="btn-primary"
              onClick={openCreateModal}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.6rem' }}
            >
              <span>+</span> Add Your First Project 🚀
            </button>
          )}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <h3>No matching projects found</h3>
          <p style={{ marginTop: '0.5rem' }}>Try clearing your search query or choosing another category.</p>
        </div>
      ) : (
        <div className="topics-grid">
          {filteredProjects.map((proj) => (
            <ProjectCard
              key={proj._id}
              project={proj}
              onEdit={openEditModal}
              onDelete={handleDelete}
              canEdit={isAdmin} // Only Admin has canEdit=true; hidden for Students!
              onOpenFullFrame={(p) => setActiveFullFrameProject(p)}
            />
          ))}
        </div>
      )}

      {/* Admin Add/Edit Project Modal with Full Frame Support */}
      {isAdmin && isModalOpen && (
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

export default ProjectHub;
