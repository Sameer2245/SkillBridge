import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import IntelligentSearchBar from '../components/common/IntelligentSearchBar';
import { TrendingUp, Sparkles, Search as SearchIcon, Filter, Grid, List } from 'lucide-react';
import axios from 'axios';

const IntelligentSearch = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trending, setTrending] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [totalResults, setTotalResults] = useState(0);

  const initialQuery = searchParams.get('q') || '';

  useEffect(() => {
    loadTrendingSearches();
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  const loadTrendingSearches = async () => {
    try {
      const response = await axios.get('/api/search/trending?limit=12');
      setTrending(response.data.trending || []);
    } catch (error) {
      console.error('Error fetching trending searches:', error);
    }
  };

  const performSearch = async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      // This would typically call your gig search API
      const response = await axios.get(`/api/gigs?search=${encodeURIComponent(query)}&limit=20`);
      setResults(response.data.gigs || []);
      setTotalResults(response.data.total || 0);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    navigate(`/intelligent-search?q=${encodeURIComponent(query)}`);
    performSearch(query);
  };

  const handleTrendingClick = (trendingItem) => {
    handleSearch(trendingItem.text);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find the Perfect Service
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Intelligent search with real-time suggestions and trending services
            </p>
          </div>

          {/* Main Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <IntelligentSearchBar
              placeholder="Try 'AI chatbot', 'logo design', or 'web development'..."
              onSearch={handleSearch}
              showTrending={true}
              className="w-full"
            />
          </div>

          {/* Quick Stats */}
          <div className="flex justify-center space-x-8 text-sm text-blue-100">
            <div>
              <span className="font-semibold text-white">10,000+</span> Services
            </div>
            <div>
              <span className="font-semibold text-white">5,000+</span> Freelancers
            </div>
            <div>
              <span className="font-semibold text-white">50+</span> Categories
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Results */}
        {initialQuery && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Search Results for "{initialQuery}"
                </h2>
                <p className="text-gray-600 mt-1">
                  {loading ? 'Searching...' : `${totalResults} results found`}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : results.length > 0 ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {results.map((gig) => (
                  <div key={gig._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                        {gig.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {gig.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium">
                              {gig.seller?.username?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-sm text-gray-700">
                            {gig.seller?.username}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            ${gig.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">Try adjusting your search terms or browse trending services below.</p>
              </div>
            )}
          </div>
        )}

        {/* Trending Services */}
        {!initialQuery && trending.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <TrendingUp className="w-6 h-6 text-green-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Trending Services</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {trending.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleTrendingClick(item)}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-left group border border-gray-100 hover:border-blue-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {item.type === 'trending' && <TrendingUp className="w-5 h-5 text-green-500" />}
                      {item.type === 'category' && <Filter className="w-5 h-5 text-orange-500" />}
                      {item.type === 'gig' && <Sparkles className="w-5 h-5 text-blue-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                        {item.text}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {item.category}
                      </p>
                    </div>
                    {item.popularity && (
                      <div className="flex-shrink-0">
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                          {item.popularity}+
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Popular Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Web Development', icon: '💻', color: 'bg-blue-100 text-blue-600' },
              { name: 'Logo Design', icon: '🎨', color: 'bg-purple-100 text-purple-600' },
              { name: 'Content Writing', icon: '✍️', color: 'bg-green-100 text-green-600' },
              { name: 'Digital Marketing', icon: '📈', color: 'bg-red-100 text-red-600' },
              { name: 'Video Editing', icon: '🎬', color: 'bg-yellow-100 text-yellow-600' },
              { name: 'AI Services', icon: '🤖', color: 'bg-indigo-100 text-indigo-600' }
            ].map((category, index) => (
              <button
                key={index}
                onClick={() => handleSearch(category.name)}
                className={`p-4 rounded-lg ${category.color} hover:shadow-md transition-all duration-200 text-center group`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <p className="font-medium text-sm group-hover:scale-105 transition-transform">
                  {category.name}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntelligentSearch;