"use client";

import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { pages, settings } from "constants/constants.js";
import * as ROUTES_PATHS from "routes/paths";

const logo_white = "/big_logo_white.png";
const logo_blue = "/big_logo_blue.png";

function BigScreenNavBar({
  isOpaqueNavbar,
  handleCloseUserMenu,
  toggleSignUpModal,
}) {
  const auth = useSelector((state) => state.auth);
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);

  const theme = useTheme();
  const userSettingsRef = useRef(null);

  const toggleUserMenu = () => {
    setIsOpenUserMenu(!isOpenUserMenu);
  };

  const getPath = (page) => {
    if (page === "Services") return "/services/3117735/";
    if (page === "Blog") return ROUTES_PATHS.BLOG;
    if (page === "About Us") return ROUTES_PATHS.ABOUT_US;
  }

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1000,
          backgroundColor: isOpaqueNavbar ? "white" : "transparent",
          boxShadow: isOpaqueNavbar ? true : "none",
        }}
      >
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <IconButton
            sx={{
              mt: 0.5,
            }}
            href={ROUTES_PATHS.ROOT}
          >
            <img
              src={isOpaqueNavbar ? logo_blue : logo_white}
              alt="SityEx logo"
              title="SityEx logo"
              loading="eager"
              width="90"
              height="25"
            />
          </IconButton>
          <Box
            sx={{
              justifyContent: { md: "space-evenly", lg: "center" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                href={getPath(page)}
                sx={{
                  mx: 5,
                  color: isOpaqueNavbar ? "primary.main" : "white",
                  fontSize: "1.1em",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {auth.isAuthResolved && (
            <Box ref={userSettingsRef}>
              <Tooltip title="Open settings" id="user-settings">
                <IconButton
                  onClick={toggleUserMenu}
                  sx={{
                    m: 0,
                    p: 0,
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={`https://eu.ui-avatars.com/api/?name=${auth.data?.userName.replace(
                      " ",
                      "+",
                    )}&size=250`}
                    sx={{
                      m: 0,
                      p: 0,
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "40px", zIndex: theme.zIndex.drawer + 1000 }}
                id="menu-appbar"
                anchorEl={userSettingsRef.current}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                open={isOpenUserMenu}
                onClose={() => {
                  setIsOpenUserMenu(false);
                  handleCloseUserMenu();
                }}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      setIsOpenUserMenu(false);
                      handleCloseUserMenu(setting);
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          {!auth.isAuthResolved && (
            <Box>
              <Button
                variant="contained"
                color="secondary"
                onClick={toggleSignUpModal}
                sx={{ mr: 0 }}
              >
                Sign up
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default BigScreenNavBar;
