import React from "react";

import { Box } from "@mui/material";

import SearchTab from "components/Tab/SearchTab";

import { contentHeight } from "constants/constants";

export const metadata = {
  title: "SityEx | City Search",
  description: "Discover Your Ideal Spanish City from our 27 available cities.",
};

const SearchPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: contentHeight,
        justifyContent: "center",
        position: "relative",
        overflowY: "scroll",
      }}
    >
      <SearchTab />
    </Box>
  );
};

export default SearchPage;
