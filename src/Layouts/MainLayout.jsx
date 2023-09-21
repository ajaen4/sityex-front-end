import { Outlet } from 'react-router-dom'

import {Box} from '@mui/material'

import Navbar from "components/Navbars/Navbar.js"
import Footer from "components/Footers/Footer.js"


const MainLayout = () => (
  <>
    <Navbar/>
        <Box mt={0.2}>
            <Outlet />
        </Box>
    <Footer/>
  </>
)

  
  export default MainLayout
