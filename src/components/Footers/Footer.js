/*eslint-disable*/
import React from "react"
import { Container, Box, Typography, Link } from "@mui/material"

function Footer() {
  return (
    <Box component="footer" sx={{ 
      backgroundColor: 'grey.100',
      width: '100%'
    }}>
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
  )
}

export default Footer
