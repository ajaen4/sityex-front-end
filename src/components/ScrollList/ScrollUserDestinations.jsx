
import React from "react"

//Custom UI components
import ReactList from 'react-list'
import Experience from 'components/Experiences/Experience.jsx'
import LoadingSpinner from 'components/Spinner/LoadingSpinner.jsx'
import EmptyList from 'components/EmptyFill/EmptyList.jsx'

function ScrollUserDestinations({ destinations, isFetching }){

  const renderItem = (index, key) => <Experience data = {destinations[index]} key = {index}/>

  if(!isFetching){
    return (
      <>
        {(destinations.length !== 0) &&
          <ReactList style = {{
            display: "flex",
            justifyContent: "center",
            overflow: 'auto',
          height: "600px"}}
            itemRenderer = {renderItem}
            length = {destinations.length}
          type = 'uniform'/>
        }
        {(destinations.length === 0) &&
          <EmptyList message = "No hay destinos seleccionados"/>
      }
      </>
    )
  }
  else {
    return <LoadingSpinner/>
  }

}

export default ScrollUserDestinations