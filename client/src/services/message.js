import api from './api';

export const messageService = {
  // Get all conversations for the current user
  getConversations: () => {
    return api.get('/messages/conversations');
  },

  // Get messages for a specific conversation
  getMessages: (conversationId) => {
    return api.get(`/messages/conversations/${conversationId}/messages`);
  },

  // Send a new message
  sendMessage: (messageData) => {
    return api.post('/messages', messageData);
  },

  // Create a new conversation
  createConversation: (participantId) => {
    return api.post('/messages/conversations', { participantId });
  },

  // Mark messages as read
  markAsRead: (conversationId) => {
    return api.put(`/messages/conversations/${conversationId}/read`);
  },

  // Delete a message
  deleteMessage: (messageId) => {
    return api.delete(`/messages/${messageId}`);
  },

  // Get unread message count
  getUnreadCount: () => {
    return api.get('/messages/unread-count');
  }
};