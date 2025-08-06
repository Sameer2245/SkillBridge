import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { gigSearchSchema } from '../schemas/gigSchemas';
import { gigService } from '../services/gigs';
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
  Verified,
  X,
  ArrowUpDown,
  Check
} from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import SkillBridgeGigCard from '../components/common/SkillBridgeGigCard';
import toast from 'react-hot-toast';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: '',
    maxPrice: '',
    deliveryTime: '',
    sellerLevel: '',
    rating: '',
    location: '',
    language: '',
    sortBy: 'relevance'
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(gigSearchSchema),
    defaultValues: {
      query: searchParams.get('q') || '',
      category: searchParams.get('category') || '',
      minPrice: '',
      maxPrice: '',
      deliveryTime: '',
      sortBy: 'relevance',
      page: 1,
      limit: 12,
    },
  });

  const watchedValues = watch();

  const categories = [
    'Web Development',
    'Design & Creative', 
    'Writing & Translation',
    'Digital Marketing',
    'Video & Animation',
    'Music & Audio',
    'Programming & Tech',
    'Business'
  ];

  const deliveryOptions = [
    { value: '1', label: '24 hours' },
    { value: '3', label: 'Up to 3 days' },
    { value: '7', label: 'Up to 1 week' },
    { value: '30', label: 'Up to 1 month' }
  ];

  const sellerLevels = [
    'New Seller',
    'Level 1',
    'Level 2', 
    'Top Rated Seller'
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'rating', label: 'Best Rating' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'popular', label: 'Most Popular' }
  ];

  useEffect(() => {
    // Initialize form with URL params
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    
    setValue('query', query);
    setValue('category', category);
    
    if (query || category) {
      performSearch({ query, category });
    }
  }, [searchParams, setValue]);

  const performSearch = async (searchData = watchedValues) => {
    setLoading(true);
    
    try {
      // Clean up search data
      const cleanedData = {
        ...searchData,
        minPrice: searchData.minPrice ? Number(searchData.minPrice) : undefined,
        maxPrice: searchData.maxPrice ? Number(searchData.maxPrice) : undefined,
        deliveryTime: searchData.deliveryTime ? Number(searchData.deliveryTime) : undefined,
        page: currentPage,
      };

      // Remove empty values
      Object.keys(cleanedData).forEach(key => {
        if (cleanedData[key] === '' || cleanedData[key] === undefined) {
          delete cleanedData[key];
        }
      });

      const response = await gigService.searchGigs(cleanedData);
      setResults(response.results || []);
      setTotalResults(response.pagination?.totalResults || 0);
      
      // Update URL params
      const newParams = new URLSearchParams();
      if (cleanedData.query) newParams.set('q', cleanedData.query);
      if (cleanedData.category) newParams.set('category', cleanedData.category);
      setSearchParams(newParams);
      
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to search gigs');
      setResults([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data) => {
    setCurrentPage(1);
    performSearch(data);
  };

  const clearFilters = () => {
    setValue('query', '');
    setValue('category', '');
    setValue('minPrice', '');
    setValue('maxPrice', '');
    setValue('deliveryTime', '');
    setValue('sortBy', 'relevance');
    setCurrentPage(1);
    performSearch({
      query: '',
      category: '',
      sortBy: 'relevance',
      page: 1,
    });
  };

  // Mock search results for fallback
  useEffect(() => {
    if (!results.length && !loading) {
      const fetchResults = () => {
        setLoading(true);
      const mockResults = [
        {
          _id: '1',
          title: 'I will create a modern responsive website for your business',
            description: 'Professional web development with React, Node.js, and modern design principles',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
            seller: {
              username: 'sarah_dev',
              name: 'Sarah Johnson',
              avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
              level: 'Top Rated Seller',
              rating: 4.9,
              reviewCount: 127,
              location: 'United States'
            },
            price: 299,
            originalPrice: 399,
            deliveryTime: 7,
            rating: 4.9,
            reviewCount: 127,
            orders: 89,
            category: 'Web Development',
            tags: ['react', 'nodejs', 'responsive', 'modern'],
            featured: true,
            verified: true
          },
          {
            _id: '2',
            title: 'I will design a professional logo and brand identity',
            description: 'Creative logo design with unlimited revisions and brand guidelines',
            image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
            seller: {
              username: 'alex_design',
              name: 'Alex Chen',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
              level: 'Level 2',
              rating: 4.8,
              reviewCount: 89,
              location: 'Canada'
            },
            price: 150,
            deliveryTime: 3,
            rating: 4.8,
            reviewCount: 89,
            orders: 156,
            category: 'Design & Creative',
            tags: ['logo', 'branding', 'creative', 'professional'],
            featured: false,
            verified: true
          },
          {
            _id: '3',
            title: 'I will write SEO optimized content for your website',
            description: 'High-quality content writing that ranks well and converts visitors',
            image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
            seller: {
              username: 'maria_writer',
              name: 'Maria Rodriguez',
              avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
              level: 'Level 1',
              rating: 4.7,
              reviewCount: 64,
              location: 'Spain'
            },
            price: 75,
            deliveryTime: 5,
            rating: 4.7,
            reviewCount: 64,
            orders: 78,
            category: 'Writing & Translation',
            tags: ['seo', 'content', 'writing', 'marketing'],
            featured: false,
            verified: false
          },
          {
            _id: '4',
            title: 'I will create a mobile app UI/UX design',
            description: 'Modern mobile app design with user-centered approach and prototyping',
            image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
            seller: {
              username: 'david_ux',
              name: 'David Kim',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
              level: 'Top Rated Seller',
              rating: 4.9,
              reviewCount: 203,
              location: 'South Korea'
            },
            price: 500,
            deliveryTime: 10,
            rating: 4.9,
            reviewCount: 203,
            orders: 145,
            category: 'Design & Creative',
            tags: ['mobile', 'ui', 'ux', 'app design'],
            featured: true,
            verified: true
          },
          {
            _id: '5',
            title: 'I will create engaging social media content and strategy',
            description: 'Complete social media management with content creation and analytics',
            image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
            seller: {
              username: 'emma_social',
              name: 'Emma Wilson',
              avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face',
              level: 'Level 2',
              rating: 4.6,
              reviewCount: 92,
              location: 'United Kingdom'
            },
            price: 200,
            deliveryTime: 7,
            rating: 4.6,
            reviewCount: 92,
            orders: 67,
            category: 'Digital Marketing',
            tags: ['social media', 'content', 'marketing', 'strategy'],
            featured: false,
            verified: true
          },
          {
            _id: '6',
            title: 'I will develop a custom WordPress website',
            description: 'Professional WordPress development with custom themes and plugins',
            image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop',
            seller: {
              username: 'john_wp',
              name: 'John Smith',
              avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=50&h=50&fit=crop&crop=face',
              level: 'Level 1',
              rating: 4.5,
              reviewCount: 45,
              location: 'Australia'
            },
            price: 350,
            deliveryTime: 14,
            rating: 4.5,
            reviewCount: 45,
            orders: 34,
            category: 'Web Development',
            tags: ['wordpress', 'cms', 'custom', 'development'],
            featured: false,
            verified: false
          }
        ];

        // Filter results based on search query and filters
        let filteredResults = mockResults;

        if (searchQuery) {
          filteredResults = filteredResults.filter(result =>
            result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            result.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            result.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
          );
        }

        if (filters.category) {
          filteredResults = filteredResults.filter(result => result.category === filters.category);
        }

        if (filters.minPrice) {
          filteredResults = filteredResults.filter(result => result.price >= parseInt(filters.minPrice));
        }

        if (filters.maxPrice) {
          filteredResults = filteredResults.filter(result => result.price <= parseInt(filters.maxPrice));
        }

        if (filters.deliveryTime) {
          filteredResults = filteredResults.filter(result => result.deliveryTime <= parseInt(filters.deliveryTime));
        }

        if (filters.sellerLevel) {
          filteredResults = filteredResults.filter(result => result.seller?.level === filters.sellerLevel);
        }

        if (filters.rating) {
          filteredResults = filteredResults.filter(result => result.rating >= parseFloat(filters.rating));
        }

        // Sort results
        switch (filters.sortBy) {
          case 'rating':
            filteredResults.sort((a, b) => b.rating - a.rating);
            break;
          case 'price_low':
            filteredResults.sort((a, b) => a.price - b.price);
            break;
          case 'price_high':
            filteredResults.sort((a, b) => b.price - a.price);
            break;
          case 'popular':
            filteredResults.sort((a, b) => b.orders - a.orders);
            break;
          case 'newest':
            // Would sort by creation date in real app
            break;
          default:
            // Relevance - featured first, then by rating
            filteredResults.sort((a, b) => {
              if (a.featured && !b.featured) return -1;
              if (!a.featured && b.featured) return 1;
              return b.rating - a.rating;
            });
        }

        setResults(filteredResults);
        setLoading(false);
      };

      setTimeout(() => {
        fetchResults();
      }, 1000);
    }
  }, [results.length, loading]);

  const handleSearch = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchQuery) {
      newParams.set('q', searchQuery);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
  };

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };



  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getSellerLevelColor = (level) => {
    switch (level) {
      case 'Top Rated Seller':
        return 'bg-purple-100 text-purple-800';
      case 'Level 2':
        return 'bg-blue-100 text-blue-800';
      case 'Level 1':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-blue-600">SkillBridge</Link>
          <span>/</span>
          <span>{searchQuery || 'Search Results'}</span>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {searchQuery ? `Results for "${searchQuery}"` : 'Browse Services'}
            </h1>
            <p className="text-gray-600">
              {loading ? 'Searching...' : `${results.length} services available`}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort dropdown */}
            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilter('sortBy', e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-fiverr-500 focus:border-transparent"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex items-center space-x-4 mb-6 pb-4 border-b border-gray-200">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Quick filters */}
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
              Pro services
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
              Local sellers
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
              Online sellers
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Filter by</h3>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-fiverr-500 hover:text-fiverr-600"
                  >
                    Clear all
                  </button>
                </div>

                <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => updateFilter('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => updateFilter('minPrice', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => updateFilter('maxPrice', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Delivery Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Time
                  </label>
                  <select
                    value={filters.deliveryTime}
                    onChange={(e) => updateFilter('deliveryTime', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Any time</option>
                    {deliveryOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Seller Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seller Level
                  </label>
                  <select
                    value={filters.sellerLevel}
                    onChange={(e) => updateFilter('sellerLevel', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Any level</option>
                    {sellerLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Rating
                  </label>
                  <select
                    value={filters.rating}
                    onChange={(e) => updateFilter('rating', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <LoadingSpinner />
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SearchIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or filters
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map((gig) => (
                  <SkillBridgeGigCard key={gig._id} gig={gig} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;