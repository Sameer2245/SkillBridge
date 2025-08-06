import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  MessageCircle, 
  Download, 
  Star,
  Calendar,
  DollarSign,
  Filter,
  Search,
  MoreVertical,
  Eye,
  RefreshCw,
  FileText,
  Upload,
  CreditCard,
  Package
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { orderService } from '../services/orders';
import { paymentService } from '../services/payment';
import socketService from '../services/socket';
import StripePayment from '../components/payment/StripePayment';
import toast from 'react-hot-toast';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentOrder, setPaymentOrder] = useState(null);

  const tabs = [
    { id: 'all', label: 'All Orders', count: 0 },
    { id: 'active', label: 'Active', count: 0 },
    { id: 'delivered', label: 'Delivered', count: 0 },
    { id: 'completed', label: 'Completed', count: 0 },
    { id: 'cancelled', label: 'Cancelled', count: 0 }
  ];

  useEffect(() => {
    loadOrders();
    setupSocketListeners();

    return () => {
      cleanupSocketListeners();
    };
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getOrders();
      setOrders(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Load orders error:', error);
      toast.error('Failed to load orders');
      setOrders([]); // Set empty array on error
      // Fallback to mock data
      setTimeout(() => {
        const mockOrders = [
        {
          _id: 'ORD-001',
          gigId: {
            title: 'I will create a modern responsive website for your business',
            images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop'],
          },
          sellerId: {
            username: 'sarah_dev',
            profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b9e0e4b0?w=100&h=100&fit=crop&crop=face',
          },
          buyerId: {
            username: 'john_client',
            profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
          },
          package: 'basic',
          price: 299,
          status: 'active',
          paymentStatus: 'completed',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        }
        ];
        setOrders(mockOrders);
        setLoading(false);
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  const setupSocketListeners = () => {
    try {
      socketService.on('order_status_changed', (data) => {
        setOrders(prev => 
          (prev || []).map(order => 
            order._id === data.orderId 
              ? { ...order, status: data.status }
              : order
          )
        );
        toast.success(data.message);
      });
    } catch (error) {
      console.log('Socket service not available:', error);
    }
  };

  const cleanupSocketListeners = () => {
    try {
      socketService.off('order_status_changed');
    } catch (error) {
      console.log('Error cleaning up socket listeners:', error);
    }
  };

  const handlePayment = (order) => {
    setPaymentOrder({
      gigId: order.gigId._id,
      gigTitle: order.gigId.title,
      package: order.package,
      price: order.price,
    });
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async (paymentIntent) => {
    setShowPaymentModal(false);
    setPaymentOrder(null);
    toast.success('Payment successful!');
    loadOrders(); // Reload orders
  };

  const handlePaymentError = (error) => {
    toast.error('Payment failed. Please try again.');
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      setOrders(prev => 
        (prev || []).map(order => 
          order._id === orderId 
            ? { ...order, status: newStatus }
            : order
        )
      );
      toast.success('Order status updated');
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  const deliverOrder = async (orderId, deliveryNote, files) => {
    try {
      const formData = new FormData();
      formData.append('deliveryNote', deliveryNote);
      files.forEach(file => {
        formData.append('deliveryFiles', file);
      });

      await orderService.deliverOrder(orderId, formData);
      toast.success('Order delivered successfully');
      loadOrders();
    } catch (error) {
      toast.error('Failed to deliver order');
    }
  };

  const acceptDelivery = async (orderId) => {
    try {
      await orderService.acceptDelivery(orderId);
      toast.success('Delivery accepted');
      loadOrders();
    } catch (error) {
      toast.error('Failed to accept delivery');
    }
  };

  const requestRevision = async (orderId, revisionNote) => {
    try {
      await orderService.requestRevision(orderId, { revisionNote });
      toast.success('Revision requested');
      loadOrders();
    } catch (error) {
      toast.error('Failed to request revision');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending_payment':
        return <CreditCard className="h-4 w-4 text-yellow-500" />;
      case 'active':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'delivered':
        return <Package className="h-4 w-4 text-purple-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'revision':
        return <RefreshCw className="h-4 w-4 text-orange-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending_payment':
        return 'bg-yellow-100 text-yellow-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'revision':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDaysRemaining = (deliveryDate) => {
    const now = new Date();
    const delivery = new Date(deliveryDate);
    const diffTime = delivery - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pending_payment':
        return 'Pending Payment';
      case 'active':
        return 'In Progress';
      case 'delivered':
        return 'Delivered';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      case 'revision':
        return 'Revision Requested';
      default:
        return status;
    }
  };

  const safeOrders = Array.isArray(orders) ? orders : [];
  
  const orderTabs = [
    { id: 'all', label: 'All Orders', count: safeOrders.length },
    { id: 'active', label: 'Active', count: safeOrders.filter(o => o.status === 'active').length },
    { id: 'delivered', label: 'Delivered', count: safeOrders.filter(o => o.status === 'delivered').length },
    { id: 'completed', label: 'Completed', count: safeOrders.filter(o => o.status === 'completed').length },
    { id: 'cancelled', label: 'Cancelled', count: safeOrders.filter(o => o.status === 'cancelled').length }
  ];

  const filteredOrders = safeOrders.filter(order => {
    const matchesTab = activeTab === 'all' || order.status === activeTab;
    const matchesSearch = order.gigId?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.sellerId?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.buyerId?.username?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'price_high':
        return b.totalAmount - a.totalAmount;
      case 'price_low':
        return a.totalAmount - b.totalAmount;
      case 'deadline':
        return new Date(a.deliveryDate) - new Date(b.deliveryDate);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="mt-2 text-gray-600">Manage your orders and track progress</p>
        </div>

        {/* Order Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {orderTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {sortedOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-500">
                {activeTab === 'all' 
                  ? "You don't have any orders yet." 
                  : `No ${getStatusText(activeTab).toLowerCase()} orders found.`
                }
              </p>
            </div>
          ) : (
            sortedOrders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex space-x-4">
                      <img
                        src={order.gigId?.images?.[0] || '/api/placeholder/80/60'}
                        alt={order.gigId?.title}
                        className="w-20 h-15 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {order.gigId?.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                          <span>Order #{order._id?.slice(-8)}</span>
                          <span>•</span>
                          <span>{formatDate(order.createdAt)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                          >
                            {getStatusText(order.status)}
                          </span>
                          <span className="text-lg font-bold text-gray-900">
                            ${order.totalAmount}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                        View Details
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
                        Contact {user?.userType === 'client' ? 'Seller' : 'Buyer'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
