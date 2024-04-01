import React from "react";
import Link from "next/link";

import { Grid, Typography, Card, Box } from "@mui/material";

import { imagesCdn } from "constants/constants";

const services = {
  paperwork: {
    id: "paperwork",
    icon: "paperwork-2.png",
    title: "Paperwork",
    link: "/services/3117735/paperwork",
    description:
      "Online processes through our local partners that do the paperwork for you",
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
    icon: "events-2.png",
    title: "Community",
    link: "/services/3117735/community",
    description:
      "Thriving community of young expats to help you feel at home in Madrid from day one",
  },
};

const Services = () => {
  return (
    <>
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          flexDirection: "column",
        }}
      >
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
                mx: 0.8,
              }}
            >
              <Link
                key={service.id}
                href={service.link}
                passHref
                style={{ textDecoration: "none" }}
              >
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 0.8,
                    height: "fit-content",
                  }}
                >
                  <img
                    src={`${imagesCdn}/icons/${service.icon}`}
                    alt={`${service.title} icon`}
                    title={service.title}
                    style={{ height: "75px" }}
                  />
                </Card>
              </Link>
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
          Paperwork, Housing and Community all in one single digital platform.
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
            <Link
              href={service.link}
              passHref
              style={{ textDecoration: "none" }}
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
            </Link>
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
