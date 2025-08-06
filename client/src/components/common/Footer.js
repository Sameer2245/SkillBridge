import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Globe,
  Accessibility
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Categories */}
          <div>
            <h3 className="text-white font-bold mb-4">Categories</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/categories/graphics-design" className="text-gray-300 hover:text-white transition-colors">Graphics & Design</Link></li>
              <li><Link to="/categories/digital-marketing" className="text-gray-300 hover:text-white transition-colors">Digital Marketing</Link></li>
              <li><Link to="/categories/writing-translation" className="text-gray-300 hover:text-white transition-colors">Writing & Translation</Link></li>
              <li><Link to="/categories/video-animation" className="text-gray-300 hover:text-white transition-colors">Video & Animation</Link></li>
              <li><Link to="/categories/music-audio" className="text-gray-300 hover:text-white transition-colors">Music & Audio</Link></li>
              <li><Link to="/categories/programming-tech" className="text-gray-300 hover:text-white transition-colors">Programming & Tech</Link></li>
              <li><Link to="/categories/data" className="text-gray-300 hover:text-white transition-colors">Data</Link></li>
              <li><Link to="/categories/business" className="text-gray-300 hover:text-white transition-colors">Business</Link></li>
              <li><Link to="/categories/lifestyle" className="text-gray-300 hover:text-white transition-colors">Lifestyle</Link></li>
              <li><Link to="/categories/photography" className="text-gray-300 hover:text-white transition-colors">Photography</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-white font-bold mb-4">About</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About SkillBridge</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/press" className="text-gray-300 hover:text-white transition-colors">Press & News</Link></li>
              <li><Link to="/partnerships" className="text-gray-300 hover:text-white transition-colors">Partnerships</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/intellectual-property" className="text-gray-300 hover:text-white transition-colors">Intellectual Property Claims</Link></li>
              <li><Link to="/investor-relations" className="text-gray-300 hover:text-white transition-colors">Investor Relations</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/help" className="text-gray-300 hover:text-white transition-colors">Help & Support</Link></li>
              <li><Link to="/trust-safety" className="text-gray-300 hover:text-white transition-colors">Trust & Safety</Link></li>
              <li><Link to="/selling" className="text-gray-300 hover:text-white transition-colors">Selling on SkillBridge</Link></li>
              <li><Link to="/buying" className="text-gray-300 hover:text-white transition-colors">Buying on SkillBridge</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-bold mb-4">Community</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/customer-success" className="text-gray-300 hover:text-white transition-colors">Customer Success Stories</Link></li>
              <li><Link to="/community-hub" className="text-gray-300 hover:text-white transition-colors">Community Hub</Link></li>
              <li><Link to="/forum" className="text-gray-300 hover:text-white transition-colors">Forum</Link></li>
              <li><Link to="/events" className="text-gray-300 hover:text-white transition-colors">Events</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/influencers" className="text-gray-300 hover:text-white transition-colors">Influencers</Link></li>
              <li><Link to="/affiliates" className="text-gray-300 hover:text-white transition-colors">Affiliates</Link></li>
              <li><Link to="/podcast" className="text-gray-300 hover:text-white transition-colors">Podcast</Link></li>
              <li><Link to="/invite-friends" className="text-gray-300 hover:text-white transition-colors">Invite a Friend</Link></li>
              <li><Link to="/become-seller" className="text-gray-300 hover:text-white transition-colors">Become a Seller</Link></li>
              <li><Link to="/community-standards" className="text-gray-300 hover:text-white transition-colors">Community Standards</Link></li>
            </ul>
          </div>

          {/* More From SkillBridge */}
          <div>
            <h3 className="text-white font-bold mb-4">More From SkillBridge</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/business" className="text-gray-300 hover:text-white transition-colors">SkillBridge Business</Link></li>
              <li><Link to="/pro" className="text-gray-300 hover:text-white transition-colors">SkillBridge Pro</Link></li>
              <li><Link to="/logo-maker" className="text-gray-300 hover:text-white transition-colors">SkillBridge Logo Maker</Link></li>
              <li><Link to="/guides" className="text-gray-300 hover:text-white transition-colors">SkillBridge Guides</Link></li>
              <li><Link to="/workspace" className="text-gray-300 hover:text-white transition-colors">SkillBridge Workspace</Link></li>
              <li><Link to="/learn" className="text-gray-300 hover:text-white transition-colors">Learn</Link></li>
              <li><Link to="/working-not-working" className="text-gray-300 hover:text-white transition-colors">Working Not Working</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Logo and copyright */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <div className="text-xl font-bold">
                  <span className="text-blue-600">SkillBridge</span>
                </div>
              </div>
              <span className="text-gray-400 text-sm">© SkillBridge International Ltd. 2024</span>
            </div>

            {/* Social links and settings */}
            <div className="flex items-center space-x-6">
              {/* Social media */}
              <div className="flex space-x-4">
                <a href="https://twitter.com/skillbridge" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://facebook.com/skillbridge" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/company/skillbridge" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://instagram.com/skillbridge" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://youtube.com/skillbridge" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>

              {/* Language and accessibility */}
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">English</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                  <span className="text-sm">US$ USD</span>
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Accessibility className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;