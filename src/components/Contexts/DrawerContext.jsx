"use client";

import React, { createContext, useState, useContext } from "react";

const DrawerContext = createContext();

export const useDrawerContext = () => useContext(DrawerContext);

export const DrawerProvider = ({ children }) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  return (
    <DrawerContext.Provider value={{ isOpenDrawer, setIsOpenDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};
