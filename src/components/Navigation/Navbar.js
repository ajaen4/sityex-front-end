import * as React from "react";
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

import MiniDrawer from "components/Navigation/Drawer";

import logo from "assets/img/icons/logo.png";

const pages = ["New review", "Search", "Map"];
const settings = ["Account", "Logout"];

const drawerWidth = 240;

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
    if (page === "Search") navigate("search");
    if (page === "Map") navigate("map");
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar style={{ padding: 0, marginLeft: 20, marginRight: 20 }}>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              mr: { xs: 1, sm: 2 },
              marginTop: 1,
            }}
          >
            <img src={logo} alt="SityEx logo" width={90} height={25} />
          </Box>
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
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              marginTop: 1,
              flexGrow: 1,
            }}
          >
            <img src={logo} alt="SityEx logo" width={90} height={25} />
          </Box>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 30 }}
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
                sx={{ mt: "45px" }}
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
