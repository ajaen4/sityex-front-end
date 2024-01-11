"use client";

import React, { createContext, useState, useContext } from "react";

const ShowBottomNavContext = createContext();

export const useShowBottomNavContext = () => useContext(ShowBottomNavContext);

export const ShowBottomNavProvider = ({ children }) => {
  const [showBottomNav, setShowBottomNav] = useState(false);

  return (
    <ShowBottomNavContext.Provider value={{ showBottomNav, setShowBottomNav }}>
      {children}
    </ShowBottomNavContext.Provider>
  );
};
