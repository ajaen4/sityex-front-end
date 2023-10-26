import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";

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

import { signOutUser } from "actions";

import logo from "assets/img/icons/big_logo_white.png";

import * as ROUTES_PATHS from "routes/paths";
import { pages, settings, minNavbarHeights } from "constants/constants.js";

function NavBar({ isOpenDrawer, setIsOpenDrawer }) {
  const [isOpenUserMenu, setIsOpenUserMenu] = React.useState(false);

  const auth = useSelector((state) => state.auth);
  const isAuthResolved = useSelector((state) => state.auth.isAuthResolved);

  const theme = useTheme();
  const userSettingsRef = React.useRef(null);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (!location.pathname.includes("destination")) {
      setIsOpenDrawer(false);
      return;
    }

    if (location.pathname.includes("destination") && !isSmallScreen) {
      setIsOpenDrawer(true);
      return;
    }
  }, [pathname]);

  const toggleUserMenu = () => {
    setIsOpenUserMenu(!isOpenUserMenu);
  };

  const handleCloseUserMenu = (setting) => {
    setIsOpenUserMenu(false);
    if (setting === "Logout") signOutUser(auth.data.id);
  };

  const handleClickNavMenu = (page) => {
    if (page === "Search City") navigate(ROUTES_PATHS.SEARCH);
    if (page === "Destinations Map") navigate(ROUTES_PATHS.MAP);
  };

  const clickedLogo = () => navigate(ROUTES_PATHS.ROOT);

  return (
    <>
      <AppBar
        sx={{
          zIndex: theme.zIndex.drawer + 1000
        }}
      >
        <Toolbar
          style={{
            padding: 0,
            marginLeft: 20,
            marginRight: 5
          }}
          sx={{
            minHeight: minNavbarHeights
          }}
        >
          <IconButton
            sx={{
              display: { xs: "none", md: "flex" },
              mr: { xs: 1, sm: 2 }
            }}
            onClick={clickedLogo}
          >
            <img src={logo} alt="SityEx logo" width={90} />
          </IconButton>
          <Box sx={{ display: { xs: "flex", md: "flex" } }}>
            {isSmallScreen && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => setIsOpenDrawer(!isOpenDrawer)}
                edge="start"
                sx={{ my: 0, py: 0 }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
          <IconButton
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              alignItems: "center",
              m: 0,
              mt: 1,
              p: 0
            }}
            onClick={clickedLogo}
          >
            <img src={logo} alt="SityEx logo" width={90} />
          </IconButton>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: { md: "space-evenly", lg: "center" }
            }}
          >
            {isAuthResolved &&
              pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleClickNavMenu(page)}
                  sx={{
                    mx: 5,
                    color: "white",
                    display: "block",
                    fontSize: "1.1em"
                  }}
                >
                  {page}
                </Button>
              ))}
          </Box>
          {isAuthResolved && (
            <Box sx={{ marginLeft: "auto" }} ref={userSettingsRef}>
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
                    src="https://i.pravatar.cc/150"
                    sx={{
                      m: 0,
                      p: 0
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "33px", zIndex: theme.zIndex.drawer + 1000 }}
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
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavBar;
