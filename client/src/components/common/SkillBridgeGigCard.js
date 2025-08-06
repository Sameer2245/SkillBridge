import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

const SkillBridgeGigCard = ({ gig, className = '' }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-3 h-3 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getSellerLevelBadge = (level) => {
    const badges = {
      'Top Rated Seller': { color: 'bg-orange-500', text: 'white' },
      'Level 2': { color: 'bg-purple-500', text: 'white' },
      'Level 1': { color: 'bg-blue-500', text: 'white' },
      'New Seller': { color: 'bg-gray-500', text: 'white' }
    };
    
    const badge = badges[level] || badges['New Seller'];
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded ${badge.color} text-${badge.text}`}>
        {level}
      </span>
    );
  };

  return (
    <Link
      to={`/gigs/${gig._id}`}
      className={`group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 ${className}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={gig.images?.[0] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'}
          alt={gig.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Heart icon */}
        <button 
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
          onClick={(e) => {
            e.preventDefault();
            // Handle favorite logic
          }}
        >
          <Heart className="w-4 h-4 text-gray-600" />
        </button>

        {/* Featured badge */}
        {gig.featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Seller info */}
        <div className="flex items-center space-x-2 mb-3">
          <img
            src={gig.userId?.profileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'}
            alt={gig.userId?.fullName || gig.userId?.username || 'Seller'}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-gray-900">
            {gig.userId?.fullName || gig.userId?.username || 'Unknown Seller'}
          </span>
          {gig.userId?.level && (
            <div className="ml-auto">
              {getSellerLevelBadge(gig.userId.level)}
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {gig.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          {renderStars(gig.totalRating || 0)}
          <span className="text-sm font-medium text-gray-900 ml-1">
            {gig.totalRating || 0}
          </span>
          <span className="text-sm text-gray-500">
            ({gig.totalReviews || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Heart className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">STARTING AT</div>
            <div className="text-lg font-bold text-gray-900">
              US${gig.price || 0}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SkillBridgeGigCard;