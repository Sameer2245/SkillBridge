import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: (process.env.REACT_APP_SERVER_URL || 'http://localhost:5000') + '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Search API functions
export const searchGigs = async (params = {}) => {
  try {
    const response = await api.get('/search', { params });
    return response.data;
  } catch (error) {
    console.error('Search gigs error:', error);
    throw error;
  }
};

export const getSearchSuggestions = async (query) => {
  try {
    const response = await api.get('/search/suggestions', { params: { q: query } });
    return response.data;
  } catch (error) {
    console.error('Get search suggestions error:', error);
    throw error;
  }
};

export const getSearchFilters = async () => {
  try {
    const response = await api.get('/search/filters');
    return response.data;
  } catch (error) {
    console.error('Get search filters error:', error);
    throw error;
  }
};

export const getTrendingSearches = async (limit = 20) => {
  try {
    const response = await api.get('/search/trending', { params: { limit } });
    return response.data;
  } catch (error) {
    console.error('Get trending searches error:', error);
    throw error;
  }
};

export default api;