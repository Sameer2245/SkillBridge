import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { orderService } from '../services/orders';
import { gigService } from '../services/gigs';
import { paymentService } from '../services/payment';
import socketService from '../services/socket';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Star, 
  MessageCircle, 
  Package, 
  Calendar,
  Eye,
  Plus,
  Edit,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity,
  Award,
  Target
} from 'lucide-react';
import toast from 'react-hot-toast';

const FreelancerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalEarnings: 0,
      monthlyEarnings: 0,
      activeOrders: 0,
      completedOrders: 0,
      totalClients: 0,
      averageRating: 0,
      responseTime: '0 hours',
      completionRate: 0
    },
    gigs: [],
    orders: [],
    messages: [],
    earnings: {
      pending: 0,
      available: 0
    },
  });

  useEffect(() => {
    loadDashboardData();
    setupSocketListeners();

    return () => {
      cleanupSocketListeners();
    };
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load all dashboard data in parallel with error handling for each
      const [gigsResponse, ordersResponse, earningsResponse] = await Promise.allSettled([
        gigService.getMyGigs(),
        orderService.getOrders(),
        paymentService.getSellerEarnings(),
      ]);

      // Safely extract data with fallbacks
      let gigs = [];
      let orders = [];
      let earnings = {};

      if (gigsResponse.status === 'fulfilled' && gigsResponse.value?.data) {
        gigs = Array.isArray(gigsResponse.value.data) ? gigsResponse.value.data : [];
      }

      if (ordersResponse.status === 'fulfilled' && ordersResponse.value?.data) {
        orders = Array.isArray(ordersResponse.value.data) ? ordersResponse.value.data : [];
      } else {
        console.log('Orders response failed or invalid:', ordersResponse);
      }

      if (earningsResponse.status === 'fulfilled' && earningsResponse.value?.data) {
        earnings = earningsResponse.value.data || {};
      }

      // Ensure orders is always an array before calculations
      const safeOrders = Array.isArray(orders) ? orders : [];
      console.log('Final orders value:', orders, 'Safe orders:', safeOrders, 'Type:', typeof orders, 'IsArray:', Array.isArray(orders));
      
      // Calculate stats
      const activeOrders = safeOrders.filter(order => order.status === 'active').length;
      const completedOrders = safeOrders.filter(order => order.status === 'completed').length;
      const totalClients = new Set(safeOrders.map(order => order.buyerId?._id).filter(Boolean)).size;
      
      // Calculate average rating from user data
      const averageRating = user?.totalReviews > 0 ? user.totalRating / user.totalReviews : 0;
      
      setDashboardData({
        stats: {
          totalEarnings: earnings.totalEarnings || 0,
          monthlyEarnings: earnings.monthlyEarnings || 0,
          activeOrders,
          completedOrders,
          totalClients,
          averageRating,
          responseTime: '2 hours', // This would come from analytics
          completionRate: completedOrders > 0 ? Math.round((completedOrders / safeOrders.length) * 100) : 0
        },
        gigs: Array.isArray(gigs) ? gigs : [],
        orders: safeOrders.slice(0, 5), // Show recent 5 orders
        messages: [], // TODO: Load messages from API
        earnings,
      });
    } catch (error) {
      console.error('Dashboard load error:', error);
      toast.error('Failed to load dashboard data');
      
      // Set default data even on error
      setDashboardData({
        stats: {
          totalEarnings: 0,
          monthlyEarnings: 0,
          activeOrders: 0,
          completedOrders: 0,
          totalClients: 0,
          averageRating: 0,
          responseTime: '0 hours',
          completionRate: 0
        },
        gigs: [],
        orders: [],
        messages: [],
        earnings: {
          pending: 0,
          available: 0
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const setupSocketListeners = () => {
    try {
      socketService.on('order_status_changed', (data) => {
        loadDashboardData(); // Refresh dashboard when order status changes
        toast.success(data.message);
      });

      socketService.on('new_message', (message) => {
        // Update message notifications
        toast.success(`New message from ${message.senderName}`);
      });
    } catch (error) {
      console.log('Socket service not available:', error);
    }
  };

  const cleanupSocketListeners = () => {
    try {
      socketService.off('order_status_changed');
      socketService.off('new_message');
    } catch (error) {
      console.log('Error cleaning up socket listeners:', error);
    }
  };

  // Mock data for development
  const mockData = {
    recentOrders: [
      {
        id: 1,
        title: 'E-commerce Website Development',
        client: 'John Smith',
        status: 'in_progress',
        price: 800,
        dueDate: '2024-01-28',
        progress: 75,
        priority: 'high'
      },
      {
        id: 2,
        title: 'Logo Design Package',
        client: 'Tech Startup Inc.',
        status: 'pending_review',
        price: 200,
        dueDate: '2024-01-25',
        progress: 100,
        priority: 'medium'
      },
      {
        id: 3,
        title: 'Mobile App UI Design',
        client: 'Sarah Johnson',
        status: 'in_progress',
        price: 600,
        dueDate: '2024-02-05',
        progress: 40,
        priority: 'medium'
      }
    ],
    messages: [
      {
        id: 1,
        client: 'John Smith',
        lastMessage: 'Could you please update the homepage design?',
        timestamp: '1 hour ago',
        unread: true
      },
      {
        id: 2,
        client: 'Tech Startup Inc.',
        lastMessage: 'The logo looks perfect! Thank you.',
        timestamp: '3 hours ago',
        unread: false
      }
    ],
    gigs: [
      {
        id: 1,
        title: 'I will create a modern website for your business',
        views: 1234,
        orders: 23,
        rating: 4.9,
        price: 500,
        status: 'active'
      },
      {
        id: 2,
        title: 'I will design a professional logo',
        views: 856,
        orders: 45,
        rating: 4.8,
        price: 150,
        status: 'active'
      }
    ],
    earnings: {
      thisMonth: [
        { date: '2024-01-01', amount: 150 },
        { date: '2024-01-05', amount: 300 },
        { date: '2024-01-10', amount: 200 },
        { date: '2024-01-15', amount: 400 },
        { date: '2024-01-20', amount: 200 }
      ],
      pending: 850,
      available: 3200
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
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
      case 'pending_review':
        return 'Pending Review';
      case 'pending':
        return 'Pending';
      default:
        return 'Unknown';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color, trend }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
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
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome, {user?.username}! 🚀
              </h1>
              <p className="text-green-100 text-lg">Manage your services and grow your freelance business</p>
              <div className="flex items-center mt-3 space-x-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-300 mr-2" />
                  <span className="text-green-100">{dashboardData.stats.averageRating} Rating</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-2" />
                  <span className="text-green-100">{dashboardData.stats.completionRate}% Success Rate</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-blue-300 mr-2" />
                  <span className="text-green-100">{dashboardData.stats.responseTime} Response Time</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/my-gigs"
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium hover:bg-white/30 transition-all transform hover:scale-105 flex items-center"
              >
                <Package className="w-5 h-5 mr-2" />
                My Gigs
              </Link>
              <Link
                to="/gigs/create"
                className="bg-white text-green-600 px-6 py-3 rounded-xl font-medium hover:bg-green-50 transition-all transform hover:scale-105 flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create New Gig
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={DollarSign}
            title="Total Earnings"
            value={`$${dashboardData.stats.totalEarnings}`}
            subtitle={`$${dashboardData.stats.monthlyEarnings} this month`}
            color="bg-green-500"
            trend="+15% from last month"
          />
          <StatCard
            icon={Package}
            title="Active Orders"
            value={dashboardData.stats.activeOrders}
            subtitle={`${dashboardData.stats.completedOrders} completed`}
            color="bg-blue-500"
          />
          <StatCard
            icon={Users}
            title="Total Clients"
            value={dashboardData.stats.totalClients}
            subtitle={`${dashboardData.stats.completionRate}% completion rate`}
            color="bg-purple-500"
          />
          <StatCard
            icon={Star}
            title="Average Rating"
            value={dashboardData.stats.averageRating}
            subtitle={`${dashboardData.stats.responseTime} response time`}
            color="bg-yellow-500"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/gigs/create"
              className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all group"
            >
              <div className="bg-green-500 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Create Gig</h4>
                <p className="text-sm text-gray-600">New service</p>
              </div>
            </Link>
            
            <Link
              to="/my-gigs"
              className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all group"
            >
              <div className="bg-blue-500 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">My Gigs</h4>
                <p className="text-sm text-gray-600">Manage services</p>
              </div>
            </Link>
            
            <Link
              to="/orders"
              className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl hover:from-purple-100 hover:to-violet-100 transition-all group"
            >
              <div className="bg-purple-500 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Orders</h4>
                <p className="text-sm text-gray-600">Active projects</p>
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
                <p className="text-sm text-gray-600">Client chats</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'orders', label: 'Active Orders', icon: Package },
                { id: 'gigs', label: 'My Gigs', icon: Eye },
                { id: 'earnings', label: 'Earnings', icon: DollarSign },
                { id: 'messages', label: 'Messages', icon: MessageCircle }
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
                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                      to="/create-gig"
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
                    >
                      <Plus className="w-6 h-6 mb-2" />
                      <h4 className="font-semibold">Create New Gig</h4>
                      <p className="text-sm opacity-90">Add a new service to your portfolio</p>
                    </Link>
                    <Link
                      to="/profile/edit"
                      className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-4 rounded-xl hover:from-green-600 hover:to-teal-700 transition-all transform hover:scale-105"
                    >
                      <Edit className="w-6 h-6 mb-2" />
                      <h4 className="font-semibold">Update Profile</h4>
                      <p className="text-sm opacity-90">Keep your profile information current</p>
                    </Link>
                    <Link
                      to="/analytics"
                      className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-4 rounded-xl hover:from-orange-600 hover:to-red-700 transition-all transform hover:scale-105"
                    >
                      <BarChart3 className="w-6 h-6 mb-2" />
                      <h4 className="font-semibold">View Analytics</h4>
                      <p className="text-sm opacity-90">Track your performance metrics</p>
                    </Link>
                  </div>
                </div>

                {/* Recent Orders */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                    <Link to="/orders" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View All
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {(dashboardData.orders || []).slice(0, 3).map((order) => (
                      <div key={order.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <h4 className="font-medium text-gray-900">{order.title}</h4>
                              <span className={`ml-2 w-2 h-2 rounded-full ${getPriorityColor(order.priority)}`}></span>
                            </div>
                            <p className="text-sm text-gray-600">Client: {order.client}</p>
                            <div className="flex items-center mt-2 space-x-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                {getStatusText(order.status)}
                              </span>
                              <span className="text-sm text-gray-500 flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                Due: {order.dueDate}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">${order.price}</p>
                            <div className="mt-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${order.progress}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">{order.progress}% complete</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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
                    {(dashboardData.messages || []).map((message) => (
                      <div key={message.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center">
                              <h4 className="font-medium text-gray-900">{message.client}</h4>
                              {message.unread && (
                                <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{message.lastMessage}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-gray-500">{message.timestamp}</span>
                            <button className="block mt-2 bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Analytics */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Analytics</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Earnings Chart */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Monthly Earnings</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">This Month</span>
                          <span className="font-semibold text-green-600">${dashboardData.stats.monthlyEarnings}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Pending</span>
                          <span className="font-semibold text-yellow-600">${dashboardData.earnings?.pending || 0}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Available</span>
                          <span className="font-semibold text-blue-600">${dashboardData.earnings?.available || 0}</span>
                        </div>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Key Metrics</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Response Time</span>
                          <span className="font-semibold text-blue-600">{dashboardData.stats.responseTime}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Completion Rate</span>
                          <span className="font-semibold text-green-600">{dashboardData.stats.completionRate}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Client Satisfaction</span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span className="font-semibold text-yellow-600">{dashboardData.stats.averageRating}</span>
                          </div>
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
                  <h3 className="text-lg font-semibold text-gray-900">Active Orders</h3>
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option>All Orders</option>
                    <option>In Progress</option>
                    <option>Pending Review</option>
                    <option>Completed</option>
                  </select>
                </div>
                
                <div className="space-y-6">
                  {(dashboardData.orders || []).map((order) => (
                    <div key={order.id} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h4 className="font-semibold text-gray-900 text-lg">{order.title}</h4>
                            <span className={`ml-3 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {getStatusText(order.status)}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2">Client: {order.client}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Due: {order.dueDate}
                            </span>
                            <span className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-1" />
                              ${order.price}
                            </span>
                            <span className={`flex items-center ${getPriorityColor(order.priority)}`}>
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {order.priority} priority
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Progress:</span>
                          <span className="font-medium">{order.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300" 
                            style={{ width: `${order.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                          Update Progress
                        </button>
                        <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                          Message Client
                        </button>
                        <button className="bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                          Deliver Work
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gigs Tab */}
            {activeTab === 'gigs' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">My Gigs</h3>
                  <Link
                    to="/create-gig"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Gig
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(dashboardData.gigs || []).map((gig) => (
                    <div key={gig.id} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">{gig.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {gig.views} views
                            </span>
                            <span className="flex items-center">
                              <Package className="w-4 h-4 mr-1" />
                              {gig.orders} orders
                            </span>
                            <span className="flex items-center">
                              <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                              {gig.rating}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-gray-900">${gig.price}</p>
                          <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                            {gig.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                          Edit Gig
                        </button>
                        <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">
                          View Analytics
                        </button>
                        <button className="bg-red-100 text-red-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">
                          Pause
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Earnings Tab */}
            {activeTab === 'earnings' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Earnings Overview</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-600">Available Balance</p>
                        <p className="text-2xl font-bold text-green-900">${dashboardData.earnings.available}</p>
                      </div>
                      <div className="p-3 bg-green-500 rounded-xl">
                        <DollarSign className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                      Withdraw Funds
                    </button>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-yellow-600">Pending Clearance</p>
                        <p className="text-2xl font-bold text-yellow-900">${dashboardData.earnings.pending}</p>
                      </div>
                      <div className="p-3 bg-yellow-500 rounded-xl">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <p className="text-xs text-yellow-600 mt-2">Funds will be available in 3-5 days</p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-600">This Month</p>
                        <p className="text-2xl font-bold text-blue-900">${dashboardData.stats.monthlyEarnings}</p>
                      </div>
                      <div className="p-3 bg-blue-500 rounded-xl">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <p className="text-xs text-green-600 mt-2">+15% from last month</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Recent Transactions</h4>
                  <div className="space-y-3">
                    {(dashboardData.earnings?.thisMonth || []).map((transaction, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Order Completed</p>
                            <p className="text-sm text-gray-500">{transaction.date}</p>
                          </div>
                        </div>
                        <span className="font-semibold text-green-600">+${transaction.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Client Messages</h3>
                <div className="space-y-4">
                  {(dashboardData.messages || []).map((message) => (
                    <div key={message.id} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h4 className="font-medium text-gray-900">{message.client}</h4>
                            {message.unread && (
                              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">New</span>
                            )}
                          </div>
                          <p className="text-gray-600">{message.lastMessage}</p>
                          <p className="text-sm text-gray-500 mt-2">{message.timestamp}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                            Reply
                          </button>
                          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">
                            Archive
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;