export const colors = {
  primary: '#FF6AD5',
  secondary: '#C774E8',
  tertiary: '#AD8CFF',
  
  // Opacity variants
  primaryWithOpacity: {
    '10': 'rgba(255, 106, 213, 0.1)',
    '20': 'rgba(255, 106, 213, 0.2)',
    '30': 'rgba(255, 106, 213, 0.3)',
    '50': 'rgba(255, 106, 213, 0.5)',
    '80': 'rgba(255, 106, 213, 0.8)'
  },

  // Hover states
  hover: {
    primary: '#ff8de0'
  },

  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.8)',
    muted: 'rgba(255, 255, 255, 0.5)'
  }
} as const; 