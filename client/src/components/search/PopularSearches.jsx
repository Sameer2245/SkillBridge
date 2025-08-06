import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUpIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import api from '../../services/api';

const PopularSearches = ({ className = "" }) => {
  const [trendingSearches, setTrendingSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrendingSearches();
  }, []);

  const fetchTrendingSearches = async () => {
    try {
      const response = await api.get('/search/trending?limit=12');
      setTrendingSearches(response.data.trending || []);
    } catch (error) {
      console.error('Error fetching trending searches:', error);
      // Fallback to static popular searches
      setTrendingSearches([
        { text: 'Logo Design', type: 'category', popularity: 95 },
        { text: 'Website Development', type: 'trending', popularity: 92 },
        { text: 'Content Writing', type: 'trending', popularity: 88 },
        { text: 'Mobile App', type: 'trending', popularity: 85 },
        { text: 'SEO Services', type: 'trending', popularity: 82 },
        { text: 'Video Editing', type: 'trending', popularity: 78 },
        { text: 'Social Media Marketing', type: 'trending', popularity: 75 },
        { text: 'WordPress Development', type: 'trending', popularity: 72 },
        { text: 'Graphic Design', type: 'category', popularity: 70 },
        { text: 'Data Analysis', type: 'trending', popularity: 68 },
        { text: 'AI Chatbot', type: 'trending', popularity: 65 },
        { text: 'Business Plan', type: 'trending', popularity: 62 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = (searchTerm) => {
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-10 bg-gray-200 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUpIcon className="h-5 w-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-900">Popular Services</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {trendingSearches.map((search, index) => (
          <button
            key={index}
            onClick={() => handleSearchClick(search.text)}
            className={`
              group relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              border border-gray-200 hover:border-green-500 hover:shadow-md
              bg-white hover:bg-green-50 text-gray-700 hover:text-green-700
              transform hover:scale-105 active:scale-95
            `}
          >
            <div className="flex items-center space-x-2">
              <MagnifyingGlassIcon className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="truncate">{search.text}</span>
            </div>
            
            {/* Popularity indicator */}
            {search.popularity && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping"></div>
              </div>
            )}
          </button>
        ))}
      </div>
      
      {/* View All Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate('/search')}
          className="inline-flex items-center space-x-2 px-6 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
        >
          <MagnifyingGlassIcon className="h-4 w-4" />
          <span>Explore All Services</span>
        </button>
      </div>
    </div>
  );
};

export default PopularSearches;