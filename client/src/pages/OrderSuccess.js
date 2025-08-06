import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  CheckCircle, 
  Clock, 
  MessageCircle, 
  Download,
  Star,
  User,
  Calendar,
  RefreshCw,
  ArrowRight,
  Home
} from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const sessionId = searchParams.get('session_id');
  const orderId = searchParams.get('order_id');
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentVerified, setPaymentVerified] = useState(false);

  useEffect(() => {
    if (!user) {
      toast.error('Please login to view your order');
      navigate('/login');
      return;
    }

    if (!sessionId || !orderId) {
      toast.error('Invalid order information');
      navigate('/');
      return;
    }

    verifyPaymentAndFetchOrder();
  }, [sessionId, orderId, user, navigate]);

  const verifyPaymentAndFetchOrder = async () => {
    try {
      console.log('🔍 Verifying payment and fetching order...');
      
      // Verify payment with Stripe
      const paymentResponse = await axios.get(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/stripe/verify/${sessionId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (paymentResponse.data.success) {
        setPaymentVerified(true);
        console.log('✅ Payment verified');
      }

      // Fetch order details
      const orderResponse = await axios.get(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/stripe/order/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (orderResponse.data.success) {
        setOrder(orderResponse.data.data);
        console.log('✅ Order details fetched');
      }

    } catch (error) {
      console.error('❌ Error verifying payment or fetching order:', error);
      toast.error('Failed to verify payment. Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  const handleContactSeller = () => {
    if (order) {
      navigate(`/messages?seller=${order.sellerId._id}`);
    }
  };

  const handleViewOrder = () => {
    if (order) {
      navigate(`/orders/${order._id}`);
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
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h1>
          <p className="text-gray-600 mb-6">We couldn't find your order. Please contact support if you believe this is an error.</p>
          <Link
            to="/orders"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">
            Your order has been placed successfully. The seller will start working on your project soon.
          </p>
          {paymentVerified && (
            <div className="inline-flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm mt-2">
              <CheckCircle className="w-4 h-4 mr-1" />
              Payment Verified
            </div>
          )}
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Order #{order.orderId}
              </span>
            </div>
          </div>

          <div className="p-6">
            {/* Gig Info */}
            <div className="flex items-start space-x-4 mb-6">
              {order.gigId?.images && order.gigId.images.length > 0 && (
                <img
                  src={order.gigId.images[0]}
                  alt={order.title}
                  className="w-24 h-20 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{order.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{order.description}</p>
                
                {/* Seller Info */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <img
                      src={order.sellerId?.profileImage || '/default-avatar.png'}
                      alt={order.sellerId?.username}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.sellerId?.username}</p>
                      <div className="flex items-center">
                        {renderStars(4.9)}
                        <span className="text-xs text-gray-500 ml-1">(127)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-medium text-gray-900">Order Placed</h4>
                <p className="text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-medium text-gray-900">In Progress</h4>
                <p className="text-sm text-gray-600">
                  Delivery in {order.deliveryTime} days
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Download className="w-6 h-6 text-gray-400" />
                </div>
                <h4 className="font-medium text-gray-900">Delivery</h4>
                <p className="text-sm text-gray-600">
                  Expected: {new Date(order.expectedDelivery).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Package: {order.packageType}</span>
                  <span className="font-medium">${order.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="font-medium">${order.serviceFee}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Delivery Time</span>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-gray-400" />
                    {order.deliveryTime} days
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Revisions</span>
                  <div className="flex items-center">
                    <RefreshCw className="w-4 h-4 mr-1 text-gray-400" />
                    {order.maxRevisions} included
                  </div>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total Paid</span>
                    <span className="text-blue-600">${order.totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleViewOrder}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            View Order Details
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
          
          <button
            onClick={handleContactSeller}
            className="bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Contact Seller
          </button>
          
          <Link
            to="/"
            className="bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 rounded-2xl p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">What happens next?</h3>
          <div className="space-y-3 text-blue-800">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-xs font-bold">1</span>
              </div>
              <p>The seller will review your requirements and start working on your project.</p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-xs font-bold">2</span>
              </div>
              <p>You'll receive updates and can communicate with the seller through our messaging system.</p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-xs font-bold">3</span>
              </div>
              <p>Once completed, you'll receive the final deliverables and can request revisions if needed.</p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-xs font-bold">4</span>
              </div>
              <p>After you're satisfied, you can mark the order as complete and leave a review.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;