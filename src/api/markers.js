import db from 'db'


export const doUpdateMarkers = (cityName, markers) => {
    let cityRef = db.collection('cities').doc(cityName)
    return db.runTransaction(t => {
      return t.get(cityRef)
      .then(doc => {
        var markerExists = false
        let originalMarkers = []
        if(doc.data().mapMarkers !== undefined){
          originalMarkers = doc.data().mapMarkers
        }
        let newMarkers = markers.mapMarkers
        for(var indexNewM in markers.mapMarkers){

          for(var singleMarker in originalMarkers){
              const coordinates1 = originalMarkers[singleMarker].coordinates
              const coordinates2 = newMarkers[indexNewM].coordinates
            if( JSON.stringify(coordinates1) === JSON.stringify(coordinates2)){
              originalMarkers[singleMarker].numOfRecomendations++
              markerExists = true
              break
            }
          }
          if(!markerExists){
            originalMarkers.push(newMarkers[indexNewM])
          }
          markerExists = false
        }

        var setObject = {
          mapMarkers: originalMarkers
        }

        t.set(cityRef, setObject, {merge: true})
      })
    }).then(result => {
        return('Transaction success!')
      }).catch(err => {
        return(err)
      })
}
