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

import GradingIcon from "@mui/icons-material/Grading";
import MapIcon from "@mui/icons-material/Map";
import SearchIcon from "@mui/icons-material/Search";

import { signOutUser } from "actions";

import MiniDrawer from "components/Navigation/Drawer";

import logo from "assets/img/icons/logo.png";

const pages = ["Search City", "Destinations Map", "New review"];
const settings = ["Account", "Logout"];

function NavBar({ outlet }) {
  const [isOpenUserMenu, setIsOpenUserMenu] = React.useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);

  const auth = useSelector((state) => state.auth);
  const isAuthResolved = useSelector((state) => state.auth.isAuthResolved);

  const theme = useTheme();
  const userSettingsRef = React.useRef(null);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isDestinationPage = pathname.includes("destination");
  const drawerType =
    isSmallScreen || !isDestinationPage ? "persistent" : "permanent";

  useEffect(() => {
    if (!location.pathname.includes("destination")) setIsOpenDrawer(false);
  }, [pathname]);

  const toggleUserMenu = () => {
    setIsOpenUserMenu(!isOpenUserMenu);
  };

  const handleCloseUserMenu = (setting) => {
    setIsOpenUserMenu(false);
    if (setting === "Logout") signOutUser(auth.id);
  };

  const handleChangeDrawer = (isOpen) => {
    setIsOpenDrawer(isOpen);
  };

  const handleClickNavMenu = (page) => {
    if (page === "New review") navigate("new-review");
    if (page === "Search City") navigate("search");
    if (page === "Destinations Map") navigate("map");
  };

  const clickedLogo = () => navigate("/");

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1000,
        }}
      >
        <Toolbar style={{ padding: 0, marginLeft: 20, marginRight: 20 }}>
          <IconButton
            sx={{
              display: { xs: "none", md: "flex" },
              mr: { xs: 1, sm: 2 },
              marginTop: 1,
            }}
            onClick={clickedLogo}
          >
            <img src={logo} alt="SityEx logo" width={90} height={25} />
          </IconButton>
          <Box sx={{ display: { xs: "flex", md: "flex" } }}>
            {isSmallScreen && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => handleChangeDrawer(!isOpenDrawer)}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
          <IconButton
            sx={{
              display: { xs: "flex", md: "none" },
              marginTop: 1,
              flexGrow: 1,
            }}
            onClick={clickedLogo}
          >
            <img src={logo} alt="SityEx logo" width={90} height={25} />
          </IconButton>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: { md: "space-evenly", lg: "center" },
            }}
          >
            {isAuthResolved &&
              pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleClickNavMenu(page)}
                  sx={{ my: 2, mx: 5, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
          </Box>
          {isAuthResolved && (
            <Box sx={{ marginLeft: "auto" }} ref={userSettingsRef}>
              <Tooltip title="Open settings" id="user-settings">
                <IconButton onClick={toggleUserMenu}>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px", zIndex: theme.zIndex.drawer + 1000 }}
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
        </Toolbar>
      </AppBar>
      <MiniDrawer
        isOpenDrawer={isOpenDrawer}
        handleChangeDrawer={handleChangeDrawer}
        drawer
        outlet={outlet}
        drawerType={drawerType}
      />
    </>
  );
}

export default NavBar;
