import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { messageService } from '../services/message';
import socketService from '../services/socket';
import { Send, Search, MoreVertical, Phone, Video, Paperclip, Smile } from 'lucide-react';
import toast from 'react-hot-toast';

const Messages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typingUsers, setTypingUsers] = useState(new Set());
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    loadConversations();
    setupSocketListeners();

    return () => {
      cleanupSocketListeners();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    console.log('Conversations state changed:', conversations, 'Type:', typeof conversations, 'IsArray:', Array.isArray(conversations));
  }, [conversations]);

  const loadConversations = async () => {
    try {
      const response = await messageService.getConversations();
      const conversationsData = response.data;
      
      // Ensure we always set an array
      if (Array.isArray(conversationsData)) {
        setConversations(conversationsData);
      } else {
        console.warn('Conversations data is not an array:', conversationsData);
        setConversations([]);
      }
    } catch (error) {
      console.error('Load conversations error:', error);
      toast.error('Failed to load conversations');
      setConversations([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (conversationId) => {
    try {
      const response = await messageService.getMessages(conversationId);
      setMessages(response.data || []);
      
      // Join conversation room
      socketService.joinConversation(conversationId);
    } catch (error) {
      console.error('Load messages error:', error);
      toast.error('Failed to load messages');
      setMessages([]); // Set empty array on error
    }
  };

  const setupSocketListeners = () => {
    try {
      socketService.on('new_message', (message) => {
        if (selectedConversation && message.conversationId === selectedConversation._id) {
          setMessages(prev => [...(prev || []), message]);
        }
        
        // Update conversation list
        setConversations(prev => {
          if (!Array.isArray(prev)) {
            console.warn('Previous conversations is not an array:', prev);
            return [];
          }
          return prev.map(conv => 
            conv._id === message.conversationId 
              ? { ...conv, lastMessage: message, updatedAt: new Date() }
              : conv
          );
        });
      });

    socketService.on('user_typing', ({ userId, username }) => {
      if (userId !== user._id) {
        setTypingUsers(prev => new Set([...prev, username]));
      }
    });

    socketService.on('user_stop_typing', ({ userId }) => {
      if (userId !== user._id) {
        setTypingUsers(prev => {
          const newSet = new Set(prev);
          // Remove user from typing (we'd need to track userId to username mapping)
          return newSet;
        });
      }
    });
    } catch (error) {
      console.log('Socket service not available:', error);
    }
  };

  const cleanupSocketListeners = () => {
    try {
      socketService.off('new_message');
      socketService.off('user_typing');
      socketService.off('user_stop_typing');
      
      if (selectedConversation) {
        socketService.leaveConversation(selectedConversation._id);
      }
    } catch (error) {
      console.log('Error cleaning up socket listeners:', error);
    }
  };

  const handleConversationSelect = (conversation) => {
    if (selectedConversation) {
      socketService.leaveConversation(selectedConversation._id);
    }
    
    setSelectedConversation(conversation);
    loadMessages(conversation._id);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedConversation || sending) return;

    setSending(true);
    
    try {
      const messageData = {
        conversationId: selectedConversation._id,
        content: newMessage.trim(),
        receiverId: selectedConversation.participants.find(p => p._id !== user._id)?._id
      };

      await messageService.sendMessage(messageData);
      setNewMessage('');
      
      // Stop typing indicator
      socketService.emit('typing_stop', {
        conversationId: selectedConversation._id,
        userId: user._id
      });
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const handleTyping = () => {
    if (!selectedConversation) return;

    // Send typing start
    socketService.emit('typing_start', {
      conversationId: selectedConversation._id,
      userId: user._id,
      username: user.username
    });

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set timeout to stop typing
    typingTimeoutRef.current = setTimeout(() => {
      socketService.emit('typing_stop', {
        conversationId: selectedConversation._id,
        userId: user._id
      });
    }, 1000);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
      return messageDate.toLocaleDateString();
    }
  };

  const filteredConversations = Array.isArray(conversations) 
    ? conversations.filter(conv => {
        const otherUser = conv.participants?.find(p => p._id !== user._id);
        return otherUser?.username?.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          </div>
        </div>

        <div className="flex h-[calc(100vh-120px)]">
          {/* Conversations Sidebar */}
          <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No conversations found
                </div>
              ) : (
                filteredConversations.map((conversation) => {
                  const otherUser = conversation.participants.find(p => p._id !== user._id);
                  const isSelected = selectedConversation?._id === conversation._id;
                  
                  return (
                    <div
                      key={conversation._id}
                      onClick={() => handleConversationSelect(conversation)}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                        isSelected ? 'bg-blue-50 border-blue-200' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={otherUser?.profileImage || `https://ui-avatars.com/api/?name=${otherUser?.username}&background=6366f1&color=fff`}
                            alt={otherUser?.username}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-gray-900 truncate">
                              {otherUser?.username}
                            </h3>
                            <span className="text-xs text-gray-500">
                              {formatTime(conversation.updatedAt)}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-600 truncate mt-1">
                            {conversation.lastMessage?.content || 'No messages yet'}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="bg-white border-b border-gray-200 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {(() => {
                        const otherUser = selectedConversation.participants.find(p => p._id !== user._id);
                        return (
                          <>
                            <img
                              src={otherUser?.profileImage || `https://ui-avatars.com/api/?name=${otherUser?.username}&background=6366f1&color=fff`}
                              alt={otherUser?.username}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <h2 className="text-lg font-semibold text-gray-900">
                                {otherUser?.username}
                              </h2>
                              <p className="text-sm text-green-600">Online</p>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                        <Phone className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                        <Video className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((message, index) => {
                    const isOwn = message.senderId === user._id;
                    const showDate = index === 0 || 
                      formatDate(message.createdAt) !== formatDate(messages[index - 1].createdAt);
                    
                    return (
                      <div key={message._id}>
                        {showDate && (
                          <div className="text-center my-4">
                            <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                              {formatDate(message.createdAt)}
                            </span>
                          </div>
                        )}
                        
                        <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            isOwn 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-200 text-gray-900'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              isOwn ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {formatTime(message.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Typing Indicator */}
                  {typingUsers.size > 0 && (
                    <div className="flex justify-start">
                      <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg">
                        <div className="flex items-center space-x-1">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-xs text-gray-500 ml-2">
                            {Array.from(typingUsers).join(', ')} typing...
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="bg-white border-t border-gray-200 px-6 py-4">
                  <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                    <button
                      type="button"
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                    >
                      <Paperclip className="h-5 w-5" />
                    </button>
                    
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => {
                          setNewMessage(e.target.value);
                          handleTyping();
                        }}
                        placeholder="Type a message..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={sending}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                      >
                        <Smile className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={!newMessage.trim() || sending}
                      className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-gray-500">
                    Choose a conversation from the sidebar to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;