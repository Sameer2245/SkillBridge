import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Star, Users, ArrowRight } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { searchGigs } from '../services/api';

const Explore = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [featuredGigs, setFeaturedGigs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const categoryData = [
    {
      name: 'Graphics & Design',
      slug: 'graphics-design',
      icon: '🎨',
      description: 'Logo design, web design, print design, and more',
      color: 'from-purple-500 to-pink-500',
      subcategories: ['Logo Design', 'Web Design', 'Print Design', 'Brand Identity']
    },
    {
      name: 'Digital Marketing',
      slug: 'digital-marketing',
      icon: '📈',
      description: 'SEO, social media marketing, content marketing',
      color: 'from-blue-500 to-cyan-500',
      subcategories: ['SEO', 'Social Media Marketing', 'Content Marketing', 'Email Marketing']
    },
    {
      name: 'Writing & Translation',
      slug: 'writing-translation',
      icon: '✍️',
      description: 'Content writing, copywriting, translation services',
      color: 'from-green-500 to-emerald-500',
      subcategories: ['Content Writing', 'Copywriting', 'Translation', 'Proofreading']
    },
    {
      name: 'Video & Animation',
      slug: 'video-animation',
      icon: '🎬',
      description: 'Video editing, animation, motion graphics',
      color: 'from-red-500 to-orange-500',
      subcategories: ['Video Editing', 'Animation', 'Motion Graphics', 'Whiteboard Animation']
    },
    {
      name: 'Music & Audio',
      slug: 'music-audio',
      icon: '🎵',
      description: 'Voice over, music production, audio editing',
      color: 'from-indigo-500 to-purple-500',
      subcategories: ['Voice Over', 'Music Production', 'Audio Editing', 'Sound Design']
    },
    {
      name: 'Programming & Tech',
      slug: 'programming-tech',
      icon: '💻',
      description: 'Web development, mobile apps, software development',
      color: 'from-gray-700 to-gray-900',
      subcategories: ['Web Development', 'Mobile Apps', 'Desktop Applications', 'WordPress']
    },
    {
      name: 'Business',
      slug: 'business',
      icon: '💼',
      description: 'Business plans, market research, virtual assistance',
      color: 'from-yellow-500 to-orange-500',
      subcategories: ['Business Plans', 'Market Research', 'Virtual Assistant', 'Data Entry']
    },
    {
      name: 'Lifestyle',
      slug: 'lifestyle',
      icon: '🌟',
      description: 'Gaming, fitness, relationship advice, life coaching',
      color: 'from-pink-500 to-rose-500',
      subcategories: ['Gaming', 'Fitness', 'Life Coaching', 'Travel Planning']
    },
    {
      name: 'Data',
      slug: 'data',
      icon: '📊',
      description: 'Data analysis, data visualization, data processing',
      color: 'from-teal-500 to-cyan-500',
      subcategories: ['Data Analysis', 'Data Visualization', 'Data Processing', 'Excel Automation']
    },
    {
      name: 'Photography',
      slug: 'photography',
      icon: '📸',
      description: 'Portrait photography, product photography, photo editing',
      color: 'from-violet-500 to-purple-500',
      subcategories: ['Portrait Photography', 'Product Photography', 'Photo Editing', 'Event Photography']
    }
  ];

  useEffect(() => {
    fetchCategoriesData();
    fetchFeaturedGigs();
  }, []);

  const fetchCategoriesData = async () => {
    try {
      // Get category counts from the API
      const promises = categoryData.map(async (category) => {
        try {
          const response = await searchGigs({
            category: category.name,
            limit: 1
          });
          return {
            ...category,
            count: response.pagination?.totalResults || 0
          };
        } catch (error) {
          return {
            ...category,
            count: 0
          };
        }
      });

      const categoriesWithCounts = await Promise.all(promises);
      setCategories(categoriesWithCounts);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories(categoryData.map(cat => ({ ...cat, count: 0 })));
    }
  };

  const fetchFeaturedGigs = async () => {
    try {
      const response = await searchGigs({
        sortBy: 'popular',
        limit: 8
      });
      
      if (response.success) {
        setFeaturedGigs(response.results || []);
      }
    } catch (error) {
      console.error('Error fetching featured gigs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Explore Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Discover thousands of services from talented freelancers around the world
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What service are you looking for?"
                  className="w-full px-6 py-4 text-lg text-gray-900 bg-white rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30 pr-16"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-blue-100">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span>{categories.reduce((sum, cat) => sum + cat.count, 0)}+ Services</span>
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 mr-2" />
                <span>4.8 Average Rating</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                <span>Starting at $5</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories Grid */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the perfect service for your needs from our diverse range of categories
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/categories/${category.slug}`}
                className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {category.count} services
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>

                {/* Subcategories */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex flex-wrap gap-1">
                    {category.subcategories.slice(0, 3).map((sub, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors"
                      >
                        {sub}
                      </span>
                    ))}
                    {category.subcategories.length > 3 && (
                      <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        +{category.subcategories.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Services */}
        {featuredGigs.length > 0 && (
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Services
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover top-rated services from our most talented freelancers
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredGigs.map((gig) => (
                <Link
                  key={gig._id}
                  to={`/gigs/${gig._id}`}
                  className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                  {/* Gig Image */}
                  <div className="aspect-w-16 aspect-h-10 overflow-hidden">
                    <img
                      src={gig.images?.[0] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'}
                      alt={gig.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Gig Content */}
                  <div className="p-6">
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
                    </div>

                    {/* Gig Title */}
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
                      {gig.title}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-4">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900">
                        {gig.totalRating > 0 ? gig.totalRating.toFixed(1) : 'New'}
                      </span>
                      {gig.totalReviews > 0 && (
                        <span className="text-sm text-gray-500">({gig.totalReviews})</span>
                      )}
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Starting at</span>
                      <span className="text-lg font-bold text-gray-900">${gig.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/search"
                className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
              >
                View All Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Explore;