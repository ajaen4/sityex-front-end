import db from "db";
import {
  doc,
  getDocs,
  collection,
  writeBatch,
  increment
} from "firebase/firestore";

import { getCityPlaces } from "api/places.js";

const citiesCollection = collection(db, "cities");

export const getReviews = (city_id) => {
  const query = collection(db, `cities/${city_id}/reviews`);
  return getDocs(query)
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => doc.data());
    })
    .catch((err) => {
      console.log("Error getting documents: ", err);
      Promise.reject(err);
    });
};

export const addReview = async (city_id, review, recomendations) => {
  const cityDocRef = doc(citiesCollection, city_id);
  const reviewsCollectionRef = collection(cityDocRef, "reviews");
  const placesCollectionRef = collection(cityDocRef, "places");

  const orgPlaces = await getCityPlaces(city_id);
  const orgPlacesIds = orgPlaces.map((place) => place.placeId);

  const newPlaces = recomendations.filter(
    (place) => !orgPlacesIds.includes(place.placeId)
  );

  const orgPlacesInRecs = recomendations.filter((place) =>
    orgPlacesIds.includes(place.placeId)
  );

  const batch = writeBatch(db);

  for (const place of newPlaces) {
    const placeDocRef = doc(placesCollectionRef, place.placeId);
    batch.set(placeDocRef, {
      ...place,
      numRec: 1
    });
  }

  for (const place of orgPlacesInRecs) {
    const placeDocRef = doc(placesCollectionRef, place.placeId);
    batch.update(placeDocRef, { numRec: increment(1) });
  }

  const newReviewDocRef = doc(reviewsCollectionRef);
  batch.set(newReviewDocRef, review);

  return await batch.commit();
};
