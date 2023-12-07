import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logAnalyticsEvent, getQRCode } from "api";

import { Container, Paper, Typography, Box, Button } from "@mui/material";
import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";

const CityCommunityPage = () => {
  const auth = useSelector((state) => state.auth);
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [cityHasCommunity, setCityHasCommunity] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    logAnalyticsEvent("page_view", {
      page_title: "City Community Page",
      page_location: window.location.href,
      city_name: selectedCity?.name
    });
  }, [selectedCity?.name]);

  useEffect(() => {
    if (auth?.isAuthResolved && selectedCity) {
      getQRCode(selectedCity.city_id)
        .then((url) => setQrCodeUrl(url))
        .catch((error) => {
          console.error("Error fetching QR code", error);
          setCityHasCommunity(false);
        });
    }
  }, [auth, selectedCity]);

  if (!auth?.isAuthResolved)
    return (
      <Container maxWidth="sm">
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
              onClick={() => navigate("/login")}
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
      <Container maxWidth="sm">
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

  if (!qrCodeUrl) return <CenteredLoadingSpinner />;

  if (qrCodeUrl)
    return (
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "20px"
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ fontSize: 16 }}
          >
            {`Join Our Community in ${selectedCity?.name}`}
          </Typography>
          <Button
            variant="contained"
            style={{
              width: "50%",
              alignSelf: "center",
              marginTop: 10,
              marginBottom: 20
            }}
            onClick={() => window.open(selectedCity.whatsapp_link)}
          >
            Join through link
          </Button>
          <Typography
            variant="body1"
            gutterBottom
            align="center"
            sx={{ fontSize: 16 }}
          >
            {`Scan the QR code below to join our WhatsApp community and connect with
            expats in ${selectedCity?.name}.`}
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            my={2}
          >
            <img
              src={qrCodeUrl}
              alt="WhatsApp Community QR Code"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Box>
        </Paper>
      </Container>
    );
};

export default CityCommunityPage;
