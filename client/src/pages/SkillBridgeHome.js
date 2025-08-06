import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Star, 
  Play, 
  CheckCircle, 
  ArrowRight,
  TrendingUp,
  Users,
  Award,
  Shield,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const SkillBridgeHome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const heroSlides = [
    {
      title: "Find the perfect freelance services for your business",
      subtitle: "Work with talented people at the most affordable prices to get the most done for your business",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
      cta: "Get started"
    },
    {
      title: "Scale your professional team with freelancers",
      subtitle: "Hire skilled professionals from around the world to grow your business faster",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop",
      cta: "Find talent"
    },
    {
      title: "Turn your skills into your next opportunity",
      subtitle: "Earn money doing what you love. Join millions of freelancers on SkillBridge",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=600&fit=crop",
      cta: "Start selling"
    }
  ];

  const categories = [
    {
      name: "Programming & Tech",
      icon: "💻",
      services: ["Website Development", "Mobile Apps", "Desktop Applications", "Chatbots"]
    },
    {
      name: "Graphics & Design",
      icon: "🎨",
      services: ["Logo Design", "Brand Style Guides", "Game Art", "Graphics for Streamers"]
    },
    {
      name: "Digital Marketing",
      icon: "📈",
      services: ["Social Media Marketing", "SEO", "Content Marketing", "Video Marketing"]
    },
    {
      name: "Writing & Translation",
      icon: "✍️",
      services: ["Content Writing", "Copywriting", "Technical Writing", "Translation"]
    },
    {
      name: "Video & Animation",
      icon: "🎬",
      services: ["Video Editing", "Animation", "Intro Videos", "Promotional Videos"]
    },
    {
      name: "Music & Audio",
      icon: "🎵",
      services: ["Voice Over", "Music Production", "Audio Editing", "Sound Design"]
    },
    {
      name: "Business",
      icon: "💼",
      services: ["Virtual Assistant", "Data Entry", "Market Research", "Business Plans"]
    },
    {
      name: "Lifestyle",
      icon: "🌟",
      services: ["Gaming", "Fitness", "Nutrition", "Arts & Crafts"]
    }
  ];

  const popularServices = [
    "Website Development",
    "Logo Design", 
    "Content Writing",
    "Mobile App Design",
    "Social Media Marketing",
    "WordPress",
    "Programming & Tech",
    "Graphics & Design",
    "Digital Marketing",
    "Writing & Translation",
    "SEO",
    "Video Editing"
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      content: "SkillBridge helped us find amazing talent for our projects. The quality of work exceeded our expectations!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Michael Chen", 
      role: "Startup Founder",
      company: "InnovateLab",
      content: "As a freelancer, this platform has been incredible for growing my business and connecting with great clients.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Creative Director", 
      company: "DesignStudio",
      content: "The variety of services and the quality of freelancers on this platform is unmatched. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      rating: 5
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Background Image Slider */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-30' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  {heroSlides[currentSlide].title}
                </h1>
                <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                  {heroSlides[currentSlide].subtitle}
                </p>
              </div>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="flex max-w-2xl">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Try 'building mobile app'"
                    className="w-full px-6 py-4 text-gray-900 bg-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-r-lg transition-colors flex items-center space-x-2"
                >
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </button>
              </form>

              {/* Popular Searches */}
              <div className="space-y-3">
                <p className="text-blue-100">Popular:</p>
                <div className="flex flex-wrap gap-2">
                  {popularServices.slice(0, 6).map((service, index) => (
                    <Link
                      key={index}
                      to={`/search?q=${encodeURIComponent(service)}`}
                      className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm hover:bg-white/20 transition-colors border border-white/20"
                    >
                      {service}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Hero Image/Video */}
            <div className="relative">
              <div className="aspect-video bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
                  alt="Freelancers working"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors group">
                    <Play className="w-6 h-6 text-blue-600 ml-1 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Slide Navigation */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-gray-600 text-lg">Trusted by:</p>
          </div>
          <div className="flex justify-center items-center space-x-12 opacity-60">
            {['Facebook', 'Google', 'Netflix', 'P&G', 'PayPal'].map((company) => (
              <div key={company} className="text-2xl font-bold text-gray-400">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Explore our marketplace
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse through our diverse categories and find the perfect service for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/search?category=${encodeURIComponent(category.name.toLowerCase())}`}
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <ul className="space-y-1">
                  {category.services.map((service, serviceIndex) => (
                    <li key={serviceIndex} className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      {service}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why choose SkillBridge?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need to succeed in the freelance economy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8 text-blue-600" />,
                title: "Secure payments",
                description: "Your payment is protected until you approve the work"
              },
              {
                icon: <Clock className="w-8 h-8 text-green-600" />,
                title: "Fast delivery",
                description: "Get your project completed quickly by skilled professionals"
              },
              {
                icon: <Award className="w-8 h-8 text-purple-600" />,
                title: "Quality work",
                description: "Work with verified freelancers with proven track records"
              },
              {
                icon: <Users className="w-8 h-8 text-orange-600" />,
                title: "24/7 support",
                description: "Get help whenever you need it from our support team"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What our users say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join millions of satisfied users who trust SkillBridge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join SkillBridge today and connect with talented freelancers or start selling your services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <span>Join as a Client</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/register?type=freelancer"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <span>Become a Freelancer</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkillBridgeHome;