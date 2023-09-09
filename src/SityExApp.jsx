
import React from 'react'

import { connect } from 'react-redux'
import {
  Box,
} from '@mui/material'

//Custom components
import AppRoutes from './Routes'
import MainNavbar from "components/Navbars/MainNavbar.js"

class SityExApp extends React.Component {

  render(){
    return (
      <>
        <MainNavbar auth = {this.props.auth} isAuthResolved = {this.props.isAuthResolved}/>
        <Box mt={8.3}> 
          <AppRoutes/>
        </Box>
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
