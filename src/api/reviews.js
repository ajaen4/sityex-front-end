import db from 'db';
import { doc, getDocs, collection, runTransaction, serverTimestamp } from 'firebase/firestore';

const citiesCollection = collection(db, "cities");

export const getreviews = (city) => {
  const query = collection(db, `cities/${city}/reviews`);
  return getDocs(query)
  .then(querySnapshot => {
    return querySnapshot.docs.map(doc => doc.data())
  })
  .catch(err => {
    console.log("Error getting documents: ", err)
    Promise.reject(err)
  })
}

const updateOriginalMarkers = (originalMarkers, newMarkers) => {
  let consolidatedMarkers = [...originalMarkers];

  newMarkers.forEach(newMarker => {
    const foundMarker = consolidatedMarkers.find(orgMarker => orgMarker.id === newMarker.id);
    
    if (foundMarker) {
      foundMarker.numOfRecomendations++;
    } else {
      consolidatedMarkers.push(newMarker);
    }
  });

  return consolidatedMarkers;
}

export const addreview = (cityName, review, markers) => {
  const cityDocRef = doc(citiesCollection, cityName);
  const reviewsCollectionRef = collection(cityDocRef, "reviews");

  return runTransaction(db, async t => {
    const cityDoc = await t.get(cityDocRef);
    const originalMarkers = cityDoc.data().mapMarkers || [];
    
    const updatedMarkers = updateOriginalMarkers(originalMarkers, markers);
    
    const setObject = {
      mapMarkers: updatedMarkers
    };
    t.set(cityDocRef, setObject, { merge: true });

    // Add the review to the subcollection of the city
    const newreviewDocRef = doc(reviewsCollectionRef);
    const id = newreviewDocRef.id;
    const expTimeId = {
      ...review,
      timeStamp: serverTimestamp(),
      id: id
    };
    t.set(newreviewDocRef, expTimeId);
  });
}