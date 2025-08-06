import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import api from '../../services/api';

const SearchBar = ({ 
  placeholder = "What service are you looking for today?", 
  showSuggestions = true,
  onSearch,
  className = "",
  size = "large" // large, medium, small
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestionsList, setShowSuggestionsList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);
  const debounceRef = useRef(null);

  // Size configurations
  const sizeConfig = {
    large: {
      input: "h-14 text-lg px-6",
      button: "h-14 px-6",
      container: "max-w-2xl",
      suggestions: "text-base"
    },
    medium: {
      input: "h-12 text-base px-4",
      button: "h-12 px-4",
      container: "max-w-xl",
      suggestions: "text-sm"
    },
    small: {
      input: "h-10 text-sm px-3",
      button: "h-10 px-3",
      container: "max-w-lg",
      suggestions: "text-xs"
    }
  };

  const config = sizeConfig[size];

  // Debounced search suggestions
  useEffect(() => {
    if (!showSuggestions) return;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.length >= 2) {
      debounceRef.current = setTimeout(async () => {
        try {
          setLoading(true);
          const response = await api.get(`/search/suggestions?q=${encodeURIComponent(query)}&limit=8`);
          setSuggestions(response.data.suggestions || []);
          setShowSuggestionsList(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        } finally {
          setLoading(false);
        }
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestionsList(false);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, showSuggestions]);

  // Handle search
  const handleSearch = (searchQuery = query) => {
    if (!searchQuery.trim()) return;

    setShowSuggestionsList(false);
    
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.text);
    handleSearch(suggestion.text);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestionsList || suggestions.length === 0) {
      if (e.key === 'Enter') {
        handleSearch();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestionsList(false);
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestionsList(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Clear search
  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestionsList(false);
    setSelectedIndex(-1);
  };

  return (
    <div ref={searchRef} className={`relative ${config.container} ${className}`}>
      {/* Search Input */}
      <div className="relative flex items-center">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (suggestions.length > 0) {
                setShowSuggestionsList(true);
              }
            }}
            placeholder={placeholder}
            className={`
              w-full ${config.input} pr-12 border border-gray-300 rounded-l-lg 
              focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
              placeholder-gray-500 bg-white shadow-sm
            `}
          />
          
          {/* Clear button */}
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Search Button */}
        <button
          onClick={() => handleSearch()}
          disabled={!query.trim()}
          className={`
            ${config.button} bg-green-600 text-white rounded-r-lg border border-green-600
            hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
            disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200
            flex items-center justify-center shadow-sm
          `}
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && showSuggestionsList && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-80 overflow-y-auto"
        >
          {loading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mx-auto"></div>
              <span className="mt-2 block">Loading suggestions...</span>
            </div>
          ) : suggestions.length > 0 ? (
            <ul className="py-2">
              {suggestions.map((suggestion, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`
                      w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-150
                      ${selectedIndex === index ? 'bg-green-50 border-r-2 border-green-500' : ''}
                      ${config.suggestions}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-900">
                            {suggestion.text}
                          </div>
                          {suggestion.category && (
                            <div className="text-xs text-gray-500 mt-1">
                              in {suggestion.category}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Suggestion type badge */}
                      <div className="flex items-center space-x-2">
                        {suggestion.count && (
                          <span className="text-xs text-gray-400">
                            {suggestion.count} services
                          </span>
                        )}
                        <span className={`
                          px-2 py-1 rounded-full text-xs font-medium
                          ${suggestion.type === 'gig' ? 'bg-blue-100 text-blue-800' :
                            suggestion.type === 'category' ? 'bg-purple-100 text-purple-800' :
                            suggestion.type === 'tag' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'}
                        `}>
                          {suggestion.type === 'gig' ? 'Service' :
                           suggestion.type === 'category' ? 'Category' :
                           suggestion.type === 'tag' ? 'Tag' : 'Popular'}
                        </span>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : query.length >= 2 ? (
            <div className="p-4 text-center text-gray-500">
              <MagnifyingGlassIcon className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p>No suggestions found for "{query}"</p>
              <p className="text-sm mt-1">Try searching anyway or use different keywords</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;