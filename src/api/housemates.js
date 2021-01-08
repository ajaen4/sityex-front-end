
import db from 'db'
import firebase from 'firebase/app'
import 'firebase/firestore'

export const getHousemates = (city) => {
  return db.collection("cities")
  .doc(city)
  .collection("housemates")
  .get()
  .then(querySnapshot => {
    return querySnapshot.docs.map(doc => doc.data())
  })
  .catch(err => {
    console.log("Error getting documents: ", err)
    Promise.reject(err)
  })
}


export const addHousemate = (cityName, housemate) => {
  const housematesRef = db.collection("cities").doc(cityName).collection("housemates").doc()
  const id = housematesRef.path.split("/").pop()

  const completeHousemate = {...housemate, timeStamp: firebase.firestore.FieldValue.serverTimestamp(), id: id}

  return housematesRef.set(completeHousemate)
}
