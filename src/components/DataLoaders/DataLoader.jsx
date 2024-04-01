"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged, storeAuthUser } from "actions";

// Important to keep here even if it's not used so it's initialized
import { postHogClient } from "analytics";

const DataLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged((authUser) => {
      dispatch(storeAuthUser(authUser));
    });

    return () => {
      unsubscribeAuth();
    };
  }, [dispatch]);

  return null;
};

export default DataLoader;
