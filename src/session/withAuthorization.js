import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import * as ROUTES from 'constants/routes'

const condition = authUser => !!authUser

const withAuthorization = () => Component => {

  class WithAuthorization extends React.Component {


    componentDidMount() {
      /*this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.LOG_IN)
          }
        },
      )*/
    }

    componentWillUnmount() {
      //this.listener()
    }

    render() {
      return (
        <Component {...this.props} />
      )
    }

  }

  return compose(
    withRouter,
  )(WithAuthorization)
}

export default withAuthorization
