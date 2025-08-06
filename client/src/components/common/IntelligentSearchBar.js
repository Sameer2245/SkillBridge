import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, TrendingUp, Tag, Folder, Sparkles, Clock, X } from 'lucide-react';
import api from '../../services/api';

const IntelligentSearchBar = ({ 
  placeholder = "Search for services...", 
  className = "",
  showTrending = true,
  onSearch = null 
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [trending, setTrending] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState([]);
  
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const debounceRef = useRef(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading recent searches:', error);
      }
    }
  }, []);

  // Load trending searches on mount
  useEffect(() => {
    if (showTrending) {
      loadTrendingSearches();
    }
  }, [showTrending]);

  // Debounced search function
  const debouncedSearch = useCallback((searchQuery) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setLoading(true);
        try {
          const response = await api.get(`/search/suggestions?q=${encodeURIComponent(searchQuery)}&limit=8`);
          setSuggestions(response.data.suggestions || []);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 300);
  }, []);

  // Load trending searches
  const loadTrendingSearches = async () => {
    try {
      const response = await api.get('/search/trending?limit=6');
      setTrending(response.data.trending || []);
    } catch (error) {
      console.error('Error fetching trending searches:', error);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
    
    if (value.trim()) {
      debouncedSearch(value.trim());
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(showTrending && (trending.length > 0 || recentSearches.length > 0));
    }
  };

  // Handle search submission
  const handleSearch = (searchQuery = query) => {
    if (!searchQuery.trim()) return;
    
    const trimmedQuery = searchQuery.trim();
    
    // Save to recent searches
    saveRecentSearch(trimmedQuery);
    
    // Close dropdown
    setIsOpen(false);
    setQuery('');
    
    // Navigate to search results or call custom handler
    if (onSearch) {
      onSearch(trimmedQuery);
    } else {
      navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  // Save recent search
  const saveRecentSearch = (searchQuery) => {
    const updated = [
      searchQuery,
      ...recentSearches.filter(item => item !== searchQuery)
    ].slice(0, 5); // Keep only 5 recent searches
    
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    handleSearch(suggestion.text);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    const allItems = [
      ...suggestions,
      ...(query.length < 2 ? trending : []),
      ...(query.length < 2 ? recentSearches.map(text => ({ text, type: 'recent' })) : [])
    ];

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < allItems.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > -1 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && allItems[selectedIndex]) {
          handleSuggestionClick(allItems[selectedIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        searchRef.current?.blur();
        break;
      default:
        break;
    }
  };

  // Handle focus
  const handleFocus = () => {
    if (query.length >= 2 || showTrending) {
      setIsOpen(true);
    }
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // Get icon for suggestion type
  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'gig':
        return <Sparkles className="w-4 h-4 text-blue-500" />;
      case 'trending':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'tag':
        return <Tag className="w-4 h-4 text-purple-500" />;
      case 'category':
        return <Folder className="w-4 h-4 text-orange-500" />;
      case 'recent':
        return <Clock className="w-4 h-4 text-gray-500" />;
      default:
        return <Search className="w-4 h-4 text-gray-500" />;
    }
  };

  // Render suggestions dropdown
  const renderDropdown = () => {
    if (!isOpen) return null;

    const showingSuggestions = query.length >= 2;
    const showingTrendingAndRecent = !showingSuggestions && showTrending;

    return (
      <div 
        ref={dropdownRef}
        className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
      >
        {/* Loading state */}
        {loading && (
          <div className="p-4 text-center text-gray-500">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-sm">Searching...</p>
          </div>
        )}

        {/* Search suggestions */}
        {showingSuggestions && suggestions.length > 0 && (
          <div>
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b">
              Suggestions
            </div>
            {suggestions.map((suggestion, index) => (
              <button
                key={`suggestion-${index}`}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors ${
                  selectedIndex === index ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {getSuggestionIcon(suggestion.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {suggestion.text}
                  </p>
                  {suggestion.category && (
                    <p className="text-xs text-gray-500 truncate">
                      {suggestion.category}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* No suggestions found */}
        {showingSuggestions && !loading && suggestions.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No suggestions found</p>
            <p className="text-xs text-gray-400 mt-1">Try a different search term</p>
          </div>
        )}

        {/* Recent searches */}
        {showingTrendingAndRecent && recentSearches.length > 0 && (
          <div>
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b flex items-center justify-between">
              Recent Searches
              <button
                onClick={clearRecentSearches}
                className="text-blue-500 hover:text-blue-700 normal-case font-normal"
              >
                Clear
              </button>
            </div>
            {recentSearches.map((search, index) => (
              <button
                key={`recent-${index}`}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors ${
                  selectedIndex === suggestions.length + trending.length + index ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                }`}
                onClick={() => handleSuggestionClick({ text: search })}
              >
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">{search}</span>
              </button>
            ))}
          </div>
        )}

        {/* Trending searches */}
        {showingTrendingAndRecent && trending.length > 0 && (
          <div>
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b">
              Trending Searches
            </div>
            {trending.slice(0, 6).map((trend, index) => (
              <button
                key={`trending-${index}`}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors ${
                  selectedIndex === suggestions.length + index ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                }`}
                onClick={() => handleSuggestionClick(trend)}
              >
                {getSuggestionIcon(trend.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {trend.text}
                  </p>
                  {trend.category && (
                    <p className="text-xs text-gray-500 truncate">
                      {trend.category}
                    </p>
                  )}
                </div>
                {trend.popularity && (
                  <span className="text-xs text-gray-400">
                    {trend.popularity}+
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            ref={searchRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSuggestions([]);
                setIsOpen(false);
                searchRef.current?.focus();
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
      
      {renderDropdown()}
    </div>
  );
};

export default IntelligentSearchBar;