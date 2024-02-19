"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import * as ROUTES_PATHS from "routes/paths";

const WithAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    const isAuthResolved = useSelector((state) => state.auth.isAuthResolved);

    useEffect(() => {
      if (!isAuthResolved) {
        router.push(ROUTES_PATHS.SIGN_UP);
      }
    }, [isAuthResolved, router]);

    return isAuthResolved ? <Component {...props} /> : null;
  };

  AuthenticatedComponent.displayName = `WithAuth(${Component.displayName || Component.name || 'Component'})`;

  return AuthenticatedComponent;
};

export default WithAuth;
