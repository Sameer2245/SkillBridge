import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Mock blog posts data - in a real app, this would come from an API
const mockPosts = [
  {
    id: 1,
    title: "How to Build a Successful Freelance Career in 2024",
    excerpt: "Discover the essential strategies and tips for creating a thriving freelance business in today's competitive market.",
    content: "Building a successful freelance career requires dedication, skill development, and strategic planning...",
    author: "Sarah Johnson",
    authorAvatar: "/api/placeholder/40/40",
    publishedAt: "2024-01-15",
    category: "Career",
    readTime: "5 min read",
    image: "/api/placeholder/600/300",
    tags: ["freelancing", "career", "tips"]
  },
  {
    id: 2,
    title: "Top 10 Skills in High Demand for Remote Work",
    excerpt: "Explore the most sought-after skills that can help you land high-paying remote freelance projects.",
    content: "The remote work landscape has evolved significantly, and certain skills are now more valuable than ever...",
    author: "Mike Chen",
    authorAvatar: "/api/placeholder/40/40",
    publishedAt: "2024-01-12",
    category: "Skills",
    readTime: "7 min read",
    image: "/api/placeholder/600/300",
    tags: ["remote work", "skills", "demand"]
  },
  {
    id: 3,
    title: "Maximizing Your Earnings on Freelance Platforms",
    excerpt: "Learn proven strategies to increase your income and attract premium clients on freelancing platforms.",
    content: "Success on freelance platforms requires more than just technical skills...",
    author: "Emily Rodriguez",
    authorAvatar: "/api/placeholder/40/40",
    publishedAt: "2024-01-10",
    category: "Business",
    readTime: "6 min read",
    image: "/api/placeholder/600/300",
    tags: ["earnings", "freelance platforms", "income"]
  },
  {
    id: 4,
    title: "The Future of Digital Marketing Services",
    excerpt: "Understanding emerging trends and opportunities in the digital marketing landscape for freelancers.",
    content: "Digital marketing continues to evolve at a rapid pace...",
    author: "David Park",
    authorAvatar: "/api/placeholder/40/40",
    publishedAt: "2024-01-08",
    category: "Marketing",
    readTime: "8 min read",
    image: "/api/placeholder/600/300",
    tags: ["digital marketing", "trends", "future"]
  },
  {
    id: 5,
    title: "Web Development Trends Every Freelancer Should Know",
    excerpt: "Stay ahead of the curve with the latest web development technologies and frameworks.",
    content: "The web development landscape is constantly changing...",
    author: "Alex Thompson",
    authorAvatar: "/api/placeholder/40/40",
    publishedAt: "2024-01-05",
    category: "Technology",
    readTime: "9 min read",
    image: "/api/placeholder/600/300",
    tags: ["web development", "trends", "technology"]
  },
  {
    id: 6,
    title: "Creating an Outstanding Portfolio That Gets Noticed",
    excerpt: "Tips and best practices for building a portfolio that attracts high-quality clients.",
    content: "Your portfolio is your digital storefront...",
    author: "Lisa Wang",
    authorAvatar: "/api/placeholder/40/40",
    publishedAt: "2024-01-03",
    category: "Portfolio",
    readTime: "4 min read",
    image: "/api/placeholder/600/300",
    tags: ["portfolio", "design", "clients"]
  }
];

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Career', 'Skills', 'Business', 'Marketing', 'Technology', 'Portfolio'];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">SkillBridge Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, tips, and stories from the world of freelancing and remote work
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category === 'all' ? 'All Posts' : category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <div className="mb-12">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={filteredPosts[0].image}
                    alt={filteredPosts[0].title}
                    className="h-64 md:h-full w-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center mb-4">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {filteredPosts[0].category}
                    </span>
                    <span className="text-gray-500 text-sm ml-4">
                      {filteredPosts[0].readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {filteredPosts[0].title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {filteredPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={filteredPosts[0].authorAvatar}
                        alt={filteredPosts[0].author}
                        className="h-10 w-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {filteredPosts[0].author}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(filteredPosts[0].publishedAt)}
                        </p>
                      </div>
                    </div>
                    <Link
                      to={`/blog/${filteredPosts[0].id}`}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.slice(1).map(post => (
            <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
              <img
                src={post.image}
                alt={post.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm ml-3">
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="h-8 w-8 rounded-full mr-2"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {post.author}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(post.publishedAt)}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Stay Updated with Our Latest Insights
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Get the latest tips, trends, and success stories delivered to your inbox weekly.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-l-lg border-0 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 px-6 py-2 rounded-r-lg font-medium hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
