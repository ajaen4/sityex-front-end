"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

import { Box } from "@mui/material";

import { signOutUser } from "actions";

import SmallScreenNavBar from "components/Navigation/SmallScreenNavBar";
import BigScreenNavBar from "components/Navigation/BigScreenNavBar";

import * as ROUTES_PATHS from "routes/paths";

function NavBar({}) {
  const [scrolledY, setScrolledY] = useState(0);

  const auth = useSelector((state) => state.auth);

  const router = useRouter();
  const pathname = usePathname();

  const isLandingPage = pathname.split("/").every((str) => str === "");
  const isBlogPage =
    pathname.split("/")[pathname.split("/").length - 1] === "blog";
  const isOpaqueNavbar =
    (!isLandingPage && !isBlogPage) ||
    (isLandingPage && scrolledY > 750) ||
    (isBlogPage && scrolledY > 400);

  const handleCloseUserMenu = (setting) => {
    if (setting === "Account") router.push(ROUTES_PATHS.ACCOUNT);
    if (setting === "Logout") signOutUser(auth.data.id);
  };

  const handleClickNavMenu = (page) => {
    if (page === "Search City") router.push(ROUTES_PATHS.SEARCH);
    if (page === "Blog") router.push(ROUTES_PATHS.BLOG);
  };

  const clickedLogo = () => router.push(ROUTES_PATHS.ROOT);

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
      <Box
        sx={{
          display: { xs: "flex", md: "None" },
        }}
      >
        <SmallScreenNavBar
          isOpaqueNavbar={isOpaqueNavbar}
          handleCloseUserMenu={handleCloseUserMenu}
          clickedLogo={clickedLogo}
        />
      </Box>
      <Box sx={{ display: { xs: "None", md: "flex", lg: "flex" } }}>
        <BigScreenNavBar
          isOpaqueNavbar={isOpaqueNavbar}
          handleCloseUserMenu={handleCloseUserMenu}
          handleClickNavMenu={handleClickNavMenu}
          clickedLogo={clickedLogo}
        />
      </Box>
    </>
  );
}

export default NavBar;
