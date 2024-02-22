import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import * as ROUTES_PATHS from "routes/paths";

const WithoutAuth = (Component) => {
  const AuthComponent = (props) => {
    const router = useRouter();
    const isAuthResolved = useSelector((state) => state.auth.isAuthResolved);

    useEffect(() => {
      if (isAuthResolved) {
        router.push(ROUTES_PATHS.ROOT);
      }
    }, [isAuthResolved, router]);

    return !isAuthResolved ? <Component {...props} /> : null;
  };

  AuthComponent.displayName = `WithoutAuth(${
    Component.displayName || Component.name || "Component"
  })`;

  return AuthComponent;
};

export default WithoutAuth;
