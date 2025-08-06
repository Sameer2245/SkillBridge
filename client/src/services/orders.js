import api from './api';

export const orderService = {
  // Create new order
  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  // Get user's orders (both as buyer and seller)
  getUserOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  // Alias for getUserOrders for compatibility
  getOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  // Get single order by ID
  getOrder: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  // Update order status
  updateOrderStatus: async (id, status) => {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data;
  },

  // Submit order delivery
  submitDelivery: async (id, deliveryData) => {
    const response = await api.post(`/orders/${id}/delivery`, deliveryData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Accept order delivery
  acceptDelivery: async (id) => {
    const response = await api.put(`/orders/${id}/accept`);
    return response.data;
  },

  // Request revision
  requestRevision: async (id, revisionData) => {
    const response = await api.post(`/orders/${id}/revision`, revisionData);
    return response.data;
  },

  // Cancel order
  cancelOrder: async (id, reason) => {
    const response = await api.put(`/orders/${id}/cancel`, { reason });
    return response.data;
  },
};