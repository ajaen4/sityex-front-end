
import React from "react"

//Custom UI components
import ReactList from 'react-list'
import Experience from 'components/Experiences/Experience.jsx'
import LoadingSpinner from 'components/Spinner/LoadingSpinner.jsx'

function ScrollExperiences({ experiences, isFetching }){

  const renderItem = (index, key) => {

      return  <div className ="rowDirection" key = {index}>
                <Experience data = {experiences[index]}/>
              </div>
        }

  if(!isFetching){
    return (
      <>
      <div style = {{overflow: 'auto', height: "600px", justifyContent: "center"}}>
        <ReactList style = {{
          display: "flex",
          justifyContent: "center"
        }}
          itemRenderer = {renderItem}
          length = {experiences.length}
          type = 'uniform'/>
      </div>
      </>
    )
  }
  else {
    return <LoadingSpinner/>
  }

}

export default ScrollExperiences
