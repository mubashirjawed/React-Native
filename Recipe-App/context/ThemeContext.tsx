import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme] = useState({
    colors: {
      primary: '#FF6B6B',
      secondary: '#4ECDC4',
      accent: '#FFD93D',
      background: '#F8F9FA',
      card: '#FFFFFF',
      text: '#343A40',
      textLight: '#6C757D',
      border: '#DEE2E6',
    },
    spacing: {
      xs: 4,
      s: 8,
      m: 16,
      l: 24,
      xl: 32,
    },
    borderRadius: {
      s: 4,
      m: 8,
      l: 16,
      full: 9999,
    },
    fontSize: {
      small: 12,
      body: 16,
      large: 20,
      title: 24,
      header: 32,
    },
  });

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

