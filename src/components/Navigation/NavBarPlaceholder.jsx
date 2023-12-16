"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { Box } from "@mui/material";

import { minNavbarHeight } from "constants/constants";

function NavBarPlaceholder({}) {
  const pathname = usePathname();
  const isLandingPage = pathname.split("/").every((str) => str === "");
  const isBlogPage = pathname.split("/").slice(-1) === "blog";

  return <>{!isLandingPage && !isBlogPage && <Box sx={{ minHeight: minNavbarHeight }} />}</>;
}

export default NavBarPlaceholder;
