import React from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

const withAuth = Component => {

  class WithAuth extends React.Component {
    render() {
      if(this.props.isAuthResolved)
        return (<Component {...this.props} />)
      else return(<Navigate to = "/login" />)
    }
  }

  const mapStateToProps = state => {
    return {
      auth: state.auth.data,
      isAuthResolved: state.auth.isAuthResolved
    }
  }

  return connect(mapStateToProps)(WithAuth)

}

export default withAuth
