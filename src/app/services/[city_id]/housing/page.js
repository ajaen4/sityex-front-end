"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";

import {
  Box,
  Tabs,
  Tab,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";

import HousingList from "components/Lists/HousingList";
import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";
const HousingMap = dynamic(() => import("components/Maps/HousingMap"), {
  ssr: false,
  loading: () => <CenteredLoadingSpinner />,
});
import HousingFilters from "components/Accordions/HousingFilters";

import { fetchHousingListings } from "actions";
import { capitalize } from "helpers/usefulFunctions";
import { imagesCdn, documentsCdn } from "constants/constants";

const tabs = ["listings", "map", "discounts"];
const HousingPage = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const [selectedTab, setSelectedTab] = useState("listings");

  const selectedCity = useSelector((state) => state.selectedCity.data);
  const housingState = useSelector((state) => state.housing);

  const router = useRouter();

  const changeTab = useCallback(
    (newValue) => {
      const destinationURL = `/services/${selectedCity.city_id}/housing/?tab=${newValue}`;

      setSelectedTab(newValue);
      router.push(destinationURL, undefined, { shallow: true });
    },
    [router, selectedCity.city_id],
  );

  useEffect(() => {
    if (searchParams.get("tab") && tabs.includes(searchParams.get("tab"))) {
      changeTab(searchParams.get("tab"));
    }
  }, [searchParams, changeTab]);

  useEffect(() => {
    if (
      housingState.data.housingListings.length === 0 ||
      housingState.city_id !== selectedCity.city_id
    ) {
      dispatch(fetchHousingListings(selectedCity.city_id, 4000));
    }
  }, [selectedCity.city_id, dispatch, housingState]);

  if (!housingState.data.filteredHListings) {
    return <CenteredLoadingSpinner />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {selectedTab === "listings" && (
        <Box
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <Typography variant="h1" sx={{ mt: 3, fontSize: 30 }}>
            Housing
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              mt: 18,
            }}
          >
            <HousingFilters />
          </Box>
          <HousingList />
        </Box>
      )}
      {selectedTab === "map" && <HousingMap />}
      {selectedTab === "discounts" && (
        <Box
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <Typography variant="h1" sx={{ mt: 3, fontSize: 30 }}>
            Housing
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Card
              key="spotahome-discount"
              sx={{
                display: "flex",
                flexDirection: "column",
                minWidth: 300,
                maxWidth: 300,
                mt: 15,
                mb: 3,
                minHeight: 350,
              }}
            >
              <CardMedia
                sx={{ height: 220 }}
                image={`${imagesCdn}/partners/spotahome_discount.jpg`}
                title="SpotAHome discount"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Enjoy 25% Off on Spotahome!
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  Find your perfect home and save big. Exclusive for Sityex
                  users. Redeem Your Discount Now!
                </Typography>
              </CardContent>
              <CardActions
                sx={{ display: "flex", justifyContent: "center", pt: 0 }}
              >
                <Link
                  target="_blank"
                  href={`${documentsCdn}/partners/spotahome/discount_explanation.pdf`}
                >
                  Read instructions
                </Link>
              </CardActions>
            </Card>
          </Box>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: selectedTab !== "map" ? "85px" : "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 400,
          background: "rgba(255, 255, 255, 0.7)",
          borderRadius: 5,
          padding: "0.5rem",
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={(_, newValue) => changeTab(newValue)}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="Listings or map selector"
        >
          {tabs.map((tab) => (
            <Tab key={tab} value={tab} label={capitalize(tab)} />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
};

export default HousingPage;
