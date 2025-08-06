import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Palette, Star, Clock, Shield, Award, Filter, Grid, List, ChevronDown, Users, TrendingUp } from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const LogoDesign = () => {
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const subcategories = [
    { name: 'Logo Design', count: 856, popular: true },
    { name: 'Brand Identity', count: 432 },
    { name: 'Business Cards', count: 298 },
    { name: 'Flyer Design', count: 367 },
    { name: 'Poster Design', count: 234 },
    { name: 'Brochure Design', count: 189 }
  ];

  const topSellers = [
    {
      id: 1,
      name: 'Sarah Wilson',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=8B5CF6&color=fff',
      rating: 4.9,
      reviews: 1247,
      level: 'Top Rated Seller',
      specialties: ['Logo Design', 'Brand Identity'],
      startingPrice: 25
    },
    {
      id: 2,
      name: 'Mike Chen',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Chen&background=8B5CF6&color=fff',
      rating: 4.8,
      reviews: 892,
      level: 'Level 2 Seller',
      specialties: ['Logo Design', 'Business Cards'],
      startingPrice: 15
    },
    {
      id: 3,
      name: 'Emma Davis',
      avatar: 'https://ui-avatars.com/api/?name=Emma+Davis&background=8B5CF6&color=fff',
      rating: 4.9,
      reviews: 1456,
      level: 'Top Rated Seller',
      specialties: ['Brand Identity', 'Poster Design'],
      startingPrice: 35
    }
  ];

  const featuredServices = [
    {
      id: '6888f4dbf2e2b10aaa014222',
      title: 'I will design a professional logo and brand identity',
      seller: 'Sarah Wilson',
      sellerAvatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=8B5CF6&color=fff',
      rating: 4.9,
      reviews: 1247,
      price: 25,
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
      deliveryTime: '2 days',
      level: 'Top Rated'
    },
    {
      id: 2,
      title: 'I will create a modern logo design with unlimited revisions',
      seller: 'Mike Chen',
      sellerAvatar: 'https://ui-avatars.com/api/?name=Mike+Chen&background=8B5CF6&color=fff',
      rating: 4.8,
      reviews: 892,
      price: 15,
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      deliveryTime: '1 day',
      level: 'Level 2'
    },
    {
      id: 3,
      title: 'I will design a complete brand identity package',
      seller: 'Emma Davis',
      sellerAvatar: 'https://ui-avatars.com/api/?name=Emma+Davis&background=8B5CF6&color=fff',
      rating: 4.9,
      reviews: 1456,
      price: 35,
      image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&h=300&fit=crop',
      deliveryTime: '3 days',
      level: 'Top Rated'
    },
    {
      id: 4,
      title: 'I will design eye-catching business cards',
      seller: 'Alex Johnson',
      sellerAvatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=8B5CF6&color=fff',
      rating: 4.7,
      reviews: 634,
      price: 20,
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=300&fit=crop',
      deliveryTime: '2 days',
      level: 'Level 1'
    },
    {
      id: 5,
      title: 'I will create stunning poster designs',
      seller: 'Lisa Park',
      sellerAvatar: 'https://ui-avatars.com/api/?name=Lisa+Park&background=8B5CF6&color=fff',
      rating: 4.8,
      reviews: 789,
      price: 30,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      deliveryTime: '2 days',
      level: 'Level 2'
    },
    {
      id: 6,
      title: 'I will design professional brochures',
      seller: 'Tom Wilson',
      sellerAvatar: 'https://ui-avatars.com/api/?name=Tom+Wilson&background=8B5CF6&color=fff',
      rating: 4.6,
      reviews: 456,
      price: 25,
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      deliveryTime: '3 days',
      level: 'Level 1'
    }
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Palette className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Logo Design & Branding
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-purple-100 max-w-3xl mx-auto px-4">
              Create a memorable brand identity with professional logo design services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-4 text-purple-200">
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  <span>856+ Services</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  <span>4.8 Avg Rating</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  <span>Starting at $15</span>
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
            <li><Link to="/" className="hover:text-purple-600">Home</Link></li>
            <li>/</li>
            <li className="text-purple-600 font-medium">Logo Design</li>
          </ol>
        </nav>

        {/* Subcategories */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Browse Logo Design Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {subcategories.map((sub, index) => (
              <Link
                key={index}
                to={`/search?category=logo-design&subcategory=${sub.name.toLowerCase().replace(' ', '-')}`}
                className="group bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all duration-300"
              >
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-1">
                    {sub.name}
                  </h3>
                  <p className="text-sm text-gray-500">{sub.count} services</p>
                  {sub.popular && (
                    <span className="inline-block mt-2 px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full">
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
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Top Logo Designers</h2>
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
                    <p className="text-sm text-purple-600 font-medium">{seller.level}</p>
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
                      <span key={index} className="px-3 py-1 bg-purple-50 text-purple-600 text-xs rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">Starting at ${seller.startingPrice}</span>
                  <Link
                    to={`/seller/${seller.id}`}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
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
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {['Under $25', '$25 - $50', '$50 - $100', '$100 - $200', '$200+'].map((range) => (
                    <label key={range} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                      <span className="ml-2 text-sm text-gray-600">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Delivery Time */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Delivery Time</h4>
                <div className="space-y-2">
                  {['24 Hours', '3 Days', '7 Days', 'Anytime'].map((time) => (
                    <label key={time} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                      <span className="ml-2 text-sm text-gray-600">{time}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Seller Level */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Seller Level</h4>
                <div className="space-y-2">
                  {['Top Rated Seller', 'Level 2', 'Level 1', 'New Seller'].map((level) => (
                    <label key={level} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                      <span className="ml-2 text-sm text-gray-600">{level}</span>
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
                <span className="text-gray-600">856 services available</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    className={`p-2 ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
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
                  className={`group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-purple-200 transition-all duration-300 ${
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
                        <p className="text-xs text-purple-600">{service.level}</p>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
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
              <button className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
                Load More Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoDesign;