import axios from 'axios';

// Local dev uses Vite proxy (/api), production uses the deployed Render backend
const isLocal = typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const baseURL = isLocal
  ? '/api'
  : 'https://hub-872l.onrender.com/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Interceptor to inject JWT Bearer Token into requests automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('hub_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle responses and global 401s gracefully
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If token expired, clear invalid auth
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/register' && currentPath !== '/') {
        localStorage.removeItem('hub_auth_token');
        localStorage.removeItem('hub_user_profile');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
