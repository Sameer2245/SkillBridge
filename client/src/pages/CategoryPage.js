import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Clock, Filter, Grid, List, ChevronDown, Users, TrendingUp, Search } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { searchGigs } from '../services/api';

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [gigs, setGigs] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    deliveryTime: '',
    minRating: ''
  });

  // Convert slug to category name
  const slugToCategory = {
    'graphics-design': 'Graphics & Design',
    'digital-marketing': 'Digital Marketing',
    'writing-translation': 'Writing & Translation',
    'video-animation': 'Video & Animation',
    'music-audio': 'Music & Audio',
    'programming-tech': 'Programming & Tech',
    'business': 'Business',
    'lifestyle': 'Lifestyle',
    'data': 'Data',
    'photography': 'Photography'
  };

  const categoryName = slugToCategory[categorySlug] || categorySlug?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

  useEffect(() => {
    fetchCategoryGigs();
  }, [categorySlug, currentPage, sortBy, filters]);

  const fetchCategoryGigs = async () => {
    try {
      setLoading(true);
      const params = {
        category: categoryName,
        page: currentPage,
        limit: 20,
        sortBy: sortBy,
        ...filters
      };

      const response = await searchGigs(params);
      
      if (response.success) {
        setGigs(response.results || []);
        setTotalResults(response.pagination?.totalResults || 0);
      } else {
        console.error('Failed to fetch gigs:', response.message);
        setGigs([]);
        setTotalResults(0);
      }
    } catch (error) {
      console.error('Error fetching category gigs:', error);
      setGigs([]);
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

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Graphics & Design': '🎨',
      'Digital Marketing': '📈',
      'Writing & Translation': '✍️',
      'Video & Animation': '🎬',
      'Music & Audio': '🎵',
      'Programming & Tech': '💻',
      'Business': '💼',
      'Lifestyle': '🌟',
      'Data': '📊',
      'Photography': '📸'
    };
    return icons[category] || '🔧';
  };

  if (loading && gigs.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm text-3xl">
                {getCategoryIcon(categoryName)}
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              {categoryName}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-blue-100 max-w-3xl mx-auto px-4">
              Find professional {categoryName.toLowerCase()} services from top-rated freelancers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-4 text-blue-200">
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  <span>{totalResults}+ Services</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  <span>4.8 Avg Rating</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  <span>Starting at $5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li><Link to="/explore" className="hover:text-blue-600">Explore</Link></li>
            <li>/</li>
            <li className="text-blue-600 font-medium">{categoryName}</li>
          </ol>
        </nav>

        {/* Services Section */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <div className={`w-full lg:w-80 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Delivery Time */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Delivery Time</h4>
                <select
                  value={filters.deliveryTime}
                  onChange={(e) => handleFilterChange('deliveryTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any time</option>
                  <option value="1">1 day</option>
                  <option value="3">3 days</option>
                  <option value="7">7 days</option>
                  <option value="14">14 days</option>
                </select>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Minimum Rating</h4>
                <select
                  value={filters.minRating}
                  onChange={(e) => handleFilterChange('minRating', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any rating</option>
                  <option value="4.5">4.5+ stars</option>
                  <option value="4.0">4.0+ stars</option>
                  <option value="3.5">3.5+ stars</option>
                  <option value="3.0">3.0+ stars</option>
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setFilters({
                    minPrice: '',
                    maxPrice: '',
                    deliveryTime: '',
                    minRating: ''
                  });
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
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
                <span className="text-gray-600">
                  {loading ? 'Loading...' : `${totalResults} services available`}
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="delivery">Fastest Delivery</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center py-12">
                <LoadingSpinner />
              </div>
            )}

            {/* No Results */}
            {!loading && gigs.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search for something else.
                </p>
                <button
                  onClick={() => {
                    setFilters({
                      minPrice: '',
                      maxPrice: '',
                      deliveryTime: '',
                      minRating: ''
                    });
                    setCurrentPage(1);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Gigs Grid/List */}
            {!loading && gigs.length > 0 && (
              <>
                <div className={viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                  : "space-y-6"
                }>
                  {gigs.map((gig) => (
                    <div
                      key={gig._id}
                      className={`bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden ${
                        viewMode === 'list' ? 'flex' : ''
                      }`}
                    >
                      {/* Gig Image */}
                      <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-w-16 aspect-h-10'}>
                        <img
                          src={gig.images?.[0] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'}
                          alt={gig.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>

                      {/* Gig Content */}
                      <div className="p-4 flex-1">
                        {/* Seller Info */}
                        <div className="flex items-center space-x-2 mb-3">
                          <img
                            src={gig.seller?.profileImage || `https://ui-avatars.com/api/?name=${gig.seller?.fullName || 'User'}&background=random`}
                            alt={gig.seller?.fullName}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-sm text-gray-600 font-medium">
                            {gig.seller?.fullName || gig.seller?.username}
                          </span>
                          {gig.seller?.country && (
                            <span className="text-xs text-gray-500">• {gig.seller.country}</span>
                          )}
                        </div>

                        {/* Gig Title */}
                        <Link
                          to={`/gigs/${gig._id}`}
                          className="block font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2 line-clamp-2"
                        >
                          {gig.title}
                        </Link>

                        {/* Rating */}
                        <div className="flex items-center space-x-1 mb-3">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-900">
                            {gig.totalRating > 0 ? gig.totalRating.toFixed(1) : 'New'}
                          </span>
                          {gig.totalReviews > 0 && (
                            <span className="text-sm text-gray-500">({gig.totalReviews})</span>
                          )}
                        </div>

                        {/* Price and Delivery */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{gig.deliveryTime} day{gig.deliveryTime !== 1 ? 's' : ''}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">Starting at</div>
                            <div className="text-lg font-bold text-gray-900">${gig.price}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {Math.ceil(totalResults / 20) > 1 && (
                  <div className="flex justify-center mt-12">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      
                      {[...Array(Math.min(5, Math.ceil(totalResults / 20)))].map((_, i) => {
                        const pageNum = i + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`px-4 py-2 rounded-lg ${
                              currentPage === pageNum
                                ? 'bg-blue-600 text-white'
                                : 'border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= Math.ceil(totalResults / 20)}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;