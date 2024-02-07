"use client";

import React, { createContext, useState, useContext } from "react";

const ShowBotNavContext = createContext();

export const useShowBotNavContext = () => useContext(ShowBotNavContext);

export const ShowBotNavProvider = ({ children }) => {
  const [showBotNav, setShowBotNav] = useState(false);

  return (
    <ShowBotNavContext.Provider value={{ showBotNav, setShowBotNav }}>
      {children}
    </ShowBotNavContext.Provider>
  );
};
