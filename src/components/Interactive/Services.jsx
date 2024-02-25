"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Grid, Typography, Card, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { imagesCdn } from "constants/constants";

const Services = () => {
  const theme = useTheme();
  const router = useRouter();

  const services = {
    paperwork: {
      id: "paperwork",
      icon: "paperwork-2.png",
      title: "Paperwork",
      onClick: () => router.push("/services/3117735/paperwork"),
      description:
        "Automatized processes through our local partners that do the paperwork for you",
    },
    housing: {
      id: "housing",
      icon: "housing-2.png",
      title: "Housing",
      onClick: () => router.push("/services/3117735/housing"),
      description:
        "Housing options and discounts through our partners to help you find your ideal home",
    },
    community: {
      id: "community",
      icon: "events-2.png",
      title: "Community",
      onClick: () => (window.location.hash = "#community"),
      description:
        "Thriving community of young expats to help you feel at home in Spain from day 1",
    },
  };

  return (
    <>
      <Box sx={{
          display: { xs: "flex", md: "none" },}}>
        <Box
          sx={{
            mt: 5,
            height: "20vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            px: 2,
          }}
        >
          {Object.values(services).map((service) => (
            <Box
              key={service.id}
              sx={{
                cursor: "pointer",
                mx: 1,
              }}
              onClick={service.onClick}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 1,
                  height: "fit-content",
                }}
              >
                <img
                  src={`${imagesCdn}/icons/${service.icon}`}
                  alt={`${service.title} icon`}
                  title={service.title}
                  style={{ height: "80px" }}
                />
              </Card>
              <Typography
                variant="h2"
                sx={{
                  color: "grey.500",
                  fontSize: 20,
                  mt: 2,
                  textAlign: "center",
                }}
              >
                {service.title}
              </Typography>
            </Box>
          ))}
        </Box>
        <Typography
          sx={{
            textAlign: "center",
            color: "grey.500",
            backgroundColor: "grey.100",
            fontSize: 18,
            mx: 2,
            borderRadius: 3,
            p: 2,
            mt: 2,
          }}
        >
          100% online services, we take care of everything for you
        </Typography>
      </Box>
      <Grid
        container
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "space-evenly",
          textAlign: "center",
          mt: 5,
        }}
      >
        {Object.values(services).map((service) => (
          <Grid
            key={service.id}
            item
            xs={4}
            md={3}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 3,
                width: "fit-content",
                margin: "auto",
                cursor: "pointer",
              }}
              onClick={service.onClick}
            >
              <img
                height="120"
                src={`${imagesCdn}/icons/${service.icon}`}
                alt={service.title}
                title={service.title}
              />
              <Typography
                variant="h2"
                sx={{ color: "grey.500", fontSize: 25, mt: 2 }}
              >
                {service.title}
              </Typography>
            </Card>
            <Typography
              sx={{
                color: "grey.500",
                backgroundColor: "grey.100",
                fontSize: 20,
                mt: 2,
                borderRadius: 3,
                p: 2,
              }}
            >
              {service.description}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Services;
