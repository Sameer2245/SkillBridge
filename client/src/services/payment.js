import api from './api';

export const paymentService = {
  // Create payment intent for gig purchase
  createPaymentIntent: (orderData) => {
    return api.post('/payments/create-intent', orderData);
  },

  // Confirm payment
  confirmPayment: (paymentIntentId, paymentMethodId) => {
    return api.post('/payments/confirm', {
      paymentIntentId,
      paymentMethodId,
    });
  },

  // Get payment history
  getPaymentHistory: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return api.get(`/payments/history?${params}`);
  },

  // Process refund
  processRefund: (orderId, reason) => {
    return api.post('/payments/refund', {
      orderId,
      reason,
    });
  },

  // Get seller earnings
  getSellerEarnings: () => {
    return api.get('/payments/earnings');
  },

  // Get buyer spending
  getBuyerSpending: () => {
    return api.get('/payments/spending');
  },

  // Request payout
  requestPayout: (amount) => {
    return api.post('/payments/payout', { amount });
  },

  // Get payment methods
  getPaymentMethods: () => {
    return api.get('/payments/methods');
  },

  // Add payment method
  addPaymentMethod: (paymentMethodData) => {
    return api.post('/payments/methods', paymentMethodData);
  },

  // Remove payment method
  removePaymentMethod: (paymentMethodId) => {
    return api.delete(`/payments/methods/${paymentMethodId}`);
  },

  // Get payment analytics
  getPaymentAnalytics: (period = '30d') => {
    return api.get(`/payments/analytics?period=${period}`);
  },

  // Verify payment status
  verifyPaymentStatus: (paymentIntentId) => {
    return api.get(`/payments/verify/${paymentIntentId}`);
  },

  // Get transaction details
  getTransactionDetails: (transactionId) => {
    return api.get(`/payments/transaction/${transactionId}`);
  },

  // Request dispute
  requestDispute: (orderId, reason, evidence) => {
    return api.post('/payments/dispute', {
      orderId,
      reason,
      evidence
    });
  },

  // Get payment fees
  getPaymentFees: (amount, currency = 'usd') => {
    return api.get(`/payments/fees?amount=${amount}&currency=${currency}`);
  }
};