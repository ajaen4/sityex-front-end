/*eslint-disable*/
import React from "react"
import { Container, Box, Typography, Link } from "@mui/material"

function DefaultFooter() {
  return (
    <>
      <Box component="footer" className="footer footer-default" sx={{ backgroundColor: 'grey.100' }}>
        <Container>
          <nav>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li style={{ display: "inline", marginRight: "10px" }}>
                <Link href="#" target="_blank">
                  SITYEX
                </Link>
              </li>
              <li style={{ display: "inline", marginRight: "10px" }}>
                <Link href="#" target="_blank">
                  About Us
                </Link>
              </li>
              <li style={{ display: "inline", marginRight: "10px" }}>
                <Link href="#" target="_blank">
                  Blog
                </Link>
              </li>
            </ul>
          </nav>
          <div className="copyright" id="copyright">
            <Typography variant="body2">
              © {new Date().getFullYear()}, Designed by{" "}
              <Link href="#" target="_blank">
                SITYEX
              </Link>
              . Coded by{" "}
              <Link href="#" target="_blank">
                Alberto Jaen
              </Link>
              .
            </Typography>
          </div>
        </Container>
      </Box>
    </>
  )
}

export default DefaultFooter
