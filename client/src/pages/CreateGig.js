import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  X, 
  Plus, 
  Minus, 
  Info, 
  CheckCircle, 
  AlertCircle,
  Image as ImageIcon,
  Video,
  FileText,
  DollarSign,
  Clock,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const CreateGig = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    subcategory: '',
    tags: [],
    description: '',
    features: [''],
    requirements: [''],
    images: [],
    videos: [],
    packages: {
      basic: {
        title: '',
        description: '',
        price: '',
        deliveryTime: '',
        revisions: '',
        features: ['']
      },
      standard: {
        title: '',
        description: '',
        price: '',
        deliveryTime: '',
        revisions: '',
        features: ['']
      },
      premium: {
        title: '',
        description: '',
        price: '',
        deliveryTime: '',
        revisions: '',
        features: ['']
      }
    },
    faq: [{ question: '', answer: '' }]
  });

  const categories = {
    'Web Development': ['Frontend Development', 'Backend Development', 'Full Stack Development', 'WordPress', 'E-commerce'],
    'Design & Creative': ['Logo Design', 'Web Design', 'Graphic Design', 'UI/UX Design', 'Branding'],
    'Writing & Translation': ['Content Writing', 'Copywriting', 'Technical Writing', 'Translation', 'Proofreading'],
    'Digital Marketing': ['SEO', 'Social Media Marketing', 'PPC Advertising', 'Email Marketing', 'Content Marketing'],
    'Video & Animation': ['Video Editing', 'Animation', 'Whiteboard Animation', 'Video Production', 'Motion Graphics'],
    'Music & Audio': ['Voice Over', 'Music Production', 'Audio Editing', 'Sound Design', 'Podcast Production'],
    'Programming & Tech': ['Mobile App Development', 'Desktop Applications', 'Database', 'DevOps', 'Cybersecurity'],
    'Business': ['Business Plans', 'Market Research', 'Presentations', 'Legal Consulting', 'Financial Consulting']
  };

  const deliveryTimes = [
    { value: '1', label: '1 day' },
    { value: '2', label: '2 days' },
    { value: '3', label: '3 days' },
    { value: '5', label: '5 days' },
    { value: '7', label: '1 week' },
    { value: '10', label: '10 days' },
    { value: '14', label: '2 weeks' },
    { value: '21', label: '3 weeks' },
    { value: '30', label: '1 month' }
  ];

  const revisionOptions = [
    { value: '0', label: 'No revisions' },
    { value: '1', label: '1 revision' },
    { value: '2', label: '2 revisions' },
    { value: '3', label: '3 revisions' },
    { value: '5', label: '5 revisions' },
    { value: 'unlimited', label: 'Unlimited revisions' }
  ];

  const steps = [
    { id: 1, title: 'Overview', description: 'Basic information about your gig' },
    { id: 2, title: 'Pricing', description: 'Set your packages and pricing' },
    { id: 3, title: 'Description & FAQ', description: 'Detailed description and FAQs' },
    { id: 4, title: 'Requirements', description: 'What you need from buyers' },
    { id: 5, title: 'Gallery', description: 'Upload images and videos' },
    { id: 6, title: 'Publish', description: 'Review and publish your gig' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePackageChange = (packageType, field, value) => {
    setFormData(prev => ({
      ...prev,
      packages: {
        ...prev.packages,
        [packageType]: {
          ...prev.packages[packageType],
          [field]: value
        }
      }
    }));
  };

  const addArrayItem = (field, item = '') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], item]
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateArrayItem = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addPackageFeature = (packageType) => {
    setFormData(prev => ({
      ...prev,
      packages: {
        ...prev.packages,
        [packageType]: {
          ...prev.packages[packageType],
          features: [...prev.packages[packageType].features, '']
        }
      }
    }));
  };

  const removePackageFeature = (packageType, index) => {
    setFormData(prev => ({
      ...prev,
      packages: {
        ...prev.packages,
        [packageType]: {
          ...prev.packages[packageType],
          features: prev.packages[packageType].features.filter((_, i) => i !== index)
        }
      }
    }));
  };

  const updatePackageFeature = (packageType, index, value) => {
    setFormData(prev => ({
      ...prev,
      packages: {
        ...prev.packages,
        [packageType]: {
          ...prev.packages[packageType],
          features: prev.packages[packageType].features.map((item, i) => i === index ? value : item)
        }
      }
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // In a real app, you'd upload these to a server
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, { file, url: e.target.result, name: file.name }]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    try {
      // Validate form data
      if (!formData.title || !formData.category || !formData.description) {
        toast.error('Please fill in all required fields');
        return;
      }

      // In a real app, you'd send this to your API
      console.log('Submitting gig:', formData);
      
      toast.success('Gig created successfully!');
      navigate('/my-gigs');
    } catch (error) {
      toast.error('Failed to create gig');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gig Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="I will create a modern website for your business"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength="80"
              />
              <p className="text-sm text-gray-500 mt-1">{formData.title.length}/80 characters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => {
                    handleInputChange('category', e.target.value);
                    handleInputChange('subcategory', '');
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {Object.keys(categories).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subcategory *
                </label>
                <select
                  value={formData.subcategory}
                  onChange={(e) => handleInputChange('subcategory', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={!formData.category}
                >
                  <option value="">Select a subcategory</option>
                  {formData.category && categories[formData.category].map(subcategory => (
                    <option key={subcategory} value={subcategory}>{subcategory}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      onClick={() => removeArrayItem('tags', index)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add a tag and press Enter"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    if (formData.tags.length < 5) {
                      addArrayItem('tags', e.target.value.trim());
                      e.target.value = '';
                    } else {
                      toast.error('Maximum 5 tags allowed');
                    }
                  }
                }}
              />
              <p className="text-sm text-gray-500 mt-1">Add up to 5 tags to help buyers find your gig</p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            {Object.entries(formData.packages).map(([packageType, packageData]) => (
              <div key={packageType} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 capitalize">
                  {packageType} Package
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Package Name
                    </label>
                    <input
                      type="text"
                      value={packageData.title}
                      onChange={(e) => handlePackageChange(packageType, 'title', e.target.value)}
                      placeholder={`${packageType.charAt(0).toUpperCase() + packageType.slice(1)} Package`}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      value={packageData.price}
                      onChange={(e) => handlePackageChange(packageType, 'price', e.target.value)}
                      placeholder="0"
                      min="5"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Time
                    </label>
                    <select
                      value={packageData.deliveryTime}
                      onChange={(e) => handlePackageChange(packageType, 'deliveryTime', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select delivery time</option>
                      {deliveryTimes.map(time => (
                        <option key={time.value} value={time.value}>{time.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Revisions
                    </label>
                    <select
                      value={packageData.revisions}
                      onChange={(e) => handlePackageChange(packageType, 'revisions', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select revisions</option>
                      {revisionOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Package Description
                  </label>
                  <textarea
                    value={packageData.description}
                    onChange={(e) => handlePackageChange(packageType, 'description', e.target.value)}
                    placeholder="Describe what's included in this package"
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features Included
                  </label>
                  {packageData.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updatePackageFeature(packageType, index, e.target.value)}
                        placeholder="Feature description"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => removePackageFeature(packageType, index)}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addPackageFeature(packageType)}
                    className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Feature
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gig Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your service in detail. What will you deliver? What makes your service unique?"
                rows="8"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">Minimum 120 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What's Included
              </label>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateArrayItem('features', index, e.target.value)}
                    placeholder="What's included in your service"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => removeArrayItem('features', index)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addArrayItem('features')}
                className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Feature
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Frequently Asked Questions
              </label>
              {formData.faq.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={item.question}
                      onChange={(e) => {
                        const newFaq = [...formData.faq];
                        newFaq[index].question = e.target.value;
                        handleInputChange('faq', newFaq);
                      }}
                      placeholder="Question"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <textarea
                      value={item.answer}
                      onChange={(e) => {
                        const newFaq = [...formData.faq];
                        newFaq[index].answer = e.target.value;
                        handleInputChange('faq', newFaq);
                      }}
                      placeholder="Answer"
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => {
                        const newFaq = formData.faq.filter((_, i) => i !== index);
                        handleInputChange('faq', newFaq);
                      }}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove FAQ
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => handleInputChange('faq', [...formData.faq, { question: '', answer: '' }])}
                className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add FAQ
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buyer Requirements
              </label>
              <p className="text-sm text-gray-600 mb-4">
                What information do you need from buyers to get started?
              </p>
              {formData.requirements.map((requirement, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <input
                    type="text"
                    value={requirement}
                    onChange={(e) => updateArrayItem('requirements', index, e.target.value)}
                    placeholder="What do you need from the buyer?"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => removeArrayItem('requirements', index)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addArrayItem('requirements')}
                className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Requirement
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gig Images
              </label>
              <p className="text-sm text-gray-600 mb-4">
                Upload images that showcase your work. First image will be your gig cover.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image.url}
                      alt={`Gig image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {index === 0 && (
                      <span className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                        Cover
                      </span>
                    )}
                  </div>
                ))}
                
                {formData.images.length < 5 && (
                  <label className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
                    <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              
              <p className="text-sm text-gray-500">
                Upload up to 5 images. Recommended size: 1280x720px
              </p>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Review Your Gig
              </h3>
              <p className="text-blue-700">
                Please review all the information before publishing your gig.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">Gig Title</h4>
              <p className="text-gray-700 mb-4">{formData.title}</p>
              
              <h4 className="font-semibold text-gray-900 mb-2">Category</h4>
              <p className="text-gray-700 mb-4">{formData.category} > {formData.subcategory}</p>
              
              <h4 className="font-semibold text-gray-900 mb-2">Pricing</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {Object.entries(formData.packages).map(([type, pkg]) => (
                  <div key={type} className="border border-gray-200 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 capitalize">{type}</h5>
                    <p className="text-2xl font-bold text-gray-900">${pkg.price}</p>
                    <p className="text-sm text-gray-600">{pkg.deliveryTime} days delivery</p>
                  </div>
                ))}
              </div>
              
              <h4 className="font-semibold text-gray-900 mb-2">Images</h4>
              <p className="text-gray-700">{formData.images.length} images uploaded</p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-yellow-800">Before you publish</h4>
                  <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                    <li>• Make sure all information is accurate</li>
                    <li>• Your gig will be reviewed before going live</li>
                    <li>• You can edit your gig after publishing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create a New Gig</h1>
          <p className="text-gray-600">Share your skills with the world and start earning</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-6 lg:mb-8">
          <div className="flex items-center justify-between overflow-x-auto pb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-shrink-0">
                <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 ${
                  currentStep >= step.id
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6" />
                  ) : (
                    <span className="text-xs sm:text-sm font-medium">{step.id}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 sm:w-full h-1 mx-2 sm:mx-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="hidden sm:flex justify-between mt-2">
            {steps.map((step) => (
              <div key={step.id} className="text-center" style={{ width: '16.66%' }}>
                <p className="text-sm font-medium text-gray-900">{step.title}</p>
                <p className="text-xs text-gray-500 hidden md:block">{step.description}</p>
              </div>
            ))}
          </div>
          {/* Mobile step indicator */}
          <div className="sm:hidden text-center mt-4">
            <p className="text-sm font-medium text-gray-900">{steps[currentStep - 1].title}</p>
            <p className="text-xs text-gray-500">{steps[currentStep - 1].description}</p>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {steps[currentStep - 1].title}
          </h2>
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {currentStep < steps.length ? (
            <button
              onClick={() => setCurrentStep(prev => Math.min(steps.length, prev + 1))}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 font-semibold"
            >
              Publish Gig
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateGig;