import React from 'react';
import { 
  MagnifyingGlassIcon, 
  ClockIcon, 
  FunnelIcon,
  ChartBarIcon 
} from '@heroicons/react/24/outline';

const SearchStats = ({ 
  query, 
  totalResults, 
  searchTime, 
  activeFilters = {},
  className = "" 
}) => {
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num?.toLocaleString() || '0';
  };

  const getActiveFiltersCount = () => {
    return Object.values(activeFilters).filter(value => 
      value && value !== '' && value !== 'relevance'
    ).length;
  };

  const getActiveFiltersText = () => {
    const filters = [];
    
    if (activeFilters.category) {
      filters.push(`Category: ${activeFilters.category}`);
    }
    if (activeFilters.minPrice || activeFilters.maxPrice) {
      const priceRange = [];
      if (activeFilters.minPrice) priceRange.push(`$${activeFilters.minPrice}+`);
      if (activeFilters.maxPrice) priceRange.push(`up to $${activeFilters.maxPrice}`);
      filters.push(`Price: ${priceRange.join(' ')}`);
    }
    if (activeFilters.deliveryTime) {
      filters.push(`Delivery: ${activeFilters.deliveryTime} days`);
    }
    if (activeFilters.minRating) {
      filters.push(`Rating: ${activeFilters.minRating}+ stars`);
    }
    
    return filters;
  };

  return (
    <div className={`bg-white border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          {/* Search Info */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              <div>
                {query ? (
                  <span className="text-sm text-gray-600">
                    Results for <span className="font-semibold text-gray-900">"{query}"</span>
                  </span>
                ) : (
                  <span className="text-sm text-gray-600">All services</span>
                )}
              </div>
            </div>
            
            {/* Results Count */}
            <div className="flex items-center space-x-2">
              <ChartBarIcon className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-gray-900">
                {formatNumber(totalResults)} services
              </span>
            </div>
            
            {/* Search Time */}
            {searchTime && (
              <div className="flex items-center space-x-1">
                <ClockIcon className="h-4 w-4 text-gray-400" />
                <span className="text-xs text-gray-500">
                  ({searchTime}ms)
                </span>
              </div>
            )}
          </div>
          
          {/* Active Filters */}
          {getActiveFiltersCount() > 0 && (
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-4 w-4 text-blue-600" />
              <div className="flex flex-wrap gap-2">
                {getActiveFiltersText().map((filter, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {filter}
                  </span>
                ))}
                <span className="text-xs text-gray-500">
                  {getActiveFiltersCount()} filter{getActiveFiltersCount() !== 1 ? 's' : ''} active
                </span>
              </div>
            </div>
          )}
        </div>
        
        {/* Search Suggestions */}
        {query && totalResults === 0 && (
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <MagnifyingGlassIcon className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-800 font-medium">
                  No results found for "{query}"
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  Try different keywords, check spelling, or remove some filters
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="text-xs text-yellow-700">Suggestions:</span>
                  {['logo design', 'website', 'mobile app', 'content writing'].map(suggestion => (
                    <button
                      key={suggestion}
                      className="text-xs text-yellow-800 underline hover:text-yellow-900"
                      onClick={() => window.location.href = `/search?q=${encodeURIComponent(suggestion)}`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Popular in Category */}
        {activeFilters.category && totalResults > 0 && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <ChartBarIcon className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-800">
                Popular in {activeFilters.category}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchStats;