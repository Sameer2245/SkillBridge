import React, { useEffect, useState } from 'react';
import { CheckCircle, Download, MessageCircle, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = ({ orderData, paymentIntent }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/orders');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleDownloadReceipt = () => {
    // Generate and download receipt
    const receiptData = {
      orderId: orderData.orderId,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency.toUpperCase(),
      date: new Date().toLocaleDateString(),
      service: orderData.gigTitle,
      seller: orderData.sellerName
    };

    const receiptContent = `
PAYMENT RECEIPT
================

Order ID: ${receiptData.orderId}
Payment ID: ${receiptData.paymentIntentId}
Date: ${receiptData.date}

Service: ${receiptData.service}
Seller: ${receiptData.seller}
Amount: $${receiptData.amount.toFixed(2)} ${receiptData.currency}

Status: PAID
Payment Method: Card ending in ****

Thank you for your purchase!
SkillBridge Marketplace
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${receiptData.orderId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">
            Your order has been confirmed and the seller has been notified.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Order Details</h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Confirmed
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Order ID</span>
              <span className="text-sm font-medium text-gray-900">
                #{orderData.orderId?.slice(-8)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Service</span>
              <span className="text-sm font-medium text-gray-900">
                {orderData.gigTitle}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Seller</span>
              <span className="text-sm font-medium text-gray-900">
                {orderData.sellerName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Package</span>
              <span className="text-sm font-medium text-gray-900 capitalize">
                {orderData.package}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Delivery Time</span>
              <span className="text-sm font-medium text-gray-900">
                {orderData.deliveryTime} days
              </span>
            </div>
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between">
                <span className="text-base font-medium text-gray-900">Total Paid</span>
                <span className="text-base font-medium text-gray-900">
                  ${(paymentIntent.amount / 100).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleDownloadReceipt}
            className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Receipt
          </button>

          <button
            onClick={() => navigate(`/messages?seller=${orderData.sellerId}`)}
            className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Message Seller
          </button>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h4 className="text-sm font-medium text-blue-900 mb-2">What happens next?</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• The seller will start working on your order</li>
            <li>• You'll receive updates via email and notifications</li>
            <li>• You can track progress in your orders dashboard</li>
            <li>• Leave a review once the work is completed</li>
          </ul>
        </div>

        {/* Auto Redirect Notice */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">
            Redirecting to your orders in {countdown} seconds...
          </p>
          <button
            onClick={() => navigate('/orders')}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Go to Orders Now
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;