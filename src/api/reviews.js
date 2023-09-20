import db from 'db';
import { doc, getDocs, collection, runTransaction, serverTimestamp } from 'firebase/firestore';

const citiesCollection = collection(db, "cities");

export const getReviews = (city) => {
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

const updateOriginalRecomendations = (originalRecomendations, newRecomendations) => {
  let consolidatedRecomendations = [...originalRecomendations];

  newRecomendations.forEach(newRecomendation => {
    const foundRecomendation = consolidatedRecomendations.find(orgRecomendation => orgRecomendation.name === newRecomendation.name);
    
    if (foundRecomendation) {
      foundRecomendation.numOfRecomendations++;
    } else {
      newRecomendation.numOfRecomendations = 1;
      consolidatedRecomendations.push(newRecomendation);
    }
  });

  return consolidatedRecomendations;
}

export const addReview = (cityName, review, recomendations) => {
  const cityDocRef = doc(citiesCollection, cityName);
  const reviewsCollectionRef = collection(cityDocRef, "reviews");

  return runTransaction(db, async t => {
    const cityDoc = await t.get(cityDocRef);
    const originalRecomendations = cityDoc.data().recomendations || [];
    
    const updatedRecomendations = updateOriginalRecomendations(originalRecomendations, recomendations);
    
    const setObject = {
      recomendations: updatedRecomendations
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
