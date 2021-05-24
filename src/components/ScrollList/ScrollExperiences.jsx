
import React from "react"

//Custom UI components
import ReactList from 'react-list'
import Experience from 'components/Experiences/Experience.jsx'
import LoadingSpinner from 'components/Spinner/LoadingSpinner.jsx'
import EmptyList from 'components/EmptyFill/EmptyList.jsx'

function ScrollExperiences({ experiences, isFetching }){

  const renderItem = (index, key) => <Experience data = {experiences[index]} key = {index}/>

  if(!isFetching){
    return (
      <>
      {(experiences.length !== 0) &&
      <ReactList style = {{
        display: "flex",
        justifyContent: "center",
        overflow: 'auto',
        height: "600px"}}
        itemRenderer = {renderItem}
        length = {experiences.length}
        type = 'uniform'/>
      }
      {(experiences.length === 0) &&
        <EmptyList name = "experiencias"/>
      }
      </>
    )
  }
  else {
    return <LoadingSpinner/>
  }

}

export default ScrollExperiences
