import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search as SearchIcon, 
  Filter, 
  Star, 
  Clock, 
  Heart, 
  ChevronDown,
  Grid,
  List,
  SlidersHorizontal,
  MapPin,
  Award,
  X
} from 'lucide-react';
import { gigService } from '../services/gigs';
import LoadingSpinner from '../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  
  const searchQuery = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';

  const categories = [
    'Graphics & Design',
    'Digital Marketing', 
    'Writing & Translation',
    'Video & Animation',
    'Music & Audio',
    'Programming & Tech',
    'Business',
    'Lifestyle',
    'Data',
    'Photography'
  ];

  const deliveryOptions = [
    { value: '1', label: '24 hours' },
    { value: '3', label: 'Up to 3 days' },
    { value: '7', label: 'Up to 1 week' },
    { value: '30', label: 'Up to 1 month' }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Most Popular' },
    { value: 'rating', label: 'Best Rating' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest Arrivals' }
  ];

  const [filters, setFilters] = useState({
    sortBy: 'relevance',
    minPrice: '',
    maxPrice: '',
    deliveryTime: '',
    rating: ''
  });

  useEffect(() => {
    performSearch();
  }, [searchParams, currentPage]);

  const performSearch = async () => {
    setLoading(true);
    
    try {
      const searchData = {
        q: searchQuery,
        category: category,
        page: currentPage,
        limit: 12,
        ...filters
      };

      // Remove empty values
      Object.keys(searchData).forEach(key => {
        if (searchData[key] === '' || searchData[key] === undefined) {
          delete searchData[key];
        }
      });

      console.log('Search params:', searchData);
      const response = await gigService.searchGigs(searchData);
      console.log('Search response:', response);
      
      setResults(response.results || response.gigs || []);
      setTotalResults(response.pagination?.totalResults || response.total || 0);
      
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to search gigs');
      setResults([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      sortBy: 'relevance',
      minPrice: '',
      maxPrice: '',
      deliveryTime: '',
      rating: ''
    });
    setCurrentPage(1);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating || 0)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const GigCard = ({ gig }) => (
    <Link
      to={`/gigs/${gig._id}`}
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all duration-300"
    >
      <div className="aspect-video bg-gray-100 relative overflow-hidden">
        <img
          src={gig.images?.[0] || gig.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'}
          alt={gig.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {gig.featured && (
          <span className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 text-xs font-medium rounded">
            Featured
          </span>
        )}
        <button className="absolute top-3 right-3 p-1.5 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-3">
          <img
            src={gig.userId?.profileImage || gig.seller?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
            alt={gig.userId?.username || gig.seller?.username}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">
              {gig.userId?.username || gig.seller?.username || 'Unknown'}
            </p>
            <p className="text-xs text-blue-600">
              {gig.seller?.level || 'Level 1'}
            </p>
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {gig.title}
        </h3>
        
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            {renderStars(gig.totalRating || gig.rating || 0)}
            <span className="font-medium text-gray-900">
              {(gig.totalRating || gig.rating || 0).toFixed(1)}
            </span>
            <span>({gig.totalReviews || gig.reviewCount || 0})</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{gig.deliveryTime} day{gig.deliveryTime > 1 ? 's' : ''}</span>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-gray-900">
              ${gig.price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            {category && (
              <>
                <li><Link to="/explore" className="hover:text-blue-600">Explore</Link></li>
                <li>/</li>
                <li className="text-blue-600 font-medium">{category}</li>
              </>
            )}
          </ol>
        </nav>

        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {searchQuery ? `Results for "${searchQuery}"` : 
             category ? `${category} Services` : 'All Services'}
          </h1>
          <p className="text-gray-600">
            {totalResults} services available
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`w-full lg:w-80 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      to={`/search?category=${encodeURIComponent(cat)}`}
                      className={`block px-3 py-2 text-sm rounded-lg hover:bg-gray-50 ${
                        category === cat ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600'
                      }`}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Delivery Time */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Delivery Time</h4>
                <div className="space-y-2">
                  {deliveryOptions.map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="deliveryTime"
                        value={option.value}
                        checked={filters.deliveryTime === option.value}
                        onChange={(e) => handleFilterChange('deliveryTime', e.target.value)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </button>
                <span className="text-gray-600">{totalResults} services available</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            {results.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-6'
              }>
                {results.map((gig) => (
                  <GigCard key={gig._id} gig={gig} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">
                  No services match your current filters. Try adjusting your criteria.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Debug Info */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Debug Info:</h4>
                <p className="text-sm text-yellow-700">Query: "{searchQuery}"</p>
                <p className="text-sm text-yellow-700">Results: {results.length}</p>
                <p className="text-sm text-yellow-700">Loading: {loading.toString()}</p>
                <p className="text-sm text-yellow-700">API Base URL: {process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
