import React from "react";
import { Box, CircularProgress } from "@mui/material";

const CenteredLoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default CenteredLoadingSpinner;
