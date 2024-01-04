"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

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
import MenuIcon from "@mui/icons-material/Menu";

import { signOutUser } from "actions";
import { useDrawerContext } from "components/Contexts/DrawerContext";

import * as ROUTES_PATHS from "routes/paths";
import { pages, settings } from "constants/constants.js";

const logo_white = "/big_logo_white.png";
const logo_blue = "/big_logo_blue.png";

function NavBar({}) {
  const { isOpenDrawer, setIsOpenDrawer } = useDrawerContext();
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);
  const [scrolledY, setScrolledY] = useState(0);

  const auth = useSelector((state) => state.auth);

  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const userSettingsRef = useRef(null);

  const isLandingPage = pathname.split("/").every((str) => str === "");
  const isBlogPage =
    pathname.split("/")[pathname.split("/").length - 1] === "blog";
  const isOpaqueNavbar =
    (!isLandingPage && !isBlogPage) ||
    (isLandingPage && scrolledY > 750) ||
    (isBlogPage && scrolledY > 400);

  const toggleUserMenu = () => {
    setIsOpenUserMenu(!isOpenUserMenu);
  };

  const handleCloseUserMenu = (setting) => {
    setIsOpenUserMenu(false);
    if (setting === "Account") router.push(ROUTES_PATHS.ACCOUNT);
    if (setting === "Logout") signOutUser(auth.data.id);
  };

  const handleClickNavMenu = (page) => {
    if (page === "Search City") router.push(ROUTES_PATHS.SEARCH);
    if (page === "Blog") router.push(ROUTES_PATHS.BLOG);
  };

  const clickedLogo = () => router.push(ROUTES_PATHS.ROOT);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolledY(scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: theme.zIndex.drawer + 1000,
        backgroundColor: isOpaqueNavbar ? "white" : "transparent",
        boxShadow: isOpaqueNavbar ? true : "none",
      }}
    >
      <Box
        sx={{
          display: { xs: "flex", md: "None" },
          width: "100%",
        }}
      >
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            paddingRight: 7,
          }}
        >
          <Box sx={{ width: "33%", justifyContent: "start" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setIsOpenDrawer(!isOpenDrawer)}
              edge="start"
            >
              <MenuIcon
                sx={{
                  color: isOpaqueNavbar ? "primary.main" : "white",
                }}
              />
            </IconButton>
          </Box>
          <Box sx={{ width: "33%", justifyContent: "center" }}>
            <IconButton
              sx={{
                mt: 1,
                cursor: "pointer",
              }}
              onClick={clickedLogo}
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
          </Box>
          <Box sx={{ display: "flex", width: "34%", justifyContent: "end" }}>
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
                  onClose={() => handleCloseUserMenu()}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleCloseUserMenu(setting)}
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
                  onClick={() => router.push(ROUTES_PATHS.SIGN_UP)}
                  sx={{ mr: 0 }}
                >
                  Sign up
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Box>
      <Box sx={{ display: { xs: "None", md: "flex", lg: "flex" } }}>
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
            onClick={clickedLogo}
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
                onClick={() => handleClickNavMenu(page)}
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
                onClose={() => handleCloseUserMenu()}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
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
                onClick={() => router.push(ROUTES_PATHS.SIGN_UP)}
                sx={{ mr: 0 }}
              >
                Sign up
              </Button>
            </Box>
          )}
        </Toolbar>
      </Box>
    </AppBar>
  );
}

export default NavBar;
