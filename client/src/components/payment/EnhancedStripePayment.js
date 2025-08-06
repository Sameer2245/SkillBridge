import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { paymentService } from '../../services/payment';
import { useAuth } from '../../contexts/AuthContext';
import { 
  CreditCard, 
  Lock, 
  AlertCircle, 
  Shield, 
  CheckCircle, 
  Loader2,
  DollarSign,
  Clock,
  User
} from 'lucide-react';
import PaymentMethods from './PaymentMethods';
import PaymentSuccess from './PaymentSuccess';
import PaymentError from './PaymentError';
import toast from 'react-hot-toast';

// Load Stripe
const stripePromise = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY 
  ? loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
  : null;

const CheckoutForm = ({ orderData, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentStatus, setPaymentStatus] = useState('input'); // input, processing, success, error
  const [paymentResult, setPaymentResult] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    name: user?.username || '',
    email: user?.email || '',
    address: {
      line1: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'US'
    }
  });

  useEffect(() => {
    // Create payment intent when component mounts
    const createPaymentIntent = async () => {
      try {
        setProcessing(true);
        const response = await paymentService.createPaymentIntent(orderData);
        setClientSecret(response.data.clientSecret);
        setProcessing(false);
      } catch (error) {
        console.error('Error creating payment intent:', error);
        setError({
          code: 'payment_intent_creation_failed',
          message: 'Failed to initialize payment. Please try again.'
        });
        setPaymentStatus('error');
        setProcessing(false);
        onError && onError(error);
      }
    };

    if (orderData) {
      createPaymentIntent();
    }
  }, [orderData, onError]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setPaymentStatus('processing');
    setError(null);

    const card = elements.getElement(CardElement);

    try {
      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: billingDetails
        }
      });

      if (error) {
        console.error('Payment error:', error);
        setError({
          code: error.code,
          message: error.message
        });
        setPaymentStatus('error');
        toast.error(error.message);
        onError && onError(error);
      } else {
        console.log('Payment successful:', paymentIntent);
        setPaymentResult(paymentIntent);
        setPaymentStatus('success');
        toast.success('Payment successful!');
        onSuccess && onSuccess(paymentIntent);
      }
    } catch (err) {
      console.error('Payment processing error:', err);
      setError({
        code: 'processing_error',
        message: 'An unexpected error occurred. Please try again.'
      });
      setPaymentStatus('error');
      toast.error('Payment failed. Please try again.');
      onError && onError(err);
    } finally {
      setProcessing(false);
    }
  };

  const handleRetry = () => {
    setPaymentStatus('input');
    setError(null);
    setPaymentResult(null);
  };

  // Show success page
  if (paymentStatus === 'success' && paymentResult) {
    return (
      <PaymentSuccess 
        orderData={orderData} 
        paymentIntent={paymentResult}
      />
    );
  }

  // Show error page
  if (paymentStatus === 'error' && error) {
    return (
      <PaymentError 
        error={error}
        onRetry={handleRetry}
        orderData={orderData}
      />
    );
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
        fontFamily: 'system-ui, -apple-system, sans-serif',
      },
      invalid: {
        color: '#9e2146',
      },
    },
    hidePostalCode: false,
  };

  const serviceFee = orderData.price * 0.05;
  const totalAmount = orderData.price + serviceFee;

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <CreditCard className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Purchase</h1>
        <p className="text-gray-600">
          Secure payment powered by Stripe
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
          
          <div className="space-y-4">
            {/* Gig Info */}
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{orderData.gigTitle}</h4>
                <p className="text-sm text-gray-600">by {orderData.sellerName}</p>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {orderData.deliveryTime} days delivery
                </div>
              </div>
            </div>

            {/* Package Details */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Package</span>
                <span className="font-medium text-gray-900 capitalize">
                  {orderData.package}
                </span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-600">Service price</span>
                <span className="text-gray-900">${orderData.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-600">Service fee</span>
                <span className="text-gray-900">${serviceFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 mt-3 pt-3">
                <div className="flex justify-between">
                  <span className="text-base font-semibold text-gray-900">Total</span>
                  <span className="text-base font-semibold text-gray-900">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Billing Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Information</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={billingDetails.name}
                    onChange={(e) => setBillingDetails(prev => ({
                      ...prev,
                      name: e.target.value
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={billingDetails.email}
                    onChange={(e) => setBillingDetails(prev => ({
                      ...prev,
                      email: e.target.value
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
              <div className="border border-gray-300 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <CreditCard className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    Credit or Debit Card
                  </span>
                </div>
                <CardElement options={cardElementOptions} />
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-green-800 mb-1">
                    Secure Payment
                  </h4>
                  <p className="text-sm text-green-700">
                    Your payment information is encrypted and secure. We never store your card details.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!stripe || processing || !clientSecret}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {processing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {paymentStatus === 'processing' ? 'Processing Payment...' : 'Loading...'}
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Pay ${totalAmount.toFixed(2)}
                </>
              )}
            </button>

            {/* Terms */}
            <p className="text-xs text-gray-500 text-center">
              By completing your purchase, you agree to our{' '}
              <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

const EnhancedStripePayment = ({ orderData, onSuccess, onError }) => {
  if (!stripePromise) {
    return (
      <div className="max-w-md mx-auto mt-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">
                Payment Service Unavailable
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                Stripe is not configured. Please contact support.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const options = {
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#2563eb',
        colorBackground: '#ffffff',
        colorText: '#1f2937',
        colorDanger: '#dc2626',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm 
        orderData={orderData} 
        onSuccess={onSuccess} 
        onError={onError}
      />
    </Elements>
  );
};

export default EnhancedStripePayment;