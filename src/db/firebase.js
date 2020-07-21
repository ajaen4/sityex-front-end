import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
}
class Firebase {

  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
    this.firestore = app.firestore()
  }

  // ---------------- AUTH -------------------

  //Creates user with email and password
  doCreateUser = async ({email, password}) => {
    try{
      const resp = await this.auth.createUserWithEmailAndPassword(email, password)
      const { user } = resp
      return Promise.resolve(user)
    }
    catch (error) {
      return Promise.reject(error.message)
    }
  }

  //Creates user in database
  //TODO: save more info!
  doSaveUser = (userName, email) => {
    this.firestore.collection("users").add({
      userName: userName,
      email: email
    })
  }

  //Function that signs in user with email and password
  doSignInWithEmailAndPassword = async ({email, password}) => {
    try{
      const resp = await this.auth.signInWithEmailAndPassword(email, password)
      const { user } = resp
      return Promise.resolve(user)
    }
    catch (error) {
      return Promise.reject(error.message)
    }
  }

  //Signs out user
  doSignOut = () => this.auth.signOut()

  //Sends and email to reset the password
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

  //Updates the users password
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password)

  // ---------------- AUTH END -----------------


  // ---------------- CITIES -------------------

  //Saves city information without merge (overwrites data)
  doSaveCity = (cityData) => {
    this.firestore.collection("cities").doc(cityData["name"]).set(cityData)
  }

  //Saves city merging with existing data
  doSaveWithMergeCity = (cityData) => {
    this.firestore.collection("cities").doc(cityData["name"]).set(cityData, {merge: true})
  }

  //Fetches city data
  doGetCity = (city) => {
      return this.firestore.collection("cities").doc(city).get()
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

  doGetCitiesIndex = () => {
    return this.firestore.collection("cities").doc("_Index").get()
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

  // ---------------- CITIES END -------------------

  // ---------------- MARKERS ----------------------

  doUpdateMarkers = (cityName, markers) => {
      let cityRef = this.firestore.collection('cities').doc(cityName)
      return this.firestore.runTransaction(t => {
        return t.get(cityRef)
        .then(doc => {

          //Get mapMarkers
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

  // ---------------- MARKERS END -------------------
}

export default Firebase
