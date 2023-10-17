import db from "db";
import { getDoc, collection, doc } from "firebase/firestore";

export const getMap = (map_name) => {
  const path = collection(db, "maps");
  const map_doc = doc(path, map_name);
  return getDoc(map_doc)
    .then((doc) => {
      return doc.data();
    })
    .catch((err) => {
      console.log("Error getting document: ", err);
      Promise.reject(err);
    });
};
