"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import { Box } from "@mui/material";

import { minNavbarHeight } from "constants/constants";

function NavBarPlaceholder({}) {
  const [scrolledY, setScrolledY] = useState(0);

  const pathname = usePathname();

  const isLandingPage = pathname.split("/").every((str) => str === "");
  const isBlogPage =
    pathname.split("/")[pathname.split("/").length - 1] === "blog";
  const isOpaqueNavbar =
    (!isLandingPage && !isBlogPage) ||
    (isLandingPage && scrolledY > 750) ||
    (isBlogPage && scrolledY > 400);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolledY(scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isOpaqueNavbar && (
        <Box sx={{ minHeight: minNavbarHeight }} />
      )}
    </>
  );
}

export default NavBarPlaceholder;
