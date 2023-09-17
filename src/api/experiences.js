import db from 'db';
import { doc, getDocs, collection, runTransaction, serverTimestamp } from 'firebase/firestore';

const citiesCollection = collection(db, "cities");

export const getExperiences = (city) => {
  const query = collection(db, `cities/${city}/experiences`);
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

export const addExperience = (cityName, experience, markers) => {
  const cityDocRef = doc(citiesCollection, cityName);
  const experiencesCollectionRef = collection(cityDocRef, "experiences");

  return runTransaction(db, async t => {
    const cityDoc = await t.get(cityDocRef);
    const originalMarkers = cityDoc.data().mapMarkers || [];
    
    const updatedMarkers = updateOriginalMarkers(originalMarkers, markers);
    
    const setObject = {
      mapMarkers: updatedMarkers
    };
    t.set(cityDocRef, setObject, { merge: true });

    // Add the experience to the subcollection of the city
    const newExperienceDocRef = doc(experiencesCollectionRef);
    const id = newExperienceDocRef.id;
    const expTimeId = {
      ...experience,
      timeStamp: serverTimestamp(),
      id: id
    };
    t.set(newExperienceDocRef, expTimeId);
  });
}
