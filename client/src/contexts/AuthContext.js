import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authService } from '../services/auth';
import socketService from '../services/socket';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        loading: false,
        error: null,
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'LOGOUT':
      return { ...initialState, loading: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check if user is already logged in
    const initializeAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const user = authService.getCurrentUser();
          dispatch({ type: 'SET_USER', payload: user });
          
          // Connect to socket
          if (user) {
            socketService.connect(user._id);
          }
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to initialize authentication' });
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    try {
      console.log('🔍 AuthContext: Starting login process:', credentials);
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await authService.login(credentials);
      console.log('✅ AuthContext: Login successful:', response);
      
      dispatch({ type: 'SET_USER', payload: response.user });
      
      // Connect to socket
      if (response.user.id || response.user._id) {
        console.log('🔌 AuthContext: Connecting to socket...');
        socketService.connect(response.user.id || response.user._id);
      }
      
      return response;
    } catch (error) {
      console.error('❌ AuthContext: Login error:', error);
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Login failed';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      console.log('🔍 AuthContext: Starting registration process:', userData);
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await authService.register(userData);
      console.log('✅ AuthContext: Registration successful:', response);
      
      dispatch({ type: 'SET_USER', payload: response.user });
      
      // Connect to socket
      if (response.user._id) {
        console.log('🔌 AuthContext: Connecting to socket...');
        socketService.connect(response.user._id);
      }
      
      return response;
    } catch (error) {
      console.error('❌ AuthContext: Registration error:', error);
      const errorMessage = error.response?.data?.message || 'Registration failed';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    socketService.disconnect();
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = async (userData) => {
    try {
      const response = await authService.updateProfile(userData);
      dispatch({ type: 'SET_USER', payload: response.user });
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Profile update failed';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    }
  };

  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};