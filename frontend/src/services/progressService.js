import api from './api';

const defaultProgress = {
  overallPercentage: 68,
  completedTopicsCount: 24,
  totalTopicsCount: 35,
  completedQuizzesCount: 18,
  totalQuizzesCount: 22,
  avgQuizScore: 84,
  totalProjects: 6,
  streak: 7,
  hubStats: {
    technical: { total: 9, completed: 6, percentage: 67 },
    skills: { total: 8, completed: 5, percentage: 63 },
    coding: { total: 14, completed: 10, percentage: 71 },
    career: { total: 5, completed: 4, percentage: 80 },
    project: { total: 5, completed: 3, percentage: 60 },
  },
  recentTopics: [],
};

export const getProgress = async () => {
  try {
    const response = await api.get('/progress');
    return response.data.data;
  } catch (error) {
    console.warn('[ProgressService] Using fallback progress data:', error.message);
    const cached = localStorage.getItem('hub_local_progress');
    return cached ? JSON.parse(cached) : defaultProgress;
  }
};

export const updateProgress = async (progressData) => {
  try {
    const response = await api.post('/progress', progressData);
    return response.data.data;
  } catch (error) {
    console.warn('[ProgressService] Fallback local progress update:', error.message);
    return progressData;
  }
};

export default {
  getProgress,
  updateProgress,
};
