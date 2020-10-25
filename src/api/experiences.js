
import db from 'db'
import firebase from 'firebase/app'
import 'firebase/firestore'
import {round} from 'helpers/usefulFunctions'

export const doGetExperiences = (city) => {
  return db.collection("cities")
  .doc(city)
  .collection("experiences")
  .get()
  .then(querySnapshot => {
    return querySnapshot.docs.map(doc => doc.data())
  })
  .catch(err => {
    console.log("Error getting documents: ", err)
    Promise.reject(err)
  })
}

const updateOriginalMarkers = (originalMarkers, newMarkers) => {

  let auxMarkerObject = [...originalMarkers]
  let markerExists = false
  const ROUND_PRESCISION = 3

  for(var indexNewM in newMarkers){
    for(var singleMarker in auxMarkerObject){
        const coordinates1 = auxMarkerObject[singleMarker].coordinates
        const coordinates2 = newMarkers[indexNewM].coordinates
      debugger
      if((round(coordinates1.lat, ROUND_PRESCISION) === round(coordinates2.lat, ROUND_PRESCISION)) &&
          (round(coordinates1.lng, ROUND_PRESCISION) === round(coordinates2.lng, ROUND_PRESCISION))){
        auxMarkerObject[singleMarker].numOfRecomendations++
        markerExists = true
        break
      }
    }
    if(!markerExists){
      auxMarkerObject.push(newMarkers[indexNewM])
    }
    markerExists = false
  }

  return auxMarkerObject
}

export const doAddExperience = (cityName, experience, markers) => {
  const experiencesRef = db.collection("cities").doc(cityName).collection("experiences")
  const cityRef = db.collection("cities").doc(cityName)
  return db.runTransaction(t => {

    return t.get(cityRef)
    .then(doc => {
      let originalMarkers = []
      if(doc.data().mapMarkers !== undefined){
        originalMarkers = doc.data().mapMarkers
      }
      let newMarkers = markers
      const updatedMarkers = updateOriginalMarkers(originalMarkers, newMarkers)

      var setObject = {
        mapMarkers: updatedMarkers
      }
      t.set(cityRef, setObject, {merge: true})

      //Add the experience to the subcollection of the city
      const expWithTimeStamp = {...experience, timeStamp: firebase.firestore.FieldValue.serverTimestamp()}

      t.set(experiencesRef.doc(), expWithTimeStamp)
    })
  })
}
