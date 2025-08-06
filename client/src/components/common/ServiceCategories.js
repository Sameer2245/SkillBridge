import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code, 
  Palette, 
  PenTool, 
  Video, 
  Music, 
  TrendingUp, 
  Megaphone, 
  Database,
  Smartphone,
  Globe
} from 'lucide-react';

const ServiceCategories = () => {
  const categories = [
    {
      id: 1,
      name: 'Web Development',
      description: 'Full-stack development, frontend, backend',
      icon: Code,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      count: '1,234+ services'
    },
    {
      id: 2,
      name: 'Logo Design',
      description: 'Brand identity, logos, visual design',
      icon: Palette,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      count: '856+ services'
    },
    {
      id: 3,
      name: 'Content Writing',
      description: 'Articles, blogs, copywriting',
      icon: PenTool,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      count: '967+ services'
    },
    {
      id: 4,
      name: 'Video Editing',
      description: 'Video production, editing, animation',
      icon: Video,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      count: '543+ services'
    },
    {
      id: 5,
      name: 'Music & Audio',
      description: 'Audio editing, music production',
      icon: Music,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      count: '321+ services'
    },
    {
      id: 6,
      name: 'Digital Marketing',
      description: 'SEO, social media, advertising',
      icon: TrendingUp,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      count: '789+ services'
    },
    {
      id: 7,
      name: 'Social Media',
      description: 'Content creation, management',
      icon: Megaphone,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600',
      count: '654+ services'
    },
    {
      id: 8,
      name: 'Data Analysis',
      description: 'Data science, analytics, research',
      icon: Database,
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      iconColor: 'text-teal-600',
      count: '432+ services'
    },
    {
      id: 9,
      name: 'Mobile Apps',
      description: 'iOS, Android app development',
      icon: Smartphone,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      count: '567+ services'
    },
    {
      id: 10,
      name: 'Translation',
      description: 'Language translation, localization',
      icon: Globe,
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-50',
      iconColor: 'text-cyan-600',
      count: '298+ services'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Service Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover talented freelancers across various categories and find the perfect match for your project
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.id}
                to={`/gigs?category=${category.name.toLowerCase().replace(' ', '-')}`}
                className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className={`${category.bgColor} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-8 h-8 ${category.iconColor}`} />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">
                    {category.count}
                  </span>
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <svg className="w-3 h-3 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/gigs"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            View All Categories
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;