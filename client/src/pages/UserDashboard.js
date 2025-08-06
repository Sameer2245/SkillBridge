import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { orderService } from '../services/orders';
import { messageService } from '../services/messages';
import { 
  Search, 
  ShoppingCart, 
  MessageCircle, 
  Star, 
  Clock, 
  DollarSign,
  TrendingUp,
  Heart,
  Filter,
  Grid,
  List
} from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/common/LoadingSpinner';

const UserDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);

  // Initialize with empty/zero values instead of mock data
  const [dashboardData, setDashboardData] = useState({
    stats: {
      activeOrders: 0,
      completedOrders: 0,
      totalSpent: 0,
      savedFreelancers: 0
    },
    recentOrders: [],
    messages: [],
    recommendations: []
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load user's orders and messages in parallel
      const [ordersResponse, messagesResponse] = await Promise.allSettled([
        orderService.getUserOrders(),
        messageService.getConversations(),
      ]);

      // Safely extract data with fallbacks
      let orders = [];
      let conversations = [];

      if (ordersResponse.status === 'fulfilled' && ordersResponse.value?.data) {
        orders = Array.isArray(ordersResponse.value.data) ? ordersResponse.value.data : [];
      } else {
        console.log('Orders response failed or invalid:', ordersResponse);
      }

      if (messagesResponse.status === 'fulfilled' && messagesResponse.value?.data) {
        conversations = Array.isArray(messagesResponse.value.data) ? messagesResponse.value.data : [];
      } else {
        console.log('Messages response failed or invalid:', messagesResponse);
      }

      // Calculate stats from real data
      const activeOrders = orders.filter(order => 
        order.status === 'active' || order.status === 'in_progress' || order.status === 'pending'
      ).length;
      
      const completedOrders = orders.filter(order => order.status === 'completed').length;
      
      const totalSpent = orders
        .filter(order => order.status === 'completed')
        .reduce((sum, order) => sum + (order.amount || 0), 0);

      // Format messages for display
      const formattedMessages = conversations.slice(0, 5).map(conv => ({
        id: conv._id,
        freelancer: conv.participants?.find(p => p._id !== user?.id)?.username || 'Unknown',
        lastMessage: conv.lastMessage?.content || 'No messages yet',
        timestamp: conv.lastMessage?.createdAt ? formatTimeAgo(conv.lastMessage.createdAt) : 'No date',
        unread: conv.unreadCount > 0
      }));

      // Update dashboard data with real values
      setDashboardData({
        stats: {
          activeOrders,
          completedOrders,
          totalSpent,
          savedFreelancers: 0 // This would need a separate API endpoint
        },
        recentOrders: orders.slice(0, 5).map(order => ({
          id: order._id,
          title: order.gig?.title || 'Order',
          freelancer: order.seller?.username || 'Unknown',
          status: order.status,
          price: order.amount || 0,
          dueDate: order.dueDate ? new Date(order.dueDate).toLocaleDateString() : 'No due date',
          progress: getOrderProgress(order.status)
        })),
        messages: formattedMessages,
        recommendations: [] // This would need a separate API endpoint for recommendations
      });

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
  };

  const getOrderProgress = (status) => {
    switch (status) {
      case 'pending': return 0;
      case 'active': return 50;
      case 'in_progress': return 75;
      case 'completed': return 100;
      default: return 0;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in_progress':
        return 'In Progress';
      case 'pending':
        return 'Pending';
      default:
        return 'Unknown';
    }
  };

  const StatCard = ({ icon: Icon, title, value, color, trend }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 mt-1 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.username}! 👋
              </h1>
              <p className="text-blue-100 text-lg">Manage your projects and discover amazing talent</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/search"
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium hover:bg-white/30 transition-all transform hover:scale-105 flex items-center"
              >
                <Search className="w-5 h-5 mr-2" />
                Find Services
              </Link>
              <Link
                to="/messages"
                className="bg-white text-blue-600 px-6 py-3 rounded-xl font-medium hover:bg-blue-50 transition-all transform hover:scale-105 flex items-center"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Messages
                {dashboardData.messages.filter(m => m.unread).length > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {dashboardData.messages.filter(m => m.unread).length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon={ShoppingCart}
                title="Active Orders"
                value={dashboardData.stats.activeOrders}
                color="bg-blue-500"
              />
              <StatCard
                icon={Star}
                title="Completed Orders"
                value={dashboardData.stats.completedOrders}
                color="bg-green-500"
              />
              <StatCard
                icon={DollarSign}
                title="Total Spent"
                value={`$${dashboardData.stats.totalSpent.toFixed(2)}`}
                color="bg-purple-500"
              />
              <StatCard
                icon={Heart}
                title="Saved Freelancers"
                value={dashboardData.stats.savedFreelancers}
                color="bg-pink-500"
              />
            </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/search"
              className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:from-blue-100 hover:to-purple-100 transition-all group"
            >
              <div className="bg-blue-500 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Find Services</h4>
                <p className="text-sm text-gray-600">Browse freelancers</p>
              </div>
            </Link>
            
            <Link
              to="/orders"
              className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all group"
            >
              <div className="bg-green-500 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">My Orders</h4>
                <p className="text-sm text-gray-600">Track progress</p>
              </div>
            </Link>
            
            <Link
              to="/messages"
              className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl hover:from-yellow-100 hover:to-orange-100 transition-all group"
            >
              <div className="bg-yellow-500 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Messages</h4>
                <p className="text-sm text-gray-600">Chat with sellers</p>
              </div>
            </Link>
            
            <div className="flex items-center p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl cursor-pointer hover:from-pink-100 hover:to-rose-100 transition-all group">
              <div className="bg-pink-500 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Favorites</h4>
                <p className="text-sm text-gray-600">Saved freelancers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: Grid },
                { id: 'orders', label: 'My Orders', icon: ShoppingCart },
                { id: 'messages', label: 'Messages', icon: MessageCircle },
                { id: 'favorites', label: 'Favorites', icon: Heart }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Recent Orders */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                    <Link to="/orders" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View All
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {dashboardData.recentOrders.length > 0 ? (
                      dashboardData.recentOrders.slice(0, 3).map((order) => (
                        <div key={order.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{order.title}</h4>
                              <p className="text-sm text-gray-600">by {order.freelancer}</p>
                              <div className="flex items-center mt-2 space-x-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                  {getStatusText(order.status)}
                                </span>
                                <span className="text-sm text-gray-500">Due: {order.dueDate}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">${order.price}</p>
                              {order.status === 'in_progress' && (
                                <div className="mt-2">
                                  <div className="w-20 bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-blue-600 h-2 rounded-full" 
                                      style={{ width: `${order.progress}%` }}
                                    ></div>
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1">{order.progress}% complete</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h4 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h4>
                        <p className="text-gray-600 mb-4">Start by browsing our talented freelancers</p>
                        <Link 
                          to="/search" 
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Search className="w-4 h-4 mr-2" />
                          Find Services
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* Recent Messages */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Messages</h3>
                    <Link to="/messages" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View All
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {dashboardData.messages.map((message) => (
                      <div key={message.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center">
                              <h4 className="font-medium text-gray-900">{message.freelancer}</h4>
                              {message.unread && (
                                <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{message.lastMessage}</p>
                          </div>
                          <span className="text-xs text-gray-500">{message.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Recommended for You</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {dashboardData.recommendations.map((rec) => (
                      <div key={rec.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                        <div className="flex items-center">
                          <img
                            src={rec.image}
                            alt={rec.freelancer}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="ml-4 flex-1">
                            <h4 className="font-medium text-gray-900">{rec.title}</h4>
                            <p className="text-sm text-gray-600">by {rec.freelancer}</p>
                            <div className="flex items-center mt-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600 ml-1">{rec.rating}</span>
                              <span className="text-sm font-semibold text-gray-900 ml-auto">${rec.price}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Spending Analytics */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Spending Analytics</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Spending Overview */}
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Spending Overview</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Total Spent</span>
                          <span className="font-semibold text-purple-600">${dashboardData.stats.totalSpent}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">This Month</span>
                          <span className="font-semibold text-blue-600">$450</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Average per Order</span>
                          <span className="font-semibold text-green-600">${Math.round(dashboardData.stats.totalSpent / dashboardData.stats.completedOrders)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Activity Summary */}
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Activity Summary</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Active Orders</span>
                          <span className="font-semibold text-blue-600">{dashboardData.stats.activeOrders}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Completed Orders</span>
                          <span className="font-semibold text-green-600">{dashboardData.stats.completedOrders}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Saved Freelancers</span>
                          <span className="font-semibold text-pink-600">{dashboardData.stats.savedFreelancers}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">All Orders</h3>
                  <div className="flex items-center space-x-4">
                    <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                      <option>All Status</option>
                      <option>Active</option>
                      <option>Completed</option>
                      <option>Pending</option>
                    </select>
                    <div className="flex border border-gray-300 rounded-lg">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-500'}`}
                      >
                        <Grid className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-500'}`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                  {dashboardData.recentOrders.map((order) => (
                    <div key={order.id} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{order.title}</h4>
                          <p className="text-sm text-gray-600">by {order.freelancer}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Price:</span>
                          <span className="font-semibold">${order.price}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Due Date:</span>
                          <span>{order.dueDate}</span>
                        </div>
                        {order.status === 'in_progress' && (
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Progress:</span>
                              <span>{order.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${order.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                          View Details
                        </button>
                        <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">
                          Message
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Messages</h3>
                <div className="space-y-4">
                  {dashboardData.messages.map((message) => (
                    <div key={message.id} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h4 className="font-medium text-gray-900">{message.freelancer}</h4>
                            {message.unread && (
                              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">New</span>
                            )}
                          </div>
                          <p className="text-gray-600">{message.lastMessage}</p>
                          <p className="text-sm text-gray-500 mt-2">{message.timestamp}</p>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                          Reply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Saved Freelancers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dashboardData.recommendations.map((freelancer) => (
                    <div key={freelancer.id} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center mb-4">
                        <img
                          src={freelancer.image}
                          alt={freelancer.freelancer}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="ml-4 flex-1">
                          <h4 className="font-medium text-gray-900">{freelancer.freelancer}</h4>
                          <p className="text-sm text-gray-600">{freelancer.title}</p>
                        </div>
                        <button className="text-red-500 hover:text-red-700">
                          <Heart className="w-5 h-5 fill-current" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{freelancer.rating}</span>
                        </div>
                        <span className="font-semibold text-gray-900">Starting at ${freelancer.price}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                          View Profile
                        </button>
                        <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">
                          Contact
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;