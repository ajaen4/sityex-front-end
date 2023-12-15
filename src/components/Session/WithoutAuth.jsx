"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import * as ROUTES_PATHS from "routes/paths";

const WithoutAuth = (Component) => {
  return (props) => {
    const router = useRouter();
    const isAuthResolved = useSelector((state) => state.auth.isAuthResolved);

    React.useEffect(() => {
      if (isAuthResolved) {
        router.push(ROUTES_PATHS.ROOT);
      }
    }, [isAuthResolved, router]);

    return !isAuthResolved ? <Component {...props} /> : null;
  };
};

export default WithoutAuth;
