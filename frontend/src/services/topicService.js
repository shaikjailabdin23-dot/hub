import api from './api';
import { technicalTopics } from '../data/technicalData';
import { skillsList } from '../data/skillsData';

export const getTopics = async (params = {}) => {
  try {
    const response = await api.get('/topics', { params });
    if (response.data && response.data.data && response.data.data.length > 0) {
      return response.data.data;
    }
    return filterLocalTopics(technicalTopics, params);
  } catch (error) {
    console.warn('[TopicService] Using local fallback topics:', error.message);
    return filterLocalTopics(technicalTopics, params);
  }
};

export const getTopicById = async (idOrSlug) => {
  try {
    const response = await api.get(`/topics/${idOrSlug}`);
    const remoteData = response.data.data;
    const local = technicalTopics.find((t) => t.slug === idOrSlug || t.id === idOrSlug);
    if (local) {
      return {
        ...local,
        ...remoteData,
        whatIsIt: local.whatIsIt || remoteData?.whatIsIt,
        deepDive: local.deepDive || remoteData?.deepDive,
        memoryAllocation: local.memoryAllocation || remoteData?.memoryAllocation,
        typesAndRules: local.typesAndRules || remoteData?.typesAndRules,
        codeExample: local.codeExample || remoteData?.codeExample,
        practiceQuestions: local.practiceQuestions || remoteData?.practiceQuestions,
      };
    }
    return remoteData;
  } catch (error) {
    console.warn('[TopicService] Fallback getTopicById:', error.message);
    const local = technicalTopics.find((t) => t.slug === idOrSlug || t.id === idOrSlug);
    if (local) return { ...local, isCompleted: false };

    const skillLocal = skillsList.find((s) => s.slug === idOrSlug || s.id === idOrSlug);
    if (skillLocal) {
      return {
        _id: skillLocal.id,
        id: skillLocal.id,
        title: skillLocal.title,
        slug: skillLocal.slug,
        category: skillLocal.category,
        difficulty: skillLocal.level || 'Intermediate',
        description: skillLocal.description,
        hubSlug: 'skills',
        content: `### Overview\n${skillLocal.description}\n\n### Importance\n${skillLocal.importance || ''}\n\n### Where Used\n${skillLocal.whereUsed || ''}\n\n### Development Method\n${skillLocal.developmentMethod || ''}`,
        isCompleted: false,
      };
    }

    throw error;
  }
};

const filterLocalTopics = (topics, { hub, category, search }) => {
  let filtered = [...topics];
  if (hub && hub !== 'all') {
    filtered = filtered.filter((t) => !t.hubSlug || t.hubSlug.toLowerCase() === hub.toLowerCase());
  }
  if (category && category !== 'All') {
    if (category === 'DSA') {
      filtered = filtered.filter(
        (t) => t.category === 'Data Structures & Algorithms' || t.category === 'DSA'
      );
    } else if (category === 'AI & ML') {
      filtered = filtered.filter(
        (t) => t.category === 'AI & Machine Learning' || t.category === 'AI & ML'
      );
    } else if (category === 'Software Engineering') {
      filtered = filtered.filter(
        (t) =>
          t.category.includes('Software') ||
          t.category.includes('Programming') ||
          t.category.includes('Cloud')
      );
    } else {
      filtered = filtered.filter(
        (t) => t.category && t.category.toLowerCase().includes(category.toLowerCase())
      );
    }
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        (t.category && t.category.toLowerCase().includes(q))
    );
  }
  return filtered;
};

export default {
  getTopics,
  getTopicById,
};
