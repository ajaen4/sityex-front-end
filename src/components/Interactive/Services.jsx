"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Grid, Typography, Card, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { imagesCdn } from "constants/constants";

const Services = () => {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

  const services = {
    paperwork: {
      id: "paperwork",
      icon: "paperwork-2.png",
      title: "Paperwork",
      link: "/services/3117735/paperwork",
      description:
        "Automatized processes through our local partners that do the paperwork for you",
    },
    housing: {
      id: "housing",
      icon: "housing-2.png",
      title: "Housing",
      link: "/services/3117735/housing",
      description:
        "Housing options and discounts through our partners to help you find your ideal home",
    },
    community: {
      id: "community",
      link: "/services/3117735/community",
      icon: "events-2.png",
      title: "Community",
      description:
        "We have created a thriving community of expats to help you feel at home in Spain",
    },
  };

  if (isSmallScreen) {
    return (
      <Box>
        <Box
          sx={{
            overflow: "hidden",
            mt: { xs: 1, md: 5 },
            height: "23vh",
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
              onClick={() => router.push(service.link)}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 3,
                  height: "fit-content",
                }}
              >
                <img
                  src={`${imagesCdn}/icons/${service.icon}`}
                  alt={`${service.title} icon`}
                  title={service.title}
                  style={{ height: "50px" }}
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
      </Box>
    );
  } else {
    return (
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
              onClick={() => router.push(service.link)}
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
    );
  }
};

export default Services;
