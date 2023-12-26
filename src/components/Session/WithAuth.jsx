"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import * as ROUTES_PATHS from "routes/paths";

const WithAuth = (Component) => {
  return (props) => {
    const router = useRouter();
    const isAuthResolved = useSelector((state) => state.auth.isAuthResolved);

    React.useEffect(() => {
      if (!isAuthResolved) {
        router.push(ROUTES_PATHS.SIGN_UP);
      }
    }, [isAuthResolved, router]);

    return isAuthResolved ? <Component {...props} /> : null;
  };
};

export default WithAuth;
