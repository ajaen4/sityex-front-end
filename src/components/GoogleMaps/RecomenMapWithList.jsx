import React from "react"
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// Custom functionality
import { objectIsEmpty } from 'helpers/usefulFunctions'

// Custom UI components
import MapWithSearch from "components/GoogleMaps/MapWithSearch"
import ScrollRecomendations from "components/ScrollList/ScrollRecomendations"


const RecomenMapWithList = ({selectedCity, windowDimensions, updateRecomendations}) => {

  const [currRecomendations, setCurrRecomendations] = React.useState([])

  const incrementRecomendation = (recomendation) => {

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
    <Grid container spacing={3} style={{ marginTop: "25px", justifyContent: "center" }}>
      <Grid item sm={12} md={8} lg={8} style={{ marginBottom: "20px" }}>
        <Box display="flex" justifyContent="center" marginBottom="20px">
          {(!objectIsEmpty(selectedCity)) && (
            <MapWithSearch
              incrementRecomendation={incrementRecomendation}
              currRecomendations={currRecomendations}
              savedRecomendations={selectedCity.mapMarkers === undefined ? [] : selectedCity.mapMarkers}
              style={{ justifyContent: "center" }}
              selectedCity={selectedCity}
              pushRecomendation={pushRecomendation}
            />
          )}
        </Box>
        <Grid container spacing={1} style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center", 
          marginTop: "10px"
        }}>
          <img alt="selected place icon" src={require("assets/icons/pin_red.png")} style={{ height: "30px" }}></img>
          <Typography variant="body1" style={{ textAlign: "center", marginLeft: "5px" }}>Ultima busqueda (Pendiente de recomendar)</Typography>
        </Grid>
        <Grid container spacing={1} style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center", 
          marginTop: "10px"
        }}>
          <img alt="my recomendation icon" src={require("assets/icons/pin_outline_blue.png")} style={{ height: "30px" }}></img>
          <Typography variant="body1" style={{ textAlign: "center", marginLeft: "5px" }}>Tus recomendaciones</Typography>
        </Grid>
        <Grid container spacing={1} style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center", 
          marginTop: "10px"
        }}>
          <img alt="other users recomendations icon" src={require("assets/icons/pin_blue.png")} style={{ height: "30px" }}></img>
          <Typography variant="body1" style={{ textAlign: "center", marginLeft: "5px" }}>Recomendaciones de los demas usuarios</Typography>
        </Grid>
      </Grid>
      <Grid item sm={12} md={4} lg={4}>
        <Typography variant="h5"><b>Recomendaciones</b></Typography>
        <ScrollRecomendations currRecomendations={currRecomendations} windowWidth={windowDimensions} deleteRec={deleteRec} />
      </Grid>
    </Grid>
  )
}

export default RecomenMapWithList
