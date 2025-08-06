import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Star, Clock, Shield, Filter, Grid, List, Users, TrendingUp, Languages } from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Translation = () => {
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const subcategories = [
    { name: 'Document Translation', count: 298, popular: true },
    { name: 'Website Localization', count: 234 },
    { name: 'Audio Translation', count: 156 },
    { name: 'Video Subtitles', count: 189 },
    { name: 'Technical Translation', count: 143 },
    { name: 'Legal Translation', count: 112 }
  ];

  const featuredServices = [
    {
      id: '6888f4dbf2e2b10aaa014223',
      title: 'I will write SEO optimized content for your website',
      seller: 'Maria Gonzalez',
      sellerAvatar: 'https://ui-avatars.com/api/?name=Maria+Gonzalez&background=06B6D4&color=fff',
      rating: 4.9,
      reviews: 1234,
      price: 25,
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
      deliveryTime: '2 days',
      level: 'Top Rated'
    },
    {
      id: 2,
      title: 'I will provide French to English translation services',
      seller: 'Pierre Dubois',
      sellerAvatar: 'https://ui-avatars.com/api/?name=Pierre+Dubois&background=06B6D4&color=fff',
      rating: 4.8,
      reviews: 892,
      price: 30,
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop',
      deliveryTime: '1 day',
      level: 'Level 2'
    },
    {
      id: 3,
      title: 'I will localize your website for global markets',
      seller: 'Yuki Tanaka',
      sellerAvatar: 'https://ui-avatars.com/api/?name=Yuki+Tanaka&background=06B6D4&color=fff',
      rating: 4.7,
      reviews: 654,
      price: 100,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      deliveryTime: '5 days',
      level: 'Level 2'
    },
    {
      id: 4,
      title: 'I will translate German technical documents accurately',
      seller: 'Hans Mueller',
      sellerAvatar: 'https://ui-avatars.com/api/?name=Hans+Mueller&background=06B6D4&color=fff',
      rating: 4.9,
      reviews: 1456,
      price: 50,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      deliveryTime: '3 days',
      level: 'Top Rated'
    },
    {
      id: 5,
      title: 'I will create subtitles for your videos in multiple languages',
      seller: 'Anna Petrov',
      sellerAvatar: 'https://ui-avatars.com/api/?name=Anna+Petrov&background=06B6D4&color=fff',
      rating: 4.6,
      reviews: 743,
      price: 40,
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop',
      deliveryTime: '4 days',
      level: 'Level 1'
    },
    {
      id: 6,
      title: 'I will provide certified legal document translation',
      seller: 'Roberto Silva',
      sellerAvatar: 'https://ui-avatars.com/api/?name=Roberto+Silva&background=06B6D4&color=fff',
      rating: 4.8,
      reviews: 567,
      price: 75,
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop',
      deliveryTime: '3 days',
      level: 'Level 2'
    }
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cyan-600 via-cyan-700 to-blue-600 text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Translation & Localization
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-cyan-100 max-w-3xl mx-auto px-4">
              Professional translation services to connect you with global audiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-4 text-cyan-200">
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  <span>298+ Services</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  <span>4.8 Avg Rating</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  <span>Starting at $25</span>
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
            <li><Link to="/" className="hover:text-cyan-600">Home</Link></li>
            <li>/</li>
            <li className="text-cyan-600 font-medium">Translation</li>
          </ol>
        </nav>

        {/* Subcategories */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Browse Translation Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {subcategories.map((sub, index) => (
              <Link
                key={index}
                to={`/search?category=translation&subcategory=${sub.name.toLowerCase().replace(' ', '-')}`}
                className="group bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-cyan-200 transition-all duration-300"
              >
                <div className="text-center">
                  <Languages className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 group-hover:text-cyan-600 transition-colors mb-1">
                    {sub.name}
                  </h3>
                  <p className="text-sm text-gray-500">{sub.count} services</p>
                  {sub.popular && (
                    <span className="inline-block mt-2 px-2 py-1 bg-cyan-100 text-cyan-600 text-xs rounded-full">
                      Popular
                    </span>
                  )}
                </div>
              </Link>
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
              
              {/* Language Pairs */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Popular Language Pairs</h4>
                <div className="space-y-2">
                  {['English ↔ Spanish', 'English ↔ French', 'English ↔ German', 'English ↔ Chinese', 'English ↔ Japanese'].map((pair) => (
                    <label key={pair} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
                      <span className="ml-2 text-sm text-gray-600">{pair}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Document Type */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Document Type</h4>
                <div className="space-y-2">
                  {['General Documents', 'Technical', 'Legal', 'Medical', 'Marketing', 'Academic'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
                      <span className="ml-2 text-sm text-gray-600">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {['Under $50', '$50 - $100', '$100 - $200', '$200+'].map((range) => (
                    <label key={range} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
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
                      <input type="checkbox" className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
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
                <span className="text-gray-600">298 services available</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
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
                    className={`p-2 ${viewMode === 'grid' ? 'bg-cyan-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-cyan-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
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
                  className={`group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-cyan-200 transition-all duration-300 ${
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
                        <p className="text-xs text-cyan-600">{service.level}</p>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors line-clamp-2">
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
              <button className="px-8 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium">
                Load More Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translation;