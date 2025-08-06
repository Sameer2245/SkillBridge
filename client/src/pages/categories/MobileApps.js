import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Star, Clock, Shield, Filter, Grid, List, Users, TrendingUp, Monitor } from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const MobileApps = () => {
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const subcategories = [
    { name: 'iOS Development', count: 567, popular: true },
    { name: 'Android Development', count: 432 },
    { name: 'React Native', count: 298 },
    { name: 'Flutter Development', count: 234 },
    { name: 'App UI/UX Design', count: 345 },
    { name: 'App Store Optimization', count: 189 }
  ];

  const featuredServices = [
    {
      id: '6888f4dbf2e2b10aaa014224',
      title: 'I will create a mobile app UI/UX design',
      seller: 'John Martinez',
      sellerAvatar: 'https://ui-avatars.com/api/?name=John+Martinez&background=F97316&color=fff',
      rating: 4.9,
      reviews: 1234,
      price: 500,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      deliveryTime: '14 days',
      level: 'Top Rated'
    },
    {
      id: 2,
      title: 'I will create Android apps with modern design',
      seller: 'Sarah Kim',
      sellerAvatar: 'https://ui-avatars.com/api/?name=Sarah+Kim&background=F97316&color=fff',
      rating: 4.8,
      reviews: 892,
      price: 450,
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
      deliveryTime: '12 days',
      level: 'Level 2'
    },
    {
      id: 3,
      title: 'I will build cross-platform apps with React Native',
      seller: 'Michael Chen',
      sellerAvatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=F97316&color=fff',
      rating: 4.7,
      reviews: 654,
      price: 600,
      image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=400&h=300&fit=crop',
      deliveryTime: '16 days',
      level: 'Level 2'
    },
    {
      id: 4,
      title: 'I will design beautiful mobile app UI/UX',
      seller: 'Emma Davis',
      sellerAvatar: 'https://ui-avatars.com/api/?name=Emma+Davis&background=F97316&color=fff',
      rating: 4.9,
      reviews: 1456,
      price: 200,
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
      deliveryTime: '7 days',
      level: 'Top Rated'
    },
    {
      id: 5,
      title: 'I will develop Flutter apps for iOS and Android',
      seller: 'Alex Rodriguez',
      sellerAvatar: 'https://ui-avatars.com/api/?name=Alex+Rodriguez&background=F97316&color=fff',
      rating: 4.6,
      reviews: 743,
      price: 550,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      deliveryTime: '15 days',
      level: 'Level 1'
    },
    {
      id: 6,
      title: 'I will optimize your app for App Store ranking',
      seller: 'Lisa Park',
      sellerAvatar: 'https://ui-avatars.com/api/?name=Lisa+Park&background=F97316&color=fff',
      rating: 4.8,
      reviews: 567,
      price: 150,
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
      deliveryTime: '5 days',
      level: 'Level 2'
    }
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-600 via-orange-700 to-red-600 text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Smartphone className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Mobile App Development
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-orange-100 max-w-3xl mx-auto px-4">
              Build powerful mobile applications for iOS and Android platforms
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-4 text-orange-200">
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  <span>567+ Services</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  <span>4.8 Avg Rating</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  <span>Starting at $150</span>
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
            <li><Link to="/" className="hover:text-orange-600">Home</Link></li>
            <li>/</li>
            <li className="text-orange-600 font-medium">Mobile Apps</li>
          </ol>
        </nav>

        {/* Subcategories */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Browse Mobile Development Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {subcategories.map((sub, index) => (
              <Link
                key={index}
                to={`/search?category=mobile-apps&subcategory=${sub.name.toLowerCase().replace(' ', '-')}`}
                className="group bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-orange-200 transition-all duration-300"
              >
                <div className="text-center">
                  <Monitor className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors mb-1">
                    {sub.name}
                  </h3>
                  <p className="text-sm text-gray-500">{sub.count} services</p>
                  {sub.popular && (
                    <span className="inline-block mt-2 px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full">
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
              
              {/* Platform */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Platform</h4>
                <div className="space-y-2">
                  {['iOS', 'Android', 'Cross-Platform', 'React Native', 'Flutter', 'Xamarin'].map((platform) => (
                    <label key={platform} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                      <span className="ml-2 text-sm text-gray-600">{platform}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* App Type */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">App Type</h4>
                <div className="space-y-2">
                  {['Business App', 'E-commerce', 'Social Media', 'Gaming', 'Educational', 'Health & Fitness'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                      <span className="ml-2 text-sm text-gray-600">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {['Under $500', '$500 - $1000', '$1000 - $2000', '$2000+'].map((range) => (
                    <label key={range} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                      <span className="ml-2 text-sm text-gray-600">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Delivery Time */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Delivery Time</h4>
                <div className="space-y-2">
                  {['7 Days', '14 Days', '30 Days', 'Anytime'].map((time) => (
                    <label key={time} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
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
                <span className="text-gray-600">567 services available</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                    className={`p-2 ${viewMode === 'grid' ? 'bg-orange-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-orange-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
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
                  className={`group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-orange-200 transition-all duration-300 ${
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
                        <p className="text-xs text-orange-600">{service.level}</p>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
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
              <button className="px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium">
                Load More Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileApps;