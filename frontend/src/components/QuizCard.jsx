import React from 'react';
import { Link } from 'react-router-dom';

const QuizCard = ({ quiz }) => {
  const diffClass =
    quiz.difficulty === 'Beginner'
      ? 'badge-beginner'
      : quiz.difficulty === 'Intermediate'
      ? 'badge-intermediate'
      : 'badge-advanced';

  return (
    <div className="quiz-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className={`badge ${diffClass}`}>{quiz.difficulty || 'Intermediate'}</span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {quiz.questionsCount || 4} Questions
        </span>
      </div>

      <h4 className="quiz-card-title">{quiz.title}</h4>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
        Passing Score: {quiz.passingScore || 70}% • Test your comprehension with instant feedback and explanations.
      </p>

      <Link
        to={`/quiz/${quiz.topicSlug}`}
        className="btn-primary"
        style={{ width: '100%', fontSize: '0.88rem', padding: '0.6rem 1rem' }}
      >
        Take Quiz ⚡
      </Link>
    </div>
  );
};

export default QuizCard;
