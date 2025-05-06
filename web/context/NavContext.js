"use client";

import React, { createContext, useContext, useState } from 'react';

// Create a context for navigation state
const NavContext = createContext({
  navOpen: 'close',
  setNavOpen: () => {},
});

// Provider component that wraps parts of the app that need the navigation state
export const NavProvider = ({ children }) => {
  const [navOpen, setNavOpen] = useState('close');
  
  return (
    <NavContext.Provider value={{ navOpen, setNavOpen }}>
      {children}
    </NavContext.Provider>
  );
};

// Hook to use the nav context
export const useNav = () => useContext(NavContext);