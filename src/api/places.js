import db from "db";
import { doc, getDocs, collection } from "firebase/firestore";

const citiesCollection = collection(db, "cities");

export const getCityPlaces = async (city_id) => {
  const cityDocRef = doc(citiesCollection, city_id);
  const placesCollectionRef = collection(cityDocRef, "places");
  const orgPlacesDocs = await getDocs(placesCollectionRef);

  if (orgPlacesDocs.empty) return [];

  return orgPlacesDocs.docs.map((doc) => doc.data());
};
