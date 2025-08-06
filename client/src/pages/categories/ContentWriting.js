import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PenTool, Star, Clock, Shield, Award, Filter, Grid, List, Users, TrendingUp, BookOpen } from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ContentWriting = () => {
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const subcategories = [
    { name: 'Blog Writing', count: 967, popular: true },
    { name: 'Article Writing', count: 743 },
    { name: 'Copywriting', count: 521 },
    { name: 'Technical Writing', count: 298 },
    { name: 'Creative Writing', count: 412 },
    { name: 'SEO Content', count: 634 }
  ];

  const topSellers = [
    {
      id: 1,
      name: 'Jennifer Adams',
      avatar: 'https://ui-avatars.com/api/?name=Jennifer+Adams&background=10B981&color=fff',
      rating: 4.9,
      reviews: 1543,
      level: 'Top Rated Seller',
      specialties: ['Blog Writing', 'SEO Content'],
      startingPrice: 20
    },
    {
      id: 2,
      name: 'David Miller',
      avatar: 'https://ui-avatars.com/api/?name=David+Miller&background=10B981&color=fff',
      rating: 4.8,
      reviews: 1234,
      level: 'Level 2 Seller',
      specialties: ['Technical Writing', 'Copywriting'],
      startingPrice: 25
    },
    {
      id: 3,
      name: 'Rachel Green',
      avatar: 'https://ui-avatars.com/api/?name=Rachel+Green&background=10B981&color=fff',
      rating: 4.9,
      reviews: 1876,
      level: 'Top Rated Seller',
      specialties: ['Creative Writing', 'Article Writing'],
      startingPrice: 30
    }
  ];

  const featuredServices = [
    {
      id: '6888f4dbf2e2b10aaa014223',
      title: 'I will write SEO optimized content for your website',
      seller: 'Jennifer Adams',
      sellerAvatar: 'https://ui-avatars.com/api/?name=Jennifer+Adams&background=10B981&color=fff',
      rating: 4.9,
      reviews: 1543,
      price: 20,
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop',
      deliveryTime: '2 days',
      level: 'Top Rated'
    },
    {
      id: 2,
      title: 'I will create compelling copywriting for your business',
      seller: 'David Miller',
      sellerAvatar: 'https://ui-avatars.com/api/?name=David+Miller&background=10B981&color=fff',
      rating: 4.8,
      reviews: 1234,
      price: 25,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
      deliveryTime: '1 day',
      level: 'Level 2'
    },
    {
      id: 3,
      title: 'I will write SEO optimized articles that rank',
      seller: 'Rachel Green',
      sellerAvatar: 'https://ui-avatars.com/api/?name=Rachel+Green&background=10B981&color=fff',
      rating: 4.9,
      reviews: 1876,
      price: 30,
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=300&fit=crop',
      deliveryTime: '3 days',
      level: 'Top Rated'
    },
    {
      id: 4,
      title: 'I will write technical documentation and manuals',
      seller: 'Mark Johnson',
      sellerAvatar: 'https://ui-avatars.com/api/?name=Mark+Johnson&background=10B981&color=fff',
      rating: 4.7,
      reviews: 892,
      price: 35,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      deliveryTime: '5 days',
      level: 'Level 2'
    },
    {
      id: 5,
      title: 'I will craft creative stories and content',
      seller: 'Lisa Chen',
      sellerAvatar: 'https://ui-avatars.com/api/?name=Lisa+Chen&background=10B981&color=fff',
      rating: 4.8,
      reviews: 1067,
      price: 22,
      image: 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=400&h=300&fit=crop',
      deliveryTime: '3 days',
      level: 'Level 2'
    },
    {
      id: 6,
      title: 'I will write product descriptions that convert',
      seller: 'Tom Wilson',
      sellerAvatar: 'https://ui-avatars.com/api/?name=Tom+Wilson&background=10B981&color=fff',
      rating: 4.6,
      reviews: 743,
      price: 18,
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
      deliveryTime: '2 days',
      level: 'Level 1'
    }
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-600 text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <PenTool className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Content Writing Services
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-green-100 max-w-3xl mx-auto px-4">
              Professional writers ready to create compelling content for your business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-4 text-green-200">
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  <span>967+ Services</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  <span>4.8 Avg Rating</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  <span>Starting at $18</span>
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
            <li><Link to="/" className="hover:text-green-600">Home</Link></li>
            <li>/</li>
            <li className="text-green-600 font-medium">Content Writing</li>
          </ol>
        </nav>

        {/* Subcategories */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Browse Writing Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {subcategories.map((sub, index) => (
              <Link
                key={index}
                to={`/search?category=content-writing&subcategory=${sub.name.toLowerCase().replace(' ', '-')}`}
                className="group bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all duration-300"
              >
                <div className="text-center">
                  <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors mb-1">
                    {sub.name}
                  </h3>
                  <p className="text-sm text-gray-500">{sub.count} services</p>
                  {sub.popular && (
                    <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                      Popular
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Top Sellers */}
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Top Content Writers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topSellers.map((seller) => (
              <div key={seller.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={seller.avatar}
                    alt={seller.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{seller.name}</h3>
                    <p className="text-sm text-green-600 font-medium">{seller.level}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">
                        {seller.rating} ({seller.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Specializes in:</p>
                  <div className="flex flex-wrap gap-2">
                    {seller.specialties.map((specialty, index) => (
                      <span key={index} className="px-3 py-1 bg-green-50 text-green-600 text-xs rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">Starting at ${seller.startingPrice}</span>
                  <Link
                    to={`/seller/${seller.id}`}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

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
              
              {/* Content Type */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Content Type</h4>
                <div className="space-y-2">
                  {['Blog Posts', 'Articles', 'Web Copy', 'Product Descriptions', 'Press Releases', 'Social Media'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                      <span className="ml-2 text-sm text-gray-600">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Word Count */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Word Count</h4>
                <div className="space-y-2">
                  {['Up to 500 words', '500-1000 words', '1000-2000 words', '2000+ words'].map((count) => (
                    <label key={count} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                      <span className="ml-2 text-sm text-gray-600">{count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {['Under $25', '$25 - $50', '$50 - $100', '$100+'].map((range) => (
                    <label key={range} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                      <span className="ml-2 text-sm text-gray-600">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Delivery Time */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Delivery Time</h4>
                <div className="space-y-2">
                  {['24 Hours', '3 Days', '7 Days', 'Anytime'].map((time) => (
                    <label key={time} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                      <span className="ml-2 text-sm text-gray-600">{time}</span>
                    </label>
                  ))}
                </div>
              </div>
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
                <span className="text-gray-600">967 services available</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
                
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Services Grid */}
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-6'
            }>
              {featuredServices.map((service) => (
                <Link
                  key={service.id}
                  to={`/gigs/${service.id}`}
                  className={`group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-green-200 transition-all duration-300 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  <div className={viewMode === 'list' ? 'w-64 flex-shrink-0' : ''}>
                    <img
                      src={service.image}
                      alt={service.title}
                      className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                        viewMode === 'list' ? 'h-48' : 'h-48'
                      }`}
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <img
                        src={service.sellerAvatar}
                        alt={service.seller}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{service.seller}</p>
                        <p className="text-xs text-green-600">{service.level}</p>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                      {service.title}
                    </h3>
                    
                    <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span>{service.rating}</span>
                        <span className="ml-1">({service.reviews})</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{service.deliveryTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        Starting at ${service.price}
                      </span>
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-green-600">Verified</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                Load More Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentWriting;