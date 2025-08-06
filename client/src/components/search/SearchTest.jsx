import React, { useState } from 'react';
import axios from 'axios';

const SearchTest = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});

  const testSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const response = await axios.get(`/api/search?q=${encodeURIComponent(query)}&limit=10`);
      console.log('Search Response:', response.data);
      setResults(response.data.results || []);
    } catch (error) {
      console.error('Search Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const testSuggestions = async () => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    
    try {
      const response = await axios.get(`/api/search/suggestions?q=${encodeURIComponent(query)}`);
      console.log('Suggestions Response:', response.data);
      setSuggestions(response.data.suggestions || []);
    } catch (error) {
      console.error('Suggestions Error:', error);
    }
  };

  const testFilters = async () => {
    try {
      const response = await axios.get('/api/search/filters');
      console.log('Filters Response:', response.data);
      setFilters(response.data.filters || {});
    } catch (error) {
      console.error('Filters Error:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">🔍 Search System Test</h2>
      
      {/* Search Input */}
      <div className="mb-6">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              testSuggestions();
            }}
            placeholder="Type to search (e.g., logo design, website, mobile app)..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={testSearch}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
          <button
            onClick={testFilters}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Get Filters
          </button>
        </div>
        
        {/* Quick Test Buttons */}
        <div className="flex flex-wrap gap-2">
          {['logo design', 'website development', 'mobile app', 'content writing', 'seo', 'video editing'].map(testQuery => (
            <button
              key={testQuery}
              onClick={() => {
                setQuery(testQuery);
                setTimeout(() => testSearch(), 100);
              }}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300"
            >
              {testQuery}
            </button>
          ))}
        </div>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">💡 Suggestions:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 rounded-lg border cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setQuery(suggestion.text);
                  setTimeout(() => testSearch(), 100);
                }}
              >
                <div className="font-medium">{suggestion.text}</div>
                <div className="text-sm text-gray-500">
                  {suggestion.category} • {suggestion.type}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      {Object.keys(filters).length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">🎛️ Available Filters:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filters.categories && (
              <div>
                <h4 className="font-medium mb-2">Categories:</h4>
                <div className="space-y-1">
                  {filters.categories.slice(0, 5).map(cat => (
                    <div key={cat.name} className="text-sm">
                      {cat.name} ({cat.count})
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {filters.priceRange && (
              <div>
                <h4 className="font-medium mb-2">Price Range:</h4>
                <div className="text-sm">
                  <div>Min: ${filters.priceRange.minPrice}</div>
                  <div>Max: ${filters.priceRange.maxPrice}</div>
                  <div>Avg: ${Math.round(filters.priceRange.avgPrice)}</div>
                </div>
              </div>
            )}
            
            {filters.deliveryTimes && (
              <div>
                <h4 className="font-medium mb-2">Delivery Times:</h4>
                <div className="space-y-1">
                  {filters.deliveryTimes.slice(0, 5).map(dt => (
                    <div key={dt.days} className="text-sm">
                      {dt.label} ({dt.count})
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">🎯 Search Results ({results.length}):</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((gig) => (
              <div key={gig._id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-blue-600 mb-2">{gig.title}</h4>
                <div className="text-sm text-gray-600 mb-2">
                  by {gig.seller?.fullName} • {gig.category}
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  {gig.description}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold text-green-600">
                    ${gig.price}
                  </div>
                  <div className="text-sm text-gray-500">
                    ⭐ {gig.totalRating?.toFixed(1)} ({gig.totalReviews})
                  </div>
                </div>
                {gig.tags && gig.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {gig.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {query && results.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">🔍</div>
          <div>No results found for "{query}"</div>
          <div className="text-sm mt-1">Try different keywords or check the console for API responses</div>
        </div>
      )}
    </div>
  );
};

export default SearchTest;