import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';

const GenericPage = ({ title, description }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Construction className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {title || 'Coming Soon'}
          </h1>
          <p className="text-gray-600 mb-8">
            {description || 'This page is currently under construction. We\'re working hard to bring you this feature soon!'}
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>Need help? <Link to="/contact" className="text-blue-600 hover:text-blue-700">Contact us</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericPage;