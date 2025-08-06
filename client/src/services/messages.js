import api from './api';

export const messageService = {
  // Get user's conversations
  getConversations: async () => {
    const response = await api.get('/messages/conversations');
    return response.data;
  },

  // Get messages for a conversation
  getMessages: async (conversationId) => {
    const response = await api.get(`/messages/${conversationId}`);
    return response.data;
  },

  // Send a message
  sendMessage: async (messageData) => {
    const response = await api.post('/messages', messageData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Mark messages as read
  markAsRead: async (conversationId) => {
    const response = await api.put(`/messages/${conversationId}/read`);
    return response.data;
  },

  // Create or get conversation
  createConversation: async (participantId) => {
    const response = await api.post('/messages/conversation', { participantId });
    return response.data;
  },
};