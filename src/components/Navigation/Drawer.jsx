import * as React from "react";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import { Drawer as MUIDrawer } from "@mui/material";
import Divider from "@mui/material/Divider";
import Toolbar from '@mui/material/Toolbar';

import MainItems from "components/DrawerItems/MainItems";
import CityItems from "components/DrawerItems/CityItems";

import { drawerWidth } from "constants/constants";

export default function Drawer(props) {

  const { window } = props;
  const selectedCity = useSelector((state) => state.selectedCity.data);

  const handleDrawerToggle = () => {
    props.setIsOpenDrawer(!props.isOpenDrawer);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
        component="nav"
        sx={{ width: props.isOpenDrawer ? { sm: drawerWidth } : 0, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <MUIDrawer
          container={container}
          variant="temporary"
          open={props.isOpenDrawer}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        > 
          <Toolbar />
          <Divider sx={{mt: 3}}>Navigation</Divider>
          <MainItems />
        </MUIDrawer>
        <MUIDrawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.isOpenDrawer ? drawerWidth : 0 },
            width: props.isOpenDrawer ? drawerWidth : 0
          }}
        > 
          <Toolbar />
          <Divider sx={{mt: 3}}>{selectedCity?.name}</Divider>
          <CityItems />
        </MUIDrawer>
      </Box>
  );
}
