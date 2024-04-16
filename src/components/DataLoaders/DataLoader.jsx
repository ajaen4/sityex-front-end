"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { usePathname, useSearchParams } from "next/navigation";

import { onAuthStateChanged, storeAuthUser } from "actions";

// Important to keep here even if it's not used so it's initialized
import { postHogClient } from "analytics";

const DataLoader = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID);
        ReactPixel.pageView();
      });
  }, [pathname, searchParams]);

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
