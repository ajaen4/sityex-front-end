"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { Box } from "@mui/material";

import { minNavbarHeight } from "constants/constants";

function NavBarPlaceholder({}) {
  const pathname = usePathname();
  const isBlogPage =
    pathname.split("/")[pathname.split("/").length - 1] === "blog";

  return <>{!isBlogPage && <Box sx={{ minHeight: minNavbarHeight }} />}</>;
}

export default NavBarPlaceholder;
