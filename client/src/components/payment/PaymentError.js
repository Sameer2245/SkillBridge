import React from 'react';
import { AlertCircle, RefreshCw, ArrowLeft, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentError = ({ error, onRetry, orderData }) => {
  const navigate = useNavigate();

  const getErrorMessage = (error) => {
    if (!error) return 'An unexpected error occurred during payment processing.';
    
    const errorMessages = {
      'card_declined': 'Your card was declined. Please try a different payment method.',
      'insufficient_funds': 'Insufficient funds. Please check your account balance.',
      'expired_card': 'Your card has expired. Please use a different card.',
      'incorrect_cvc': 'The security code (CVC) is incorrect. Please check and try again.',
      'processing_error': 'There was an error processing your payment. Please try again.',
      'authentication_required': 'Additional authentication is required. Please try again.',
      'network_error': 'Network connection error. Please check your internet and try again.'
    };

    return errorMessages[error.code] || error.message || 'Payment failed. Please try again.';
  };

  const getErrorSuggestions = (error) => {
    const suggestions = {
      'card_declined': [
        'Contact your bank to ensure the card is active',
        'Try a different payment method',
        'Check if you have sufficient funds'
      ],
      'insufficient_funds': [
        'Add funds to your account',
        'Try a different payment method',
        'Contact your bank for assistance'
      ],
      'expired_card': [
        'Use a card that hasn\'t expired',
        'Update your payment information',
        'Try a different payment method'
      ],
      'incorrect_cvc': [
        'Check the 3-digit code on the back of your card',
        'Ensure you\'re entering the correct security code',
        'Try typing the number again carefully'
      ],
      'network_error': [
        'Check your internet connection',
        'Try refreshing the page',
        'Wait a moment and try again'
      ]
    };

    return suggestions[error?.code] || [
      'Try a different payment method',
      'Contact your bank if the issue persists',
      'Reach out to our support team for help'
    ];
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Error Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
            <AlertCircle className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
          <p className="text-gray-600">
            We couldn't process your payment. Don't worry, no charges were made.
          </p>
        </div>

        {/* Error Details Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What went wrong?</h3>
            <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              {getErrorMessage(error)}
            </p>
          </div>

          {/* Order Summary */}
          <div className="border-t border-gray-200 pt-4 mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Order Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Service</span>
                <span className="text-gray-900">{orderData?.gigTitle}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Package</span>
                <span className="text-gray-900 capitalize">{orderData?.package}</span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">${orderData?.totalAmount?.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Suggestions */}
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Try these solutions:</h4>
            <ul className="space-y-2">
              {getErrorSuggestions(error).map((suggestion, index) => (
                <li key={index} className="flex items-start text-sm text-gray-600">
                  <span className="inline-block w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={onRetry}
            className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>

          <button
            onClick={() => navigate(-1)}
            className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
        </div>

        {/* Help Section */}
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <CreditCard className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">Need Help?</h4>
              <p className="text-sm text-gray-600 mb-2">
                If you continue to experience issues, our support team is here to help.
              </p>
              <button
                onClick={() => navigate('/support')}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Contact Support →
              </button>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Your payment information is secure and encrypted. No charges were made to your account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentError;