import db from "db";
import { doc, getDoc, getDocs, collection, setDoc } from "firebase/firestore";

const citiesCollection = collection(db, "cities");

export const getCityEvents = async (city_id) => {
  const cityDocRef = doc(citiesCollection, city_id);
  const eventsCollectionRef = collection(cityDocRef, "events");
  const eventsDocs = await getDocs(eventsCollectionRef);

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

export const setUserInterested = async (
  city_id,
  event_id,
  user_id,
  interested_info,
) => {
  const cityDocRef = doc(citiesCollection, city_id);
  const eventCollectionRef = doc(collection(cityDocRef, "events"), event_id);
  const interestedUsersRef = doc(
    collection(eventCollectionRef, "interested_users"),
    user_id,
  );

  setDoc(
    interestedUsersRef,
    {
      user_id: user_id,
      ...interested_info,
    },
    { merge: true },
  );
};

export const countInterestedUsers = async (city_id, event_id, user_id) => {
  const cityDocRef = doc(citiesCollection, city_id);
  const eventCollectionRef = doc(collection(cityDocRef, "events"), event_id);
  const interestedUsersCollectionRef = collection(
    eventCollectionRef,
    "interested_users",
  );

  const querySnapshot = await getDocs(interestedUsersCollectionRef);
  let count = 0;

  querySnapshot.forEach((doc) => {
    const doc_data = doc.data();
    if (doc_data.is_interested && doc_data.user_id !== user_id) {
      count++;
    }
  });

  return count;
};
