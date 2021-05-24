
import React from "react"

//Custom UI components
import ReactList from 'react-list'
import Housemate from 'components/Housemate/Housemate.jsx'
import EmptyList from 'components/EmptyFill/EmptyList.jsx'
import LoadingSpinner from 'components/Spinner/LoadingSpinner.jsx'

function ScrollHousemates({ housemates, auth, isFetching }){

  const renderItem = (index, key) => <Housemate housemateData = {housemates[index]} key = {index} auth = {auth}/>

  if(!isFetching){
    return (
      <>
      {(housemates.length !== 0) &&
      <ReactList style = {{
        display: "flex",
        justifyContent: "center",
        overflow: 'auto',
        height: "600px"
      }}
        itemRenderer = {renderItem}
        length = {housemates.length}
        type = 'uniform'/>
      }
      {(housemates.length === 0) &&
        <EmptyList name = "peticiones de apartamento"/>
      }
      </>
    )
  }
  else {
    return <LoadingSpinner/>
  }

}

export default ScrollHousemates
