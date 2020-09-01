
import db from 'db'
import firebase from 'firebase/app'
import 'firebase/firestore'

export const doGetExperiences = (city) => {
  return db.collection("cities")
  .doc(city)
  .collection("experiences")
  .get()
  .then(querySnapshot => {
    if (!querySnapshot.exists) {
      console.log('No such collection experiences for city ', city)
      return {}
    } else {
      return querySnapshot
    }
  })
  .catch(err => {
    console.log("Error getting documents: ", err)
    Promise.reject(err)
  })
}

const updateOriginalMarkers = (originalMarkers, newMarkers) => {

  let auxMarkerObject = [...originalMarkers]
  let markerExists = false

  for(var indexNewM in newMarkers){
    for(var singleMarker in auxMarkerObject){
        const coordinates1 = auxMarkerObject[singleMarker].coordinates
        const coordinates2 = newMarkers[indexNewM].coordinates
      if( JSON.stringify(coordinates1) === JSON.stringify(coordinates2)){
        auxMarkerObject[singleMarker].numOfRecomendations++
        markerExists = true
        break
      }
    }
    if(!markerExists){
      debugger
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

    //Add the markers to the city
    return t.get(cityRef)
    .then(doc => {
      let originalMarkers = []
      if(doc.data().mapMarkers !== undefined){
        originalMarkers = doc.data().mapMarkers
      }
      let newMarkers = markers.mapMarkers
      const updatedMarkers = updateOriginalMarkers(originalMarkers, newMarkers)

      var setObject = {
        mapMarkers: updatedMarkers
      }

      t.set(cityRef, setObject, {merge: true})

      //Add the experience to the subcollection of the city
      //const expWithTimeStamp = {...experience, timeStamp: firebase.firestore.FieldValue.serverTimestamp()}
      const expWithTimeStamp = {dummyAtt: "dummy", timeStamp: firebase.firestore.FieldValue.serverTimestamp()}

      t.set(experiencesRef.doc(), expWithTimeStamp)
    })
  })
  .then(result => {
    Promise.resolve('Transaction success!')
  })
  .catch(err => {
    Promise.reject(err)
  })
}
