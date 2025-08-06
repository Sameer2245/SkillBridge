import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import socketService from '../../services/socket';
import { messageService } from '../../services/messages';
import { 
  Send, 
  Paperclip, 
  Image, 
  Smile, 
  MoreVertical, 
  Phone, 
  Video,
  Info,
  Search,
  X,
  Download,
  Eye
} from 'lucide-react';
import toast from 'react-hot-toast';

const ChatInterface = ({ conversationId, otherUser, onClose }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (conversationId) {
      loadMessages();
      setupSocketListeners();
      
      // Join conversation room
      socketService.emit('join_conversation', conversationId);
    }

    return () => {
      cleanupSocketListeners();
      if (conversationId) {
        socketService.emit('leave_conversation', conversationId);
      }
    };
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const response = await messageService.getMessages(conversationId);
      setMessages(response.data);
    } catch (error) {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const setupSocketListeners = () => {
    socketService.on('new_message', (message) => {
      if (message.conversationId === conversationId) {
        setMessages(prev => [...prev, message]);
        
        // Mark message as read if chat is open
        if (message.senderId !== user._id) {
          markMessageAsRead(message._id);
        }
      }
    });

    socketService.on('user_typing', (data) => {
      if (data.conversationId === conversationId && data.userId !== user._id) {
        setOtherUserTyping(true);
        setTimeout(() => setOtherUserTyping(false), 3000);
      }
    });

    socketService.on('user_stopped_typing', (data) => {
      if (data.conversationId === conversationId && data.userId !== user._id) {
        setOtherUserTyping(false);
      }
    });

    socketService.on('message_read', (data) => {
      if (data.conversationId === conversationId) {
        setMessages(prev => 
          prev.map(msg => 
            msg._id === data.messageId 
              ? { ...msg, readBy: [...(msg.readBy || []), data.userId] }
              : msg
          )
        );
      }
    });
  };

  const cleanupSocketListeners = () => {
    socketService.off('new_message');
    socketService.off('user_typing');
    socketService.off('user_stopped_typing');
    socketService.off('message_read');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() && selectedFiles.length === 0) return;

    try {
      setSending(true);
      
      const formData = new FormData();
      formData.append('conversationId', conversationId);
      formData.append('receiverId', otherUser._id);
      
      if (newMessage.trim()) {
        formData.append('content', newMessage.trim());
      }
      
      selectedFiles.forEach(file => {
        formData.append('attachments', file);
      });

      await messageService.sendMessage(formData);
      
      setNewMessage('');
      setSelectedFiles([]);
      stopTyping();
      
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    
    if (!typing) {
      setTyping(true);
      socketService.emit('typing', { conversationId, userId: user._id });
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      stopTyping();
    }, 1000);
  };

  const stopTyping = () => {
    if (typing) {
      setTyping(false);
      socketService.emit('stop_typing', { conversationId, userId: user._id });
    }
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  const markMessageAsRead = async (messageId) => {
    try {
      await messageService.markAsRead(messageId);
    } catch (error) {
      console.error('Failed to mark message as read:', error);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      const isValidType = file.type.startsWith('image/') || 
                         file.type.startsWith('video/') ||
                         file.type === 'application/pdf' ||
                         file.type.startsWith('text/');
      
      if (!isValidSize) {
        toast.error(`${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }
      
      if (!isValidType) {
        toast.error(`${file.name} is not a supported file type.`);
        return false;
      }
      
      return true;
    });
    
    setSelectedFiles(prev => [...prev, ...validFiles].slice(0, 5)); // Max 5 files
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (date) => {
    const messageDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return messageDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: messageDate.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
      });
    }
  };

  const renderMessage = (message, index) => {
    const isOwnMessage = message.senderId === user._id;
    const showDate = index === 0 || 
      new Date(messages[index - 1].createdAt).toDateString() !== new Date(message.createdAt).toDateString();

    return (
      <div key={message._id}>
        {showDate && (
          <div className="flex justify-center my-4">
            <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
              {formatDate(message.createdAt)}
            </span>
          </div>
        )}
        
        <div className={`flex mb-4 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
            <div
              className={`px-4 py-2 rounded-lg ${
                isOwnMessage
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {message.content && (
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              )}
              
              {message.attachments && message.attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {message.attachments.map((attachment, idx) => (
                    <div key={idx} className="relative">
                      {attachment.type.startsWith('image/') ? (
                        <img
                          src={attachment.url}
                          alt="Attachment"
                          className="max-w-full h-auto rounded cursor-pointer"
                          onClick={() => window.open(attachment.url, '_blank')}
                        />
                      ) : (
                        <div className="flex items-center space-x-2 p-2 bg-white bg-opacity-20 rounded">
                          <Paperclip className="w-4 h-4" />
                          <span className="text-sm truncate">{attachment.name}</span>
                          <button
                            onClick={() => window.open(attachment.url, '_blank')}
                            className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className={`flex items-center mt-1 space-x-1 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
              <span className="text-xs text-gray-500">
                {formatTime(message.createdAt)}
              </span>
              
              {isOwnMessage && message.readBy && message.readBy.includes(otherUser._id) && (
                <span className="text-xs text-blue-600">Read</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
            {otherUser.profileImage ? (
              <img
                src={otherUser.profileImage}
                alt={otherUser.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 font-semibold">
                {otherUser.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900">
              {otherUser.fullName || otherUser.username}
            </h3>
            <p className="text-sm text-gray-500">
              {otherUserTyping ? 'Typing...' : 'Online'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
            <Video className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
          >
            <Info className="w-5 h-5" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message, index) => renderMessage(message, index))
        )}
        
        {otherUserTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* File Preview */}
      {selectedFiles.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium text-gray-700">
              Selected files ({selectedFiles.length}/5):
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative bg-white rounded-lg p-2 border border-gray-200">
                <div className="flex items-center space-x-2">
                  <Paperclip className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 truncate max-w-32">
                    {file.name}
                  </span>
                  <button
                    onClick={() => removeFile(index)}
                    className="p-1 text-gray-400 hover:text-red-500 rounded"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <Paperclip className="w-5 h-5" />
              </button>
              
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <Smile className="w-5 h-5" />
              </button>
            </div>
            
            <textarea
              value={newMessage}
              onChange={handleTyping}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              placeholder="Type a message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={1}
              style={{ minHeight: '40px', maxHeight: '120px' }}
            />
          </div>
          
          <button
            type="submit"
            disabled={sending || (!newMessage.trim() && selectedFiles.length === 0)}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*,.pdf,.txt,.doc,.docx"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ChatInterface;