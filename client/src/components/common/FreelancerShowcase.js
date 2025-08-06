import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, CheckCircle, Heart } from 'lucide-react';
import api from '../../services/api';

const FreelancerShowcase = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration - replace with actual API call
  const mockFreelancers = [
    {
      id: 1,
      username: 'sarah_dev',
      fullName: 'Sarah Johnson',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      description: 'Full-stack developer specializing in React and Node.js',
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
      country: 'United States',
      totalRating: 4.9,
      totalReviews: 127,
      completedOrders: 89,
      isOnline: true,
      responseTime: '1 hour',
      startingPrice: 25,
      featured: true
    },
    {
      id: 2,
      username: 'alex_designer',
      fullName: 'Alex Chen',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      description: 'Creative logo designer with 5+ years experience',
      skills: ['Logo Design', 'Branding', 'Illustrator', 'Photoshop'],
      country: 'Canada',
      totalRating: 4.8,
      totalReviews: 203,
      completedOrders: 156,
      isOnline: false,
      responseTime: '2 hours',
      startingPrice: 15,
      featured: true
    },
    {
      id: 3,
      username: 'maria_writer',
      fullName: 'Maria Rodriguez',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      description: 'Professional content writer and copywriter',
      skills: ['Content Writing', 'SEO', 'Copywriting', 'Blog Writing'],
      country: 'Spain',
      totalRating: 4.7,
      totalReviews: 89,
      completedOrders: 67,
      isOnline: true,
      responseTime: '30 minutes',
      startingPrice: 10,
      featured: false
    },
    {
      id: 4,
      username: 'david_video',
      fullName: 'David Kim',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      description: 'Video editor and motion graphics specialist',
      skills: ['Video Editing', 'After Effects', 'Premiere Pro', 'Motion Graphics'],
      country: 'South Korea',
      totalRating: 4.9,
      totalReviews: 156,
      completedOrders: 134,
      isOnline: true,
      responseTime: '1 hour',
      startingPrice: 30,
      featured: true
    },
    {
      id: 5,
      username: 'emma_marketing',
      fullName: 'Emma Thompson',
      profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      description: 'Digital marketing expert and SEO specialist',
      skills: ['Digital Marketing', 'SEO', 'Google Ads', 'Social Media'],
      country: 'United Kingdom',
      totalRating: 4.8,
      totalReviews: 178,
      completedOrders: 145,
      isOnline: false,
      responseTime: '3 hours',
      startingPrice: 20,
      featured: false
    },
    {
      id: 6,
      username: 'raj_mobile',
      fullName: 'Raj Patel',
      profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
      description: 'Mobile app developer for iOS and Android',
      skills: ['React Native', 'Flutter', 'iOS', 'Android'],
      country: 'India',
      totalRating: 4.6,
      totalReviews: 94,
      completedOrders: 78,
      isOnline: true,
      responseTime: '2 hours',
      startingPrice: 18,
      featured: false
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFreelancers(mockFreelancers);
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

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Freelancers
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                  <div className="ml-4 flex-1">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-300 rounded"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Freelancers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with top-rated professionals ready to bring your projects to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {freelancers.map((freelancer) => (
            <div
              key={freelancer.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
            >
              {freelancer.featured && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold px-3 py-1 text-center">
                  ⭐ Featured Freelancer
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative">
                    <img
                      src={freelancer.profileImage}
                      alt={freelancer.fullName}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    {freelancer.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {freelancer.fullName}
                    </h3>
                    <p className="text-sm text-gray-500">@{freelancer.username}</p>
                    <div className="flex items-center mt-1">
                      <MapPin className="w-3 h-3 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500">{freelancer.country}</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {freelancer.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {freelancer.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {freelancer.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                      +{freelancer.skills.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="flex items-center mr-2">
                      {renderStars(freelancer.totalRating)}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {freelancer.totalRating}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      ({freelancer.totalReviews})
                    </span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{freelancer.completedOrders}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">Responds in {freelancer.responseTime}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">Starting at</span>
                    <div className="text-lg font-bold text-gray-900">
                      ${freelancer.startingPrice}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Link
                    to={`/freelancer/${freelancer.username}`}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-center py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    View Profile
                  </Link>
                  <Link
                    to={`/freelancer/${freelancer.username}/contact`}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-all transform hover:scale-105"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/freelancers"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            View All Freelancers
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FreelancerShowcase;