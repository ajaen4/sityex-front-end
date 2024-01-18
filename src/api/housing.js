import { collection, doc, getDoc } from "firebase/firestore";
import db from "baas";

export const getHousingListing = async (city_id, housing_id) => {
  try {
    const housingDoc = await getDoc(
      doc(collection(db, "cities", city_id, "housing"), housing_id),
    );
    if (!housingDoc.exists()) {
      console.log("No such document ", housing_id, " in collection cities!");
      return {};
    } else {
      return housingDoc.data();
    }
  } catch (err) {
    console.error("Error fetching city:", err);
    return err;
  }
};

export const getHousingIndex = async (city_id) => {
  try {
    const document_name = "_index";
    const indexDoc = await getDoc(
      doc(collection(db, "cities", city_id, "housing"), document_name),
    );
    if (!indexDoc.exists()) {
      console.log(
        "No such document " + document_name + " in collection housing!",
      );
      return {};
    } else {
      return indexDoc.data();
    }
  } catch (err) {
    console.error("Error fetching housing index:", err);
    return err;
  }
};
