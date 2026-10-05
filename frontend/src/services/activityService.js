import api from './api';

const activityService = {
  track: async (module, type, details = {}) => {
    try {
      const res = await api.post('/activity/track', {
        module,
        type,
        details,
      });
      return res.data;
    } catch (err) {
      // Non-blocking background telemetry
      return null;
    }
  },
};

export default activityService;
