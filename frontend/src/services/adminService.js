import api from './api';

const adminService = {
  getStats: async () => {
    const res = await api.get('/admin/stats');
    return res.data;
  },

  getUsers: async () => {
    const res = await api.get('/admin/users');
    return res.data;
  },

  getActivity: async (limit = 50) => {
    const res = await api.get(`/admin/activity?limit=${limit}`);
    return res.data;
  },

  sendWeeklyReport: async () => {
    const res = await api.post('/admin/send-weekly-report');
    return res.data;
  },
};

export default adminService;
