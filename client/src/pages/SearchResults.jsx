import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  FunnelIcon, 
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  StarIcon,
  HeartIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import api from '../services/api';
import SearchBar from '../components/search/SearchBar';
import LoadingSpinner from '../components/common/LoadingSpinner';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Search state
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({});
  
  // Filter state
  const [showFilters, setShowFilters] = useState(false);
  const [availableFilters, setAvailableFilters] = useState({});
  
  // Get current search parameters
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page')) || 1;
  const category = searchParams.get('category') || '';
  const subcategory = searchParams.get('subcategory') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const deliveryTime = searchParams.get('deliveryTime') || '';
  const sortBy = searchParams.get('sortBy') || 'relevance';
  const minRating = searchParams.get('minRating') || '';

  // Fetch search results
  const fetchResults = async () => {
    try {
      setLoading(true);
      
      // Debug logging
      console.log('SearchResults - fetchResults called');
      console.log('SearchResults - Current query:', query);
      console.log('SearchResults - Current searchParams:', Object.fromEntries(searchParams));
      
      const params = new URLSearchParams();
      if (query) params.append('q', query);
      if (page > 1) params.append('page', page);
      if (category) params.append('category', category);
      if (subcategory) params.append('subcategory', subcategory);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);
      if (deliveryTime) params.append('deliveryTime', deliveryTime);
      if (sortBy) params.append('sortBy', sortBy);
      if (minRating) params.append('minRating', minRating);
      
      const searchUrl = `/search?${params.toString()}`;
      console.log('SearchResults - Making API call to:', searchUrl);
      
      const response = await api.get(searchUrl);
      console.log('SearchResults - API response:', response.data);
      
      if (response.data.success) {
        console.log('SearchResults - Setting results:', response.data.results.length, 'items');
        setResults(response.data.results);
        setPagination(response.data.pagination);
        setFilters(response.data.filters);
      } else {
        console.log('SearchResults - API returned success: false');
        setResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      console.error('Search error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
        baseURL: error.config?.baseURL
      });
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch available filters
  const fetchAvailableFilters = async () => {
    try {
      const response = await api.get('/search/filters');
      if (response.data.success) {
        setAvailableFilters(response.data.filters);
      }
    } catch (error) {
      console.error('Filters error:', error);
    }
  };

  // Load data on mount and when search params change
  useEffect(() => {
    fetchResults();
  }, [searchParams]);

  useEffect(() => {
    fetchAvailableFilters();
  }, []);

  // Update search parameters
  const updateSearchParams = (newParams) => {
    const updatedParams = new URLSearchParams(searchParams);
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        updatedParams.set(key, value);
      } else {
        updatedParams.delete(key);
      }
    });
    
    // Reset to page 1 when filters change
    if (Object.keys(newParams).some(key => key !== 'page')) {
      updatedParams.set('page', '1');
    }
    
    setSearchParams(updatedParams);
  };

  // Handle new search
  const handleSearch = (newQuery) => {
    updateSearchParams({ q: newQuery, page: '1' });
  };

  // Handle sort change
  const handleSortChange = (newSort) => {
    updateSearchParams({ sortBy: newSort });
  };

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    updateSearchParams({ [filterType]: value });
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    updateSearchParams({ page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchParams(new URLSearchParams({ q: query }));
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Render star rating
  const renderStars = (rating, reviews) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <StarIconSolid key={i} className="h-4 w-4 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <StarIcon className="h-4 w-4 text-gray-300" />
            <StarIconSolid className="h-4 w-4 text-yellow-400 absolute top-0 left-0 w-1/2 overflow-hidden" />
          </div>
        );
      } else {
        stars.push(
          <StarIcon key={i} className="h-4 w-4 text-gray-300" />
        );
      }
    }
    
    return (
      <div className="flex items-center space-x-1">
        <div className="flex">{stars}</div>
        <span className="text-sm text-gray-600">
          {rating.toFixed(1)} ({reviews})
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Search */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <SearchBar 
            onSearch={handleSearch}
            size="medium"
            className="mb-4"
          />
          
          {/* Search Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-semibold text-gray-900">
                {query ? `Results for "${query}"` : 'All Services'}
              </h1>
              {pagination.totalResults && (
                <span className="text-sm text-gray-500">
                  {pagination.totalResults.toLocaleString()} services available
                </span>
              )}
            </div>
            
            {/* Sort and Filter Controls */}
            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="relevance">Best Match</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="delivery">Fastest Delivery</option>
                </select>
                <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
              
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
              >
                <FunnelIcon className="h-4 w-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-32">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-green-600 hover:text-green-700"
                  >
                    Clear all
                  </button>
                </div>
                
                {/* Category Filter */}
                {availableFilters.categories && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                    <select
                      value={category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                      <option value="">All Categories</option>
                      {availableFilters.categories.map(cat => (
                        <option key={cat.name} value={cat.name}>
                          {cat.name} ({cat.count})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                
                {/* Price Range Filter */}
                {availableFilters.priceRange && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                )}
                
                {/* Delivery Time Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Delivery Time</h4>
                  <select
                    value={deliveryTime}
                    onChange={(e) => handleFilterChange('deliveryTime', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">Any time</option>
                    <option value="1">Express 24H</option>
                    <option value="3">Up to 3 days</option>
                    <option value="7">Up to 1 week</option>
                    <option value="14">Up to 2 weeks</option>
                  </select>
                </div>
                
                {/* Rating Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Seller Rating</h4>
                  <select
                    value={minRating}
                    onChange={(e) => handleFilterChange('minRating', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">Any rating</option>
                    <option value="4.5">4.5+ stars</option>
                    <option value="4.0">4.0+ stars</option>
                    <option value="3.5">3.5+ stars</option>
                    <option value="3.0">3.0+ stars</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            {/* Debug info for development */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mb-4 p-2 bg-yellow-100 border border-yellow-300 rounded text-xs">
                <strong>Debug:</strong> Loading: {loading.toString()}, Results: {results.length}, Query: "{query}"<br/>
                <strong>Results type:</strong> {typeof results}, Array: {Array.isArray(results).toString()}<br/>
                <strong>Condition:</strong> results.length > 0 = {(results.length > 0).toString()}<br/>
                <strong>Results preview:</strong> {JSON.stringify(results.slice(0, 1), null, 2)}
              </div>
            )}
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <LoadingSpinner size="large" />
              </div>
            ) : results.length > 0 ? (
              <>
                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {results.map((gig) => (
                    <div
                      key={gig._id}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
                      onClick={() => navigate(`/gigs/${gig._id}`)}
                    >
                      {/* Gig Image */}
                      <div className="relative h-48 bg-gray-200">
                        {gig.images && gig.images[0] ? (
                          <img
                            src={gig.images[0]}
                            alt={gig.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No Image
                          </div>
                        )}
                        
                        {/* Favorite Button */}
                        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50">
                          <HeartIcon className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                      
                      {/* Gig Content */}
                      <div className="p-4">
                        {/* Seller Info */}
                        <div className="flex items-center space-x-2 mb-3">
                          <img
                            src={gig.seller.profileImage || '/default-avatar.png'}
                            alt={gig.seller.fullName}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-sm font-medium text-gray-900">
                            {gig.seller.fullName}
                          </span>
                          {gig.seller.country && (
                            <div className="flex items-center text-xs text-gray-500">
                              <MapPinIcon className="h-3 w-3 mr-1" />
                              {gig.seller.country}
                            </div>
                          )}
                        </div>
                        
                        {/* Gig Title */}
                        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                          {gig.title}
                        </h3>
                        
                        {/* Rating */}
                        <div className="mb-3">
                          {renderStars(gig.totalRating, gig.totalReviews)}
                        </div>
                        
                        {/* Tags */}
                        {gig.tags && gig.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {gig.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {/* Price and Delivery */}
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-bold text-gray-900">
                            {formatPrice(gig.price)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {gig.deliveryTime} day{gig.deliveryTime !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={!pagination.hasPrevPage}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    
                    {/* Page Numbers */}
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      const pageNum = Math.max(1, pagination.currentPage - 2) + i;
                      if (pageNum > pagination.totalPages) return null;
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-4 py-2 border rounded-md text-sm ${
                            pageNum === pagination.currentPage
                              ? 'bg-green-600 text-white border-green-600'
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={!pagination.hasNextPage}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* No Results */
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="mb-4">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {query 
                      ? `We couldn't find any services matching "${query}". Try adjusting your search or filters.`
                      : 'No services match your current filters. Try adjusting your criteria.'
                    }
                  </p>
                  {process.env.NODE_ENV === 'development' && (
                    <div className="text-xs text-gray-400 mb-4 p-2 bg-gray-100 rounded">
                      <strong>Debug Info:</strong><br/>
                      Query: "{query}"<br/>
                      Results: {results.length}<br/>
                      Loading: {loading.toString()}<br/>
                      API Base URL: {process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}
                    </div>
                  )}
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    Clear filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;