
import db from 'db'

//Saves city information without merge (overwrites data)
export const doSaveCity = (cityData) => {
  db.collection("cities").doc(cityData["name"]).set(cityData)
}

//Saves city merging with existing data
export const doSaveWithMergeCity = (cityData) => {
  db.collection("cities").doc(cityData["name"]).set(cityData, {merge: true})
}

//Fetches city data
export const doGetCity = (city) => {
    return db.collection("cities").doc(city).get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document ', city ,' in collection cities!')
        return {}
      } else {
        return doc.data()
      }
    })
    .catch(err => {
      return err
    })
}

export const doGetCitiesIndex = () => {
  return db.collection("cities").doc("_Index").get()
    .then( doc => {
      if (!doc.exists) {
        console.log('No such document "Index" in collection cities!')
        return {}
      } else {
        return doc.data()
      }
    })
    .catch(err => {
      return err
    })
}
