import React, { useState } from 'react';
import api from '../../services/api';

const SearchDebug = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Testing search with query:', query);
      console.log('API base URL:', api.defaults.baseURL);
      
      const response = await api.get(`/search?q=${encodeURIComponent(query)}&limit=5`);
      console.log('Search response:', response.data);
      
      setResults(response.data);
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testSuggestions = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Testing suggestions with query:', query);
      
      const response = await api.get(`/search/suggestions?q=${encodeURIComponent(query)}`);
      console.log('Suggestions response:', response.data);
      
      setResults(response.data);
    } catch (err) {
      console.error('Suggestions error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testFilters = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Testing filters');
      
      const response = await api.get('/search/filters');
      console.log('Filters response:', response.data);
      
      setResults(response.data);
    } catch (err) {
      console.error('Filters error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testTrending = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Testing trending');
      
      const response = await api.get('/search/trending');
      console.log('Trending response:', response.data);
      
      setResults(response.data);
    } catch (err) {
      console.error('Trending error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Search API Debug Tool</h2>
      
      <div className="mb-6">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter search query..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={testSearch}
            disabled={loading || !query.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            Test Search
          </button>
          
          <button
            onClick={testSuggestions}
            disabled={loading || !query.trim()}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
          >
            Test Suggestions
          </button>
          
          <button
            onClick={testFilters}
            disabled={loading}
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50"
          >
            Test Filters
          </button>
          
          <button
            onClick={testTrending}
            disabled={loading}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50"
          >
            Test Trending
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      {results && (
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Results:</h3>
          <pre className="bg-white p-4 rounded border overflow-auto max-h-96 text-sm">
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Quick Tests:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {['website', 'logo', 'design', 'programming', 'writing', 'marketing', 'video', 'mobile'].map(term => (
            <button
              key={term}
              onClick={() => {
                setQuery(term);
                setTimeout(() => testSearch(), 100);
              }}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchDebug;