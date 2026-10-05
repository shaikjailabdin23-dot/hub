import api from './api';

const STORAGE_KEY = 'hub_student_career_profile';

const careerService = {
  getProfile: async () => {
    try {
      const res = await api.get('/career/profile');
      if (res.data?.data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(res.data.data));
        return res.data.data;
      }
    } catch (err) {
      console.warn('[CareerService] Backend fetch failed or unauthenticated, falling back to local state:', err.message);
    }

    // Fallback to local storage
    try {
      const local = localStorage.getItem(STORAGE_KEY);
      if (local) return JSON.parse(local);
    } catch (e) {}

    return null;
  },

  updateProfile: async (data) => {
    // Optimistic local update
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}

    try {
      const res = await api.put('/career/profile', data);
      return res.data?.data || data;
    } catch (err) {
      console.warn('[CareerService] Backend sync failed, preserved locally:', err.message);
      return data;
    }
  },
};

export default careerService;
