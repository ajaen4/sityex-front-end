import React from "react"

//Custom functionality
import { objectIsEmpty } from 'helpers/usefulFunctions'

// reactstrap components
import {
  Row,
  Col
} from "reactstrap"

//Custom UI components
import MapWithSearch from "components/GoogleMaps/MapWithSearch"
import ScrollRecomendations from "components/ScrollList/ScrollRecomendations"


const RecomenMapWithList = ({selectedCity, windowDimensions, updateRecomendations}) => {

  const [currRecomendations, setCurrRecomendations] = React.useState([])

  const incrementRecomendation = (recomendation) => {
    console.log("Recomendation incremented")
    console.log(recomendation)
    if(!currRecomendations.some(recom => recom.name === recomendation.name)){
      var aux = {}
      Object.assign(aux, recomendation)
      var auxRecomendations = []
      Object.assign(auxRecomendations, currRecomendations)
      auxRecomendations.push(aux)
      setCurrRecomendations(auxRecomendations)
      updateRecomendations(auxRecomendations)
    }
  }

  //Callback from map to push recomendation
  const pushRecomendation = place => {
    var aux = {}

    if((place.name != null) && (!currRecomendations.some(recom => (recom.coordinates.lat === place.coordinates.lat) && (recom.coordinates.lng === place.coordinates.lng)))){
      Object.assign(aux, place)
      var auxRecomendations = []
      Object.assign(auxRecomendations, currRecomendations)
      auxRecomendations.push(aux)
      setCurrRecomendations(auxRecomendations)
      updateRecomendations(auxRecomendations)
    }
  }

  //Deletes recomendation when button is pressed
  const deleteRec = (index) => {
    var aux = []
    Object.assign(aux, currRecomendations)
    aux.splice(index, 1)
    setCurrRecomendations(aux)
    updateRecomendations(aux)
  }

  return (
       <Row style = {{
         marginTop: "25px",
         justifyContent: "center"
       }}>
         <Col sm = "12" md = "8" lg = "8" style = {{
           marginBottom: "20px"
         }}>
           <div style = {{
             justifyContent: "center",
             marginBottom: "20px"
           }}>
           { (!objectIsEmpty(selectedCity)) &&
             <MapWithSearch
               incrementRecomendation = {incrementRecomendation}
               currRecomendations = {currRecomendations}
               savedRecomendations = {selectedCity.mapMarkers === undefined ? [] : selectedCity.mapMarkers}
               style = {{justifyContent: "center"}}
               selectedCity = {selectedCity}
               pushRecomendation = {pushRecomendation}/>}
            </div>
            <Row style = {{
               display: "flex",
               flexDirection: "row",
               justifyContent: "center",
               alignItems: "center",
               textAlign: "center"}}>
                 <img  alt = "selected place icon" src = {require("assets/icons/pin_red.png")} style = {{
                   height: "30px"
                 }}></img>
                 <div style = {{
                   textAlign: "center",
                   marginLeft: "5px",
                   marginTop: "3px",
                   fontSize: "0.9em"
                 }}>
                   Ultima busqueda (Pendiente de recomendar)
                 </div>
             </Row>
             <Row style = {{
               display: "flex",
               flexDirection: "row",
               justifyContent: "center",
               alignItems: "center",
               textAlign: "center"
               }}>
                 <img  alt = "my recomendation icon" src = {require("assets/icons/pin_outline_blue.png")} style = {{
                   height: "30px"
                 }}></img>
                 <div style = {{
                   textAlign: "center",
                   marginLeft: "5px",
                   marginTop: "3px",
                   fontSize: "0.9em"
                 }}>
                   Tus recomendaciones
                 </div>
             </Row>
             <Row style = {{
               display: "flex",
               flexDirection: "row",
               justifyContent: "center",
               alignItems: "center",
               textAlign: "center"
               }}>
                 <img  alt = "other users recomendations icon" src = {require("assets/icons/pin_blue.png")} style = {{
                   height: "30px"
                 }}></img>
                 <div style = {{
                   textAlign: "center",
                   marginLeft: "5px",
                   marginTop: "3px",
                   fontSize: "0.9em"
                 }}>
                   Recomendaciones de los demas usuarios
                 </div>
             </Row>
         </Col>
         <Col sm = "12" md = "4" lg = "4" >
           <div>
             <h5><b>
               Recomendaciones
             </b></h5>
             <ScrollRecomendations currRecomendations = {currRecomendations} windowWidth = {windowDimensions} deleteRec = {deleteRec}/>
           </div>
         </Col>
     </Row>
    )
  }

export default RecomenMapWithList
