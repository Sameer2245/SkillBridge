import React from 'react';
import { Link } from 'react-router-dom';
import { Star, DollarSign, Clock, Users, TrendingUp, ArrowRight, CheckCircle, Play } from 'lucide-react';

const BecomeSeller = () => {
  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8 text-green-500" />,
      title: "Earn Money",
      description: "Set your own prices and keep 80% of what you earn. No hidden fees."
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: "Work Flexibly",
      description: "Work when you want, where you want. You're in complete control."
    },
    {
      icon: <Users className="w-8 h-8 text-purple-500" />,
      title: "Global Reach",
      description: "Connect with millions of buyers from around the world."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-500" />,
      title: "Grow Your Business",
      description: "Build your reputation and grow your freelance business."
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Create Your Profile",
      description: "Sign up and create a compelling profile that showcases your skills and experience."
    },
    {
      number: "2",
      title: "Create Your First Gig",
      description: "Define your service, set your price, and add portfolio samples to attract buyers."
    },
    {
      number: "3",
      title: "Start Selling",
      description: "Receive orders, deliver great work, and build your reputation on the platform."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Graphic Designer",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=8B5CF6&color=fff",
      rating: 5,
      earnings: "$15,000",
      quote: "SkillBridge has transformed my freelance career. I've earned over $15,000 in my first year!"
    },
    {
      name: "Mike Chen",
      role: "Web Developer",
      avatar: "https://ui-avatars.com/api/?name=Mike+Chen&background=8B5CF6&color=fff",
      rating: 5,
      earnings: "$25,000",
      quote: "The platform is easy to use and I love the flexibility. I can work from anywhere!"
    },
    {
      name: "Emma Davis",
      role: "Content Writer",
      avatar: "https://ui-avatars.com/api/?name=Emma+Davis&background=8B5CF6&color=fff",
      rating: 5,
      earnings: "$12,000",
      quote: "Great community and support. I've built lasting relationships with my clients."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Become a Seller
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100">
                Turn your skills into income. Join millions of freelancers earning money on SkillBridge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register?type=seller"
                  className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
                >
                  Start Selling
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-green-600 transition-colors">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Video
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">$2.5M+</div>
                  <div className="text-green-200 mb-4">Paid to sellers monthly</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-2xl font-bold">500K+</div>
                      <div className="text-green-200">Active sellers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">4.8★</div>
                      <div className="text-green-200">Average rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Sell on SkillBridge?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join a platform that's designed to help you succeed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow text-center">
                <div className="flex justify-center mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Getting started is easy. Follow these simple steps to begin your freelance journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how other freelancers are building successful businesses on SkillBridge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-green-600 font-bold">{testimonial.earnings} earned</span>
                </div>
                
                <p className="text-gray-700 italic">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of successful freelancers who are already earning on SkillBridge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register?type=seller"
              className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors"
            >
              Start Selling Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/explore"
              className="inline-flex items-center px-8 py-4 border-2 border-gray-600 text-white font-semibold rounded-full hover:border-gray-500 transition-colors"
            >
              Browse Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BecomeSeller;