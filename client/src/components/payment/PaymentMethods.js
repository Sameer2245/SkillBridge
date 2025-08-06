import React, { useState } from 'react';
import { CreditCard, Smartphone, Wallet, Shield, Lock } from 'lucide-react';

const PaymentMethods = ({ selectedMethod, onMethodSelect, orderData }) => {
  const [showDetails, setShowDetails] = useState(false);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, American Express',
      fees: 'No additional fees',
      processing: 'Instant',
      popular: true
    },
    {
      id: 'apple_pay',
      name: 'Apple Pay',
      icon: Smartphone,
      description: 'Pay with Touch ID or Face ID',
      fees: 'No additional fees',
      processing: 'Instant',
      available: window.ApplePaySession?.canMakePayments()
    },
    {
      id: 'google_pay',
      name: 'Google Pay',
      icon: Wallet,
      description: 'Pay with your Google account',
      fees: 'No additional fees',
      processing: 'Instant',
      available: window.google?.payments?.api
    }
  ];

  const serviceFee = orderData.price * 0.05;
  const totalAmount = orderData.price + serviceFee;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
        <div className="flex items-center text-sm text-gray-500">
          <Shield className="w-4 h-4 mr-1" />
          Secured by Stripe
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-3 mb-6">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isAvailable = method.available !== false;
          
          return (
            <div
              key={method.id}
              className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
                selectedMethod === method.id
                  ? 'border-blue-500 bg-blue-50'
                  : isAvailable
                  ? 'border-gray-200 hover:border-gray-300'
                  : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-50'
              }`}
              onClick={() => isAvailable && onMethodSelect(method.id)}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon className={`w-6 h-6 ${
                    selectedMethod === method.id ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center">
                    <h4 className="text-sm font-medium text-gray-900">
                      {method.name}
                    </h4>
                    {method.popular && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        Popular
                      </span>
                    )}
                    {!isAvailable && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-500">
                        Unavailable
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedMethod === method.id
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedMethod === method.id && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Order Summary */}
      <div className="border-t border-gray-200 pt-4">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-sm font-medium text-gray-900">Order Summary</span>
          <span className="text-sm text-gray-500">
            {showDetails ? 'Hide' : 'Show'} details
          </span>
        </button>

        {showDetails && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Service price</span>
              <span className="text-gray-900">${orderData.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Service fee</span>
              <span className="text-gray-900">${serviceFee.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between">
                <span className="text-base font-medium text-gray-900">Total</span>
                <span className="text-base font-medium text-gray-900">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Security Notice */}
      <div className="mt-4 flex items-start space-x-2 text-xs text-gray-500">
        <Lock className="w-3 h-3 mt-0.5 flex-shrink-0" />
        <p>
          Your payment information is encrypted and secure. We never store your card details.
          All transactions are processed by Stripe, a PCI DSS Level 1 certified payment processor.
        </p>
      </div>
    </div>
  );
};

export default PaymentMethods;