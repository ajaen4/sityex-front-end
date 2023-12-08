import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";

import { ScrollContext } from "components/Contexts/ScrollContext";

import { signOutUser } from "actions";

import logo_white from "assets/img/icons/big_logo_white.png";
import logo_blue from "assets/img/icons/big_logo_blue.png";

import * as ROUTES_PATHS from "routes/paths";
import { pages, settings, minNavbarHeights } from "constants/constants.js";

function NavBar({ isOpenDrawer, setIsOpenDrawer }) {
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);
  const [hasScrolled100vh, setHasScrolled100vh] = useState(false);

  const auth = useSelector((state) => state.auth);

  const scrollRef = useContext(ScrollContext);

  const theme = useTheme();
  const userSettingsRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isLandingPage = pathname.split("/").every((str) => str === "");
  const isOpaqueNavbar = !isLandingPage || hasScrolled100vh;

  const toggleUserMenu = () => {
    setIsOpenUserMenu(!isOpenUserMenu);
  };

  const handleCloseUserMenu = (setting) => {
    setIsOpenUserMenu(false);
    if (setting === "Logout") signOutUser(auth.data.id);
  };

  const handleClickNavMenu = (page) => {
    if (page === "Search City") navigate(ROUTES_PATHS.SEARCH);
    if (page === "Blog") window.location.href = ROUTES_PATHS.BLOG;
  };

  const clickedLogo = () => navigate(ROUTES_PATHS.ROOT);

  useEffect(() => {
    if (!scrollRef?.current) return;

    const handleScroll = () => {
      if (!scrollRef.current) return;

      const currentScrollPos = scrollRef.current.scrollTop;
      const viewportHeight = window.innerHeight;
      setHasScrolled100vh(currentScrollPos > viewportHeight);
    };

    scrollRef.current.addEventListener("scroll", handleScroll);

    return () => {
      if (scrollRef.current)
        scrollRef.current.removeEventListener("scroll", handleScroll);
    };
  }, [scrollRef]);

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: theme.zIndex.drawer + 1000,
        backgroundColor: isOpaqueNavbar ? "white" : "transparent",
        boxShadow: isOpaqueNavbar ? true : "none"
      }}
    >
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between"
        }}
        sx={{
          minHeight: minNavbarHeights,
          pr: 1
        }}
      >
        <IconButton
          sx={{
            display: { xs: "none", md: "flex" },
            mt: 0.5
          }}
          onClick={clickedLogo}
        >
          <img
            src={isOpaqueNavbar ? logo_blue : logo_white}
            alt="SityEx logo"
            title="SityEx logo"
            loading="eager"
            width="90"
            height="30"
          />
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => setIsOpenDrawer(!isOpenDrawer)}
          edge="start"
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <MenuIcon sx={{ color: isOpaqueNavbar ? "primary.main" : "white" }} />
        </IconButton>
        <IconButton
          sx={{
            display: { xs: "flex", md: "none" },
            mt: 1,
            cursor: "pointer"
          }}
          onClick={clickedLogo}
        >
          <img
            src={isOpaqueNavbar ? logo_blue : logo_white}
            alt="SityEx logo"
            title="SityEx logo"
            loading="eager"
            width="90"
            height="30"
          />
        </IconButton>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: { md: "space-evenly", lg: "center" }
          }}
        >
          {pages.map((page) => (
            <Button
              key={page}
              onClick={() => handleClickNavMenu(page)}
              sx={{
                mx: 5,
                color: isOpaqueNavbar ? "primary.main" : "white",
                display: "block",
                fontSize: "1.1em"
              }}
            >
              {page}
            </Button>
          ))}
        </Box>
        {auth?.isAuthResolved && (
          <Box ref={userSettingsRef}>
            <Tooltip title="Open settings" id="user-settings">
              <IconButton
                onClick={toggleUserMenu}
                sx={{
                  m: 0,
                  p: 0
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={`https://eu.ui-avatars.com/api/?name=${auth.data.userName.replace(
                    " ",
                    "+"
                  )}&size=250`}
                  sx={{
                    m: 0,
                    p: 0
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
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
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
        {!auth?.isAuthResolved && (
          <Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate(ROUTES_PATHS.SIGN_UP)}
              sx={{ mr: 0 }}
            >
              Sign up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
