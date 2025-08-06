import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Star, Users, CheckCircle, ArrowRight, Code, Palette, PenTool, Megaphone, Camera, Music, Play, Shield, Clock, Award, TrendingUp, Zap } from 'lucide-react';
import { gigService } from '../services/gigs';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ServiceCategories from '../components/common/ServiceCategories';
import FreelancerShowcase from '../components/common/FreelancerShowcase';
import SearchBar from '../components/search/SearchBar';
import { testBackendConnection } from '../utils/testConnection';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredGigs, setFeaturedGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const navigate = useNavigate();

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      company: 'TechCorp',
      content: 'SkillBridge helped us find amazing talent for our projects. The quality of work exceeded our expectations!',
      avatar: '/api/placeholder/64/64',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Startup Founder',
      company: 'InnovateLab',
      content: 'As a freelancer, this platform has been incredible for growing my business and connecting with great clients.',
      avatar: '/api/placeholder/64/64',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Creative Director',
      company: 'DesignStudio',
      content: 'The variety of services and the quality of freelancers on this platform is unmatched. Highly recommended!',
      avatar: '/api/placeholder/64/64',
      rating: 5
    }
  ];

  useEffect(() => {
    fetchFeaturedGigs();
    // Test backend connection
    testBackendConnection();
    
    // Auto-rotate testimonials
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe elements
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => {
      clearInterval(testimonialInterval);
      observer.disconnect();
    };
  }, []);

  const fetchFeaturedGigs = async () => {
    try {
      const response = await gigService.getGigs({ limit: 8, featured: true });
      setFeaturedGigs(response.gigs || []);
    } catch (error) {
      console.error('Error fetching featured gigs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const categories = [
    {
      name: 'Web Development',
      icon: Code,
      description: 'Custom websites and web applications',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      name: 'Design & Creative',
      icon: Palette,
      description: 'Logo design, branding, and graphics',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      name: 'Writing & Translation',
      icon: PenTool,
      description: 'Content writing and language services',
      color: 'bg-green-100 text-green-600',
    },
    {
      name: 'Digital Marketing',
      icon: Megaphone,
      description: 'SEO, social media, and advertising',
      color: 'bg-red-100 text-red-600',
    },
    {
      name: 'Photography',
      icon: Camera,
      description: 'Product photography and editing',
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      name: 'Music & Audio',
      icon: Music,
      description: 'Audio production and voice-over',
      color: 'bg-indigo-100 text-indigo-600',
    },
  ];

  const stats = [
    { label: 'Active Freelancers', value: '10,000+', icon: Users, color: 'text-blue-600' },
    { label: 'Projects Completed', value: '50,000+', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Client Satisfaction', value: '98%', icon: Star, color: 'text-yellow-600' },
    { label: 'Average Rating', value: '4.9/5', icon: Award, color: 'text-purple-600' },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Your payments are protected with our secure escrow system',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Clock,
      title: 'Fast Delivery',
      description: 'Get your projects completed on time, every time',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Award,
      title: 'Top Quality',
      description: 'Work with verified professionals and top-rated freelancers',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: TrendingUp,
      title: 'Grow Your Business',
      description: 'Scale your business with our talented freelancer network',
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-12 sm:py-16 lg:py-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-5 sm:left-10 w-32 h-32 sm:w-72 sm:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-5 sm:right-10 w-32 h-32 sm:w-72 sm:h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-10 sm:left-20 w-32 h-32 sm:w-72 sm:h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-fade-in-up">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                Find the perfect
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300 animate-gradient">
                  freelance services
                </span>
                for your business
              </h1>
            </div>
            <div className="animate-fade-in-up animation-delay-300">
              <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-blue-100 max-w-3xl mx-auto px-4">
                Connect with talented freelancers from around the world and get your projects done efficiently
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="animate-fade-in-up animation-delay-600 px-4">
              <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
                <SearchBar 
                  placeholder="What service are you looking for today?"
                  size="large"
                  className="shadow-2xl"
                />
              </div>
            </div>

            <div className="animate-fade-in-up animation-delay-900 px-4">
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
                <span className="text-blue-200 font-medium mb-2 sm:mb-0">Popular:</span>
                {['Web Development', 'Logo Design', 'Content Writing', 'SEO', 'Mobile App'].map((tag, index) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag);
                      navigate(`/search?q=${encodeURIComponent(tag)}`);
                    }}
                    className="bg-white/20 hover:bg-white/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20 hover:border-white/40"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Trusted by thousands worldwide</h2>
            <p className="text-gray-600 max-w-2xl mx-auto px-4">Join our growing community of freelancers and clients</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center group"
                data-animate
                id={`stat-${index}`}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 transition-all duration-300 group-hover:scale-110 ${stat.color} bg-opacity-10`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:scale-105">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of professional services and find the perfect match for your project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 overflow-hidden transform hover:-translate-y-2"
                data-animate
                id={`category-${index}`}
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-all duration-300 group-hover:scale-110 ${category.color}`}>
                    <category.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{category.description}</p>
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                    Explore Services 
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose FreelanceHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide everything you need for successful freelance collaboration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="text-center group"
                data-animate
                id={`feature-${index}`}
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${feature.color}`}>
                  <feature.icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gigs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl mb-6">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover top-rated services from our best freelancers, handpicked for quality and excellence
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <LoadingSpinner size="large" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredGigs.map((gig, index) => (
                <Link
                  key={gig._id}
                  to={`/gigs/${gig._id}`}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-gray-100 hover:border-blue-200"
                  data-animate
                  id={`gig-${index}`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={gig.images?.[0] || '/api/placeholder/300/200'}
                      alt={gig.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                      Featured
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <img
                        src={gig.seller?.profilePicture || '/api/placeholder/32/32'}
                        alt={gig.seller?.username}
                        className="w-10 h-10 rounded-full mr-3 border-2 border-gray-100"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-900">{gig.seller?.username}</span>
                        <div className="text-xs text-gray-500">Level 2 Seller</div>
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                      {gig.title}
                    </h3>
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(gig.rating || 5) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2 font-medium">
                        {gig.rating?.toFixed(1) || '5.0'} ({gig.reviewCount || 0})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-gray-900">
                        From ${gig.pricing?.basic?.price || gig.startingPrice}
                      </div>
                      <div className="text-sm text-gray-500">
                        <Clock className="w-4 h-4 inline mr-1" />
                        {gig.deliveryTime || '3'} days
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <Link
              to="/gigs"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              View All Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied clients and freelancers
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
              <div className="mb-8">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-20 h-20 rounded-full mx-auto mb-6 border-4 border-blue-100"
                />
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div>
                  <div className="font-bold text-gray-900 text-lg">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-600">
                    {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-blue-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories Section */}
      <ServiceCategories />

      {/* Featured Freelancers Section */}
      <FreelancerShowcase />

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-48 translate-y-48"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to get started?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of freelancers and clients who trust our platform to build amazing projects together
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up animation-delay-300">
            <Link
              to="/register"
              className="group inline-flex items-center px-10 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
            >
              <Users className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
              Start Selling Today
            </Link>
            <Link
              to="/gigs"
              className="group inline-flex items-center px-10 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-white hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              <Search className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
              Find Services
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="text-white/80">
              <div className="text-2xl font-bold text-white mb-2">24/7</div>
              <div>Customer Support</div>
            </div>
            <div className="text-white/80">
              <div className="text-2xl font-bold text-white mb-2">100%</div>
              <div>Secure Payments</div>
            </div>
            <div className="text-white/80">
              <div className="text-2xl font-bold text-white mb-2">30 Days</div>
              <div>Money Back Guarantee</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;