import db from "baas";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  orderBy,
} from "firebase/firestore";

const citiesCollection = collection(db, "cities");

export const getCityEvents = async (city_id) => {
  const cityDocRef = doc(citiesCollection, city_id);
  const eventsCollectionRef = collection(cityDocRef, "events");

  const q = query(eventsCollectionRef, orderBy("timestamp", "desc"));

  const eventsDocs = await getDocs(q);

  if (eventsDocs.empty) return [];

  return eventsDocs.docs.map((doc) => doc.data());
};

export const getCityEvent = async (city_id, event_id) => {
  const cityDocRef = doc(citiesCollection, city_id);
  const eventCollectionRef = doc(collection(cityDocRef, "events"), event_id);
  const eventDoc = await getDoc(eventCollectionRef);

  if (eventDoc.empty) return [];

  return eventDoc.data();
};
