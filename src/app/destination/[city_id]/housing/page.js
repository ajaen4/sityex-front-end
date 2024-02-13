"use client";

import React, { useState, useEffect } from "react";
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

import SendGAPageView from "components/DataLoaders/SendGAPageView";
import HousingList from "components/Lists/HousingList";
import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";
const HousingMap = dynamic(() => import("components/Maps/HousingMap"), {
  ssr: false,
  loading: () => <CenteredLoadingSpinner />,
});
import HousingFilters from "components/Accordions/HousingFilters";
import { useShowSignUpContext } from "components/Contexts/ShowSignUpContext";

import { fetchHousingIndex } from "actions";
import { capitalize } from "helpers/usefulFunctions";

import { imagesCdn, documentsCdn } from "constants/constants";

const tabs = ["listings", "map", "discounts"];
const HousingPage = () => {
  const searchParams = useSearchParams();

  const [selectedTab, setSelectedTab] = useState("listings");

  const selectedCity = useSelector((state) => state.selectedCity.data);
  const housingIndex = useSelector((state) => state.housing.data);
  const auth = useSelector((state) => state.auth);

  const { setShowSignUpModal } = useShowSignUpContext();
  const router = useRouter();

  const dispatch = useDispatch();

  const changeTab = (newValue) => {
    const destinationURL = `/destination/${selectedCity.city_id}/housing/?tab=${newValue}`;

    if (newValue === "discounts" && auth.isAuthResolved === false) {
      setShowSignUpModal(true);
      localStorage.setItem("destinationURL", destinationURL);
    } else {
      setSelectedTab(newValue);
      router.push(destinationURL, undefined, { shallow: true });
    }
  };

  useEffect(() => {
    if (!selectedCity) {
      return;
    }
    dispatch(fetchHousingIndex(selectedCity.city_id));
  }, [selectedCity.city_id]);

  useEffect(() => {
    if (searchParams.get("tab") && tabs.includes(searchParams.get("tab"))) {
      changeTab(searchParams.get("tab"));
    }
  }, [searchParams.get("tab"), auth]);

  if (!housingIndex || housingIndex.city_id !== selectedCity.city_id) {
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
      <SendGAPageView
        pageTitle="City Housing Page"
        selectedCity={{
          city_name: selectedCity.name,
          city_id: selectedCity.city_id,
        }}
      />
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
