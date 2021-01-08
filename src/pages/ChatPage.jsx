import React from 'react'

import { connect } from 'react-redux'

// reactstrap components
/*import{
  Container,
  Row,
  Col
} from "reactstrap"*/

//Custom functionality
import { withAuth } from 'session'

//Custom UI components
import DefaultFooter from "components/Footers/DefaultFooter"

const ChatPage = ({userData}) => {

  return (
    <>
      <DefaultFooter />
    </>
  )
}

const mapStateToProps = state => ({
  userData: state.auth
})

export default connect(mapStateToProps)(withAuth(ChatPage))
