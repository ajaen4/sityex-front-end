import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";

import Navbar from "components/Navigation/Navbar";
import Footer from "components/Footers/Footer";

const MainLayout = () => {
  
  return (
    <Box style={{minHeight: "100vh"}}>
      <Navbar outlet={<Outlet />}/>
      <Footer/>
    </Box>
  );
};

export default MainLayout;
