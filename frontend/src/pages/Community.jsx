import React, { useState } from 'react';

const Community = () => {
  const [activeChannel, setActiveChannel] = useState('all');
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      author: 'Priya Sharma',
      branch: 'CSE • Year 3',
      channel: 'hackathons',
      title: 'Looking for a Frontend React teammate for Smart India Hackathon 2026',
      content: 'We are building an AI-powered agricultural supply chain solution. We have ML models ready in FastAPI and need someone experienced with React and CSS glassmorphism!',
      replies: 4,
      upvotes: 12,
      time: '3 hours ago',
    },
    {
      id: 2,
      author: 'Marcus Vance',
      branch: 'IT • Year 4',
      channel: 'interviews',
      title: 'Cleared Stripe Online Assessment — Here are the 2 DSA topics asked',
      content: 'Got 1 problem on Sliding Window (longest substring with k unique characters) and 1 on Topological Sort for package dependency resolution. Highly recommend practicing the Sliding Window template in Coding Hub!',
      replies: 18,
      upvotes: 35,
      time: '1 day ago',
    },
    {
      id: 3,
      author: 'Sarah Chen',
      branch: 'ECE • Year 2',
      channel: 'study-groups',
      title: 'Daily 60-min LeetCode & DSA group starting next Monday',
      content: 'We will solve 2 Medium problems daily from the Coding Hub and discuss optimal space/time complexity on Discord. Comment if you want to join our study group!',
      replies: 9,
      upvotes: 21,
      time: '2 days ago',
    },
  ]);

  const [newPostModal, setNewPostModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', channel: 'study-groups', content: '' });

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) return;
    const post = {
      id: Date.now(),
      author: 'You',
      branch: 'Computer Science • Year 3',
      channel: newPost.channel,
      title: newPost.title,
      content: newPost.content,
      replies: 0,
      upvotes: 1,
      time: 'Just now',
    };
    setDiscussions([post, ...discussions]);
    setNewPostModal(false);
    setNewPost({ title: '', channel: 'study-groups', content: '' });
  };

  const handleUpvote = (id) => {
    setDiscussions(
      discussions.map((d) => (d.id === id ? { ...d, upvotes: d.upvotes + 1 } : d))
    );
  };

  const filteredDiscussions =
    activeChannel === 'all'
      ? discussions
      : discussions.filter((d) => d.channel === activeChannel);

  return (
    <div className="community-page animate-fade-in" style={{ paddingBottom: '3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '0.25rem' }}>Student Peer Community</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Connect with fellow engineering learners, form hackathon squads, and share interview debriefs.
          </p>
        </div>

        <button type="button" className="btn-primary" onClick={() => setNewPostModal(true)}>
          + Start Discussion 💬
        </button>
      </div>

      {/* Channel Filters */}
      <div className="category-tabs" role="tablist">
        <button
          type="button"
          className={`category-tab ${activeChannel === 'all' ? 'active' : ''}`}
          onClick={() => setActiveChannel('all')}
        >
          All Discussions
        </button>
        <button
          type="button"
          className={`category-tab ${activeChannel === 'hackathons' ? 'active' : ''}`}
          onClick={() => setActiveChannel('hackathons')}
        >
          🏆 Hackathon Teammates
        </button>
        <button
          type="button"
          className={`category-tab ${activeChannel === 'interviews' ? 'active' : ''}`}
          onClick={() => setActiveChannel('interviews')}
        >
          💼 Interview Debriefs
        </button>
        <button
          type="button"
          className={`category-tab ${activeChannel === 'study-groups' ? 'active' : ''}`}
          onClick={() => setActiveChannel('study-groups')}
        >
          📚 Study Circles & DSA
        </button>
      </div>

      {/* Discussions Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredDiscussions.map((item) => (
          <div key={item.id} className="glass-card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'var(--accent-gradient)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                  }}
                >
                  {item.author.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                    {item.author}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {item.branch} • {item.time}
                  </div>
                </div>
              </div>

              <span className="badge badge-accent">#{item.channel}</span>
            </div>

            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              {item.title}
            </h3>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              {item.content}
            </p>

            <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => handleUpvote(item.id)}
                style={{ padding: '0.35rem 0.85rem', fontSize: '0.85rem', gap: '0.35rem' }}
              >
                ▲ Upvote ({item.upvotes})
              </button>
              <button
                type="button"
                className="btn-secondary"
                style={{ padding: '0.35rem 0.85rem', fontSize: '0.85rem', gap: '0.35rem' }}
              >
                💬 {item.replies} Replies
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Post Modal */}
      {newPostModal && (
        <div className="modal-overlay" onClick={() => setNewPostModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{ fontSize: '1.5rem' }}>Create Discussion Thread</h2>
              <button type="button" className="icon-btn" onClick={() => setNewPostModal(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleCreatePost}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 600 }}>
                    Channel
                  </label>
                  <select
                    value={newPost.channel}
                    onChange={(e) => setNewPost({ ...newPost, channel: e.target.value })}
                    style={{ width: '100%' }}
                  >
                    <option value="study-groups">Study Circles & DSA</option>
                    <option value="hackathons">Hackathon Teammates</option>
                    <option value="interviews">Interview Debriefs</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 600 }}>
                    Thread Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tips on solving Tree recursion problems?"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 600 }}>
                    Message Content *
                  </label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Describe your question or collaboration details..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setNewPostModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
