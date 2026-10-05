import api from './api';
import { quizzesData } from '../data/quizData';

export const getQuizzes = async (params = {}) => {
  try {
    const response = await api.get('/quizzes', { params });
    return response.data.data;
  } catch (error) {
    console.warn('[QuizService] Using local fallback quizzes list:', error.message);
    return Object.values(quizzesData).map((q) => ({
      title: q.title,
      topicSlug: q.topicSlug,
      hubSlug: q.hubSlug,
      difficulty: q.difficulty,
      questionsCount: q.questions.length,
      passingScore: q.passingScore,
    }));
  }
};

export const getQuizById = async (idOrSlug) => {
  try {
    const response = await api.get(`/quizzes/${idOrSlug}`);
    return response.data.data;
  } catch (error) {
    console.warn('[QuizService] Using local fallback quiz:', error.message);
    const local = quizzesData[idOrSlug];
    if (local) {
      return {
        ...local,
        totalQuestions: local.questions.length,
        questions: local.questions.map((q, idx) => ({
          index: idx,
          id: idx,
          question: q.question,
          options: q.options,
        })),
      };
    }
    throw error;
  }
};

export const submitQuiz = async (idOrSlug, answers) => {
  try {
    const response = await api.post(`/quizzes/${idOrSlug}/submit`, { answers });
    return response.data.data;
  } catch (error) {
    console.warn('[QuizService] Fallback local quiz evaluation:', error.message);
    const local = quizzesData[idOrSlug];
    if (local) {
      let correctCount = 0;
      const review = local.questions.map((q, idx) => {
        const userAnswer = answers[idx] !== undefined ? Number(answers[idx]) : -1;
        const isCorrect = userAnswer === q.correctAnswer;
        if (isCorrect) correctCount++;
        return {
          index: idx,
          question: q.question,
          options: q.options,
          userAnswer,
          correctAnswer: q.correctAnswer,
          isCorrect,
          explanation: q.explanation,
        };
      });

      const totalQuestions = local.questions.length;
      const percentage = Math.round((correctCount / totalQuestions) * 100);
      const passed = percentage >= local.passingScore;

      return {
        score: correctCount,
        totalQuestions,
        percentage,
        passed,
        passingScore: local.passingScore,
        correctCount,
        wrongCount: totalQuestions - correctCount,
        review,
      };
    }
    throw error;
  }
};

export default {
  getQuizzes,
  getQuizById,
  submitQuiz,
};
