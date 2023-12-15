import { collection, doc, getDoc } from "firebase/firestore";
import db from "db";

export const getCity = async (city) => {
  try {
    const cityDoc = await getDoc(doc(collection(db, "cities"), city));
    if (!cityDoc.exists()) {
      console.log("No such document ", city, " in collection cities!");
      return {};
    } else {
      return cityDoc.data();
    }
  } catch (err) {
    console.error("Error fetching city:", err);
    return err;
  }
};

export const getCitiesIndex = async () => {
  try {
    const document_name = "_index";
    const indexDoc = await getDoc(doc(collection(db, "cities"), document_name));
    if (!indexDoc.exists()) {
      console.log(
        "No such document " + document_name + " in collection cities!",
      );
      return {};
    } else {
      return indexDoc.data();
    }
  } catch (err) {
    console.error("Error fetching cities index:", err);
    return err;
  }
};
