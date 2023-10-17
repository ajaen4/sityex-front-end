import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import { Box } from "@mui/material";

const MinLayout = () => {
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const theme = useTheme();

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        height: `${viewportHeight}px`,
        width: "100%",
        backgroundColor: theme.palette.primary.light
      }}
    >
      <Outlet />
    </Box>
  );
};

export default MinLayout;
