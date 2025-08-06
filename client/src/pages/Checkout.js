import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  CreditCard, 
  Shield, 
  Clock, 
  RefreshCw, 
  CheckCircle,
  ArrowLeft,
  Star,
  User
} from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { gigService } from '../services/gigService';

const Checkout = () => {
  const { gigId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const packageType = searchParams.get('package') || 'basic';
  
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [requirements, setRequirements] = useState([]);

  useEffect(() => {
    if (!user) {
      toast.error('Please login to continue');
      navigate('/login');
      return;
    }
    fetchGigDetails();
  }, [gigId, user, navigate]);

  const fetchGigDetails = async () => {
    try {
      console.log('🔍 Fetching gig details for ID:', gigId);
      const response = await gigService.getGigById(gigId);
      
      if (response.success) {
        const gigData = response.data;
        
        // Transform the data to match our component structure
        const transformedGig = {
          id: gigData._id,
          title: gigData.title,
          description: gigData.description,
          images: gigData.images || [],
          seller: {
            id: gigData.userId._id,
            username: gigData.userId.username,
            fullName: gigData.userId.fullName,
            profileImage: gigData.userId.profileImage,
            rating: gigData.userId.stats?.averageRating || 4.9,
            reviewCount: gigData.userId.stats?.totalReviews || 0,
            level: gigData.userId.stats?.totalOrders > 50 ? 'Top Rated Seller' : 'New Seller',
            responseTime: gigData.userId.responseTime ? `${gigData.userId.responseTime} hour${gigData.userId.responseTime > 1 ? 's' : ''}` : '1 hour'
          },
          packages: gigData.packages || {
            basic: {
              title: gigData.title,
              description: gigData.description,
              price: gigData.price,
              deliveryTime: gigData.deliveryTime,
              revisions: gigData.revisions,
              features: ['Basic package features']
            }
          },
          requirements: gigData.requirements || []
        };
        
        setGig(transformedGig);
        console.log('✅ Gig details loaded successfully');
      } else {
        throw new Error(response.message || 'Failed to fetch gig details');
      }
    } catch (error) {
      console.error('❌ Error fetching gig details:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to load gig details';
      toast.error(errorMessage);
      
      // If gig not found, redirect back
      if (error.response?.status === 404) {
        navigate('/gigs');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRequirementChange = (index, value) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[index] = {
      question: gig.requirements[index].question,
      answer: value,
      type: gig.requirements[index].type,
      required: gig.requirements[index].required
    };
    setRequirements(updatedRequirements);
  };

  const validateRequirements = () => {
    if (!gig.requirements) return true;
    
    for (let i = 0; i < gig.requirements.length; i++) {
      const requirement = gig.requirements[i];
      if (requirement.required && (!requirements[i] || !requirements[i].answer.trim())) {
        toast.error(`Please answer: ${requirement.question}`);
        return false;
      }
    }
    return true;
  };

  const handleProceedToPayment = async () => {
    if (!validateRequirements()) return;

    setProcessing(true);
    
    try {
      console.log('🔍 Creating checkout session...');
      
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/stripe/create-checkout-session`,
        {
          gigId,
          packageType,
          requirements: requirements.filter(req => req && req.answer)
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.success) {
        console.log('✅ Checkout session created, redirecting...');
        // Redirect to Stripe Checkout
        window.location.href = response.data.sessionUrl;
      } else {
        throw new Error(response.data.message || 'Failed to create checkout session');
      }
    } catch (error) {
      console.error('❌ Checkout error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to proceed to payment';
      toast.error(errorMessage);
    } finally {
      setProcessing(false);
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
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!gig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Gig not found</h1>
          <button
            onClick={() => navigate('/gigs')}
            className="text-blue-600 hover:text-blue-700"
          >
            Browse all gigs
          </button>
        </div>
      </div>
    );
  }

  const selectedPackage = gig.packages[packageType];
  const serviceFee = Math.round(selectedPackage.price * 0.05 * 100) / 100;
  const totalAmount = selectedPackage.price + serviceFee;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(`/gig/${gigId}`)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Gig
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Review your order and complete payment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gig Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="flex items-start space-x-4">
                <img
                  src={gig.images[0]}
                  alt={gig.title}
                  className="w-20 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-2">{gig.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {gig.seller.username}
                    </div>
                    <div className="flex items-center">
                      {renderStars(gig.seller.rating)}
                      <span className="ml-1">({gig.seller.reviewCount})</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">
                  {selectedPackage.title} - ${selectedPackage.price}
                </h4>
                <p className="text-gray-600 text-sm mb-3">{selectedPackage.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    {selectedPackage.deliveryTime} days delivery
                  </div>
                  <div className="flex items-center">
                    <RefreshCw className="w-4 h-4 mr-2 text-gray-400" />
                    {selectedPackage.revisions} revisions
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-900 mb-2">Included:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedPackage.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Requirements */}
            {gig.requirements && gig.requirements.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Requirements
                  <span className="text-sm font-normal text-gray-600 ml-2">
                    Please provide the following information to get started
                  </span>
                </h2>
                
                <div className="space-y-4">
                  {gig.requirements.map((requirement, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        {requirement.question}
                        {requirement.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your answer..."
                        value={requirements[index]?.answer || ''}
                        onChange={(e) => handleRequirementChange(index, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Package Price</span>
                  <span className="font-medium">${selectedPackage.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee (5%)</span>
                  <span className="font-medium">${serviceFee}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-semibold text-blue-600">${totalAmount}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Shield className="w-4 h-4 mr-2 text-green-500" />
                  Secure payment with Stripe
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CreditCard className="w-4 h-4 mr-2 text-blue-500" />
                  All major credit cards accepted
                </div>
              </div>

              <button
                onClick={handleProceedToPayment}
                disabled={processing}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {processing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  `Continue to Payment - $${totalAmount}`
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By continuing, you agree to our Terms of Service and acknowledge our Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;