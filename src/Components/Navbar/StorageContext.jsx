import React, { createContext, useState } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [themeClass, setThemeClass] = useState('sideBar');

  const toggleTheme = () => {
    const newThemeClass = themeClass === 'sideBar' ? 'sideBar hide_nav' : 'sideBar';
    setThemeClass(newThemeClass);
  };

  return (
    <ThemeContext.Provider value={{ themeClass, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
