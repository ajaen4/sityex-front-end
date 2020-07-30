
import React from 'react'

import { connect } from 'react-redux'

//Custom components
import Routes from './Routes'
import NavbarErasmus from "components/Navbars/NavbarErasmus.js"

class ErasmusApp extends React.Component {

  render(){
    return (
      <React.Fragment>
        <NavbarErasmus auth = {this.props.auth}/>
        <Routes/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.authUser.data
  }
}

export default connect(mapStateToProps)(ErasmusApp)
