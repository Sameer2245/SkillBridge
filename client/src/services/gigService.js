import axios from 'axios';

const API_URL = (process.env.REACT_APP_SERVER_URL || 'http://localhost:5000') + '/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const gigService = {
  // Get gig by ID
  getGigById: async (gigId) => {
    try {
      const response = await api.get(`/gigs/details/${gigId}`);
      // Wrap the response to match expected format
      return {
        success: true,
        data: response.data.gigs || response.data
      };
    } catch (error) {
      console.error('Error fetching gig:', error);
      throw error;
    }
  },

  // Get all gigs
  getAllGigs: async (params = {}) => {
    try {
      const response = await api.get('/gigs', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching gigs:', error);
      throw error;
    }
  },

  // Search gigs
  searchGigs: async (searchParams) => {
    try {
      const response = await api.get('/search/gigs', { params: searchParams });
      return response.data;
    } catch (error) {
      console.error('Error searching gigs:', error);
      throw error;
    }
  },

  // Get gigs by category
  getGigsByCategory: async (category, params = {}) => {
    try {
      const response = await api.get('/gigs', { 
        params: { ...params, category } 
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching gigs by category:', error);
      throw error;
    }
  },

  // Get seller's gigs
  getSellerGigs: async (sellerId) => {
    try {
      const response = await api.get(`/gigs/seller/${sellerId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching seller gigs:', error);
      throw error;
    }
  },
};

export default gigService;