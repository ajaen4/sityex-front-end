// ScrollContext.js
import React, { createContext, useRef } from 'react';

export const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const scrollRef = useRef(null);

  return (
    <ScrollContext.Provider value={scrollRef}>
      {children}
    </ScrollContext.Provider>
  );
};
