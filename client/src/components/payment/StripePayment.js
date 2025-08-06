import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  PaymentElement
} from '@stripe/react-stripe-js';
import { paymentService } from '../../services/payment';
import { useAuth } from '../../contexts/AuthContext';
import { CreditCard, Lock, AlertCircle, Shield, CheckCircle } from 'lucide-react';
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
  const [error, setError] = useState('');

  useEffect(() => {
    // Create payment intent when component mounts
    createPaymentIntent();
  }, []);

  const createPaymentIntent = async () => {
    try {
      const response = await paymentService.createPaymentIntent(orderData);
      setClientSecret(response.data.clientSecret);
    } catch (error) {
      setError('Failed to initialize payment');
      onError?.(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError('');

    const card = elements.getElement(CardElement);

    try {
      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user.fullName || user.username,
            email: user.email,
          },
        },
      });

      if (error) {
        setError(error.message);
        toast.error(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        toast.success('Payment successful!');
        onSuccess?.(paymentIntent);
      }
    } catch (error) {
      setError('Payment failed. Please try again.');
      toast.error('Payment failed. Please try again.');
      onError?.(error);
    } finally {
      setProcessing(false);
    }
  };

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

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <CreditCard className="h-6 w-6 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Payment Details</h3>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-gray-900 mb-2">Order Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Service</span>
            <span className="font-medium">{orderData.gigTitle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Package</span>
            <span className="font-medium capitalize">{orderData.package}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Price</span>
            <span className="font-medium">${orderData.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Service Fee</span>
            <span className="font-medium">${(orderData.price * 0.05).toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span>${(orderData.price * 1.05).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Information
          </label>
          <div className="border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
            <CardElement options={cardElementOptions} />
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}

        <div className="flex items-center justify-center mb-4">
          <Lock className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-500">
            Your payment information is secure and encrypted
          </span>
        </div>

        <button
          type="submit"
          disabled={!stripe || processing || !clientSecret}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {processing ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Processing...
            </div>
          ) : (
            `Pay $${(orderData.price * 1.05).toFixed(2)}`
          )}
        </button>
      </form>

      <div className="mt-4 text-xs text-gray-500 text-center">
        By completing your purchase, you agree to our{' '}
        <a href="/terms" className="text-blue-600 hover:underline">
          Terms of Service
        </a>
      </div>
    </div>
  );
};

const StripePayment = ({ orderData, onSuccess, onError }) => {
  if (!stripePromise) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
          <p className="text-yellow-800">
            Payment processing is not configured. Please contact support.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm 
        orderData={orderData} 
        onSuccess={onSuccess} 
        onError={onError} 
      />
    </Elements>
  );
};

export default StripePayment;

// Sample order data for testing
const sampleOrderData = {
  gigId: 'testGig123',
  gigTitle: 'Test Gig',
  sellerName: 'Test Seller',
  package: 'Standard',
  price: 50.00,
  deliveryTime: 5,
  sellerId: 'seller123'
};

// Render payment component with test data
const renderTestPayment = () => (
  <StripePayment 
    orderData={sampleOrderData} 
    onSuccess={(paymentIntent) => console.log('Payment Success', paymentIntent)} 
    onError={(error) => console.error('Payment Error', error)}
  />
);
