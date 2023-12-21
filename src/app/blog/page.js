import React, { Suspense } from "react";

import { Box, Grid, Typography } from "@mui/material";

import BlogSlides from "components/Slides/BlogSlides";
import LoadingSpinner from "components/Spinner/LoadingSpinner";
import { imagesCdn } from "constants/constants";

export const metadata = {
  title: "SityEx | Blog",
  description:
    "Read our blog posts to learn more about how to secure housing, easy handling of government bureaucracy and all about your new home city.",
  alternates: {
    canonical: "https://sityex.com/blog",
  },
};

const BlogPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        textAlign: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: "60vh",
          justifyContent: "center",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url(${imagesCdn}/blog.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          alignItems: "end",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            borderRadius: 2,
            p: 2,
            mb: 2,
            mx: 3,
          }}
        >
          <Typography variant="h1" color="white" fontSize={60} sx={{ mb: 2 }}>
            SityEx Blog
          </Typography>
          <Typography color="white" fontSize={20}>
            All you need to know about your new home city
          </Typography>
        </Box>
      </Box>
      <Grid
        container
        spacing={1}
        sx={{ justifyContent: "space-evenly", my: 2 }}
      >
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: 3,
            }}
          >
            <img
              width="80"
              height="80"
              src={`${imagesCdn}/icons/house.png`}
              loading="eager"
              alt="housing icon"
              title="Housing"
            />
            <Typography
              color="grey900"
              sx={{ fontSize: 16, mt: 2, width: "80%" }}
            >
              All you need to know about how to secure housing
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: 3,
            }}
          >
            <img
              width="80"
              height="80"
              src={`${imagesCdn}/icons/government.png`}
              loading="eager"
              alt="government icon"
              title="Government Bureaucracy"
            />
            <Typography
              color="grey900"
              sx={{ fontSize: 16, mt: 2, width: "80%" }}
            >
              Detailed guides on every government bureaucracy
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: 3,
            }}
          >
            <img
              width="80"
              height="80"
              src={`${imagesCdn}/icons/cities.png`}
              loading="eager"
              alt="city icon"
              title="City Guide"
            />
            <Typography
              color="grey900"
              sx={{ fontSize: 16, mt: 2, width: "80%" }}
            >
              Get to know your new city like a local
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Typography variant="h2" sx={{ color: "grey.500", my: 3, fontSize: 40 }}>
        Latest Blogs
      </Typography>
      <Box>
        <Suspense fallback={<LoadingSpinner />}>
          <BlogSlides is_latest={true} />
        </Suspense>
      </Box>
      <Typography variant="h2" sx={{ color: "grey.500", my: 3, fontSize: 40 }}>
        Other Blogs
      </Typography>
      <Box>
        <Suspense fallback={<LoadingSpinner />}>
          <BlogSlides is_latest={false} />
        </Suspense>
      </Box>
    </Box>
  );
};

export default BlogPage;
