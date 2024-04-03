import React from "react";

import { Box, Typography, Button } from "@mui/material";
import Footer from "components/Footers/Footer";

import { imagesCdn } from "constants/constants";

export const metadata = {
  title: "SityEx | Contact",
  description: "Get in contact with a member of our Community.",
  alternates: {
    canonical: "https://sityex.com/contact",
  },
};

const AboutUs = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        fontSize={35}
        sx={{ mt: 5, color: "grey.500", textAlign: "center" }}
      >
        Members that can help you
      </Typography>
      <Typography
        fontSize={18}
        sx={{ mt: 2, color: "grey.500", textAlign: "center" }}
      >
        You can talk to a member of our Community!
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          width: { xs: "100%", md: "80%" },
          my: 3,
        }}
      >
        <Box
          sx={{
            marginRight: { xs: 2, md: 5 },
            width: { xs: "55%", md: "50%" },
          }}
        >
          <img
            src={`${imagesCdn}/team_members/lorena.jpeg`}
            alt="lorena"
            title="lorena"
            style={{ width: "100%" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "start" },
            justifyContent: "center",
          }}
        >
          <Typography
            fontSize={18}
            sx={{
              width: { xs: "80%", md: "100%" },
              textAlign: { xs: "center", md: "start" },
              mt: { xs: 3, md: 0 },
            }}
          >
            Hey! I&apos;m a Brazilian living in Spain since 2023 :) If you have
            any questions about getting a visa to come to Spain or getting
            housing in Madrid, I can help! You can contact me via mail{" "}
            <b style={{ color: "#673ab7" }}>lorena.barbosa@sityex.com</b> or
            WhatsApp.
          </Typography>
          <Typography
            fontSize={18}
            sx={{
              width: { xs: "80%", md: "100%" },
              textAlign: { xs: "center", md: "start" },
              mt: 3,
            }}
          >
            <b>SityEx Co-Founder</b>
          </Typography>
          <Box>
            <a
              href="https://wa.me/34663467459"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                backgroundColor: "#00e676",
                color: "white",
                padding: "6px 16px",
                fontWeight: "500",
                lineHeight: "1.75",
                borderRadius: "4px",
                textDecoration: "none",
                marginTop: 30,
                boxShadow:
                  "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
              }}
            >
              WhatsApp Lorena
            </a>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          width: { xs: "100%", md: "80%" },
          my: 3,
        }}
      >
        <Box
          sx={{
            marginRight: { xs: 2, md: 5 },
            width: { xs: "55%", md: "57%" },
          }}
        >
          <img
            src={`${imagesCdn}/team_members/alberto.jpeg`}
            alt="alberto"
            title="alberto"
            style={{ width: "100%" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "start" },
            justifyContent: "center",
          }}
        >
          <Typography
            fontSize={18}
            sx={{
              width: { xs: "80%", md: "100%" },
              textAlign: { xs: "center", md: "start" },
              mt: { xs: 3, md: 0 },
            }}
          >
            Hello! I am a Spaniard with experience living in Italy and Sweden. I
            can help you with navigating the bureaucracy necessary to live in
            Spain. I also have great tips for things to do in Madrid ;) You can
            contact me via mail{" "}
            <b style={{ color: "#673ab7" }}>albertojaen@sityex.com</b> or
            WhatsApp.
          </Typography>
          <Typography
            fontSize={18}
            sx={{
              width: { xs: "80%", md: "100%" },
              textAlign: { xs: "center", md: "start" },
              mt: 3,
            }}
          >
            <b>SityEx Co-Founder</b>
          </Typography>
          <Box>
            <a
              href="https://wa.me/650611057"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                backgroundColor: "#00e676",
                color: "white",
                padding: "6px 16px",
                fontWeight: "500",
                lineHeight: "1.75",
                borderRadius: "4px",
                textDecoration: "none",
                marginTop: 30,
                boxShadow:
                  "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
              }}
            >
              WhatsApp Alberto
            </a>
          </Box>
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default AboutUs;
