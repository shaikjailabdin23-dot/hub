import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    college: 'State University of Technology',
    branch: 'Computer Science and Engineering',
    year: '1st Year',
    semester: '1st Semester',
  });
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFillDemoData = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    setFormData({
      name: 'Jordan Hayes',
      email: `jordan.hayes${randomSuffix}@hub.edu`,
      password: 'password123',
      confirmPassword: 'password123',
      college: 'Global Institute of Engineering',
      branch: 'Computer Science & AI',
      year: '3rd Year',
      semester: '5th Semester',
    });
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim()) {
      setFormError('Please enter your full name.');
      return;
    }

    if (!formData.email.trim()) {
      setFormError('Please enter a valid email address.');
      return;
    }

    if (!formData.password) {
      setFormError('Please enter a password.');
      return;
    }

    if (formData.password.length < 6) {
      setFormError('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match. Please verify.');
      return;
    }

    setSubmitting(true);
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setFormError(err.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="animate-fade-in"
      style={{
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem 1rem',
      }}
    >
      <div
        className="glass-card"
        style={{
          maxWidth: '580px',
          width: '100%',
          padding: '2.5rem',
          boxShadow: '0 16px 40px -8px rgba(15, 23, 42, 0.1)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              background: 'var(--accent-gradient)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontSize: '1.7rem',
              color: '#ffffff',
              boxShadow: '0 6px 16px rgba(37, 99, 235, 0.3)',
            }}
          >
            🎓
          </div>
          <h2 style={{ fontSize: '1.9rem', marginBottom: '0.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Create Student Profile
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Join Hub Learning to track your technical curricula, take quizzes, and build projects.
          </p>

          <button
            type="button"
            onClick={handleFillDemoData}
            className="btn-outline"
            style={{
              marginTop: '1rem',
              fontSize: '0.8rem',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-full)',
            }}
          >
            ⚡ Auto-Fill Sample Student Data
          </button>
        </div>

        {formError && (
          <div
            style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#b91c1c',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '1.5rem',
              fontSize: '0.88rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span>⚠️</span>
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          {/* 1. Full Name */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
              Full Name <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Alex Mercer"
              value={formData.name}
              onChange={handleChange}
              style={{ width: '100%' }}
              required
            />
          </div>

          {/* 2. Email Address */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
              Email Address <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="alex@university.edu"
              value={formData.email}
              onChange={handleChange}
              style={{ width: '100%' }}
              required
            />
          </div>

          {/* 3 & 4. Password and Confirm Password */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                Password (min 6 chars) <span style={{ color: 'var(--accent)' }}>*</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••••••"
                value={formData.password}
                onChange={handleChange}
                style={{ width: '100%' }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                Confirm Password <span style={{ color: 'var(--accent)' }}>*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{ width: '100%' }}
                required
              />
            </div>
          </div>

          {/* 5 & 6. College and Major / Branch */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                College / University <span style={{ color: 'var(--accent)' }}>*</span>
              </label>
              <input
                type="text"
                name="college"
                placeholder="e.g. State Institute of Tech"
                value={formData.college}
                onChange={handleChange}
                style={{ width: '100%' }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                Branch / Department <span style={{ color: 'var(--accent)' }}>*</span>
              </label>
              <input
                type="text"
                name="branch"
                placeholder="e.g. Computer Science & Eng"
                value={formData.branch}
                onChange={handleChange}
                style={{ width: '100%' }}
                required
              />
            </div>
          </div>

          {/* 7 & 8. Year of Study and Semester */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                Year of Study <span style={{ color: 'var(--accent)' }}>*</span>
              </label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                style={{ width: '100%' }}
              >
                <option value="1st Year">1st Year (Freshman)</option>
                <option value="2nd Year">2nd Year (Sophomore)</option>
                <option value="3rd Year">3rd Year (Junior)</option>
                <option value="4th Year">4th Year (Senior)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                Current Semester <span style={{ color: 'var(--accent)' }}>*</span>
              </label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                style={{ width: '100%' }}
              >
                <option value="1st Semester">1st Semester</option>
                <option value="2nd Semester">2nd Semester</option>
                <option value="3rd Semester">3rd Semester</option>
                <option value="4th Semester">4th Semester</option>
                <option value="5th Semester">5th Semester</option>
                <option value="6th Semester">6th Semester</option>
                <option value="7th Semester">7th Semester</option>
                <option value="8th Semester">8th Semester</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', padding: '0.85rem', marginTop: '0.85rem', fontSize: '0.98rem' }}
            disabled={submitting}
          >
            {submitting ? 'Registering Account...' : 'Create Account & Begin Learning →'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 700 }}>
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
