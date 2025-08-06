import api from './api';

export const gigService = {
  // Get all gigs with optional filters
  getGigs: async (params = {}) => {
    const response = await api.get('/gigs', { params });
    return response.data;
  },

  // Get single gig by ID
  getGig: async (id) => {
    const response = await api.get(`/gigs/${id}`);
    return response.data;
  },

  // Create new gig
  createGig: async (gigData) => {
    const response = await api.post('/gigs', gigData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update gig
  updateGig: async (id, gigData) => {
    const response = await api.put(`/gigs/${id}`, gigData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete gig
  deleteGig: async (id) => {
    const response = await api.delete(`/gigs/${id}`);
    return response.data;
  },

  // Get user's gigs
  getUserGigs: async () => {
    const response = await api.get('/gigs/seller/my-gigs');
    return response.data;
  },

  // Alias for getUserGigs for compatibility
  getMyGigs: async () => {
    const response = await api.get('/gigs/seller/my-gigs');
    return response.data;
  },

  // Search gigs
  searchGigs: async (searchParams) => {
    // Handle both string query and object params
    if (typeof searchParams === 'string') {
      const response = await api.get(`/search?q=${encodeURIComponent(searchParams)}`);
      return {
        results: response.data.gigs || [],
        pagination: response.data.pagination || { totalResults: 0 }
      };
    }
    
    // Handle object with multiple search parameters
    const response = await api.get('/search', { params: searchParams });
    return {
      results: response.data.gigs || [],
      pagination: response.data.pagination || { totalResults: 0 }
    };
  },
};