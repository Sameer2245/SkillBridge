import api from '../services/api';

// Test search functionality
export const testSearchAPI = async () => {
  console.log('🔍 Testing Search API...');
  
  try {
    // Test 1: Basic search
    console.log('Test 1: Basic search for "website"');
    const searchResponse = await api.get('/search?q=website&limit=3');
    console.log('✅ Search API working:', searchResponse.data);
    
    // Test 2: Search suggestions
    console.log('Test 2: Search suggestions for "web"');
    const suggestionsResponse = await api.get('/search/suggestions?q=web&limit=5');
    console.log('✅ Suggestions API working:', suggestionsResponse.data);
    
    // Test 3: Search filters
    console.log('Test 3: Search filters');
    const filtersResponse = await api.get('/search/filters');
    console.log('✅ Filters API working:', filtersResponse.data);
    
    // Test 4: Trending searches
    console.log('Test 4: Trending searches');
    const trendingResponse = await api.get('/search/trending?limit=5');
    console.log('✅ Trending API working:', trendingResponse.data);
    
    console.log('🎉 All search APIs are working correctly!');
    return true;
    
  } catch (error) {
    console.error('❌ Search API test failed:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        baseURL: error.config?.baseURL,
        url: error.config?.url,
        method: error.config?.method
      }
    });
    return false;
  }
};

// Test individual search components
export const testSearchComponents = {
  async testBasicSearch(query = 'website') {
    try {
      const response = await api.get(`/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      throw new Error(`Basic search failed: ${error.message}`);
    }
  },

  async testSuggestions(query = 'web') {
    try {
      const response = await api.get(`/search/suggestions?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      throw new Error(`Suggestions failed: ${error.message}`);
    }
  },

  async testFilters() {
    try {
      const response = await api.get('/search/filters');
      return response.data;
    } catch (error) {
      throw new Error(`Filters failed: ${error.message}`);
    }
  },

  async testTrending() {
    try {
      const response = await api.get('/search/trending');
      return response.data;
    } catch (error) {
      throw new Error(`Trending failed: ${error.message}`);
    }
  }
};

// Auto-run test when this module is imported in development
if (process.env.NODE_ENV === 'development') {
  // Run test after a short delay to ensure API is ready
  setTimeout(() => {
    testSearchAPI();
  }, 2000);
}