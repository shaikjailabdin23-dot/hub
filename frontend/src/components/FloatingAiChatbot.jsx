import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import '../styles/floatingAiChatbot.css';

const CAREER_ROLES = [
  'Software Developer',
  'Web Developer',
  'Full Stack Developer',
  'Data Analyst',
  'Data Scientist',
  'AI/ML Engineer',
  'Cybersecurity Engineer',
  'Cloud Engineer',
  'DevOps Engineer',
  'Mobile App Developer',
  'UI/UX Designer',
];

const FloatingAiChatbot = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState('Software Developer');
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState(true);

  // Initial welcome message
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: `👋 Hi **${user?.name || 'there'}**! I am **Antigravity AI**, your Career & Roadmap Advisor powered by **Gemini 2.5 Flash**.\n\nAsk me anything about step-by-step roadmaps, skill gaps, recommended projects, or technical interview strategies!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of conversation
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
      setHasNewNotification(false);
    }
  }, [isOpen, messages]);

  // Listen for global open events from other components (e.g. Flowchart AI Tutor button)
  useEffect(() => {
    const handleOpenEvent = (e) => {
      if (e.detail?.career) {
        setSelectedCareer(e.detail.career);
      }
      setIsOpen(true);
      if (e.detail?.initialPrompt) {
        handleSendMessage(e.detail.initialPrompt);
      }
    };

    window.addEventListener('open-ai-chatbot', handleOpenEvent);
    return () => window.removeEventListener('open-ai-chatbot', handleOpenEvent);
  }, [selectedCareer]);

  // Handle Close on Escape Key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Send message to Gemini 2.5 Flash Backend
  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isTyping) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Build conversation history payload
      const historyPayload = messages.map((m) => ({
        sender: m.sender,
        text: m.text,
      }));

      const response = await api.post('/ai/chat', {
        message: query,
        conversationHistory: historyPayload,
        currentCareer: selectedCareer,
        studentProfile: {
          name: user?.name,
          education: 'B.Tech',
          branch: user?.branch || 'Computer Science and Engineering',
          year: user?.year || '3rd Year',
        },
      });

      const replyText = response.data?.reply || 'I am ready to help you plan your engineering roadmap. What specific domain would you like to explore?';

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        model: response.data?.model || 'gemini-2.5-flash',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.warn('[AI Chat Error]:', error);
      const fallbackAiMsg = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: `### 🎯 Career Roadmap Guidance for **${selectedCareer}**\n\n- **Step 1:** Master core programming fundamentals and Git version control.\n- **Step 2:** Build interactive components and REST API services.\n- **Step 3:** Deliver a full-scale capstone project deployed with CI/CD.\n\n*(Connect your \`GEMINI_API_KEY\` in \`backend/.env\` to activate live Gemini 2.5 Flash model responses)*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackAiMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // Quick starter questions
  const quickPrompts = [
    `What should I learn first for ${selectedCareer}?`,
    `Suggest 3 standout capstone projects for my resume`,
    `How do I prepare for technical interviews for ${selectedCareer}?`,
    `What are the most in-demand skills for ${selectedCareer}?`,
  ];

  // Simple Markdown-to-JSX Formatter for clean, readable message bubbles
  const renderFormattedText = (rawText) => {
    if (!rawText) return null;

    const lines = rawText.split('\n');

    return lines.map((line, idx) => {
      // Header 3
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} style={{ fontSize: '0.98rem', fontWeight: 800, margin: '0.4rem 0 0.2rem', color: 'inherit' }}>
            {line.replace('### ', '')}
          </h4>
        );
      }
      // Header 2
      if (line.startsWith('## ')) {
        return (
          <h3 key={idx} style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0.5rem 0 0.25rem', color: 'inherit' }}>
            {line.replace('## ', '')}
          </h3>
        );
      }
      // Divider
      if (line.trim() === '---') {
        return <hr key={idx} style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.1)', margin: '0.5rem 0' }} />;
      }
      // Bullet Item
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const itemContent = line.trim().replace(/^[-*]\s+/, '');
        return (
          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', margin: '0.2rem 0' }}>
            <span style={{ color: '#2563eb', fontWeight: 800 }}>•</span>
            <div>{formatInline(itemContent)}</div>
          </div>
        );
      }
      // Numbered list item
      if (/^\d+\.\s+/.test(line.trim())) {
        return (
          <div key={idx} style={{ margin: '0.25rem 0' }}>
            {formatInline(line.trim())}
          </div>
        );
      }
      // Empty line
      if (!line.trim()) {
        return <div key={idx} style={{ height: '0.35rem' }} />;
      }
      // Regular paragraph
      return (
        <p key={idx} style={{ margin: '0.25rem 0' }}>
          {formatInline(line)}
        </p>
      );
    });
  };

  // Helper for bold, italic, code inline elements
  const formatInline = (text) => {
    // Regex replace **bold**, `code`, *italic*
    const parts = text.split(/(\*\*.*?\*\*|`.*?`|\*.*?\*)/g);

    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i}>{part.slice(1, -1)}</code>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={i}>{part.slice(1, -1)}</em>;
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Circular Launcher Button (Bottom Right) */}
      <button
        type="button"
        className="ai-chatbot-launcher"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open AI Career & Roadmap Advisor"
        title="Chat with AI Career & Roadmap Advisor"
      >
        <div className="ai-launcher-pulse" />
        <span className="ai-launcher-icon">✨</span>
      </button>

      {/* Card-Sized Floating Chatbot Window */}
      {isOpen && (
        <div className="ai-chatbot-card" role="dialog" aria-label="AI Career & Roadmap Advisor">
          {/* Header */}
          <div className="ai-chat-header">
            <div className="ai-header-left">
              <div className="ai-avatar-badge">
                <span>🤖</span>
                <span className="ai-online-dot" />
              </div>
              <div>
                <h3 className="ai-header-title">
                  Antigravity AI
                  <span style={{ fontSize: '0.68rem', background: 'rgba(56, 189, 248, 0.2)', color: '#7dd3fc', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 600 }}>
                    Gemini 2.5 Flash
                  </span>
                </h3>
                <p className="ai-header-sub">Career & Roadmap Mentor</p>
              </div>
            </div>

            <div className="ai-header-actions">
              <button
                type="button"
                className="ai-header-btn"
                title="Clear Conversation"
                onClick={() =>
                  setMessages([
                    {
                      id: `welcome-${Date.now()}`,
                      sender: 'ai',
                      text: `Conversation cleared. How can I assist you with your **${selectedCareer}** roadmap?`,
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    },
                  ])
                }
              >
                🔄
              </button>
              <button
                type="button"
                className="ai-header-btn"
                title="Minimize Chat"
                onClick={() => setIsOpen(false)}
              >
                —
              </button>
              <button
                type="button"
                className="ai-header-btn"
                title="Close Chat"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Career Track Context Selector Bar */}
          <div className="ai-career-selector-bar">
            <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Target Track:</span>
            <select
              value={selectedCareer}
              onChange={(e) => setSelectedCareer(e.target.value)}
            >
              {CAREER_ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Message Feed */}
          <div className="ai-chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`ai-msg-row ${msg.sender}`}>
                <div className="ai-msg-bubble">
                  {renderFormattedText(msg.text)}
                  <div
                    style={{
                      fontSize: '0.68rem',
                      opacity: 0.65,
                      marginTop: '0.35rem',
                      textAlign: msg.sender === 'user' ? 'right' : 'left',
                    }}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="ai-msg-row ai">
                <div className="ai-typing-indicator">
                  <span className="ai-typing-dot" />
                  <span className="ai-typing-dot" />
                  <span className="ai-typing-dot" />
                </div>
              </div>
            )}

            {/* Quick Prompt Chips (Shown after initial welcome or when messages <= 2) */}
            {messages.length <= 2 && (
              <div className="ai-prompt-chips-container">
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                  💡 Suggested Questions:
                </div>
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="ai-prompt-chip"
                    onClick={() => handleSendMessage(prompt)}
                  >
                    <span>⚡</span>
                    <span>{prompt}</span>
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            className="ai-chat-input-container"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <div className="ai-input-wrapper">
              <input
                ref={inputRef}
                type="text"
                className="ai-chat-input"
                placeholder={`Ask about ${selectedCareer} roadmap, skills, projects...`}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isTyping}
              />
              <button
                type="submit"
                className="ai-send-btn"
                disabled={!inputMessage.trim() || isTyping}
                title="Send Message"
              >
                ➤
              </button>
            </div>
            <div className="ai-footer-note">
              <span>⚡ Powered by Gemini 2.5 Flash</span>
              <span>•</span>
              <span>Hub Learning Advisor</span>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default FloatingAiChatbot;
