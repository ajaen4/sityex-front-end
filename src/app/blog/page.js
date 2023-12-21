import React from "react";
import Link from "next/link";

import {
  Box,
  Grid,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";

import { imagesCdn } from "constants/constants";

export const metadata = {
  title: "SityEx | Blog",
  description:
    "Read our blog posts to learn more about how to secure housing, easy handling of government bureaucracy and all about your new home city.",
  alternates: {
    canonical: "https://www.sityex.com/blog",
  },
};

const BlogPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: "60vh",
          justifyContent: "center",
          backgroundImage: `url(${imagesCdn}/blog.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          alignItems: "end",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
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
            In detail content about all you need to know about your new home
            city
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
              src={`${imagesCdn}/icons/party.png`}
              loading="eager"
              alt="events icon"
              title="Events"
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
      <Typography variant="h2" sx={{ color: "grey.500", mt: 3, fontSize: 40 }}>
        Blogs
      </Typography>
      <Grid
        container
        spacing={1}
        sx={{ justifyContent: "space-evenly", my: 5 }}
      >
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: 2,
          }}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={`${imagesCdn}/blogs/nie.png`}
              title="NIE blog"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Unlocking Spain: Your Complete Guide to Getting a NIE/TIE
                hassle-free
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Understanding the NIE is the first step in making Spain your
                home. It's more than just a number; it's your key to numerous
                activities, from opening a bank account to signing a lease.
              </Typography>
            </CardContent>
            <CardActions>
              <Link href="/blog/nie">Read publication</Link>
            </CardActions>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: 2,
          }}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={`${imagesCdn}/blogs/empadronamiento.png`}
              title="Empadronamiento blog"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Claim Your Spanish Address: A Step-by-Step Empadronamiento Guide
              </Typography>
              <Typography variant="body2" color="text.secondary">
                The certificado de empadronamiento is a document that registers
                where you live in Spain and with whom. The Spanish law requires
                all nationals and expat residents who live more than 6 months in
                Spain to register at the city hall.
              </Typography>
            </CardContent>
            <CardActions>
              <Link href="/blog/empadronamiento">Read publication</Link>
            </CardActions>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: 2,
          }}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={`${imagesCdn}/blogs/social_security.png`}
              title="Social Security blog"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Obtaining your Social Security Number
              </Typography>
              <Typography variant="body2" color="text.secondary">
                The Spanish Social Security Number is a crucial requirement for
                living and working in Spain. It’s used to access the healthcare
                system, pay taxes, and, importantly, for employment purposes.
              </Typography>
            </CardContent>
            <CardActions>
              <Link href="/blog/social-security">Read publication</Link>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BlogPage;
