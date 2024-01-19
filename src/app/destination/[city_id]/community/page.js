"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { getQRCode } from "api";

import { Container, Paper, Typography, Box, Button } from "@mui/material";

import SendGAPageView from "components/DataLoaders/SendGAPageView";

import { imagesCdn } from "constants/constants";

const CityCommunityPage = () => {
  const auth = useSelector((state) => state.auth);
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [cityHasCommunity, setCityHasCommunity] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (auth.isAuthResolved && selectedCity) {
      getQRCode(selectedCity.city_id)
        .then((url) => setQrCodeUrl(url))
        .catch((_) => {
          setCityHasCommunity(false);
        });
    }
  }, [auth, selectedCity]);

  if (!auth.isAuthResolved)
    return (
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <Typography variant="h1" sx={{ my: 3 }}>
          Community
        </Typography>
        <SendGAPageView
          pageTitle="City Community Page"
          selectedCity={{
            city_name: selectedCity.name,
            city_id: selectedCity.city_id,
          }}
        />
        <Paper elevation={3} sx={{ padding: "20px" }}>
          <Typography
            variant="h5"
            gutterBottom
            align="center"
            sx={{ fontSize: 16 }}
          >
            Authenticate to Join Our Community
          </Typography>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => router.push("/login")}
              sx={{ fontSize: 16 }}
            >
              Go to Authentication
            </Button>
          </Box>
        </Paper>
      </Container>
    );

  if (!cityHasCommunity)
    return (
      <Container maxWidth="sm" sx={{ height: "100%", textAlign: "center" }}>
        <Typography variant="h1" sx={{ my: 3 }}>
          Community
        </Typography>
        <SendGAPageView pageTitle="City Community Page" />
        <Paper elevation={3} sx={{ padding: "20px", textAlign: "center" }}>
          <Typography variant="h4" gutterBottom sx={{ fontSize: 16 }}>
            Coming Soon
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 16 }}>
            The community for {selectedCity?.name} is in the works. Stay tuned!
          </Typography>
        </Paper>
      </Container>
    );

  if (!qrCodeUrl) return null;

  if (qrCodeUrl)
    return (
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <Typography variant="h1" sx={{ my: 3 }}>
          Community
        </Typography>
        <SendGAPageView pageTitle="City Community Page" />
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <img
            width="150"
            height="80"
            src={`${imagesCdn}/partner_logos/meetup.png`}
            alt="meetup icon"
            title="Meetup icon"
          />
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ fontSize: 16 }}
          >
            {`Join Our Community in ${selectedCity?.name}`}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: 16, my: 1, textAlign: "center" }}
            gutterBottom
          >
            New in town or looking to meet like-minded expats? Discover our
            community on Meetup!
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: 16, my: 1, textAlign: "center" }}
            gutterBottom
          >
            Meetup is a platform where people with shared interests come
            together to engage in social activities, learn new things, and make
            new friends. It's a fantastic way to connect with other expats in a
            relaxed and friendly environment.
          </Typography>
          <Button
            variant="contained"
            style={{
              width: "50%",
              alignSelf: "center",
              marginTop: 10,
              marginBottom: 20,
            }}
            onClick={() =>
              window.open(selectedCity.community_links.meetup_link)
            }
          >
            Join through link
          </Button>
        </Paper>
      </Container>
    );
};

export default CityCommunityPage;
