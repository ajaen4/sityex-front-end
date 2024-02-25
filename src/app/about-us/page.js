import React from "react";
import Image from "next/image";

import { Box, Typography, Grid } from "@mui/material";
import Footer from "components/Footers/Footer";

import { imagesCdn } from "constants/constants";

export const metadata = {
  title: "SityEx | About Us",
  description:
    "We are committed to making expat life easier. Our platform provides comprehensive services to help you navigate your new home, from finding housing to understanding any paperwork.",
  alternates: {
    canonical: "https://sityex.com/about-us",
  },
};

const AboutUs = () => {
  return (
    <div>
      <Grid container sx={{ alignItems: "center" }}>
        <Grid item xs={12} md={7} sx={{ p: { xs: 3, md: 5 } }}>
          <Typography variant="h4" fontSize={40}>
            From one expat to another ;)
          </Typography>
          <Typography variant="body1" fontSize={18} sx={{ mt: 3 }}>
            My name is Alberto. Inspired by my challenging experiences with
            finding a place to live and navigating the required paperwork in
            Sweden and Italy, I founded SityEx. I believed in the necessity of a
            simple, single platform to assist expats in settling in.
          </Typography>
          <Typography variant="body1" fontSize={18} sx={{ mt: 3 }}>
            I envision a world where everyone has the freedom to live in any
            city they choose. That&apos;s why SityEx was created—to make
            settling into a new place simpler and more accessible for everyone.
            Together, let&apos;s make this journey a shared success.
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            display: "flex",
            justifyContent: "center",
            p: { xs: 3, md: 5 },
          }}
        >
          <Image
            alt="profile"
            height="440"
            width="350"
            src={`${imagesCdn}/profile/profile.jpg`}
          />
        </Grid>
      </Grid>
      <Grid container sx={{ alignItems: "center" }}>
        <Grid
          item
          xs={12}
          sx={{
            textAlign: "center",
          }}
        >
          <Box sx={{ p: { xs: 3, md: 5 } }}>
            <Typography variant="h4" fontSize={40} sx={{ my: 1 }}>
              Our mission
            </Typography>
            <Typography
              variant="body1"
              fontSize={18}
              sx={{ my: 1, px: { md: 20 } }}
            >
              To create a digital platform that offers 100% online services,
              making the process of settling into any city seamless and
              immediate. We leverage technology while preserving a human touch
              through our community.
            </Typography>
          </Box>
          <Grid container>
            <Grid item xs={12} md={6} sx={{ p: { xs: 3, md: 5 } }}>
              <Box
                sx={{
                  textAlign: "left",
                  mt: { md: 5 },
                }}
              >
                <Typography variant="h4" fontSize={25}>
                  Community
                </Typography>
                <Typography variant="body1" fontSize={18} sx={{ mt: 1 }}>
                  At the core of SityEx is our commitment to building a strong
                  community. We understand that while our platform leverages
                  technology, it&apos;s the human connections that truly make a
                  new city feel like home.
                </Typography>
              </Box>
              <Box
                sx={{
                  textAlign: "left",
                  mt: 5,
                }}
              >
                <Typography variant="h4" fontSize={25} sx={{ mt: 1 }}>
                  Online Services
                </Typography>
                <Typography variant="body1" fontSize={18} sx={{ mt: 1 }}>
                  SityEx&apos;s foundation is built on providing online
                  services, designed to streamline the relocation process. Our
                  platform harnesses technology to offer comprehensive,
                  user-friendly solutions that make moving to a new city as
                  seamless as possible.
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                m: 3,
                height: { xs: 350, md: 400 },
                backgroundImage: `url(${imagesCdn}/background/values.webp)`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </div>
  );
};

export default AboutUs;
