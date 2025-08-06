import React, { useState } from 'react';
import api from '../services/api';

const TestPage = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const testSearch = async () => {
    setLoading(true);
    try {
      console.log('Testing search...');
      const response = await api.get('/search?q=website&limit=5');
      console.log('Response:', response.data);
      setResults(response.data);
    } catch (error) {
      console.error('Error:', error);
      setResults({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Search API Test Page</h1>
        
        <button
          onClick={testSearch}
          disabled={loading}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Search API'}
        </button>

        {results && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Results:</h2>
            <pre className="bg-white p-4 rounded-lg border overflow-auto max-h-96 text-sm">
              {JSON.stringify(results, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Debug Info:</h3>
          <p>Current URL: {window.location.href}</p>
          <p>API Base URL: {api.defaults.baseURL}</p>
          <p>Environment: {process.env.NODE_ENV}</p>
        </div>
      </div>
    </div>
  );
};

export default TestPage;