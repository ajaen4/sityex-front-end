"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import { Box } from "@mui/material";

import { signOutUser } from "actions";

import SmallScreenNavBar from "components/Navigation/SmallScreenNavBar";
import BigScreenNavBar from "components/Navigation/BigScreenNavBar";
import SignUpModal from "components/Modals/SignUpModal";
import { useShowSignUpContext } from "components/Contexts/ShowSignUpContext";
import NavBarPlaceholder from "components/Navigation/NavBarPlaceholder";

import * as ROUTES_PATHS from "routes/paths";

function NavBar({}) {
  const [scrolledY, setScrolledY] = useState(0);

  const auth = useSelector((state) => state.auth);
  const { showSignUpModal, setShowSignUpModal } = useShowSignUpContext();

  const router = useRouter();
  const pathname = usePathname();

  const isBlogPage =
    pathname.split("/")[pathname.split("/").length - 1] === "blog";
  const isOpaqueNavbar = !isBlogPage || (isBlogPage && scrolledY > 400);

  const toggleSignUpModal = () => {
    setShowSignUpModal(!showSignUpModal);
  };

  const closeSignUpModal = () => {
    setShowSignUpModal(false);
  };

  const handleCloseUserMenu = (setting) => {
    if (setting === "Account") router.push(ROUTES_PATHS.ACCOUNT);
    if (setting === "Logout") signOutUser();
  };

  const handleClickNavMenu = (page) => {
    if (page === "Services") router.push("/services/3117735/");
    if (page === "Blog") router.push(ROUTES_PATHS.BLOG);
    if (page === "About Us") router.push(ROUTES_PATHS.ABOUT_US);
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

  useEffect(() => {
    const destinationURL = localStorage.getItem("destinationURL");
    const openInNewTab = localStorage.getItem("openInNewTab");

    if (!showSignUpModal && destinationURL && auth.isAuthResolved) {
      localStorage.removeItem("destinationURL");

      if (openInNewTab) {
        localStorage.removeItem("openInNewTab");
        window.open(destinationURL, "_blank", "noopener,noreferrer");
      } else {
        router.push(destinationURL);
      }
    } else if (!showSignUpModal && auth.isAuthResolved === false) {
      localStorage.removeItem("destinationURL");
      localStorage.removeItem("openInNewTab");
    }
  }, [showSignUpModal, auth, router]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: { xs: "flex", md: "None" },
        }}
      >
        <SmallScreenNavBar
          isOpaqueNavbar={isOpaqueNavbar}
          handleCloseUserMenu={handleCloseUserMenu}
          clickedLogo={clickedLogo}
          toggleSignUpModal={toggleSignUpModal}
        />
      </Box>
      <Box sx={{ display: { xs: "None", md: "flex", lg: "flex" } }}>
        <BigScreenNavBar
          isOpaqueNavbar={isOpaqueNavbar}
          handleCloseUserMenu={handleCloseUserMenu}
          handleClickNavMenu={handleClickNavMenu}
          clickedLogo={clickedLogo}
          toggleSignUpModal={toggleSignUpModal}
        />
      </Box>
      <NavBarPlaceholder />
      <SignUpModal open={showSignUpModal} onClose={closeSignUpModal} />
    </Box>
  );
}

export default NavBar;
