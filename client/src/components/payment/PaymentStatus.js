import React from 'react';
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertCircle,
  CreditCard,
  DollarSign
} from 'lucide-react';

const PaymentStatus = ({ status, amount, className = '' }) => {
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
      case 'completed':
        return {
          icon: CheckCircle,
          text: 'Paid',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          iconColor: 'text-green-600'
        };
      case 'pending':
      case 'pending_payment':
        return {
          icon: Clock,
          text: 'Pending',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          iconColor: 'text-yellow-600'
        };
      case 'failed':
      case 'cancelled':
        return {
          icon: XCircle,
          text: 'Failed',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          iconColor: 'text-red-600'
        };
      case 'refunded':
        return {
          icon: AlertCircle,
          text: 'Refunded',
          bgColor: 'bg-orange-100',
          textColor: 'text-orange-800',
          iconColor: 'text-orange-600'
        };
      case 'processing':
        return {
          icon: CreditCard,
          text: 'Processing',
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          iconColor: 'text-blue-600'
        };
      default:
        return {
          icon: AlertCircle,
          text: 'Unknown',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          iconColor: 'text-gray-600'
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center space-x-2 ${className}`}>
      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}>
        <Icon className={`w-3 h-3 mr-1 ${config.iconColor}`} />
        {config.text}
      </div>
      {amount && (
        <div className="inline-flex items-center text-sm font-medium text-gray-900">
          <DollarSign className="w-4 h-4 mr-1 text-gray-500" />
          {typeof amount === 'number' ? amount.toFixed(2) : amount}
        </div>
      )}
    </div>
  );
};

export default PaymentStatus;