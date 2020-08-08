
import React from 'react'

import { connect } from 'react-redux'

//Custom components
import Routes from './Routes'
import NavbarErasmus from "components/Navbars/NavbarErasmus.js"

class ErasmusApp extends React.Component {

  render(){
    return (
      <React.Fragment>
        <NavbarErasmus auth = {this.props.auth} isAuthResolved = {this.props.isAuthResolved}/>
        <Routes/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.authUser.data,
    isAuthResolved: state.authUser.isAuthResolved
  }
}

export default connect(mapStateToProps)(ErasmusApp)
