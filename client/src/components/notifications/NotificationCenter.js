import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import socketService from '../../services/socket';
import { Bell, X, Check, Clock, MessageCircle, ShoppingCart, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const NotificationCenter = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user) {
      // Load existing notifications
      loadNotifications();
      
      // Setup socket listeners
      setupSocketListeners();
    }

    return () => {
      cleanupSocketListeners();
    };
  }, [user]);

  const loadNotifications = async () => {
    try {
      // This would be an API call to get notifications
      // For now, we'll use mock data
      const mockNotifications = [
        {
          id: '1',
          type: 'order',
          title: 'New Order Received',
          message: 'You have a new order for "Website Development"',
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          read: false,
          icon: ShoppingCart,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
        },
        {
          id: '2',
          type: 'message',
          title: 'New Message',
          message: 'John sent you a message about your project',
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          read: false,
          icon: MessageCircle,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
        },
        {
          id: '3',
          type: 'review',
          title: 'New Review',
          message: 'You received a 5-star review from Sarah',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          read: true,
          icon: Star,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
        },
      ];
      
      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.read).length);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    }
  };

  const setupSocketListeners = () => {
    // Listen for new order notifications
    socketService.on('order_status_changed', (data) => {
      const notification = {
        id: Date.now().toString(),
        type: 'order',
        title: 'Order Update',
        message: data.message,
        timestamp: new Date(),
        read: false,
        icon: ShoppingCart,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
      };
      
      addNotification(notification);
      toast.success(data.message);
    });

    // Listen for new messages
    socketService.on('new_message', (message) => {
      if (message.senderId !== user._id) {
        const notification = {
          id: Date.now().toString(),
          type: 'message',
          title: 'New Message',
          message: `New message from ${message.senderName}`,
          timestamp: new Date(),
          read: false,
          icon: MessageCircle,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
        };
        
        addNotification(notification);
        toast.success(`New message from ${message.senderName}`);
      }
    });

    // Listen for general notifications
    socketService.on('notification', (data) => {
      const notification = {
        id: Date.now().toString(),
        type: data.type || 'general',
        title: data.title,
        message: data.message,
        timestamp: new Date(),
        read: false,
        icon: getIconForType(data.type),
        color: getColorForType(data.type),
        bgColor: getBgColorForType(data.type),
      };
      
      addNotification(notification);
      toast.success(data.message);
    });
  };

  const cleanupSocketListeners = () => {
    socketService.off('order_status_changed');
    socketService.off('new_message');
    socketService.off('notification');
  };

  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const removeNotification = (notificationId) => {
    const notification = notifications.find(n => n.id === notificationId);
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'order': return ShoppingCart;
      case 'message': return MessageCircle;
      case 'review': return Star;
      default: return Bell;
    }
  };

  const getColorForType = (type) => {
    switch (type) {
      case 'order': return 'text-green-600';
      case 'message': return 'text-blue-600';
      case 'review': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getBgColorForType = (type) => {
    switch (type) {
      case 'order': return 'bg-green-50';
      case 'message': return 'bg-blue-50';
      case 'review': return 'bg-yellow-50';
      default: return 'bg-gray-50';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transition-colors"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => {
                const IconComponent = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${notification.bgColor}`}>
                        <IconComponent className={`h-4 w-4 ${notification.color}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-sm font-medium ${
                            !notification.read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </h4>
                          <button
                            onClick={() => removeNotification(notification.id)}
                            className="p-1 text-gray-400 hover:text-gray-600 rounded"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                        
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center"
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Mark read
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-200 text-center">
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;