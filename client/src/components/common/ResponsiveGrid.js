import React from 'react';

const ResponsiveGrid = ({ 
  children, 
  className = '',
  cols = {
    default: 1,
    sm: 2,
    md: 2,
    lg: 3,
    xl: 4
  },
  gap = 'default'
}) => {
  const gapClasses = {
    'none': 'gap-0',
    'sm': 'gap-2 sm:gap-3',
    'default': 'gap-4 sm:gap-6',
    'lg': 'gap-6 sm:gap-8',
    'xl': 'gap-8 sm:gap-10'
  };

  const gridCols = `grid-cols-${cols.default} ${cols.sm ? `sm:grid-cols-${cols.sm}` : ''} ${cols.md ? `md:grid-cols-${cols.md}` : ''} ${cols.lg ? `lg:grid-cols-${cols.lg}` : ''} ${cols.xl ? `xl:grid-cols-${cols.xl}` : ''}`;

  return (
    <div className={`grid ${gridCols} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
};

export default ResponsiveGrid;