import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { StripeProvider } from './contexts/StripeContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './styles/animations.css';
import './styles/responsive.css';

// Import search test for development
import './utils/searchTest';

// Pages
import Home from './pages/Home';
import SkillBridgeHome from './pages/SkillBridgeHome';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import GigsList from './pages/GigsList';
import GigDetails from './pages/GigDetails';
import SkillBridgeGigDetails from './pages/SkillBridgeGigDetails';
import CreateGig from './pages/CreateGig';
import MyGigs from './pages/MyGigs';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import SearchResults from './pages/SearchResults';
import Orders from './pages/Orders';
import IntelligentSearch from './pages/IntelligentSearch';
import WebDevelopment from './pages/categories/WebDevelopment';
import LogoDesign from './pages/categories/LogoDesign';
import ContentWriting from './pages/categories/ContentWriting';
import VideoEditing from './pages/categories/VideoEditing';
import MusicAudio from './pages/categories/MusicAudio';
import DigitalMarketing from './pages/categories/DigitalMarketing';
import SocialMedia from './pages/categories/SocialMedia';
import DataAnalysis from './pages/categories/DataAnalysis';
import MobileApps from './pages/categories/MobileApps';
import Translation from './pages/categories/Translation';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import SearchTest from './components/search/SearchTest';
import SearchDebug from './components/search/SearchDebug';
import TestPage from './pages/TestPage';
import Explore from './pages/Explore';
import CategoryPage from './pages/CategoryPage';
import Business from './pages/Business';
import BecomeSeller from './pages/BecomeSeller';
import GenericPage from './pages/GenericPage';
import TestPayment from './pages/TestPayment';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

function App() {
  return (
    <AuthProvider>
      <StripeProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<SkillBridgeHome />} />
              <Route path="/old-home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/gigs" element={<GigsList />} />
              <Route path="/gigs/:id" element={<SkillBridgeGigDetails />} />
              <Route path="/old-gigs/:id" element={<GigDetails />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/search-test" element={<SearchTest />} />
              <Route path="/search-debug" element={<SearchDebug />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="/test-payment" element={<TestPayment />} />
              <Route path="/old-search" element={<Search />} />
              <Route path="/intelligent-search" element={<IntelligentSearch />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/categories/:categorySlug" element={<CategoryPage />} />
              <Route path="/business" element={<Business />} />
              <Route path="/become-seller" element={<BecomeSeller />} />
              
              {/* Generic pages */}
              <Route path="/about" element={<GenericPage title="About SkillBridge" description="Learn more about our mission to connect talented freelancers with businesses worldwide." />} />
              <Route path="/careers" element={<GenericPage title="Careers" description="Join our team and help us build the future of freelancing." />} />
              <Route path="/help" element={<GenericPage title="Help & Support" description="Get help with your SkillBridge account and services." />} />
              <Route path="/contact" element={<GenericPage title="Contact Us" description="Get in touch with our support team." />} />
              <Route path="/privacy" element={<GenericPage title="Privacy Policy" description="Learn how we protect your privacy and data." />} />
              <Route path="/terms" element={<GenericPage title="Terms of Service" description="Read our terms and conditions." />} />
              <Route path="/selling" element={<GenericPage title="Selling on SkillBridge" description="Learn how to become a successful seller on our platform." />} />
              <Route path="/buying" element={<GenericPage title="Buying on SkillBridge" description="Learn how to find and hire the best freelancers." />} />
              
              {/* Category Pages */}
              <Route path="/categories/web-development" element={<WebDevelopment />} />
              <Route path="/categories/logo-design" element={<LogoDesign />} />
              <Route path="/categories/content-writing" element={<ContentWriting />} />
              <Route path="/categories/video-editing" element={<VideoEditing />} />
              <Route path="/categories/music-audio" element={<MusicAudio />} />
              <Route path="/categories/digital-marketing" element={<DigitalMarketing />} />
              <Route path="/categories/social-media" element={<SocialMedia />} />
              <Route path="/categories/data-analysis" element={<DataAnalysis />} />
              <Route path="/categories/mobile-apps" element={<MobileApps />} />
              <Route path="/categories/translation" element={<Translation />} />

              {/* Payment Routes */}
              <Route path="/checkout/:gigId" element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              } />
              <Route path="/order-success" element={
                <ProtectedRoute>
                  <OrderSuccess />
                </ProtectedRoute>
              } />

{/* Blog Routes */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/gigs/create" element={
                <ProtectedRoute>
                  <CreateGig />
                </ProtectedRoute>
              } />
              <Route path="/my-gigs" element={
                <ProtectedRoute>
                  <MyGigs />
                </ProtectedRoute>
              } />
              <Route path="/orders" element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              } />
              <Route path="/messages" element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />

              {/* 404 Route */}
              <Route path="*" element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                    <p className="text-gray-600 mb-8">Page not found</p>
                    <a href="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                      Go Home
                    </a>
                  </div>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
        
        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: '#4aed88',
              },
            },
          }}
        />
        </Router>
      </StripeProvider>
    </AuthProvider>
  );
}

export default App;
