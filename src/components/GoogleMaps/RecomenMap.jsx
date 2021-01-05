
import React from "react"
import {
  GoogleMap,
  Marker,
  InfoWindow} from '@react-google-maps/api'

function RecomenMap(props){

  const dummyRecom = {coordinates: {lat: 0, lng: 0}, name: "", address: "" }
  const iconRecomendation = { url: require("assets/icons/pin_blue.png"), scaledSize: { width: 38, height: 38 } }

  const [selectedRecomen, setSelectedRecomen] = React.useState(dummyRecom)

  const center = props.coordinates

  return (
      <GoogleMap
      style = {{width: "100%", height : "100%", justifyContent: "center"}}
      mapContainerStyle = {{ width: "100%", height : "500px", justifyContent: "center"}}
      zoom = {12}
      center = {center}>
        {props.recomendations.map( recomendation =>
          <Marker
            key = {recomendation.name}
            name = {recomendation.name}
            draggable = {false}
            position = {recomendation.coordinates}
            icon = {iconRecomendation}
            onClick={() => {setSelectedRecomen(recomendation)}}
          >
          {((recomendation.coordinates.lat === selectedRecomen.coordinates.lat) && (recomendation.coordinates.lng === selectedRecomen.coordinates.lng)) &&
            <InfoWindow
              onCloseClick={() => {
                setSelectedRecomen(dummyRecom)
              }}
              position={selectedRecomen.coordinates}>
              <div style = {{padding: "5px"}}>
                <div><b>Nombre: </b> {selectedRecomen.name}</div>
                <div><b># de recomendaciones: </b>{selectedRecomen.numOfRecomendations}</div>
                <div><b>Direccion: </b> {selectedRecomen.address}</div>
              </div>
            </InfoWindow>
          }
          </Marker>
        )}
      </GoogleMap>
  )

}

export default React.memo(RecomenMap)
