import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  Share2, 
  ChevronLeft, 
  ChevronRight, 
  User, 
  MapPin, 
  Clock, 
  CheckCircle,
  MessageCircle,
  Shield,
  Award,
  TrendingUp
} from 'lucide-react';
import { gigService } from '../services/gigService';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const SkillBridgeGigDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState('basic');
  const [showFullDescription, setShowFullDescription] = useState(false);


  useEffect(() => {
    fetchGigDetails();
  }, [id]);

  const fetchGigDetails = async () => {
    try {
      setLoading(true);
      const response = await gigService.getGigById(id);
      setGig(response.data);
    } catch (error) {
      console.error('Error fetching gig details:', error);
      toast.error('Failed to load gig details');
    } finally {
      setLoading(false);
    }
  };

  const handleOrderNow = () => {
    if (!isAuthenticated) {
      toast.error('Please login to place an order');
      navigate('/login');
      return;
    }

    // Check if user is trying to buy their own gig
    if (gig.userId._id === user?.id) {
      toast.error('You cannot purchase your own gig');
      return;
    }

    // Navigate to checkout page with selected package
    navigate(`/checkout/${gig._id}?package=${selectedPackage}`);
  };

  const handleContactSeller = () => {
    if (!isAuthenticated) {
      toast.error('Please login to contact seller');
      navigate('/login');
      return;
    }
    // Navigate to messages with seller
    navigate(`/messages?user=${gig.userId._id}`);
  };

  const nextImage = () => {
    if (gig?.images?.length) {
      setCurrentImageIndex((prev) => 
        prev === gig.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (gig?.images?.length) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? gig.images.length - 1 : prev - 1
      );
    }
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
        <LoadingSpinner />
      </div>
    );
  }

  if (!gig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Gig not found</h1>
          <Link to="/search" className="text-blue-600 hover:text-blue-700">
            Browse other gigs
          </Link>
        </div>
      </div>
    );
  }

  const currentPackage = gig.packages[selectedPackage];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-blue-600">SkillBridge</Link>
          <span>/</span>
          <Link to="/search" className="hover:text-blue-600">Programming & Tech</Link>
          <span>/</span>
          <Link to="/search?category=web-development" className="hover:text-blue-600">Website Development</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Gig Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gig Title */}
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                {gig.title}
              </h1>
              
              {/* Seller Info */}
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={gig.userId?.profileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
                  alt={gig.userId?.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <Link 
                      to={`/sellers/${gig.userId?.username || gig.userId?._id}`}
                      className="font-semibold text-gray-900 hover:text-blue-600"
                    >
                      {gig.userId?.username}
                    </Link>
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded">
                      Level 2 Seller
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      {renderStars(gig.userId?.totalRating / Math.max(gig.userId?.totalReviews, 1) || 0)}
                      <span className="font-medium text-gray-900">{(gig.userId?.totalRating / Math.max(gig.userId?.totalReviews, 1) || 0).toFixed(1)}</span>
                      <span>({gig.userId?.totalReviews || 0})</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{gig.userId?.country || 'Unknown'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={gig.images?.[currentImageIndex] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'}
                  alt={gig.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                {gig.images?.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Images */}
              {gig.images?.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {gig.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-16 h-12 rounded-md overflow-hidden border-2 ${
                        index === currentImageIndex ? 'border-blue-600' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${gig.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">About This Gig</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {showFullDescription 
                    ? gig.description 
                    : gig.description?.slice(0, 300) + (gig.description?.length > 300 ? '...' : '')
                  }
                </p>
                {gig.description.length > 300 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-blue-600 hover:text-blue-700 font-medium mt-2"
                  >
                    {showFullDescription ? 'Show less' : 'Show more'}
                  </button>
                )}
              </div>
            </div>

            {/* About The Seller */}
            <div className="border-t pt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About The Seller</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={gig.seller?.profileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face'}
                    alt={gig.seller?.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900">{gig.seller?.name}</h3>
                    <p className="text-gray-600 mb-2">{gig.seller?.title}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="flex items-center space-x-1 mb-1">
                          {renderStars(gig.seller?.rating || 0)}
                          <span className="font-medium">{gig.seller?.rating || 0}</span>
                          <span className="text-gray-500">({gig.seller?.reviewCount || 0})</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-500">
                          <MapPin className="w-3 h-3" />
                          <span>{gig.seller?.country}</span>
                        </div>
                      </div>
                      <div className="space-y-1 text-gray-600">
                        <div>Member since {new Date(gig.seller?.createdAt).getFullYear()}</div>
                        <div>Avg. response time: {gig.seller?.responseTime || '1 hour'}</div>
                        <div>Last delivery: {gig.seller?.lastDelivery || 'about 2 hours'}</div>
                      </div>
                    </div>

                    <p className="text-gray-700 mt-3 text-sm">
                      {gig.seller?.description || 'Professional freelancer with years of experience.'}
                    </p>

                    <button
                      onClick={handleContactSeller}
                      className="mt-4 px-6 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                    >
                      Contact me
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Pricing */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                {/* Package Tabs */}
                {gig.packages && Object.keys(gig.packages).length > 1 && (
                  <div className="flex border-b border-gray-200 mb-6">
                    {Object.entries(gig.packages).map(([key, pkg]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedPackage(key)}
                        className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                          selectedPackage === key
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {pkg.name}
                      </button>
                    ))}
                  </div>
                )}

                {/* Package Details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">
                      {currentPackage?.name || 'Basic Package'}
                    </h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        US${currentPackage?.price || gig.price}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm">
                    {currentPackage?.description || gig.description?.slice(0, 100)}
                  </p>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{currentPackage?.deliveryTime || gig.deliveryTime} delivery</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>{currentPackage?.revisions || 'Unlimited'} revisions</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {(currentPackage?.features || []).map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 pt-4">
                    <button
                      onClick={handleOrderNow}
                      className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Continue to Payment (US$${currentPackage?.price || gig.price})
                    </button>
                    <button
                      onClick={handleContactSeller}
                      className="w-full border border-gray-300 text-gray-700 py-3 rounded-md font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Contact Seller
                    </button>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Money-back guarantee</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Award className="w-4 h-4 text-blue-500" />
                    <span>Quality work guaranteed</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MessageCircle className="w-4 h-4 text-purple-500" />
                    <span>24/7 customer support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillBridgeGigDetails;