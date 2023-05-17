import React, { createContext, useState, useEffect } from 'react';

const LocalStorageContext = createContext();

const LocalStorageProvider = ({ children }) => {
  const [localStorageValue, setLocalStorageValue] = useState(localStorage.getItem('side') || 'sideBar');

  useEffect(() => {
    const handleStorageChange = () => {
      setLocalStorageValue(localStorage.getItem('side') || 'sideBar');
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <LocalStorageContext.Provider value={localStorageValue}>
      {children}
    </LocalStorageContext.Provider>
  );
};

export { LocalStorageContext, LocalStorageProvider };