import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const withoutAuth = Component => {

  class WithoutAuth extends React.Component {
    render() {
      if(!this.props.isAuthResolved)
        return (
          <Component {...this.props} />
          )
      else {
        return(
          <Redirect to= "/home"/>
          )
        }
    }
  }

  const mapStateToProps = state => {
    return {
      auth: state.auth.data,
      isAuthResolved: state.auth.isAuthResolved
    }
  }

  return connect(mapStateToProps)(WithoutAuth)

}

export default withoutAuth
