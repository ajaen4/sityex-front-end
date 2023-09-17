
import React from 'react'

import { connect } from 'react-redux'
import {
  Box,
} from '@mui/material'

//Custom components
import AppRoutes from './Routes'
import Navbar from "components/Navbars/Navbar.js"
import Footer from "components/Footers/Footer.js"

class SityExApp extends React.Component {

  render(){
    return (
      <>
        <Navbar auth = {this.props.auth} isAuthResolved = {this.props.isAuthResolved}/>
        <Box mt={0.2}> 
          <AppRoutes/>
        </Box>
        <Footer/>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.data,
    isAuthResolved: state.auth.isAuthResolved
  }
}

export default connect(mapStateToProps)(SityExApp)
