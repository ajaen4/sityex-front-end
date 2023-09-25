import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";

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

const pages = ["New review", "Destinations"];
const settings = ["Profile", "Account", "Logout"];

const drawerWidth = 240;

function NavBar({ auth, isAuthResolved, outlet }) {
  const [isOpenUserMenu, setIsOpenUserMenu] = React.useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const theme = useTheme();
  const userSettingsRef = React.useRef(null);

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
    if (page === "Destinations") navigate("home");
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(isOpenDrawer && {
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
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
            {
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => handleChangeDrawer(true)}
                edge="start"
                sx={{
                  ...(isOpenDrawer && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
            }
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
        outlet={outlet}
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.data,
    isAuthResolved: state.auth.isAuthResolved,
  };
};

export default connect(mapStateToProps)(NavBar);
