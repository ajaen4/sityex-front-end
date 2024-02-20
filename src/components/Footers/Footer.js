import React from "react";
import { Box, Typography, Link, Grid } from "@mui/material";

import { imagesCdn } from "constants/constants";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "grey.900",
        width: "100%",
      }}
    >
      <Grid container>
        <Grid item xs={12} md={5} sx={{ p: 3 }}>
          <img
            width="200"
            height="50"
            src={`${imagesCdn}/logos/big_logo_white.png`}
            alt="entretramites icon"
            title="Entre Tramites"
          />
          <Typography sx={{ color: "white" }}>
            One-stop platform for all expat needs in Madrid. We focus on housing
            and paperwork services with a vibrant community at its base.
          </Typography>
        </Grid>
        <Grid item xs={12} md={7} sx={{ display: "flex", p: 3 }}>
          <Box>
            <Typography variant="h3" sx={{ color: "white" }}>
              SityEx
            </Typography>
            <nav>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li style={{ marginTop: 10 }}>
                  <Link
                    href="/search"
                    sx={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    Services
                  </Link>
                </li>
                <li
                  style={{
                    marginTop: 5,
                  }}
                >
                  <Link
                    href="/blog"
                    sx={{ textDecoration: "none", color: "white" }}
                  >
                    Blog
                  </Link>
                </li>
                <li
                  style={{
                    marginTop: 5,
                  }}
                >
                  <Link
                    href="/about-us"
                    sx={{ textDecoration: "none", color: "white" }}
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </nav>
          </Box>
          <Box sx={{ ml: { xs: 5, md: 10 } }}>
            <Typography variant="h3" sx={{ color: "white" }}>
              Community
            </Typography>
            <nav>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li style={{ marginTop: 10 }}>
                  <Link
                    href="https://www.meetup.com/sityex-madrid-community-expats/events/298583420/"
                    target="_blank"
                    sx={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    Madrid
                  </Link>
                </li>
              </ul>
            </nav>
          </Box>
          <Box sx={{ ml: { xs: 5, md: 10 } }}>
            <Typography variant="h3" sx={{ color: "white" }}>
              Social
            </Typography>
            <nav>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li style={{ marginTop: 10 }}>
                  <Link
                    href="https://www.instagram.com/sityex.official/"
                    target="_blank"
                    sx={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    Instagram
                  </Link>
                </li>
                <li style={{ marginTop: 10 }}>
                  <Link
                    href="https://www.linkedin.com/company/sityex/"
                    target="_blank"
                    sx={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </nav>
          </Box>
        </Grid>
        <Grid item xs={12} md={5} sx={{ px: 3, pb: 1 }}>
          <Typography variant="body2" sx={{ color: "white", mt: 2, mb: 1 }}>
            © {new Date().getFullYear()} SityEx, all rights reserved
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;
