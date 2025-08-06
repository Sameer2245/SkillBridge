import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  Download, 
  Filter,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { paymentService } from '../../services/payment';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const PaymentDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState([]);
  const [earnings, setEarnings] = useState(null);
  const [spending, setSpending] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
  }, [selectedPeriod]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      const [analyticsRes, earningsRes, spendingRes, historyRes] = await Promise.all([
        paymentService.getPaymentAnalytics(selectedPeriod),
        user.role === 'freelancer' ? paymentService.getSellerEarnings() : Promise.resolve({ data: null }),
        user.role === 'client' ? paymentService.getBuyerSpending() : Promise.resolve({ data: null }),
        paymentService.getPaymentHistory({ limit: 10 })
      ]);

      setAnalytics(Array.isArray(analyticsRes.data) ? analyticsRes.data : []);
      setEarnings(earningsRes.data);
      setSpending(spendingRes.data);
      setPaymentHistory(Array.isArray(historyRes.data) ? historyRes.data : []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load payment data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateTrend = (data) => {
    if (!Array.isArray(data) || data.length < 2) return 0;
    const recent = data.slice(-7).reduce((sum, item) => sum + (item.revenue || item.spending || 0), 0);
    const previous = data.slice(-14, -7).reduce((sum, item) => sum + (item.revenue || item.spending || 0), 0);
    return previous === 0 ? 0 : ((recent - previous) / previous) * 100;
  };

  const StatCard = ({ title, value, trend, icon: Icon, color = 'blue' }) => {
    const isPositive = trend >= 0;
    const colorClasses = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      purple: 'bg-purple-50 text-purple-600',
      orange: 'bg-orange-50 text-orange-600'
    };

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            {trend !== undefined && (
              <div className={`flex items-center mt-2 text-sm ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {isPositive ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                {Math.abs(trend).toFixed(1)}% from last period
              </div>
            )}
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const safeAnalytics = Array.isArray(analytics) ? analytics : [];
  const totalRevenue = safeAnalytics.reduce((sum, item) => sum + (item.revenue || 0), 0);
  const totalSpending = safeAnalytics.reduce((sum, item) => sum + (item.spending || 0), 0);
  const totalOrders = safeAnalytics.reduce((sum, item) => sum + (item.orders || 0), 0);
  const revenueTrend = calculateTrend(safeAnalytics);
  const spendingTrend = calculateTrend(safeAnalytics);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Track your {user.role === 'freelancer' ? 'earnings' : 'spending'} and payment history
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          
          <button
            onClick={fetchDashboardData}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {user.role === 'freelancer' ? (
          <>
            <StatCard
              title="Total Earnings"
              value={formatCurrency(earnings?.totalEarnings || 0)}
              trend={revenueTrend}
              icon={DollarSign}
              color="green"
            />
            <StatCard
              title="Pending Earnings"
              value={formatCurrency(earnings?.pendingEarnings || 0)}
              icon={TrendingUp}
              color="orange"
            />
            <StatCard
              title="Total Orders"
              value={earnings?.totalOrders || 0}
              icon={CreditCard}
              color="blue"
            />
            <StatCard
              title="Average Order"
              value={formatCurrency(
                earnings?.totalOrders > 0 
                  ? earnings.totalEarnings / earnings.totalOrders 
                  : 0
              )}
              icon={TrendingUp}
              color="purple"
            />
          </>
        ) : (
          <>
            <StatCard
              title="Total Spent"
              value={formatCurrency(spending?.totalSpent || 0)}
              trend={spendingTrend}
              icon={DollarSign}
              color="blue"
            />
            <StatCard
              title="Total Orders"
              value={spending?.totalOrders || 0}
              icon={CreditCard}
              color="green"
            />
            <StatCard
              title="Average Order"
              value={formatCurrency(spending?.averageOrderValue || 0)}
              icon={TrendingUp}
              color="purple"
            />
            <StatCard
              title="This Period"
              value={formatCurrency(totalSpending)}
              trend={spendingTrend}
              icon={Calendar}
              color="orange"
            />
          </>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {['overview', 'history', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {paymentHistory.slice(0, 5).map((transaction) => (
                <div key={transaction._id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      transaction.buyerId === user.id ? 'bg-red-100' : 'bg-green-100'
                    }`}>
                      {transaction.buyerId === user.id ? (
                        <ArrowUpRight className="w-4 h-4 text-red-600" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {transaction.gigId?.title || 'Service Purchase'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(transaction.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      transaction.buyerId === user.id ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {transaction.buyerId === user.id ? '-' : '+'}
                      {formatCurrency(transaction.buyerId === user.id ? transaction.totalAmount : transaction.price)}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {transaction.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <Download className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Download Statement</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </button>
              
              {user.role === 'freelancer' && (
                <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 text-gray-600 mr-3" />
                    <span className="text-sm font-medium text-gray-900">Request Payout</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-400" />
                </button>
              )}
              
              <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <CreditCard className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Payment Methods</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
              <div className="flex items-center space-x-3">
                <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </button>
                <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paymentHistory.map((transaction) => (
                  <tr key={transaction._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          transaction.buyerId === user.id ? 'bg-red-100' : 'bg-green-100'
                        }`}>
                          {transaction.buyerId === user.id ? (
                            <ArrowUpRight className="w-4 h-4 text-red-600" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {transaction.gigId?.title || 'Service Purchase'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {transaction.buyerId === user.id ? 'Purchase' : 'Sale'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(transaction.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${
                        transaction.buyerId === user.id ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {transaction.buyerId === user.id ? '-' : '+'}
                        {formatCurrency(transaction.buyerId === user.id ? transaction.totalAmount : transaction.price)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : transaction.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Analytics</h3>
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Analytics charts will be implemented here</p>
            <p className="text-sm text-gray-400 mt-2">
              This would include revenue/spending trends, category breakdowns, and performance metrics
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentDashboard;