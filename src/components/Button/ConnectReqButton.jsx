
import React, {useState} from "react"

// reactstrap components
import {Button} from "reactstrap"

// Custom functionality
import {sendConnectionRequest} from "actions"

const ConnectReqButton = ({auth, housemateData}) => {

  const [isFetching, setIsFetching] = useState(false)

  const onClickConnection = () => {
    const userData = {
      fromUserName: auth.userName,
      fromUserId: auth.id,
      toUserName: housemateData.userName,
      toUserId: housemateData.userId}
    setIsFetching(true)
    sendConnectionRequest(userData, "housemate")
    .then((response) => {
      setIsFetching(false)
    })
    .catch(() => {
      //Ha ocurrido un error
    })
  }

  return (
    <Button
      style = {{marginTop: "0px"}}
      color = "success"
      onClick = {onClickConnection}
      disabled = {isFetching}>
      {(isFetching) && "Espere"}
        {(!isFetching) && "Conectar"}
    </Button>
  )

}

export default ConnectReqButton
