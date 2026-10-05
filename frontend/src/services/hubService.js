import api from './api';

const defaultHubs = [
  {
    _id: 'hub-1',
    name: 'Technical Hub',
    slug: 'technical',
    description: 'Master core computer science fundamentals, programming languages, web engineering, systems, and modern AI.',
    category: 'Core Engineering',
    topicsCount: 9,
    icon: 'code-laptop',
    color: '#6c63ff',
    gradient: 'linear-gradient(135deg, #6c63ff 0%, #3b82f6 100%)',
  },
  {
    _id: 'hub-2',
    name: 'Skills Hub',
    slug: 'skills',
    description: 'Cultivate high-impact soft skills, analytical thinking, executive productivity, and professional workplace readiness.',
    category: 'Professional Growth',
    topicsCount: 8,
    icon: 'sparkles',
    color: '#00d4ff',
    gradient: 'linear-gradient(135deg, #00d4ff 0%, #06b6d4 100%)',
  },
  {
    _id: 'hub-3',
    name: 'Coding Hub',
    slug: 'coding',
    description: 'Level up Data Structures & Algorithms, solve curated interview problems with hints and solutions, and explore code templates.',
    category: 'Problem Solving',
    topicsCount: 14,
    icon: 'terminal',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  },
  {
    _id: 'hub-4',
    name: 'Career Hub',
    slug: 'career',
    description: 'Build an industry-grade resume, track job applications, conquer technical/HR interviews, and define your career roadmap.',
    category: 'Career Acceleration',
    topicsCount: 6,
    icon: 'briefcase',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  },
  {
    _id: 'hub-5',
    name: 'Project Hub',
    slug: 'project',
    description: 'Design, build, showcase, and manage real-world student capstones and portfolio-worthy software applications.',
    category: 'Applied Building',
    topicsCount: 8,
    icon: 'rocket',
    color: '#e7348eff',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
  },
];

export const getHubs = async () => {
  try {
    const response = await api.get('/hubs');
    if (response.data && response.data.data && response.data.data.length > 0) {
      return response.data.data;
    }
    return defaultHubs;
  } catch (error) {
    console.warn('[HubService] Using fallback hubs:', error.message);
    return defaultHubs;
  }
};

export const getHubById = async (idOrSlug) => {
  try {
    const response = await api.get(`/hubs/${idOrSlug}`);
    return response.data.data;
  } catch (error) {
    console.warn('[HubService] Fallback getHubById:', error.message);
    const found = defaultHubs.find((h) => h.slug === idOrSlug || h._id === idOrSlug);
    return found || defaultHubs[0];
  }
};

export default {
  getHubs,
  getHubById,
};
