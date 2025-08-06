import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Clock, 
  CheckCircle, 
  Heart, 
  Share2, 
  MessageCircle, 
  Shield, 
  RefreshCw,
  User,
  Calendar,
  Award,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { gigService } from '../services/gigService';
import toast from 'react-hot-toast';

const GigDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [gig, setGig] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState('basic');
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [relatedGigs, setRelatedGigs] = useState([]);

  // Fetch gig data from API
  useEffect(() => {
    const fetchGig = async () => {
      try {
        setLoading(true);
        const response = await gigService.getGigById(id);
        const gigData = response.data;
        
        // Transform the API data to match the component's expected format
        const transformedGig = {
          id: gigData._id,
          title: gigData.title,
          description: gigData.description,
          fullDescription: gigData.description, // Use description as fullDescription for now
          images: gigData.images && gigData.images.length > 0 ? gigData.images : ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'],
          seller: {
            id: gigData.userId._id,
            username: gigData.userId.username,
            fullName: gigData.userId.username, // Use username as fullName if not available
            profileImage: gigData.userId.profileImage || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            rating: gigData.userId.totalRating || 5.0,
            reviewCount: gigData.userId.totalReviews || 0,
            level: 'Top Rated Seller',
            memberSince: '2020',
            responseTime: '1 hour',
            languages: ['English'],
            skills: gigData.tags || [],
            description: 'Professional freelancer with expertise in various fields.',
            completedOrders: gigData.totalOrders || 0,
            ongoingOrders: 0
          },
          category: gigData.category,
          subcategory: gigData.subcategory,
          tags: gigData.tags || [],
          pricing: {
            basic: {
              title: gigData.packages?.basic?.title || 'Basic Package',
              price: gigData.packages?.basic?.price || gigData.price || 100,
              deliveryTime: gigData.packages?.basic?.deliveryTime || gigData.deliveryTime || 7,
              revisions: gigData.packages?.basic?.revisions || gigData.revisions || 2,
              features: gigData.packages?.basic?.features || ['Basic service included']
            },
            standard: {
              title: gigData.packages?.standard?.title || 'Standard Package',
              price: gigData.packages?.standard?.price || (gigData.price * 2) || 200,
              deliveryTime: gigData.packages?.standard?.deliveryTime || (gigData.deliveryTime + 3) || 10,
              revisions: gigData.packages?.standard?.revisions || (gigData.revisions + 1) || 3,
              features: gigData.packages?.standard?.features || ['Everything in Basic', 'Additional features']
            },
            premium: {
              title: gigData.packages?.premium?.title || 'Premium Package',
              price: gigData.packages?.premium?.price || (gigData.price * 3) || 300,
              deliveryTime: gigData.packages?.premium?.deliveryTime || (gigData.deliveryTime + 7) || 14,
              revisions: gigData.packages?.premium?.revisions || (gigData.revisions + 3) || 5,
              features: gigData.packages?.premium?.features || ['Everything in Standard', 'Premium features', 'Priority support']
            }
          },
          rating: gigData.totalRating || 5.0,
          reviewCount: gigData.totalReviews || 0,
          totalOrders: gigData.totalOrders || 0,
          inQueue: 0,
          createdAt: gigData.createdAt
        };
        
        setGig(transformedGig);
        
        // Set some mock reviews for now
        setReviews([
          {
            id: 1,
            user: {
              name: 'John Smith',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
              country: 'United States'
            },
            rating: 5,
            comment: 'Great work! Highly recommended.',
            date: new Date().toISOString().split('T')[0],
            helpful: 5
          }
        ]);
        
        // Set mock related gigs
        setRelatedGigs([]);
        
      } catch (error) {
        console.error('Error fetching gig:', error);
        toast.error('Failed to load gig details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchGig();
    }
  }, [id]);

  const handleContactSeller = () => {
    if (!user) {
      toast.error('Please login to contact the seller');
      navigate('/login');
      return;
    }
    // Navigate to messages with seller
    navigate(`/messages?seller=${gig.seller.id}`);
  };

  const handleOrderNow = () => {
    if (!user) {
      toast.error('Please login to place an order');
      navigate('/login');
      return;
    }
    // Navigate to checkout
    navigate(`/checkout/${gig.id}?package=${selectedPackage}`);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!gig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Gig not found</h1>
          <Link to="/gigs" className="text-blue-600 hover:text-blue-700">
            Browse all gigs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <Link to="/gigs" className="text-gray-700 hover:text-blue-600">
                  Gigs
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <span className="text-gray-500">{gig.category}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Gig Images */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={gig.images[currentImageIndex]}
                  alt={gig.title}
                  className="w-full h-96 object-cover"
                />
                {gig.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex(prev => prev === 0 ? gig.images.length - 1 : prev - 1)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex(prev => prev === gig.images.length - 1 ? 0 : prev + 1)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {gig.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Thumbnail strip */}
              <div className="p-4 flex space-x-2 overflow-x-auto">
                {gig.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Gig Title and Basic Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {gig.title}
                  </h1>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      {renderStars(gig.rating)}
                      <span className="ml-2 text-sm font-medium text-gray-900">
                        {gig.rating} ({gig.reviewCount} reviews)
                      </span>
                    </div>
                    <span className="text-gray-500">|</span>
                    <span className="text-sm text-gray-600">{gig.totalOrders} orders in queue</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Seller Info */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <img
                  src={gig.seller.profileImage}
                  alt={gig.seller.fullName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900">{gig.seller.fullName}</h3>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      {gig.seller.level}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      {renderStars(gig.seller.rating)}
                      <span className="ml-1">{gig.seller.rating} ({gig.seller.reviewCount})</span>
                    </div>
                    <span>•</span>
                    <span>{gig.seller.completedOrders} orders completed</span>
                  </div>
                </div>
                <button
                  onClick={handleContactSeller}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Contact Me
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About This Gig</h2>
              <div 
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: gig.fullDescription }}
              />
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Reviews ({gig.reviewCount})
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {renderStars(gig.rating)}
                  </div>
                  <span className="font-semibold text-gray-900">{gig.rating}</span>
                </div>
              </div>

              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <img
                        src={review.user.avatar}
                        alt={review.user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{review.user.name}</h4>
                            <p className="text-sm text-gray-600">{review.user.country}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center">
                              {renderStars(review.rating)}
                            </div>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                        <button className="text-sm text-gray-500 hover:text-gray-700">
                          Helpful ({review.helpful})
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-6">
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  See All Reviews
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Packages */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-8">
              <div className="border-b border-gray-200">
                <div className="flex">
                  {Object.entries(gig.pricing).map(([key, pkg]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedPackage(key)}
                      className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                        selectedPackage === key
                          ? 'border-blue-500 text-blue-600 bg-blue-50'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {pkg.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {(() => {
                  const pkg = gig.pricing[selectedPackage];
                  return (
                    <>
                      <div className="text-center mb-6">
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                          ${pkg.price}
                        </div>
                        <p className="text-gray-600">{pkg.title}</p>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">Delivery Time</span>
                          </div>
                          <span className="text-sm font-medium">{pkg.deliveryTime} days</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <RefreshCw className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">Revisions</span>
                          </div>
                          <span className="text-sm font-medium">{pkg.revisions}</span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-6">
                        {pkg.features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-3">
                        <button
                          onClick={handleOrderNow}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
                        >
                          Continue (${pkg.price})
                        </button>
                        <button
                          onClick={handleContactSeller}
                          className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                          Contact Seller
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                        <Shield className="w-4 h-4 mr-1" />
                        Money-back guarantee
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Seller Profile */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center mb-6">
                <img
                  src={gig.seller.profileImage}
                  alt={gig.seller.fullName}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900">{gig.seller.fullName}</h3>
                <p className="text-sm text-gray-600">@{gig.seller.username}</p>
                <div className="flex items-center justify-center mt-2">
                  {renderStars(gig.seller.rating)}
                  <span className="ml-2 text-sm text-gray-600">
                    {gig.seller.rating} ({gig.seller.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">From</span>
                  <span className="text-sm font-medium">United States</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Member since</span>
                  <span className="text-sm font-medium">{gig.seller.memberSince}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg. response time</span>
                  <span className="text-sm font-medium">{gig.seller.responseTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Languages</span>
                  <span className="text-sm font-medium">{gig.seller.languages.join(', ')}</span>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-4">{gig.seller.description}</p>

              <Link
                to={`/seller/${gig.seller.username}`}
                className="w-full block text-center border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                View Profile
              </Link>
            </div>

            {/* Related Gigs */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Gigs</h3>
              <div className="space-y-4">
                {relatedGigs.map((relatedGig) => (
                  <Link
                    key={relatedGig.id}
                    to={`/gigs/${relatedGig.id}`}
                    className="block group"
                  >
                    <div className="flex space-x-3">
                      <img
                        src={relatedGig.image}
                        alt={relatedGig.title}
                        className="w-16 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
                          {relatedGig.title}
                        </h4>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-600 ml-1">{relatedGig.rating}</span>
                          </div>
                          <span className="text-sm font-semibold text-gray-900">
                            ${relatedGig.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigDetails;