import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!email || !password) {
      setFormError('Please enter both email and password.');
      return;
    }

    setSubmitting(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setFormError(err.message || 'Login failed. Please verify your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail('student@hub.edu');
    setPassword('password123');
    setSubmitting(true);
    setFormError('');
    try {
      await login('student@hub.edu', 'password123');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.warn('Demo login API fallback:', err.message);
      const demoUser = {
        id: 'student-demo-1',
        name: 'Alex Johnson',
        email: 'student@hub.edu',
        college: 'Global Institute of Technology',
        branch: 'Computer Science and Engineering',
        year: '3rd Year',
        semester: '6th Semester',
        role: 'student',
      };
      localStorage.setItem('hub_auth_token', 'demo-jwt-token-12345');
      localStorage.setItem('hub_user_profile', JSON.stringify(demoUser));
      if (setUser) setUser(demoUser);
      navigate('/dashboard', { replace: true });
    } finally {
      setSubmitting(false);
    }
  };

  const handleAdminDemoLogin = async () => {
    setEmail('shaikjailabdin23@gmail.com');
    setPassword('admin123');
    setSubmitting(true);
    setFormError('');
    try {
      await login('shaikjailabdin23@gmail.com', 'admin123');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.warn('Admin demo login fallback:', err.message);
      const adminUser = {
        id: 'admin-demo-root',
        name: 'Shaik Jailabdin (Admin)',
        email: 'shaikjailabdin23@gmail.com',
        college: 'Hub Learning Administration',
        branch: 'System Engineering',
        year: 'Faculty / Admin',
        semester: 'Staff',
        role: 'admin',
      };
      localStorage.setItem('hub_auth_token', 'admin-demo-jwt-token-2026');
      localStorage.setItem('hub_user_profile', JSON.stringify(adminUser));
      if (setUser) setUser(adminUser);
      navigate('/dashboard', { replace: true });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="animate-fade-in"
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
      }}
    >
      <div
        className="glass-card"
        style={{
          maxWidth: '460px',
          width: '100%',
          padding: '2.5rem',
          boxShadow: '0 16px 40px -8px rgba(15, 23, 42, 0.1)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '54px',
              height: '54px',
              background: 'var(--accent-gradient)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontSize: '1.6rem',
              color: '#ffffff',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
            }}
          >
            🔐
          </div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Welcome Back</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Sign in to access your learning dashboard and resume your progress.
          </p>
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
            }}
          >
            ⚠️ {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '0.4rem',
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="alex.student@hub.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%' }}
              required
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Password
              </label>
            </div>
            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%' }}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem', fontSize: '0.95rem' }}
            disabled={submitting}
          >
            {submitting ? 'Authenticating...' : 'Sign In to Hub'}
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={handleDemoLogin}
            style={{ width: '100%', padding: '0.7rem', fontSize: '0.86rem', borderColor: 'var(--accent-border)', color: 'var(--accent)' }}
          >
            ⚡ Quick Demo Student Sign In (View Only)
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={handleAdminDemoLogin}
            style={{
              width: '100%',
              padding: '0.7rem',
              fontSize: '0.86rem',
              borderColor: '#fbcfe8',
              background: '#fdf2f8',
              color: '#db2777',
              fontWeight: 600,
            }}
          >
            🛡️ Quick Demo Admin Sign In (Full CRUD)
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Don’t have an account yet?{' '}
          <Link to="/register" style={{ color: 'var(--accent)', fontWeight: 700 }}>
            Create one free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
