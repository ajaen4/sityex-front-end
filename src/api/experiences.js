
import db from 'db'
import firebase from 'firebase/app'
import 'firebase/firestore'

export const getExperiences = (city) => {
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

  debugger
  for(var indexNewM in newMarkers){
    for(var singleMarker in auxMarkerObject){
        const orgMarker = auxMarkerObject[singleMarker]
        const newMarker = newMarkers[indexNewM]
      if(orgMarker.id === newMarker.id){
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

export const addExperience = (cityName, experience, markers) => {
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
      const ref = experiencesRef.doc()
      const id = ref.path.split("/").pop()

      const expTimeId = {...experience, timeStamp: firebase.firestore.FieldValue.serverTimestamp(), id: id}

      t.set(ref, expTimeId)
    })
  })
}
