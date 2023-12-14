"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { Box } from "@mui/material";

import { minNavbarHeightsPx } from "constants/constants";

function NavBarPlaceholder({}) {
  const pathname = usePathname();
  const isLandingPage = pathname.split("/").every((str) => str === "");

  return (
    <>{!isLandingPage && <Box sx={{ minHeight: minNavbarHeightsPx }} />}</>
  );
}

export default NavBarPlaceholder;
