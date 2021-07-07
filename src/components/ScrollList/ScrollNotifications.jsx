
import React from "react"

//Custom UI components
import ReactList from 'react-list'
import Experience from 'components/Experiences/Experience.jsx'
import LoadingSpinner from 'components/Spinner/LoadingSpinner.jsx'
import EmptyList from 'components/EmptyFill/EmptyList.jsx'

function ScrollNotifications({ notifications, isFetching }){

  const renderItem = (index, key) => <Experience data = {notifications[index]} key = {index}/>

  if(!isFetching){
    return (
      <>
        {(notifications.length !== 0) &&
          <ReactList style = {{
            display: "flex",
            justifyContent: "center",
            overflow: 'auto',
          height: "600px"}}
            itemRenderer = {renderItem}
            length = {notifications.length}
          type = 'uniform'/>
        }
        {(notifications.length === 0) &&
          <EmptyList message = "No hay notificaciones"/>
      }
      </>
    )
  }
  else {
    return <LoadingSpinner/>
  }

}

export default ScrollNotifications
