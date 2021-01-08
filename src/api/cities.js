
import db from 'db'

//Fetches city data
export const getCity = (city) => {
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

export const getCitiesIndex = () => {
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
