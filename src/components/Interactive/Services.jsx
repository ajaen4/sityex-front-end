"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Grid, Typography, Card, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { imagesCdn } from "constants/constants";

const Services = () => {
  const [activeService, setActiveService] = useState("paperwork");

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
      position: "7.5%",
    },
    housing: {
      id: "housing",
      icon: "housing-2.png",
      title: "Housing",
      link: "/services/3117735/housing",
      description:
        "Housing options and discounts through our partners to help you find your ideal home",
      position: "35%",
    },
    community: {
      id: "community",
      link: "/services/3117735/community",
      icon: "events-2.png",
      title: "community",
      description:
        "We have created a thriving community of expats to help you feel at home in Spain",
      position: "57.5%",
    },
  };

  const handleServiceClick = (serviceId) => {
    setActiveService(serviceId);
  };

  if (isSmallScreen) {
    return (
      <Box>
        <Box
          sx={{
            overflow: "hidden",
            position: "relative",
            mt: 5,
            height: "25vh",
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
                position: "absolute",
                left: service.position,
                transition: "all 0.3s ease",
                width: activeService === service.id ? "35%" : "30%",
                zIndex: activeService === service.id ? 2 : 1,
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
              onClick={() => handleServiceClick(service.id)}
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
                  style={{ height: "80px" }}
                />
                {activeService === service.id && (
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
                )}
              </Card>
            </Box>
          ))}
        </Box>

        <Box sx={{ minHeight: 98, px: 3 }}>
          {activeService && (
            <Typography
              sx={{
                color: "grey.500",
                backgroundColor: "grey.100",
                fontSize: 16,
                borderRadius: 3,
                p: 2,
              }}
            >
              {services[activeService].description}
            </Typography>
          )}
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
