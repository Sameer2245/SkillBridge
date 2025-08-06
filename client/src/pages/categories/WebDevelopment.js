import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Code, 
  Star, 
  Clock, 
  TrendingUp, 
  Users, 
  Award, 
  ChevronRight,
  Play,
  CheckCircle,
  Globe,
  Smartphone,
  Database,
  Shield
} from 'lucide-react';

const WebDevelopment = () => {
  const [featuredGigs, setFeaturedGigs] = useState([]);
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  const subcategories = [
    {
      name: 'Website Development',
      description: 'Custom websites and web applications',
      icon: Globe,
      color: 'bg-blue-100 text-blue-600',
      services: 1234,
      startingPrice: 50
    },
    {
      name: 'E-commerce Development',
      description: 'Online stores and shopping platforms',
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600',
      services: 856,
      startingPrice: 200
    },
    {
      name: 'Mobile App Development',
      description: 'iOS and Android applications',
      icon: Smartphone,
      color: 'bg-purple-100 text-purple-600',
      services: 642,
      startingPrice: 500
    },
    {
      name: 'Backend Development',
      description: 'Server-side development and APIs',
      icon: Database,
      color: 'bg-orange-100 text-orange-600',
      services: 423,
      startingPrice: 100
    },
    {
      name: 'WordPress Development',
      description: 'WordPress themes and plugins',
      icon: Code,
      color: 'bg-indigo-100 text-indigo-600',
      services: 789,
      startingPrice: 75
    },
    {
      name: 'Cybersecurity',
      description: 'Security audits and protection',
      icon: Shield,
      color: 'bg-red-100 text-red-600',
      services: 234,
      startingPrice: 300
    }
  ];

  const technologies = [
    { name: 'React', count: 456, trend: '+12%' },
    { name: 'Node.js', count: 389, trend: '+8%' },
    { name: 'Python', count: 567, trend: '+15%' },
    { name: 'WordPress', count: 789, trend: '+5%' },
    { name: 'PHP', count: 345, trend: '+3%' },
    { name: 'JavaScript', count: 678, trend: '+10%' }
  ];

  const popularServices = [
    'Custom Website Development',
    'E-commerce Store Setup',
    'WordPress Website',
    'Landing Page Design',
    'Web Application Development',
    'API Development',
    'Database Design',
    'Website Maintenance'
  ];

  useEffect(() => {
    // Mock data loading
    setTimeout(() => {
      setFeaturedGigs([
        {
          id: '6888f4dbf2e2b10aaa014221',
          title: 'I will create a modern responsive website for your business',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
          seller: {
            name: 'Sarah Johnson',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
            level: 'Top Rated Seller',
            rating: 4.9,
            reviewCount: 127
          },
          price: 299,
          deliveryTime: 7,
          rating: 4.9,
          reviewCount: 127,
          orders: 89,
          tags: ['React', 'Node.js', 'Responsive']
        },
        {
          id: '6888f4dbf2e2b10aaa014222',
          title: 'I will design a professional logo and brand identity',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
          seller: {
            name: 'Mike Chen',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
            level: 'Level 2',
            rating: 4.8,
            reviewCount: 89
          },
          price: 599,
          deliveryTime: 14,
          rating: 4.8,
          reviewCount: 89,
          orders: 67,
          tags: ['E-commerce', 'Payment', 'Shopify']
        },
        {
          id: '6888f4dbf2e2b10aaa014226',
          title: 'I will develop a custom WordPress website',
          image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop',
          seller: {
            name: 'Alex Rodriguez',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
            level: 'Level 1',
            rating: 4.7,
            reviewCount: 56
          },
          price: 199,
          deliveryTime: 5,
          rating: 4.7,
          reviewCount: 56,
          orders: 78,
          tags: ['WordPress', 'CMS', 'Custom Theme']
        }
      ]);

      setTopSellers([
        {
          id: 1,
          name: 'Sarah Johnson',
          username: 'sarah_dev',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
          level: 'Top Rated Seller',
          rating: 4.9,
          reviewCount: 127,
          completedOrders: 89,
          skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
          description: 'Full-stack developer with 6+ years of experience',
          responseTime: '1 hour'
        },
        {
          id: 2,
          name: 'Mike Chen',
          username: 'mike_fullstack',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
          level: 'Level 2',
          rating: 4.8,
          reviewCount: 89,
          completedOrders: 67,
          skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
          description: 'Backend specialist and system architect',
          responseTime: '2 hours'
        },
        {
          id: 3,
          name: 'Alex Rodriguez',
          username: 'alex_wp',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
          level: 'Level 1',
          rating: 4.7,
          reviewCount: 56,
          completedOrders: 78,
          skills: ['WordPress', 'PHP', 'MySQL', 'jQuery'],
          description: 'WordPress expert and theme developer',
          responseTime: '3 hours'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-20">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
              <Code className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Web Development
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Services
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Build stunning websites and web applications with our expert developers
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/search?category=Web Development"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                Browse Services
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
              <button className="inline-flex items-center px-8 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-white hover:bg-white hover:text-blue-600 transition-all duration-300">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">3,500+</div>
              <div className="text-gray-600">Active Developers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">15,000+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">4.8/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Subcategories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Web Development Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the perfect service for your web development needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subcategories.map((subcategory, index) => (
              <Link
                key={index}
                to={`/search?category=Web Development&subcategory=${encodeURIComponent(subcategory.name)}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 overflow-hidden transform hover:-translate-y-2"
              >
                <div className="p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-all duration-300 group-hover:scale-110 ${subcategory.color}`}>
                    <subcategory.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {subcategory.name}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{subcategory.description}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{subcategory.services} services</span>
                    <span className="font-semibold text-gray-900">From ${subcategory.startingPrice}</span>
                  </div>
                  
                  <div className="flex items-center text-blue-600 font-semibold mt-4 group-hover:text-blue-700">
                    Explore Services 
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Technologies */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Technologies
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find developers skilled in the latest technologies
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <Link
                key={index}
                to={`/search?q=${tech.name}`}
                className="group bg-gray-50 hover:bg-blue-50 rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-2xl font-bold text-gray-900 mb-2">{tech.count}</div>
                <div className="text-sm font-medium text-gray-700 mb-1">{tech.name}</div>
                <div className="text-xs text-green-600 font-medium">{tech.trend}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gigs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Services
              </h2>
              <p className="text-xl text-gray-600">
                Hand-picked services from top-rated developers
              </p>
            </div>
            <Link
              to="/search?category=Web Development"
              className="hidden md:inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              View All
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredGigs.map((gig) => (
                <Link
                  key={gig.id}
                  to={`/gigs/${gig.id}`}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                >
                  <div className="relative">
                    <img
                      src={gig.image}
                      alt={gig.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-orange-500 text-white text-xs font-medium rounded-full">
                        Featured
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <img
                        src={gig.seller.avatar}
                        alt={gig.seller.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{gig.seller.name}</div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getSellerLevelColor(gig.seller.level)}`}>
                          {gig.seller.level}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {gig.title}
                    </h3>

                    <div className="flex items-center mb-4">
                      {renderStars(gig.rating)}
                      <span className="ml-2 text-sm font-medium text-gray-900">
                        {gig.rating}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">
                        ({gig.reviewCount})
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {gig.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {gig.deliveryTime} days
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        From ${gig.price}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12 md:hidden">
            <Link
              to="/search?category=Web Development"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              View All Services
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Top Sellers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Top Web Developers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Work with experienced developers who deliver exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topSellers.map((seller) => (
              <Link
                key={seller.id}
                to={`/seller/${seller.username}`}
                className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:border-blue-200"
              >
                <div className="text-center mb-6">
                  <img
                    src={seller.avatar}
                    alt={seller.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {seller.name}
                  </h3>
                  <span className={`inline-block text-xs px-3 py-1 rounded-full mt-2 ${getSellerLevelColor(seller.level)}`}>
                    {seller.level}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Rating</span>
                    <div className="flex items-center">
                      {renderStars(seller.rating)}
                      <span className="ml-2 text-sm font-medium">{seller.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Orders</span>
                    <span className="text-sm font-medium">{seller.completedOrders}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Response</span>
                    <span className="text-sm font-medium">{seller.responseTime}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{seller.description}</p>

                <div className="flex flex-wrap gap-2">
                  {seller.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {seller.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{seller.skills.length - 3} more
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Most requested web development services
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularServices.map((service, index) => (
              <Link
                key={index}
                to={`/search?q=${encodeURIComponent(service)}`}
                className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:shadow-lg hover:border-blue-200 transition-all duration-300 group"
              >
                <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {service}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Web Project?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Connect with expert developers and bring your ideas to life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/search?category=Web Development"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors"
            >
              Find Developers
              <Users className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/create-gig"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transition-colors"
            >
              Start Selling
              <Award className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebDevelopment;