import React, { useState } from 'react';

const Help = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });

  const faqs = [
    {
      q: 'How does Hub Learning connect academic theory with placement preparation?',
      a: 'Hub Learning connects CS textbook subjects (OS, DBMS, CN) with practical modern frameworks (React, Node.js), algorithmic coding drills (DSA), and job application tracking to prepare you directly for software engineering careers.',
    },
    {
      q: 'Are the quizzes evaluated automatically?',
      a: 'Yes! Every quiz has instant automated grading, calculates your score percentage against a 70% passing threshold, and provides detailed answer explanations for all options.',
    },
    {
      q: 'Can I add my own projects to the platform?',
      a: 'Yes! Navigate to the Project Hub or the "Manage Projects" tab to add, edit, and delete your capstone applications with GitHub links and live demos.',
    },
    {
      q: 'Does Hub Learning work on mobile devices?',
      a: 'Yes, the entire application is built using responsive CSS3 with a slide-out drawer, touch-friendly buttons, and responsive grid layouts.',
    },
    {
      q: 'How is my learning streak calculated?',
      a: 'Your streak increases every consecutive day you complete a lesson, submit a quiz, or solve a coding problem.',
    },
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactForm({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="help-page animate-fade-in" style={{ paddingBottom: '3rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem' }}>
        <span className="badge badge-accent" style={{ marginBottom: '0.75rem' }}>
          Support & Guidance
        </span>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '0.75rem' }}>Help Center & FAQs</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Have questions about the curricula, project showcase, or quiz grading? Explore answers below or get in touch.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
        {/* FAQ Accordion */}
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.25rem' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="glass-card"
                  style={{
                    padding: '1.25rem',
                    cursor: 'pointer',
                    borderColor: isOpen ? 'var(--accent)' : 'var(--border)',
                  }}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 600 }}>
                    <span>{faq.q}</span>
                    <span style={{ color: 'var(--accent-secondary)' }}>{isOpen ? '▲' : '▼'}</span>
                  </div>
                  {isOpen && (
                    <p style={{ marginTop: '0.75rem', fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Support Form */}
        <div>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Ask an Instructor or Advisor</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Send an inquiry or suggest a topic you would like added to the Hub.
            </p>

            {formSubmitted ? (
              <div
                style={{
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  color: '#166534',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                  fontWeight: 600,
                }}
              >
                ✓ Message received! An academic advisor will respond within 24 hours.
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem' }}>Your Name</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem' }}>Student Email</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem' }}>Hub / Subject Area</label>
                  <input
                    type="text"
                    placeholder="e.g. Technical Hub: Dynamic Programming"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem' }}>Question or Feedback</label>
                  <textarea
                    rows="4"
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ padding: '0.8rem' }}>
                  Send Support Message ✉️
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
