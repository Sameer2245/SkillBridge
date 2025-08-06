import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EnhancedStripePayment from '../components/payment/EnhancedStripePayment';
import PaymentDashboard from '../components/payment/PaymentDashboard';
import { CreditCard, BarChart3, ArrowLeft } from 'lucide-react';

const TestPayment = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('payment');

  // Sample order data for testing
  const sampleOrderData = {
    gigId: '507f1f77bcf86cd799439011',
    gigTitle: 'I will create a modern website for your business',
    sellerName: 'John Doe',
    sellerId: '507f1f77bcf86cd799439012',
    package: 'standard',
    price: 150,
    deliveryTime: 7,
    requirements: [
      'Business logo and branding materials',
      'Content for all pages',
      'Preferred color scheme'
    ]
  };

  const handlePaymentSuccess = (paymentIntent) => {
    console.log('Payment successful:', paymentIntent);
    // In a real app, you would redirect to success page or update order status
  };

  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
    // In a real app, you would show error message or redirect to error page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-1" />
                Back
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                Payment System Test
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveView('payment')}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeView === 'payment'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Test Payment
              </button>
              
              <button
                onClick={() => setActiveView('dashboard')}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeView === 'dashboard'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Payment Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-8">
        {activeView === 'payment' && (
          <div>
            {/* Instructions */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-blue-900 mb-3">
                  🧪 Stripe Payment Integration Test
                </h2>
                <div className="text-blue-800 space-y-2">
                  <p><strong>Test Card Numbers:</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><code className="bg-blue-100 px-2 py-1 rounded">4242 4242 4242 4242</code> - Visa (Success)</li>
                    <li><code className="bg-blue-100 px-2 py-1 rounded">4000 0000 0000 0002</code> - Card Declined</li>
                    <li><code className="bg-blue-100 px-2 py-1 rounded">4000 0000 0000 9995</code> - Insufficient Funds</li>
                    <li><code className="bg-blue-100 px-2 py-1 rounded">4000 0000 0000 0069</code> - Expired Card</li>
                  </ul>
                  <p className="text-sm mt-3">
                    <strong>Expiry:</strong> Any future date | <strong>CVC:</strong> Any 3 digits | <strong>ZIP:</strong> Any 5 digits
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Component */}
            <EnhancedStripePayment
              orderData={sampleOrderData}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </div>
        )}

        {activeView === 'dashboard' && (
          <PaymentDashboard />
        )}
      </div>
    </div>
  );
};

export default TestPayment;