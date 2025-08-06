import React from 'react';

const ResponsiveText = ({ 
  children, 
  as = 'p',
  size = 'base',
  weight = 'normal',
  color = 'gray-900',
  className = '',
  responsive = true
}) => {
  const Component = as;

  const sizeClasses = responsive ? {
    'xs': 'text-xs sm:text-sm',
    'sm': 'text-sm sm:text-base',
    'base': 'text-base sm:text-lg',
    'lg': 'text-lg sm:text-xl',
    'xl': 'text-xl sm:text-2xl',
    '2xl': 'text-2xl sm:text-3xl',
    '3xl': 'text-3xl sm:text-4xl lg:text-5xl',
    '4xl': 'text-4xl sm:text-5xl lg:text-6xl',
    '5xl': 'text-5xl sm:text-6xl lg:text-7xl',
    '6xl': 'text-6xl sm:text-7xl lg:text-8xl'
  } : {
    'xs': 'text-xs',
    'sm': 'text-sm',
    'base': 'text-base',
    'lg': 'text-lg',
    'xl': 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl'
  };

  const weightClasses = {
    'thin': 'font-thin',
    'light': 'font-light',
    'normal': 'font-normal',
    'medium': 'font-medium',
    'semibold': 'font-semibold',
    'bold': 'font-bold',
    'extrabold': 'font-extrabold',
    'black': 'font-black'
  };

  const colorClasses = {
    'white': 'text-white',
    'gray-50': 'text-gray-50',
    'gray-100': 'text-gray-100',
    'gray-200': 'text-gray-200',
    'gray-300': 'text-gray-300',
    'gray-400': 'text-gray-400',
    'gray-500': 'text-gray-500',
    'gray-600': 'text-gray-600',
    'gray-700': 'text-gray-700',
    'gray-800': 'text-gray-800',
    'gray-900': 'text-gray-900',
    'blue-500': 'text-blue-500',
    'blue-600': 'text-blue-600',
    'blue-700': 'text-blue-700',
    'green-500': 'text-green-500',
    'green-600': 'text-green-600',
    'red-500': 'text-red-500',
    'red-600': 'text-red-600',
    'yellow-500': 'text-yellow-500',
    'yellow-600': 'text-yellow-600',
    'purple-500': 'text-purple-500',
    'purple-600': 'text-purple-600'
  };

  return (
    <Component 
      className={`${sizeClasses[size]} ${weightClasses[weight]} ${colorClasses[color]} ${className}`}
    >
      {children}
    </Component>
  );
};

export default ResponsiveText;