import React from "react";

import { Box, Typography, Grid, Button } from "@mui/material";
import HousingSlides from "components/Slides/HousingSlides";
import CommunitySlides from "components/Slides/CommunitySlides";
import PaperworkSlides from "components/Slides/PaperworkSlides";
import Footer from "components/Footers/Footer";
import Services from "components/Interactive/Services";

import { imagesCdn } from "constants/constants";
import * as ROUTES_PATHS from "routes/paths";

export const metadata = {
  title: "SityEx | One-stop platform for young expats",
  description:
    "One-stop platform for all expat needs in Madrid. We focus on housing and paperwork services with a vibrant community at its base.",
  alternates: {
    canonical: "https://sityex.com/",
  },
};

const LandingPage = () => {
  return (
    <Grid container sx={{ alignItems: "center" }}>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h2"
            sx={{ color: "grey.500", fontSize: 35, px: 3 }}
          >
            One-stop platform for young expats
          </Typography>
          <Typography variant="h5" sx={{ fontSize: 20, px: 3, mt: 1 }}>
            All relocation needs, in one place
          </Typography>
        </Box>
        <Services />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "start",
          px: 3,
          mt: 5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <img
            width="25"
            height="25"
            src={`${imagesCdn}/icons/paperclip.png`}
            alt="choose-paperwork"
            title="Choose Paperwork"
            style={{ marginRight: 10 }}
          />
          <Typography variant="h2" sx={{ color: "grey.500", fontSize: 25 }}>
            Need help with your paperwork?
          </Typography>
        </Box>
        <PaperworkSlides />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "start",
          px: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <img
            width="25"
            height="25"
            src={`${imagesCdn}/icons/house-door-fill.png`}
            alt="housing-icon"
            title="Housing"
            style={{ marginRight: 10 }}
          />
          <Typography variant="h2" sx={{ color: "grey.500", fontSize: 25 }}>
            Housing
          </Typography>
        </Box>
        <HousingSlides />
      </Grid>
      <Grid
        item
        id="community"
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "start",
          px: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
          }}
        >
          <img
            width="25"
            height="25"
            src={`${imagesCdn}/icons/sunglasses.png`}
            alt="housing-icon"
            title="Housing"
            style={{ marginRight: 10 }}
          />
          <Typography variant="h2" sx={{ color: "grey.500", fontSize: 25 }}>
            Community
          </Typography>
        </Box>
        <CommunitySlides />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "start",
          px: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="h2"
            sx={{ color: "grey.500", fontSize: 35, mt: 3, textAlign: "center" }}
          >
            🤔 Have some questions?
          </Typography>
          <Typography sx={{ fontSize: 18, my: 2, textAlign: "center" }}>
            You can talk to a member of our Community!
          </Typography>
        </Box>
        <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
          <Box
            sx={{
              marginRight: { xs: 2, md: 5 },
              width: { xs: "55%", md: "24.5%" },
            }}
          >
            <img
              src={`${imagesCdn}/team_members/lorena.jpeg`}
              alt="lorena"
              title="lorena"
              style={{ width: "100%" }}
            />
          </Box>
          <Box sx={{ width: { xs: "45%", md: "20%" } }}>
            <img
              src={`${imagesCdn}/team_members/alberto.jpeg`}
              alt="alberto"
              title="alberto"
              style={{ width: "100%" }}
            />
          </Box>
        </Box>
        <Typography
          sx={{
            fontSize: 18,
            mt: 3,
            textAlign: "center",
            width: { xs: "100%", md: "50%" },
          }}
        >
          Our community includes{" "}
          <b style={{ color: "#673ab7" }}>expats and locals</b> who are experts
          in Madrid life.
        </Typography>
        <Typography
          sx={{
            fontSize: 18,
            my: 1,
            textAlign: "center",
            width: { xs: "100%", md: "50%" },
          }}
        >
          Whether you are curious about neighborhoods, or practical tips for
          your relocation, our team is here to help. Feel free to reach out and
          start a conversation!
        </Typography>
        <Button variant="contained" sx={{ my: 2 }} href={ROUTES_PATHS.CONTACT}>
          Talk to an expert
        </Button>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "start",
          px: 3,
          pb: 10,
          pt: 2,
          mt: 2,
          backgroundColor: "grey.100",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "start",
          }}
        >
          <Typography
            variant="h2"
            sx={{ color: "grey.500", mb: 2, fontSize: 35 }}
          >
            How it works
          </Typography>
          <Typography
            sx={{
              fontSize: 22,
              width: "100%",
            }}
          >
            We establish partnerships with local experts specializing in various
            aspects of the expat journey, offering our members exclusive
            integrations and discounts.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: "row",
              flexWrap: "wrap",
              mt: 5,
            }}
          >
            <a href="/services/3117735/paperwork">
              <img
                width="200"
                height="50"
                src={`${imagesCdn}/partner_logos/entretramites.webp`}
                alt="entretramites icon"
                title="Entre Tramites"
                style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}
              />
            </a>
            <a
              href="https://taxdown.es/landings_partners/sityex/?utm_source=empleados&utm_medium=partnership&utm_campaign=empleados_partnership"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                width="200"
                height="40"
                src={`${imagesCdn}/partner_logos/taxdown.png`}
                alt="taxdown icon"
                title="Taxdown"
                style={{ marginTop: 30, marginLeft: 20, marginRight: 20 }}
              />
            </a>
            <a href="/services/3117735/housing">
              <img
                width="140"
                height="45"
                src={`${imagesCdn}/partner_logos/housing_anywhere.png`}
                alt="housinganywhere icon"
                title="HousingAnywhere"
                style={{ marginTop: 30, marginLeft: 10, marginRight: 10 }}
              />
            </a>
            <a href="/services/3117735/housing?tab=discounts">
              <img
                width="80"
                height="100"
                src={`${imagesCdn}/partner_logos/spotahome.png`}
                alt="spotahome icon"
                title="Spotahome"
                style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}
              />
            </a>
            <a href="/services/3117735/housing">
              <img
                width="180"
                height="35"
                src={`${imagesCdn}/partner_logos/uniplaces.png`}
                alt="uniplaces icon"
                title="Uniplaces"
                style={{ marginTop: 30, marginLeft: 10, marginRight: 10 }}
              />
            </a>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default LandingPage;
