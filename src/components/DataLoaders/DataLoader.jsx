"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged, storeAuthUser, fetchCitiesIndex } from "actions";

const DataLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged((authUser) => {
      dispatch(storeAuthUser(authUser));
    });

    dispatch(fetchCitiesIndex());

    return () => {
      unsubscribeAuth();
    };
  }, []);

  return null;
};

export default DataLoader;