import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import quizService from '../services/quizService';
import { useProgress } from '../hooks/useProgress';

const Quiz = () => {
  const { topicSlug } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { submitQuizProgress } = useProgress();

  useEffect(() => {
    setLoading(true);
    setError(null);
    quizService
      .getQuizById(topicSlug)
      .then((data) => {
        setQuiz(data);
      })
      .catch((err) => {
        setError('Quiz not found for this topic.');
      })
      .finally(() => setLoading(false));
  }, [topicSlug]);

  const handleSelectOption = (qIndex, optionIndex) => {
    if (result) return; // Prevent change after submit
    setSelectedAnswers((prev) => ({
      ...prev,
      [qIndex]: optionIndex,
    }));
  };

  const handleSubmitQuiz = async () => {
    if (!quiz) return;
    setSubmitting(true);
    try {
      const evaluation = await quizService.submitQuiz(topicSlug, selectedAnswers);
      setResult(evaluation);
      submitQuizProgress(topicSlug, quiz.hubSlug || 'technical', evaluation.score, evaluation.totalQuestions);
    } catch (err) {
      console.error('Quiz submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setResult(null);
    setCurrentQuestionIndex(0);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading Quiz Module...</p>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '600px', margin: '3rem auto' }}>
        <h2>Quiz Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', margin: '1rem 0' }}>
          No quiz questions available for "{topicSlug}".
        </p>
        <Link to="/technical-hub" className="btn-primary">
          Back to Technical Hub
        </Link>
      </div>
    );
  }

  const questions = quiz.questions || [];
  const currentQ = questions[currentQuestionIndex];
  const allAnswered = questions.length > 0 && questions.every((_, idx) => selectedAnswers[idx] !== undefined);

  return (
    <div className="quiz-runner-container animate-fade-in" style={{ paddingBottom: '3rem' }}>
      {/* Quiz Header */}
      <div className="quiz-header-card">
        <div>
          <span className="badge badge-accent" style={{ marginBottom: '0.5rem' }}>
            {quiz.difficulty || 'Assessment'}
          </span>
          <h1 className="quiz-title">{quiz.title}</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Passing threshold: <strong>{quiz.passingScore || 70}%</strong> • Test your concept retention
          </p>
        </div>

        <Link to={`/topic/${topicSlug}`} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
          ← Back to Lesson
        </Link>

        {/* Progress Fill */}
        <div className="quiz-progress-track">
          <div
            className="quiz-progress-fill"
            style={{
              width: `${Math.round(((Object.keys(selectedAnswers).length) / Math.max(1, questions.length)) * 100)}%`,
            }}
          />
        </div>
      </div>

      {!result ? (
        /* Active Question Card */
        currentQ && (
          <div className="question-card animate-fade-in">
            <div className="question-number-badge">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>

            <h2 className="question-text">{currentQ.question}</h2>

            <div className="options-grid">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                const letter = String.fromCharCode(65 + optIdx);

                return (
                  <button
                    key={optIdx}
                    type="button"
                    className={`option-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectOption(currentQuestionIndex, optIdx)}
                  >
                    <span className="option-indicator">{letter}</span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            <div className="quiz-actions-row">
              <button
                type="button"
                className="btn-secondary"
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
              >
                ← Previous
              </button>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {currentQuestionIndex < questions.length - 1 ? (
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                  >
                    Next Question →
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-primary"
                    disabled={!allAnswered || submitting}
                    onClick={handleSubmitQuiz}
                    style={{ background: 'var(--accent-gradient)' }}
                  >
                    {submitting ? 'Submitting...' : 'Submit Answers 🎯'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      ) : (
        /* Quiz Results Card */
        <div className="quiz-result-card animate-fade-in">
          <div className="result-score-gauge">
            {result.percentage}%
          </div>

          <div>
            <span className={`result-badge ${result.passed ? 'pass' : 'fail'}`}>
              {result.passed ? '🎉 Congratulations! You Passed' : '⚠️ Keep Practicing — Retake Suggested'}
            </span>
          </div>

          <div className="result-stats-row">
            <div>
              <div className="result-stat-val" style={{ color: 'var(--success)' }}>
                {result.correctCount}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Correct</div>
            </div>
            <div>
              <div className="result-stat-val" style={{ color: 'var(--danger)' }}>
                {result.wrongCount}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Incorrect</div>
            </div>
            <div>
              <div className="result-stat-val">
                {result.totalQuestions}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Questions</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button type="button" className="btn-primary" onClick={handleRetry}>
              🔄 Retake Quiz
            </button>
            <Link to={`/topic/${topicSlug}`} className="btn-secondary">
              📖 Review Topic Lesson
            </Link>
            <Link to="/technical-hub" className="btn-outline">
              Explore More Topics
            </Link>
          </div>

          {/* Detailed Review Section */}
          <div className="review-answers-section">
            <h3 style={{ fontSize: '1.4rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
              Detailed Question Review & Explanations
            </h3>

            {result.review?.map((rev, idx) => (
              <div key={idx} className="review-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontWeight: 700 }}>Question {idx + 1}</span>
                  <span
                    style={{
                      fontWeight: 700,
                      color: rev.isCorrect ? 'var(--success)' : 'var(--danger)',
                    }}
                  >
                    {rev.isCorrect ? '✓ Correct (+100%)' : '✕ Incorrect'}
                  </span>
                </div>

                <div style={{ fontSize: '1.05rem', marginBottom: '1rem' }}>{rev.question}</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.92rem' }}>
                  <div>
                    <strong>Your Choice: </strong>
                    <span style={{ color: rev.isCorrect ? '#4ade80' : '#f87171' }}>
                      {rev.options[rev.userAnswer] || 'Unanswered'}
                    </span>
                  </div>
                  {!rev.isCorrect && (
                    <div>
                      <strong>Correct Answer: </strong>
                      <span style={{ color: '#4ade80' }}>{rev.options[rev.correctAnswer]}</span>
                    </div>
                  )}
                </div>

                {rev.explanation && (
                  <div className="explanation-box">
                    <strong>💡 Concept Explanation: </strong>
                    {rev.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
