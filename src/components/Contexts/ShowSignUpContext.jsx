"use client";

import React, { createContext, useState, useContext } from "react";

const ShowSignUpContext = createContext();

export const useShowSignUpContext = () => useContext(ShowSignUpContext);

export const ShowSignUpProvider = ({ children }) => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  return (
    <ShowSignUpContext.Provider value={{ showSignUpModal, setShowSignUpModal }}>
      {children}
    </ShowSignUpContext.Provider>
  );
};
