import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};
class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.firestore = app.firestore();
    this.fieldValue = app.firestore.FieldValue;
  }

  // *** Auth API ***

  //Creates user with email and password
  doCreateUserWithEmailAndPassword = (email, password) =>
  this.auth.createUserWithEmailAndPassword(email, password);

  //Creates user in database
  //TODO: save more info!
  doSaveUser = (userName, email) => {

    this.firestore.collection("users").add({
      userName: userName,
      email: email
    });
  }

  //Function that signs in user with email and password
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  //Signs out user
  doSignOut = () => this.auth.signOut();

  //Sends and email to reset the password
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  //Updates the users password
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  //Saves city information without merge (overwrites data)
  doSaveCity = (cityData) => {
    this.firestore.collection("cities").doc(cityData["name"]).set(cityData);
  }

  //Saves city merging with existing data
  doSaveWithMergeCity = (cityData) => {
    this.firestore.collection("cities").doc(cityData["name"]).set(cityData, {merge: true});
  }

  doUpdateMarkers = (cityName, markers) => {

    let cityRef = this.firestore.collection('cities').doc(cityName);
    this.firestore.runTransaction(t => {
      return t.get(cityRef)
      .then(doc => {

        //Get mapMarkers
        var markerExists = false;
        let originalMarkers = [];
        if(doc.data().mapMarkers !== undefined){
          originalMarkers = doc.data().mapMarkers;
        }
        let newMarkers = markers.mapMarkers;
        for(var indexNewM in markers.mapMarkers){

          for(var singleMarker in originalMarkers){
              const coordinates1 = originalMarkers[singleMarker].coordinates;
              const coordinates2 = newMarkers[indexNewM].coordinates;
            if( JSON.stringify(coordinates1) === JSON.stringify(coordinates2)){
              originalMarkers[singleMarker].numOfRecomendations++;
              markerExists = true;
              break;
            }
          }
          if(!markerExists){
            originalMarkers.push(newMarkers[indexNewM]);
          }
          markerExists = false;
        }

        var setObject = {
          mapMarkers: originalMarkers
        };

        t.set(cityRef, setObject, {merge: true});
      });
    }).then(result => {
        console.log('Transaction success!');
      }).catch(err => {
        console.log('Transaction failure:', err);
      });
  }

  //Fetches city and run callback function passed as an argument
  doGetCity = (city, setCityData) => {
    let cityRef = this.firestore.collection("cities").doc(city);
    cityRef.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document ' + city + ' in collection cities!');
        } else {
          console.log('Document data:', doc.data());
          setCityData(doc.data());
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
  }

  //Fetches cities index
  doGetCitiesIndex = (setIndexData) => {
    let cityRef = this.firestore.collection("cities").doc("Index");
    cityRef.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document "Index" in collection cities!');
        } else {
          console.log('Document data:', doc.data());
          setIndexData(doc.data());
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
  }


}
export default Firebase;
