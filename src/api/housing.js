import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  limit,
  where,
  orderBy,
} from "firebase/firestore";
import db from "baas";

export const getHousingListings = async (city_id, limitV = null) => {
  try {
    const housingCol = collection(db, "cities", city_id, "housing");

    let q = null;
    if (limitV) {
      q = query(housingCol, limit(limitV));
    } else {
      q = query(housingCol);
    }

    const housingDocs = await getDocs(q);
    return housingDocs.docs.map((doc) => doc.data());
  } catch (err) {
    console.error("Error fetching housing listings:", err);
    return err;
  }
};

export const getHousingListing = async (city_id, housing_id) => {
  try {
    const housingDoc = await getDoc(
      doc(collection(db, "cities", city_id, "housing"), housing_id)
    );
    if (!housingDoc.exists()) {
      console.log("No such document ", housing_id, " in collection cities!");
      return {};
    } else {
      return housingDoc.data();
    }
  } catch (err) {
    console.error("Error fetching housing listing:", err);
    return err;
  }
};

export const getListingImages = async (city_id, housing_id) => {
  try {
    const housingDoc = await getDoc(
      doc(collection(db, "cities", city_id, "housing_images"), housing_id)
    );
    if (!housingDoc.exists()) {
      console.log("No such document ", housing_id, " in collection cities!");
      return {};
    } else {
      return housingDoc.data();
    }
  } catch (err) {
    console.error("Error fetching housing listing:", err);
    return err;
  }
};
