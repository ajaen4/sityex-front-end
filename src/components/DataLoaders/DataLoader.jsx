"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged, storeAuthUser, fetchCountries } from "actions";

const DataLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged((authUser) => {
      dispatch(storeAuthUser(authUser));
    });

    dispatch(fetchCountries());

    return () => {
      unsubscribeAuth();
    };
  }, [dispatch]);

  return null;
};

export default DataLoader;
