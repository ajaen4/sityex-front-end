
import React from "react"

//Custom UI components
import ReactList from 'react-list'
import Housemate from 'components/Housemate/Housemate.jsx'
import LoadingSpinner from 'components/Spinner/LoadingSpinner.jsx'

function ScrollHousemates({ housemates, isFetching }){

  const renderItem = (index, key) => {

      return  <div className ="rowDirection" key = {index}>
                <Housemate data = {housemates[index]}/>
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
          length = {housemates.length}
          type = 'uniform'/>
      </div>
      </>
    )
  }
  else {
    return <LoadingSpinner/>
  }

}

export default ScrollHousemates
