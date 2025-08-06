import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  MoreVertical, 
  Star, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Search,
  Filter,
  BarChart3,
  Pause,
  Play,
  Copy,
  Share2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const MyGigs = () => {
  const { user } = useAuth();
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedGigs, setSelectedGigs] = useState([]);

  // Mock data - replace with actual API call
  useEffect(() => {
    setTimeout(() => {
      setGigs([
        {
          id: 1,
          title: 'I will create a modern responsive website for your business',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
          status: 'active',
          price: 299,
          orders: 23,
          rating: 4.9,
          reviews: 18,
          views: 1234,
          clicks: 156,
          impressions: 5678,
          createdAt: '2024-01-15',
          lastModified: '2024-01-20',
          category: 'Web Development',
          inQueue: 3,
          earnings: 6877
        },
        {
          id: 2,
          title: 'I will design a professional logo for your brand',
          image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=300&h=200&fit=crop',
          status: 'paused',
          price: 150,
          orders: 45,
          rating: 4.8,
          reviews: 42,
          views: 856,
          clicks: 98,
          impressions: 3421,
          createdAt: '2023-12-10',
          lastModified: '2024-01-18',
          category: 'Design & Creative',
          inQueue: 0,
          earnings: 6750
        },
        {
          id: 3,
          title: 'I will write SEO optimized content for your website',
          image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop',
          status: 'draft',
          price: 75,
          orders: 0,
          rating: 0,
          reviews: 0,
          views: 45,
          clicks: 5,
          impressions: 234,
          createdAt: '2024-01-22',
          lastModified: '2024-01-22',
          category: 'Writing & Translation',
          inQueue: 0,
          earnings: 0
        },
        {
          id: 4,
          title: 'I will create a mobile app UI/UX design',
          image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop',
          status: 'pending_approval',
          price: 500,
          orders: 0,
          rating: 0,
          reviews: 0,
          views: 12,
          clicks: 2,
          impressions: 89,
          createdAt: '2024-01-25',
          lastModified: '2024-01-25',
          category: 'Design & Creative',
          inQueue: 0,
          earnings: 0
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'pending_approval':
        return 'bg-blue-100 text-blue-800';
      case 'denied':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'paused':
        return 'Paused';
      case 'draft':
        return 'Draft';
      case 'pending_approval':
        return 'Pending Approval';
      case 'denied':
        return 'Denied';
      default:
        return 'Unknown';
    }
  };

  const filteredGigs = gigs.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || gig.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedGigs = [...filteredGigs].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'price_high':
        return b.price - a.price;
      case 'price_low':
        return a.price - b.price;
      case 'orders':
        return b.orders - a.orders;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const handleGigAction = (action, gigId) => {
    switch (action) {
      case 'pause':
        toast.success('Gig paused successfully');
        break;
      case 'activate':
        toast.success('Gig activated successfully');
        break;
      case 'delete':
        if (window.confirm('Are you sure you want to delete this gig?')) {
          toast.success('Gig deleted successfully');
        }
        break;
      case 'duplicate':
        toast.success('Gig duplicated successfully');
        break;
      default:
        break;
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

  const totalStats = {
    totalGigs: gigs.length,
    activeGigs: gigs.filter(g => g.status === 'active').length,
    totalOrders: gigs.reduce((sum, g) => sum + g.orders, 0),
    totalEarnings: gigs.reduce((sum, g) => sum + g.earnings, 0),
    avgRating: gigs.filter(g => g.rating > 0).reduce((sum, g, _, arr) => sum + g.rating / arr.length, 0),
    totalViews: gigs.reduce((sum, g) => sum + g.views, 0)
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Gigs</h1>
            <p className="text-gray-600 mt-1">Manage your services and track performance</p>
          </div>
          <Link
            to="/create-gig"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Gig
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Gigs</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.totalGigs}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Gigs</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.activeGigs}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <Play className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.totalOrders}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">${totalStats.totalEarnings.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-xl">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.avgRating.toFixed(1)}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.totalViews.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-xl">
                <Eye className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search gigs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="draft">Draft</option>
                <option value="pending_approval">Pending Approval</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price_high">Price: High to Low</option>
                <option value="price_low">Price: Low to High</option>
                <option value="orders">Most Orders</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {sortedGigs.length} of {gigs.length} gigs
              </span>
            </div>
          </div>
        </div>

        {/* Gigs Grid */}
        {sortedGigs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No gigs found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Create your first gig to start selling your services'
                }
              </p>
              <Link
                to="/create-gig"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Gig
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedGigs.map((gig) => (
              <div key={gig.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={gig.image}
                    alt={gig.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(gig.status)}`}>
                      {getStatusText(gig.status)}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="relative">
                      <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>
                      {/* Dropdown menu would go here */}
                    </div>
                  </div>
                  {gig.inQueue > 0 && (
                    <div className="absolute bottom-4 left-4">
                      <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full">
                        {gig.inQueue} in queue
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {gig.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {gig.rating > 0 ? (
                        <>
                          {renderStars(gig.rating)}
                          <span className="ml-2 text-sm text-gray-600">
                            {gig.rating} ({gig.reviews})
                          </span>
                        </>
                      ) : (
                        <span className="text-sm text-gray-500">No reviews yet</span>
                      )}
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                      ${gig.price}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                    <div>
                      <p className="text-lg font-semibold text-gray-900">{gig.orders}</p>
                      <p className="text-xs text-gray-600">Orders</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-900">{gig.views}</p>
                      <p className="text-xs text-gray-600">Views</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-900">${gig.earnings}</p>
                      <p className="text-xs text-gray-600">Earned</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Link
                      to={`/gigs/${gig.id}`}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-center py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Eye className="w-4 h-4 inline mr-1" />
                      View
                    </Link>
                    <Link
                      to={`/gigs/${gig.id}/edit`}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Edit className="w-4 h-4 inline mr-1" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleGigAction(gig.status === 'active' ? 'pause' : 'activate', gig.id)}
                      className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                    >
                      {gig.status === 'active' ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGigs;