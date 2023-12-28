import React from "react";

import { Box } from "@mui/material";

import SearchTab from "components/Tab/SearchTab";
import SendGAPageView from "components/DataLoaders/SendGAPageView";

import { contentHeight } from "constants/constants";

export const metadata = {
  title: "SityEx | City Search",
  description:
    "Explore and find your perfect match in Spain with SityEx. Our comprehensive city search tool offers detailed insights into Spanish cities, helping you uncover hidden gems and make informed decisions about your next destination. Whether you're looking for vibrant culture, serene beaches, or dynamic urban life, start your journey with SityEx and discover a city that feels like home.",
  alternates: {
    canonical: "https://sityex.com/search",
  },
};

const SearchPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: contentHeight,
        justifyContent: "center",
        position: "relative",
      }}
    >
      <SendGAPageView pageTitle="Search City Page" />
      <SearchTab />
    </Box>
  );
};

export default SearchPage;
