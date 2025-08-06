import api from './api';

export const authService = {
  // Register new user
  register: async (userData) => {
    console.log('🔍 AuthService: Making registration API call:', userData);
    
    const response = await api.post('/auth/register', userData);
    console.log('✅ AuthService: Registration API response:', response.data);
    
    if (response.data.token) {
      console.log('💾 AuthService: Storing token and user in localStorage');
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    console.log('🔍 AuthService: Making login API call:', credentials);
    
    const response = await api.post('/auth/login', credentials);
    console.log('✅ AuthService: Login API response:', response.data);
    
    if (response.data.token) {
      console.log('💾 AuthService: Storing token and user in localStorage');
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Get user profile
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.put('/auth/profile', userData);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  },
};