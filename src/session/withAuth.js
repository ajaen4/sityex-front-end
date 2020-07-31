import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const withAuth = () => Component => {

  class withAuthClass extends React.Component {
    render() {
      if(this.props.auth)
        return (
          <Component {...this.props} />
          )
      else return(
          <Redirect to = "/login" />
          )
    }
  }
  return connect(mapStateToProps)(withAuthClass)
}

const mapStateToProps = state => {
  return {
    auth: state.authUser.data
  }
}

export default withAuth
